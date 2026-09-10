import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# On Vercel, serverless runtime filesystem is read-only except /tmp
if os.environ.get("VERCEL"):
    db_path = "/tmp/app_database.db"
    SQLALCHEMY_DATABASE_URL = f"sqlite:///{db_path}"
else:
    from pathlib import Path
    ROOT_DIR = Path(__file__).resolve().parent.parent.parent
    db_path = ROOT_DIR / "app_database.db"
    SQLALCHEMY_DATABASE_URL = f"sqlite:///{db_path.as_posix()}"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)