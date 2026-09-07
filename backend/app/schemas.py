from pydantic import BaseModel, EmailStr
#Frontend password verify of mail and password
class UserCreate(BaseModel):
    full_name: str
    email:str
    password:str
#fronted se login ke time sirf
class UserLogin(BaseModel):
    email:str
    password:str
  # USER RESPONSE
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