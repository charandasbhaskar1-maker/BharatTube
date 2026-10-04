"""
=========================================================
BHARATTUBE AUTHENTICATION SYSTEM
=========================================================
"""

import hashlib
import secrets
from datetime import datetime, timedelta
from typing import Optional, Dict
from pydantic import BaseModel, EmailStr

# ----------------- SCHEMAS -----------------

class UserRegisterRequest(BaseModel):
    full_name: str
    contact: str  # Mobile number ya Email
    password: str

class UserLoginRequest(BaseModel):
    contact: str
    password: str

class AuthResponse(BaseModel):
    status: str
    message: str
    user_id: Optional[int] = None
    full_name: Optional[str] = None
    token: Optional[str] = None

# ----------------- SECURITY HELPERS -----------------

def hash_password(password: str) -> str:
    """
    पासवर्ड को सुरक्षित SHA-256 हैश में बदलना
    """
    salt = "BharatTubeSecureSalt2026"
    salted_pwd = password + salt
    return hashlib.sha256(salted_pwd.encode('utf-8')).hexdigest()

def generate_session_token() -> str:
    """
    सुरक्षित रैंडम सेशन टोकन बनाना
    """
    return secrets.token_hex(32)

# ----------------- IN-MEMORY USER STORE (MOCK) -----------------

USERS_DB: Dict[str, dict] = {
    "user@bharattube.in": {
        "id": 1,
        "full_name": "Bharat User",
        "contact": "user@bharattube.in",
        "password_hash": hash_password("Bharat@123"),
        "created_at": datetime.now().isoformat()
    }
}

ACTIVE_TOKENS: Dict[str, dict] = {}

# ----------------- AUTH FUNCTIONS -----------------

def register_user(data: UserRegisterRequest) -> AuthResponse:
    """
    नया यूज़र रजिस्टर करना
    """
    clean_contact = data.contact.strip().lower()

    if clean_contact in USERS_DB:
        return AuthResponse(
            status="error",
            message="यह मोबाइल नंबर या ईमेल पहले से रजिस्टर्ड है"
        )

    if len(data.password) < 6:
        return AuthResponse(
            status="error",
            message="पासवर्ड कम से कम 6 अक्षरों का होना चाहिए"
        )

    new_id = len(USERS_DB) + 1
    pwd_hash = hash_password(data.password)

    USERS_DB[clean_contact] = {
        "id": new_id,
        "full_name": data.full_name.strip(),
        "contact": clean_contact,
        "password_hash": pwd_hash,
        "created_at": datetime.now().isoformat()
    }

    token = generate_session_token()
    ACTIVE_TOKENS[token] = {
        "user_id": new_id,
        "contact": clean_contact,
        "expires_at": (datetime.now() + timedelta(days=30)).isoformat()
    }

    return AuthResponse(
        status="success",
        message="अकाउंट सफलतापूर्वक बन गया",
        user_id=new_id,
        full_name=data.full_name.strip(),
        token=token
    )

def login_user(data: UserLoginRequest) -> AuthResponse:
    """
    यूज़र लॉगिन और क्रेडेंशियल सत्यापन
    """
    clean_contact = data.contact.strip().lower()

    user = USERS_DB.get(clean_contact)
    if not user:
        return AuthResponse(
            status="error",
            message="खाता नहीं मिला। कृपया पहले रजिस्टर करें"
        )

    pwd_hash = hash_password(data.password)
    if user["password_hash"] != pwd_hash:
        return AuthResponse(
            status="error",
            message="पासवर्ड गलत है"
        )

    token = generate_session_token()
    ACTIVE_TOKENS[token] = {
        "user_id": user["id"],
        "contact": clean_contact,
        "expires_at": (datetime.now() + timedelta(days=30)).isoformat()
    }

    return AuthResponse(
        status="success",
        message="लॉगिन सफल हुआ",
        user_id=user["id"],
        full_name=user["full_name"],
        token=token
    )
