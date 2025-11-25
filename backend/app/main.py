from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .db import Base, engine
from .routers import health, auth, ai, admin, competitors

# إنشاء الجداول تلقائياً في البداية (للتجارب والتطوير)
# TODO: # في الإنتاج يفضل استخدام Alembic للترحيلات بدلاً من create_all
Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: # غيّرها لقائمة دومينات واجهتك في الإنتاج لزيادة الأمان
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(auth.router)
app.include_router(ai.router)
app.include_router(admin.router)
app.include_router(competitors.router)

@app.get("/")
def root():
    return {"message": f"{settings.PROJECT_NAME} backend is running"}
