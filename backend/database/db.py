"""
=========================================================
BHARATTUBE DATABASE CONNECTION & ORM MODELS (SQLAlchemy)
=========================================================
"""

import os
from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, Text, Boolean, BigInteger, DateTime, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship

# ----------------- DATABASE CONNECTION -----------------
# प्रोडक्शन में PostgreSQL URL एनवायरनमेंट वेरिएबल से आएगा, 
# लोकल/डेवलपमेंट के लिए यह अपने आप 'bharattube.db' (SQLite) फ़ाइल बना लेगा।
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./bharattube.db")

# SQLite के लिए चेक थ्रेड सेटिंग ज़रूरी होती है
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# ----------------- DEPENDENCY INJECTION -----------------
def get_db():
    """
    FastAPI एंडपॉइंट्स में डेटाबेस सेशन सुरक्षित रूप से उपलब्ध कराने के लिए
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ----------------- ORM MODELS -----------------

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, index=True, nullable=True)
    phone = Column(String(15), unique=True, index=True, nullable=True)
    password_hash = Column(String(255), nullable=False)
    is_verified = Column(Boolean, default=False)
    role = Column(String(20), default="user")
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    channels = relationship("Channel", back_populates="owner", cascade="all, delete-orphan")


class Channel(Base):
    __tablename__ = "channels"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    channel_name = Column(String(100), nullable=False)
    handle = Column(String(50), unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)
    avatar_url = Column(String(255), nullable=True)
    banner_url = Column(String(255), nullable=True)
    subscriber_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    owner = relationship("User", back_populates="channels")
    videos = relationship("Video", back_populates="channel", cascade="all, delete-orphan")


class Video(Base):
    __tablename__ = "videos"

    id = Column(Integer, primary_key=True, index=True)
    channel_id = Column(Integer, ForeignKey("channels.id", ondelete="CASCADE"))
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    video_url = Column(String(500), nullable=False)
    thumbnail_url = Column(String(500), nullable=True)
    duration = Column(String(20), default="00:00")
    category = Column(String(50), default="all")
    video_type = Column(String(20), default="video")  # 'video' ya 'short'
    views_count = Column(BigInteger, default=0)
    likes_count = Column(BigInteger, default=0)
    is_public = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    channel = relationship("Channel", back_populates="videos")


# डेटाबेस टेबल्स को ऑटो-क्रिएट करने का फ़ंक्शन
def init_db():
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init_db()
    print("BharatTube Database initialized successfully!")
