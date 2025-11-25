from sqlalchemy import Column, String, DateTime, Enum, ForeignKey, Boolean, Integer, Text, Numeric
from sqlalchemy.orm import relationship
from datetime import datetime
import enum

from .db import Base

class Role(str, enum.Enum):
    USER = "USER"
    ADMIN = "ADMIN"

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(Role), default=Role.USER, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    ai_usage = relationship("AIUsage", back_populates="user")

class AIUsage(Base):
    __tablename__ = "ai_usage"
    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    provider = Column(String, nullable=False)
    model = Column(String, nullable=False)
    input_tokens = Column(Integer, nullable=False, default=0)
    output_tokens = Column(Integer, nullable=False, default=0)
    total_cost_usd = Column(Numeric(10, 6), nullable=False, default=0)
    task = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="ai_usage")

class Setting(Base):
    __tablename__ = "settings"
    key = Column(String, primary_key=True, index=True)
    value = Column(Text, nullable=True)

class CompetitorJob(Base):
    __tablename__ = "competitor_jobs"
    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    url = Column(Text, nullable=False)
    mode = Column(String, default="python")  # python / ai
    status = Column(String, default="pending")  # pending / running / done / failed
    result = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
