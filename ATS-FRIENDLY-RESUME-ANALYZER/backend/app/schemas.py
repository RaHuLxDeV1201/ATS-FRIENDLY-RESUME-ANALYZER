from pydantic import BaseModel, EmailStr

# ==========================================
# USER REQUESTS (Frontend -> Backend)
# ==========================================

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# ==========================================
# USER RESPONSE (Backend -> Frontend)
# ==========================================

class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr

    class Config:
        from_attributes = True

# ==========================================
# ATS REPORT RESPONSE
# ==========================================

class ATSReportResponse(BaseModel):
    id: int
    overall_score: float
    missing_keyword: str
    grammar_mistake: int
    resume_id: int

    class Config:
        from_attributes = True