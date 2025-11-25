from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..db import get_db
from ..deps import get_current_user
from .. import schemas
from ..ai_router import call_llm

router = APIRouter(prefix="/api/ai", tags=["AI"])

@router.post("/generate", response_model=schemas.AIGenerateResponse)
async def generate_text(payload: schemas.AIGenerateRequest, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    # TODO: # task يحدد نوع المهمة، وسيتم توجيهها للنموذج المناسب تلقائياً
    text, provider, model = await call_llm(task=payload.task, prompt=payload.prompt, db=db, user_id=current_user.id)
    return schemas.AIGenerateResponse(result=text, provider=provider, model=model)
