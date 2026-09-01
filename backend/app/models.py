#Blue print of project (Structure of file database)
from sqlalchemy import Column, Integer,String,Float,ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
#1 Base class: this tells sqlalchemy that these classes have to converted into database table
Base = declarative_base()
#2 user table: to save details of user
class USER(Base):
    __tablename__ ="users"

    id=Column(Integer,primary_key=True,index=True)   
    full_name =Column(String,index=True)
    email= Column(String,unique=True,index=True)
    password_hash =Column(String)
    #Since a user can contain multiple resume 
    resume = relationship("Resume", back_populates="owner")
#3 Resume Table: Upload kiye gaye resume ka data save karne ke liye
class Resume(Base):
   __tablename__ = "resumes"
   id = Column(Integer,primary_key=True,index=True)
   full_name =Column(String)
   extracted_text = Column(String)#PDF se nikala gya pura text 
   #Foreign key batata hai ki yeh resume kis user ka hai
   user_id = Column(Integer,ForeignKey("users.id"))
   #relationship
   owner = relationship("User", back_populates="resume")
   ats_report= relationship("ATSReport",back_populates="resume", uselist = False)
#4 ATS Report table: Score aur Ai ka result save
class ATSReport(Base):
    __tablename__="ats_reports"

    id = Column(Integer,primary_key=True,index=True)
    overall_score = Column(Float)#ATS Score
    missing_keyword = Column(String)
    grammar_mistake = Column(Integer, ForeignKey("resumes.id"))
    #relationship
    resume=relationship("Resume",back_populates="ats_report")
        
