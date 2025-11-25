from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import json

from ..db import get_db
from ..deps import get_current_admin
from .. import models, schemas

router = APIRouter(prefix="/api/admin", tags=["Admin"])

SETTINGS_KEY_COMPETITIVE_MODE = "competitive_mode"
SETTINGS_KEY_BRANDING = "branding_settings"

@router.get("/settings")
def get_settings(db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    comp = db.query(models.Setting).filter(models.Setting.key == SETTINGS_KEY_COMPETITIVE_MODE).first()
    branding = db.query(models.Setting).filter(models.Setting.key == SETTINGS_KEY_BRANDING).first()
    return {
        "competitive_mode": comp.value if comp else "python",
        "branding": json.loads(branding.value) if branding and branding.value else None,
    }

@router.post("/settings")
def update_settings(payload: schemas.AdminSettingsUpdate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    if payload.competitive_mode:
        comp = db.query(models.Setting).filter(models.Setting.key == SETTINGS_KEY_COMPETITIVE_MODE).first()
        if not comp:
            comp = models.Setting(key=SETTINGS_KEY_COMPETITIVE_MODE, value=payload.competitive_mode)
            db.add(comp)
        else:
            comp.value = payload.competitive_mode

    if payload.branding:
        branding_json = payload.branding.model_dump_json()
        branding_setting = db.query(models.Setting).filter(models.Setting.key == SETTINGS_KEY_BRANDING).first()
        if not branding_setting:
            branding_setting = models.Setting(key=SETTINGS_KEY_BRANDING, value=branding_json)
            db.add(branding_setting)
        else:
            branding_setting.value = branding_json

    db.commit()
    return {"status": "ok"}
