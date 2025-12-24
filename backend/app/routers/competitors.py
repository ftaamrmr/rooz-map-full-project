from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid
import httpx
import json

from ..db import get_db
from ..deps import get_current_user, get_language
from ..config import settings
from .. import models
from ..i18n import t

router = APIRouter(prefix="/api/competitors", tags=["Competitors"])

@router.post("/analyze")
async def analyze_competitor(url: str, mode: str | None = None, db: Session = Depends(get_db), current_user=Depends(get_current_user), lang: str = Depends(get_language)):
    # TODO: # يختار المدير افتراضياً Python أو AI من لوحة المدير، ويمكن للمستخدم override إذا أردنا لاحقاً
    comp_mode_setting = db.query(models.Setting).filter(models.Setting.key == "competitive_mode").first()
    final_mode = mode or (comp_mode_setting.value if comp_mode_setting else "python")

    job_id = str(uuid.uuid4())
    job = models.CompetitorJob(
        id=job_id,
        user_id=current_user.id,
        url=url,
        mode=final_mode,
        status="pending",
    )
    db.add(job)
    db.commit()

    if not settings.SCRAPER_SERVICE_URL:
        raise HTTPException(
            status_code=500, 
            detail=t("errors.scraper_not_configured", lang)
        )

    # إرسال طلب غير متزامن إلى خدمة السكرابر
    async with httpx.AsyncClient(timeout=60) as client:
        try:
            await client.post(
                f"{settings.SCRAPER_SERVICE_URL.rstrip('/')}/scrape",
                json={"job_id": job_id, "url": url, "mode": final_mode},
            )
        except Exception:
            # لا نوقف المستخدم، فقط نخزن أن المهمة في الانتظار
            pass

    return {"job_id": job_id, "mode": final_mode}

@router.get("/job/{job_id}")
def get_job(job_id: str, db: Session = Depends(get_db), current_user=Depends(get_current_user), lang: str = Depends(get_language)):
    job = db.query(models.CompetitorJob).filter(models.CompetitorJob.id == job_id).first()
    if not job:
        raise HTTPException(
            status_code=404, 
            detail=t("errors.job_not_found", lang)
        )
    if job.user_id and job.user_id != current_user.id:
        raise HTTPException(
            status_code=403, 
            detail=t("errors.not_your_job", lang)
        )
    result: str | None = None
    try:
        result = json.loads(job.result) if job.result else None
    except Exception:
        result = job.result
    return {
        "id": job.id,
        "url": job.url,
        "mode": job.mode,
        "status": job.status,
        "result": result,
        "created_at": job.created_at,
        "updated_at": job.updated_at,
    }
