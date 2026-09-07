import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# On Vercel, serverless runtime filesystem is read-only except /tmp
if os.environ.get("VERCEL"):
    db_path = "/tmp/app_database.db"
    SQLALCHEMY_DATABASE_URL = f"sqlite:///{db_path}"
else:
    SQLALCHEMY_DATABASE_URL = "sqlite:///./app_database.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)