from datetime import datetime, timedelta
from typing import Optional
from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status, Header
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
import uuid

from .config import settings
from .db import get_db
from . import models

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def create_access_token(subject: str, expires_delta: Optional[timedelta] = None) -> str:
    if expires_delta is None:
        expires_delta = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {"sub": subject, "exp": datetime.utcnow() + expires_delta}
    return jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)

def get_language(x_lang: Optional[str] = Header(None, alias="X-Lang")) -> str:
    """
    Get language from X-Lang header.
    Defaults to 'en' if not provided or invalid.
    Supported languages: en, ar
    """
    if x_lang and x_lang.lower() in ["en", "ar"]:
        return x_lang.lower()
    return "en"

def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)) -> models.User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise credentials_exception
    return user

def get_current_admin(user: models.User = Depends(get_current_user)) -> models.User:
    from .models import Role
    if user.role != Role.ADMIN:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return user

def create_user(db: Session, email: str, hashed_password: str, is_admin: bool = False) -> models.User:
    from .models import User, Role
    user = User(
        id=str(uuid.uuid4()),
        email=email,
        hashed_password=hashed_password,
        role=Role.ADMIN if is_admin else Role.USER,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
