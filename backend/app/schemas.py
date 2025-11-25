from pydantic import BaseModel, EmailStr
from typing import Optional

# ===== AUTH =====
class UserCreate(BaseModel):
    email: EmailStr
    password: str  # TODO: # يمكنك إضافة تحقق لطول/تعقيد كلمة المرور لاحقاً

class UserOut(BaseModel):
    id: str
    email: EmailStr
    role: str

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

# ===== AI =====
class AIGenerateRequest(BaseModel):
    task: str  # product_description / seo_basic / ads_copy / ...
    prompt: str

class AIGenerateResponse(BaseModel):
    result: str
    provider: str
    model: str

# ===== BRANDING / SETTINGS =====
class BrandingSettings(BaseModel):
    project_name: str
    logo_url: Optional[str] = None
    logo_size: int = 128
    primary_color: str = "#0ea5e9"
    secondary_color: str = "#1e293b"
    theme_mode: str = "dark"  # dark / light / gradient
    favicon_url: Optional[str] = None
    hero_image_url: Optional[str] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None

class AdminSettingsUpdate(BaseModel):
    competitive_mode: Optional[str] = None  # python / ai
    branding: Optional[BrandingSettings] = None
