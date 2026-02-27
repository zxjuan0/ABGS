from sqlalchemy import Column, Integer, String, DateTime
from app.database import Base
from datetime import datetime

class CheckIn(Base):
    __tablename__ = "checkins"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    goal_name = Column(String, index=True)
    status = Column(String)  # "completed" or "missed"
    timestamp = Column(DateTime, default=datetime.utcnow)