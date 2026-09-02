from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import models
from .database import engine

from .routes.auth_routes import router as auth_router
from .routes.resume_routes import router as resume_router
from .routes.ats_routes import router as ats_router


# Create database tables
models.Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="ATS Friendly Resume Analyzer",
    description="Backend API for ATS Friendly Resume Analyzer",
    version="1.0.0"
)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Home
@app.get("/")
def home():
    return {
        "message": "ATS Friendly Resume Analyzer API is running!"
    }


# Authentication
app.include_router(
    auth_router,
    tags=["Authentication"]
)


# Resume
app.include_router(
    resume_router,
    tags=["Resume"]
)


# ATS
app.include_router(
    ats_router,
    tags=["ATS Analysis"]
)