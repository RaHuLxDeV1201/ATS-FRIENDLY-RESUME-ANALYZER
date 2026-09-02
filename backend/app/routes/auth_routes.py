from fastapi import APIRouter, Depends,HTTPException,status
from sqlalchemy.orm import Session 

from .. import models,schemas 
from .. database import SessionLocal

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

# Database connection
def get_db():
    db= SessionLocal()

    try:
        yield db
    finally:
        db.close()    
#=======================
#SIGNUP
@router.post("/signup")
def signup(
    user: schemas.UserCreate,
    db: Session = Depends(get_db)
):
  #Check whether email already exits
   existing_user = (
       db.query(models.User)
       .filter(models.User.email == user.email)
       .first()
   )

   if existing_user: 
    raise HTTPException(
        status_code = status.HTTP_400_BAD_REQUEST,
        detail = "Email already registered"
    )
    #Create new user

   new_user = models.User(
    full_name= user.full_name,
    email=user.email,
    password_hash=user.password
   )
   db.add(new_user)
   db.commit()
   db.refresh(new_user)
   db.refresh(new_user)

   return {
    "message":"Account created successfully",
    "user_id": new_user.id,
    "user_name": new_user.full_name,
    "user_email": new_user.email
   }

  #======================
  # Login
  #======================
@router.post("/login")
def login(
    user_credentials: schemas.UserLogin,
    db:Session = Depends(get_db)
): 

    user = (
         db.query(models.User)
         .filter(
            models.User.email == user_credentials.email
        )
        .first()
    )

    if not user:
       raise HTTPException(
          status_code=status.HTTP_404_NOT_FOUND,
          detail="email not found"
       )
    # Temporary simple password checking
    if user.password_hash != user_credentials.password:
       raise HTTPException(
          status_code=status.HTTP_401_UNAUTHORIZED,
          detail="Incoorect password"
       )
    return{
       "message":"Login successful",
       "user_id": user.id,
       "user_name": user.full_name,
       "user_email": user.email
    }    