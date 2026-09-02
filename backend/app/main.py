from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import models
from .database import engine

# Routes import
from .routes import auth_routes
from .routes import resume_routes
from .routes import ats_routes


# =========================================================
# DATABASE TABLE CREATION
# =========================================================

# SQLAlchemy database mein tables create karega
# agar tables already exist karti hain to dobara nahi banayega.
models.Base.metadata.create_all(bind=engine)


# =========================================================
# FASTAPI APPLICATION
# =========================================================

app = FastAPI(
    title="ATS Friendly Resume Analyzer API",
    description="Backend API for ATS Friendly Resume Analyzer",
    version="1.0.0"
)


# =========================================================
# CORS
# =========================================================

# React frontend ko FastAPI backend se connect karne ki permission
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# TEST ROUTE
# =========================================================

@app.get("/")
def home():
    return {
        "message": "ATS Friendly Resume Analyzer API is running!"
    }


# =========================================================
# ROUTES
# =========================================================

# Authentication:
# /signup
# /login
app.include_router(
    auth_routes.router,
    prefix="/auth",
    tags=["Authentication"]
)


# Resume:
# Resume upload / resume related APIs
app.include_router(
    resume_routes.router,
    prefix="/resume",
    tags=["Resume"]
)


# ATS:
# ATS score / report related APIs
app.include_router(
    ats_routes.router,
    prefix="/ats",
    tags=["ATS Analysis"]
)