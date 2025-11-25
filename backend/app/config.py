from pydantic_settings import BaseSettings
from pydantic import AnyHttpUrl
from typing import List, Optional
import json

class Settings(BaseSettings):
    # ===== معلومات عامة عن المشروع =====
    PROJECT_NAME: str = "Rooz Auto"  # TODO: يمكنك تغيير الاسم الافتراضي من لوحة المدير لاحقاً
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []

    # ===== قاعدة البيانات =====
    DATABASE_URL: str  # TODO: # ضع هنا URL قاعدة بيانات PostgreSQL من Coolify

    # ===== Redis =====
    REDIS_URL: str  # TODO: # ضع هنا URL خدمة Redis من Coolify

    # ===== مفاتيح JWT =====
    JWT_SECRET: str  # TODO: # غيّرها إلى قيمة سرية قوية جداً
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # يوم كامل

    # ===== مزوّد Groq =====
    GROQ_API_KEY: Optional[str] = None  # TODO: # ضع مفتاح Groq هنا
    GROQ_API_BASE: str = "https://api.groq.com/openai/v1"
    GROQ_MODEL_FAST: str = "mixtral-8x7b-32768"
    GROQ_MODEL_CHAT: str = "llama-3.1-70b-versatile"

    # ===== مزوّد OpenRouter =====
    OPENROUTER_API_KEY: Optional[str] = None  # TODO: # ضع مفتاح OpenRouter هنا
    OPENROUTER_API_BASE: str = "https://openrouter.ai/api/v1"
    OR_MODEL_PREMIUM: str = "openai/gpt-4.1-mini"
    OR_MODEL_ULTRA: str = "anthropic/claude-3.5-sonnet"

    # ===== سياسة الراوتر بين النماذج =====
    MODEL_ROUTER_POLICY: str = (
        '{'
        '"product_description":{"provider":"groq","model_env":"GROQ_MODEL_FAST"},'
        '"reviews_analysis":{"provider":"groq","model_env":"GROQ_MODEL_FAST"},'
        '"seo_basic":{"provider":"groq","model_env":"GROQ_MODEL_FAST"},'
        '"chatbot":{"provider":"groq","model_env":"GROQ_MODEL_CHAT"},'
        '"ads_copy":{"provider":"openrouter_ultra","model_env":"OR_MODEL_ULTRA"},'
        '"seo_advanced":{"provider":"openrouter_premium","model_env":"OR_MODEL_PREMIUM"},'
        '"strategic_analysis":{"provider":"openrouter_ultra","model_env":"OR_MODEL_ULTRA"},'
        '"fallback":{"provider":"groq","model_env":"GROQ_MODEL_FAST"}'
        '}'
    )
    # ===== خدمة السكرابر =====
    SCRAPER_SERVICE_URL: str | None = None  # TODO: # ضع رابط خدمة السكرابر من Coolify (مثال: https://scraper.example.com)

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

    def router_policy(self) -> dict:
        try:
            return json.loads(self.MODEL_ROUTER_POLICY)
        except Exception:
            return {}

settings = Settings()
