#User resume uploaded→ Backend receive → save in Resume database

from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session

from .. import models
from ..database import SessionLocal


router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)


# Database connection
def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# =========================
# UPLOAD RESUME
# =========================

@router.post("/upload")
async def upload_resume(
    user_id: int = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    # Check user
    user = (
        db.query(models.User)
        .filter(models.User.id == user_id)
        .first()
    )

    if not user:
        return {
            "error": "User not found"
        }

    # Read uploaded file
    file_content = await file.read()

    # Temporary text
    # Later PDF/DOCX text extraction service will be added
    extracted_text = file_content.decode(
        "utf-8",
        errors="ignore"
    )

    # Create Resume object
    new_resume = models.Resume(
        full_name=user.full_name,
        extracted_text=extracted_text,
        user_id=user.id
    )

    db.add(new_resume)
    db.commit()
    db.refresh(new_resume)

    return {
        "message": "Resume uploaded successfully",
        "resume_id": new_resume.id,
        "file_name": file.filename
    }


# =========================
# GET USER RESUMES
# =========================

@router.get("/user/{user_id}")
def get_user_resumes(
    user_id: int,
    db: Session = Depends(get_db)
):

    resumes = (
        db.query(models.Resume)
        .filter(models.Resume.user_id == user_id)
        .all()
    )

    return resumes
