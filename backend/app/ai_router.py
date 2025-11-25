import httpx
import json
from typing import Optional, Tuple
from sqlalchemy.orm import Session
import uuid
from .config import settings
from . import models

# TODO: # هذه هي نقطة الدماغ الذكي لاختيار النموذج المناسب لكل مهمة

async def call_llm(task: str, prompt: str, db: Optional[Session] = None, user_id: Optional[str] = None) -> Tuple[str, str, str]:
    policy = settings.router_policy()
    route = policy.get(task) or policy.get("fallback") or {}

    provider_key = route.get("provider", "groq")
    model_env_name = route.get("model_env", "GROQ_MODEL_FAST")

    # استرجاع اسم الموديل من إعدادات البيئة
    model_name = getattr(settings, model_env_name, None)
    if not model_name:
        model_name = settings.GROQ_MODEL_FAST

    if provider_key.startswith("openrouter"):
        provider = "openrouter"
    else:
        provider = "groq"

    if provider == "groq":
        base_url = settings.GROQ_API_BASE
        api_key = settings.GROQ_API_KEY
    else:
        base_url = settings.OPENROUTER_API_BASE
        api_key = settings.OPENROUTER_API_KEY

    if not api_key:
        raise ValueError(f"API key for provider {provider} is not set. # TODO: # ضع المفتاح في env أو في Coolify")

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    if provider == "openrouter":
        headers["HTTP-Referer"] = "https://your-domain.com"  # TODO: # غيّر هذا إلى دومين مشروعك
        headers["X-Title"] = settings.PROJECT_NAME

    payload = {
        "model": model_name,
        "messages": [
            {"role": "system", "content": "You are an AI assistant for an e-commerce automation SaaS."},
            {"role": "user", "content": prompt},
        ],
    }

    endpoint = f"{base_url}/chat/completions"

    async with httpx.AsyncClient(timeout=60) as client:
        resp = await client.post(endpoint, headers=headers, json=payload)
        data = resp.json()
        if resp.status_code >= 400:
            raise RuntimeError(f"LLM error ({resp.status_code}): {data}")

    # استخراج النص
    result_text = data["choices"][0]["message"]["content"]

    # TODO: # يمكن لاحقاً حساب عدد التوكنات والتكلفة بدقة من مزود الخدمة
    input_tokens = data.get("usage", {}).get("prompt_tokens", 0)
    output_tokens = data.get("usage", {}).get("completion_tokens", 0)
    total_cost_usd = _estimate_cost(provider, model_name, input_tokens + output_tokens)

    if db:
        usage = models.AIUsage(
            id=str(uuid.uuid4()),
            user_id=user_id,
            provider=provider,
            model=model_name,
            input_tokens=input_tokens,
            output_tokens=output_tokens,
            total_cost_usd=total_cost_usd,
            task=task,
        )
        db.add(usage)
        db.commit()

    return result_text, provider, model_name

def _estimate_cost(provider: str, model: str, tokens: int) -> float:
    # TODO: # عدّل الأسعار حسب جدول الأسعار الفعلي للمزودين
    if provider == "groq":
        return 0.0  # Groq قد يكون مجاني حتى حد معين
    if provider == "openrouter":
        # مثال تقريبي فقط
        return tokens * 0.000002
    return 0.0
