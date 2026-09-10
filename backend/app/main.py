from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import models
from .database import engine

from .routes.auth_routes import router as auth_router
from .routes.resume_routes import router as resume_router
from .routes.ats_routes import router as ats_router


from fastapi import Request
from fastapi.responses import JSONResponse
from sqlalchemy import inspect, text

# Create database tables
models.Base.metadata.create_all(bind=engine)

# Auto-migrate missing columns for SQLite if upgrading from older schema
def auto_migrate():
    with engine.connect() as conn:
        inspector = inspect(engine)
        if "resumes" in inspector.get_table_names():
            columns = [c["name"] for c in inspector.get_columns("resumes")]
            if "file_name" not in columns:
                conn.execute(text("ALTER TABLE resumes ADD COLUMN file_name VARCHAR"))
                conn.commit()
        if "ats_reports" in inspector.get_table_names():
            columns = [c["name"] for c in inspector.get_columns("ats_reports")]
            if "report_details" not in columns:
                conn.execute(text("ALTER TABLE ats_reports ADD COLUMN report_details VARCHAR"))
                conn.commit()

try:
    auto_migrate()
except Exception as e:
    print(f"Auto-migration info: {e}")


app = FastAPI(
    title="ATS-Friendly Resume Analyzer API",
    description="Backend API for ATS Friendly Resume Analyzer",
    version="1.0.0"
)


# Add CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:4173",
        "http://127.0.0.1:4173",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
    ],
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


from fastapi import HTTPException


@app.exception_handler(HTTPException)
async def custom_http_exception_handler(request: Request, exc: HTTPException):
    origin = request.headers.get("origin") or "http://localhost:5173"
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
        headers={
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
        }
    )


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    import traceback
    traceback.print_exc()
    origin = request.headers.get("origin") or "http://localhost:5173"
    return JSONResponse(
        status_code=500,
        content={"detail": f"Internal server error: {str(exc)}"},
        headers={
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
        }
    )


# Home
@app.get("/")
def read_root():
    return {
        "message": "ATS Friendly Resume Analyzer API is running!"
    }


# Authentication routes
app.include_router(
    auth_router,
    tags=["Authentication"]
)


# Resume routes
app.include_router(
    resume_router,
    tags=["Resume"]
)


# ATS analysis routes
app.include_router(
    ats_router,
    tags=["ATS Analysis"]
)