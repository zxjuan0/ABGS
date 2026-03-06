# app/models.py
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = "users"
    id        = Column(Integer, primary_key=True, index=True)
    username  = Column(String, unique=True, index=True)
    email     = Column(String, unique=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    goals     = relationship("Goal", back_populates="owner")
class Goal(Base):