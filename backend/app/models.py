from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship, declarative_base


# ==========================================
# BASE CLASS
# ==========================================

Base = declarative_base()


# ==========================================
# USER TABLE
# ==========================================

class User(Base):
    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    full_name = Column(
        String,
        nullable=False,
        index=True
    )

    email = Column(
        String,
        unique=True,
        nullable=False,
        index=True
    )

    password_hash = Column(
        String,
        nullable=False
    )

    # One User -> Many Resumes
    resumes = relationship(
        "Resume",
        back_populates="owner",
        cascade="all, delete-orphan"
    )


# ==========================================
# RESUME TABLE
# ==========================================

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    full_name = Column(
        String,
        nullable=False
    )

    extracted_text = Column(
        String,
        nullable=True
    )

    # Resume kis user ka hai
    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    # Relationship with User
    owner = relationship(
        "User",
        back_populates="resumes"
    )

    # One Resume -> One ATS Report
    ats_report = relationship(
        "ATSReport",
        back_populates="resume",
        uselist=False,
        cascade="all, delete-orphan"
    )


# ==========================================
# ATS REPORT TABLE
# ==========================================

class ATSReport(Base):
    __tablename__ = "ats_reports"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    # ATS Score
    overall_score = Column(
        Float,
        nullable=False
    )

    # Missing keywords
    missing_keyword = Column(
        String,
        nullable=True
    )

    # Number of grammar mistakes
    grammar_mistake = Column(
        Integer,
        nullable=False,
        default=0
    )

    # Yeh report kis resume ki hai?
    resume_id = Column(
        Integer,
        ForeignKey("resumes.id"),
        nullable=False,
        unique=True
    )

    # Relationship with Resume
    resume = relationship(
        "Resume",
        back_populates="ats_report"
    )