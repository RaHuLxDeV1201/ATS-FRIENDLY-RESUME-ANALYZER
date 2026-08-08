from pydantic import BaseModel
#Frontend password verify of mail and password
class UserCreate(BaseModel):
    full_name: str
    email:str
    password:str
#fronted se login ke time sirf
class UserLogin(BaseModel):
    email:str
    password:str