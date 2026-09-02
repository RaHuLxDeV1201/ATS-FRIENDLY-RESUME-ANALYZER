from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models
from ..database import SessionLocal


router = APIRouter(
    prefix="/ats",
    tags=["ATS Analysis"]
)


# Database connection
def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# =========================
# ANALYZE RESUME
# =========================

@router.post("/analyze/{resume_id}")
def analyze_resume(
    resume_id: int,
    db: Session = Depends(get_db)
):

    # Find resume
    resume = (
        db.query(models.Resume)
        .filter(models.Resume.id == resume_id)
        .first()
    )

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    # Temporary ATS logic
    text = resume.extracted_text or ""

    word_count = len(text.split())

    if word_count >= 500:
        score = 85
    elif word_count >= 300:
        score = 70
    else:
        score = 50

    # Create ATS report
    report = models.ATSReport(
        resume_id=resume.id,
        overall_score=score,
        missing_keyword="Python, SQL, FastAPI",
        grammar_mistake=0
    )

    db.add(report)
    db.commit()
    db.refresh(report)

    return {
        "message": "Resume analyzed successfully",
        "resume_id": resume.id,
        "ats_score": score,
        "missing_keywords": "Python, SQL, FastAPI",
        "grammar_mistakes": 0
    }


# =========================
# GET ATS REPORT
# =========================

@router.get("/report/{resume_id}")
def get_ats_report(
    resume_id: int,
    db: Session = Depends(get_db)
):

    report = (
        db.query(models.ATSReport)
        .filter(models.ATSReport.resume_id == resume_id)
        .first()
    )

    if not report:
        raise HTTPException(
            status_code=404,
            detail="ATS report not found"
        )

    return {
        "resume_id": report.resume_id,
        "overall_score": report.overall_score,
        "missing_keywords": report.missing_keyword,
        "grammar_mistakes": report.grammar_mistake
    }