from fastapi import FastAPI,Depends
from sqlalchemy.orm import Session
from . import models, schemas
from .database import engine,SessionLocal
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends, HTTPException,status


# Yeh magic line hai! Yeh check karti hai ki kya tables bani hain? 
# Agar nahi, toh yeh SQL command chala kar saari tables create kar degi.
models.Base.metadata.create_all(bind=engine)

# FastAPI ka server start karna
app = FastAPI(title="Resume Analyzer API")
# New function: Database se temporary connection (session) lene ke liye
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Ek chota sa test route (Darwaza)
@app.get("/")
def home():
    return {"message": "Hello! Server is Running perfectly"} 
# Sign up
@app.post("/signup")
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    #fronted se aaya data ko database wale model mein dalna
    new_user = models.User(
        full_name = user.full_name,
        email=user.email,
        password_hash=user.password
    )
    #to save in database
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return{"message":"Account Successfully ban gaya!","user_email":new_user.email}
#fronted react ko backend se baat krne ki permission dena
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/login")
def login(user_credentials: schemas.UserLogin,db:Session=Depends(get_db)):
 user = db.query(models.User).filter(models.User.email ==  user_credentials.email).first()
    
    # Agar user nahi mila
 if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Invalid Credentials (Email galat hai)"
        )
    
    # 2. Agar user mil gaya, toh check karo ki Password match kar raha hai ya nahi
 if user.password_hash != user_credentials.password:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Invalid Credentials (Password galat hai)"
        )
    
    # 3. Agar Email aur Password dono sahi hain
    # (Professional apps mein yahan ek JWT Token banakar wapas bheja jata hai)
 return {
        "message": "Login successful!", 
        "user_name": user.full_name,
        "user_email": user.email
    }