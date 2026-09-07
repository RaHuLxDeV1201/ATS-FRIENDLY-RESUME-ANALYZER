import json
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from sqlalchemy.orm import Session

from .. import models
from ..api.dependencies import get_db
from ..services.ats_service import calculate_ats_score
from ..services.pdf_service import extract_text_from_pdf

router = APIRouter(
    prefix="/ats",
    tags=["ATS Analysis"]
)


@router.post("/analyze/{resume_id}")
def analyze_resume(
    resume_id: int,
    job_description: Optional[str] = Form(None),
    db: Session = Depends(get_db)
):
    resume = db.query(models.Resume).filter(models.Resume.id == resume_id).first()

    if not resume:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume not found"
        )

    # Perform ATS & Grammar analysis
    analysis_result = calculate_ats_score(
        resume_text=resume.extracted_text or "",
        job_description=job_description or ""
    )

    missing_keywords_str = ", ".join(analysis_result["skills_analysis"]["missing_skills"])
    grammar_mistakes_count = analysis_result["grammar_result"]["total_mistakes"]
    report_json_str = json.dumps(analysis_result)

    # Check if report already exists for this resume
    existing_report = db.query(models.ATSReport).filter(models.ATSReport.resume_id == resume.id).first()

    if existing_report:
        existing_report.overall_score = float(analysis_result["overall_score"])
        existing_report.missing_keyword = missing_keywords_str
        existing_report.grammar_mistake = grammar_mistakes_count
        existing_report.report_details = report_json_str
        report = existing_report
    else:
        report = models.ATSReport(
            resume_id=resume.id,
            overall_score=float(analysis_result["overall_score"]),
            missing_keyword=missing_keywords_str,
            grammar_mistake=grammar_mistakes_count,
            report_details=report_json_str
        )
        db.add(report)

    db.commit()
    db.refresh(report)

    analysis_result["report_id"] = report.id
    analysis_result["resume_id"] = resume.id
    analysis_result["file_name"] = resume.file_name or "Resume.pdf"
    return analysis_result


@router.post("/analyze-file")
async def analyze_resume_file(
    file: UploadFile = File(...),
    job_description: Optional[str] = Form(""),
    user_id: Optional[int] = Form(None),
    db: Session = Depends(get_db)
):
    """
    Direct endpoint: Upload PDF + analyze in a single request.
    """
    if not file.filename.endswith(".pdf"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF documents are supported."
        )

    file_bytes = await file.read()
    extracted_text = extract_text_from_pdf(file_bytes)

    if not extracted_text:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not extract readable text from PDF. Ensure the PDF contains selectable text."
        )

    # Store Resume
    full_name = "Guest User"
    valid_user_id = None
    if user_id:
        user = db.query(models.User).filter(models.User.id == user_id).first()
        if user:
            full_name = user.full_name
            valid_user_id = user.id

    resume = models.Resume(
        full_name=full_name,
        file_name=file.filename,
        extracted_text=extracted_text,
        user_id=valid_user_id
    )
    db.add(resume)
    db.commit()
    db.refresh(resume)

    # Perform Analysis
    analysis_result = calculate_ats_score(
        resume_text=extracted_text,
        job_description=job_description or ""
    )

    missing_keywords_str = ", ".join(analysis_result["skills_analysis"]["missing_skills"])
    grammar_mistakes_count = analysis_result["grammar_result"]["total_mistakes"]
    report_json_str = json.dumps(analysis_result)

    report = models.ATSReport(
        resume_id=resume.id,
        overall_score=float(analysis_result["overall_score"]),
        missing_keyword=missing_keywords_str,
        grammar_mistake=grammar_mistakes_count,
        report_details=report_json_str
    )
    db.add(report)
    db.commit()
    db.refresh(report)

    analysis_result["report_id"] = report.id
    analysis_result["resume_id"] = resume.id
    analysis_result["file_name"] = file.filename
    return analysis_result


@router.get("/report/{resume_id}")
def get_ats_report(
    resume_id: int,
    db: Session = Depends(get_db)
):
    report = db.query(models.ATSReport).filter(models.ATSReport.resume_id == resume_id).first()

    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="ATS report not found for this resume"
        )

    result = {}
    if report.report_details:
        try:
            result = json.loads(report.report_details)
        except Exception:
            pass

    result["report_id"] = report.id
    result["resume_id"] = report.resume_id
    result["overall_score"] = report.overall_score
    result["missing_keywords"] = report.missing_keyword
    result["grammar_mistakes"] = report.grammar_mistake

    return result