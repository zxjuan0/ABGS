# app/main.py  
from fastapi import FastAPI
from app.database import Base, engine
from app import models
from app.routes import checkins, goals
from app.routes import predict
from fastapi.middleware.cors import CORSMiddleware


Base.metadata.create_all(bind=engine)   # Creates tables on startup

app = FastAPI(
    title="ABGS - Behavior Adaptive Goal System",
    description="AI-powered habit and goal tracking API",
    version="1.0.0"
)

app.include_router(checkins.router)
app.include_router(goals.router)
app.include_router(predict.router)

app.add_middleware(
CORSMiddleware,
allow_origins=['http://localhost:5173', 'https://your-app.vercel.app'],
allow_methods=['*'],
allow_headers=['*'],
)

@app.get("/")
def root(): return {"message": "ABGS running"}

@app.get("/health")
def health(): return {"status": "ok"}
