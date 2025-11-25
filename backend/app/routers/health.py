from fastapi import APIRouter

router = APIRouter(prefix="/api/health", tags=["Health"])

@router.get("")
def read_health():
    return {"status": "ok", "service": "rooz-auto-backend"}  # TODO: # سيتغير الاسم لاحقاً من إعدادات البراندنج
