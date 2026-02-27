from fastapi import FastAPI

app = FastAPI(title="ABGS - Behavior Adaptive Goal System")

@app.get("/")
def root():
    return {"message": "ABGS running"}

@app.get("/health")
def health():
    return {"status": "ok"}

from app.database import Base, engine
from app.models import CheckIn

Base.metadata.create_all(bind=engine)