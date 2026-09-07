from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False, index=True)
    email = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=False)

    resumes = relationship("Resume", back_populates="owner", cascade="all, delete-orphan")


class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False, default="Guest User")
    file_name = Column(String, nullable=True)
    extracted_text = Column(String, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)

    owner = relationship("User", back_populates="resumes")
    ats_report = relationship("ATSReport", back_populates="resume", uselist=False, cascade="all, delete-orphan")


class ATSReport(Base):
    __tablename__ = "ats_reports"

    id = Column(Integer, primary_key=True, index=True)
    overall_score = Column(Float, nullable=False)
    missing_keyword = Column(String, nullable=True)
    grammar_mistake = Column(Integer, nullable=False, default=0)
    report_details = Column(String, nullable=True)  # Stores JSON serialized full analysis
    resume_id = Column(Integer, ForeignKey("resumes.id"), nullable=False, unique=True)

    resume = relationship("Resume", back_populates="ats_report")