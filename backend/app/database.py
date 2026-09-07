#python code and database ko connect krta hai
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
#1 database url
SQLALCHEMY_DATABASE_URL = "sqlite:///./app_database.db"
#2 Engine Banana
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,connect_args={"check_same_thread":False}
)
#3 Session Banana
SessionLocal = sessionmaker(autocommit=False,autoflush=False,bind=engine)
 