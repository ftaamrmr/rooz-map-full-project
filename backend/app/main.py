from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .db import Base, engine
from .routers import health, auth, ai, admin, competitors

# إنشاء الجداول تلقائياً في البداية (للتجارب والتطوير)
# في الإنتاج يفضّل استخدام Alembic للترحيلات بدلاً من create_all
Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.PROJECT_NAME)

# CORS من ENV: مثال BACKEND_CORS_ORIGINS=https://app.example.com,https://admin.example.com
cors_origins_raw = getattr(settings, "BACKEND_CORS_ORIGINS", "")
if isinstance(cors_origins_raw, str) and cors_origins_raw.strip():
    allow_origins = [o.strip() for o in cors_origins_raw.split(",") if o.strip()]
else:
    # افتراضي محلي للتطوير
    allow_origins = ["http://localhost:5173", "http://127.0.0.1:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
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
