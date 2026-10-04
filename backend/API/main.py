"""
=========================================================
BHARATTUBE CORE BACKEND API (FastAPI)
=========================================================
"""

from fastapi import FastAPI, HTTPException, status, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

app = FastAPI(
    title="BharatTube API",
    description="Backend API for BharatTube - India's Video Sharing Platform",
    version="1.0.0"
)

# CORS setup (ताकि GitHub Pages frontend इस API से बात कर सके)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- SCHEMAS -----------------

class VideoItem(BaseModel):
    id: int
    title: str
    channel_name: str
    channel_avatar: str
    views: str
    duration: str
    category: str
    video_type: str  # 'video' or 'short'
    created_at: str

class VideoUploadResponse(BaseModel):
    message: str
    video_id: int
    title: str
    status: str

# ----------------- IN-MEMORY SEED DATA -----------------

MOCK_VIDEOS: List[VideoItem] = [
    VideoItem(
        id=1,
        title="Chhattisgarhi Panthi Song",
        channel_name="A One Music",
        channel_avatar="A",
        views="125K views • 2 days ago",
        duration="04:32",
        category="music",
        video_type="video",
        created_at=datetime.now().strftime("%Y-%m-%d %H:%M")
    ),
    VideoItem(
        id=2,
        title="Learn Computer Basics",
        channel_name="Education India",
        channel_avatar="E",
        views="84K views • 5 days ago",
        duration="12:48",
        category="education",
        video_type="video",
        created_at=datetime.now().strftime("%Y-%m-%d %H:%M")
    ),
    VideoItem(
        id=3,
        title="India Today News",
        channel_name="Bharat News",
        channel_avatar="N",
        views="342K views • 1 day ago",
        duration="08:15",
        category="news",
        video_type="video",
        created_at=datetime.now().strftime("%Y-%m-%d %H:%M")
    ),
    VideoItem(
        id=4,
        title="Amazing India 🇮🇳",
        channel_name="Bhartiya Vlog",
        channel_avatar="B",
        views="2.4M views",
        duration="00:45",
        category="shorts",
        video_type="short",
        created_at=datetime.now().strftime("%Y-%m-%d %H:%M")
    ),
    VideoItem(
        id=5,
        title="Chhattisgarhi Culture",
        channel_name="Chhattisgarh Tales",
        channel_avatar="C",
        views="856K views",
        duration="00:30",
        category="shorts",
        video_type="short",
        created_at=datetime.now().strftime("%Y-%m-%d %H:%M")
    )
]

# ----------------- API ROUTES -----------------

@app.get("/")
def home():
    return {
        "platform": "BharatTube",
        "status": "Online",
        "message": "Welcome to BharatTube Backend API"
    }

@app.get("/api/videos", response_model=List[VideoItem])
def get_videos(category: Optional[str] = None, search: Optional[str] = None):
    """
    सभी वीडियो या कैटेगरी/सर्च के आधार पर वीडियो लिस्ट देना
    """
    results = [v for v in MOCK_VIDEOS if v.video_type == "video"]

    if category and category.lower() != "all":
        results = [v for v in results if v.category.lower() == category.lower()]

    if search:
        search_lower = search.lower()
        results = [
            v for v in results 
            if search_lower in v.title.lower() or search_lower in v.channel_name.lower()
        ]

    return results

@app.get("/api/shorts", response_model=List[VideoItem])
def get_shorts():
    """
    केवल भारत शॉर्ट्स वीडियो की लिस्ट देना
    """
    return [v for v in MOCK_VIDEOS if v.video_type == "short"]

@app.get("/api/videos/{video_id}", response_model=VideoItem)
def get_video_by_id(video_id: int):
    """
    विशिष्ट वीडियो का डेटा देना (Watch Page के लिए)
    """
    for v in MOCK_VIDEOS:
        if v.id == video_id:
            return v
    raise HTTPException(status_code=404, detail="वीडियो नहीं मिला")

@app.post("/api/upload", response_model=VideoUploadResponse)
async def upload_video(
    title: str = Form(...),
    description: Optional[str] = Form(""),
    category: str = Form("all"),
    file: UploadFile = File(...)
):
    """
    वीडियो अपलोड करने का एंडपॉइंट
    """
    new_id = len(MOCK_VIDEOS) + 1
    new_video = VideoItem(
        id=new_id,
        title=title,
        channel_name="Charandas Bhaskar",
        channel_avatar="C",
        views="1 view • Just now",
        duration="01:00",
        category=category,
        video_type="video",
        created_at=datetime.now().strftime("%Y-%m-%d %H:%M")
    )
    MOCK_VIDEOS.insert(0, new_video)

    return VideoUploadResponse(
        message="वीडियो सफलतापूर्वक अपलोड हुआ",
        video_id=new_id,
        title=title,
        status="success"
    )
