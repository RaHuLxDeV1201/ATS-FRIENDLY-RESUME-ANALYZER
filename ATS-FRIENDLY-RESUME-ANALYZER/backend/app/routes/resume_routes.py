from typing import Optional
from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException, status
from sqlalchemy.orm import Session

from .. import models
from ..api.dependencies import get_db
from ..services.pdf_service import extract_text_from_pdf

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)


@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    user_id: Optional[int] = Form(None),
    db: Session = Depends(get_db)
):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF files are supported."
        )

    # Read uploaded PDF file bytes
    file_content = await file.read()

    # Extract text cleanly using pypdf
    extracted_text = extract_text_from_pdf(file_content)

    if not extracted_text:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not extract text from PDF. The file may be empty, image-only, or corrupted."
        )

    # Check user or assign to guest
    full_name = "Guest User"
    valid_user_id = None
    if user_id:
        user = db.query(models.User).filter(models.User.id == user_id).first()
        if user:
            full_name = user.full_name
            valid_user_id = user.id

    new_resume = models.Resume(
        full_name=full_name,
        file_name=file.filename,
        extracted_text=extracted_text,
        user_id=valid_user_id
    )

    db.add(new_resume)
    db.commit()
    db.refresh(new_resume)

    return {
        "message": "Resume uploaded and parsed successfully",
        "resume_id": new_resume.id,
        "file_name": file.filename,
        "extracted_text_preview": extracted_text[:200] + "..." if len(extracted_text) > 200 else extracted_text
    }


@router.get("/{resume_id}")
def get_resume(
    resume_id: int,
    db: Session = Depends(get_db)
):
    resume = db.query(models.Resume).filter(models.Resume.id == resume_id).first()
    if not resume:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume not found"
        )
    return {
        "id": resume.id,
        "full_name": resume.full_name,
        "file_name": resume.file_name,
        "extracted_text": resume.extracted_text
    }


@router.get("/user/{user_id}")
def get_user_resumes(
    user_id: int,
    db: Session = Depends(get_db)
):
    return db.query(models.Resume).filter(models.Resume.user_id == user_id).all()