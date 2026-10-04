"""
=========================================================
BHARATTUBE COPYRIGHT & CONTENT PROTECTION SYSTEM
=========================================================
"""

import hashlib
from datetime import datetime
from typing import Dict, List, Optional
from pydantic import BaseModel

# ----------------- SCHEMAS -----------------

class CopyrightClaimRequest(BaseModel):
    video_id: int
    claimant_user_id: int
    claimant_channel_name: str
    original_work_link: str
    reason: str  # e.g., "Full Video Re-upload", "Audio/Song Used Without Permission"

class CopyrightClaimResponse(BaseModel):
    claim_id: int
    status: str
    message: str
    action_taken: str

# ----------------- IN-MEMORY FINGERPRINTS & CLAIMS -----------------

# ब्लॉक या कॉपीराइटेड ऑडियो/वीडियो के हैश सैंपल्स
REGISTERED_FINGERPRINTS = {
    "a8f5f167f44f4964e6c998dee827110c": "A One Music - Official Song",
    "b94d27b9934d3e08a52e52d7da7dabfa": "National News Broadcast - Copyrighted"
}

CLAIMS_DATABASE: List[dict] = []
CHANNEL_STRIKES: Dict[int, int] = {}  # channel_id -> count of strikes

# ----------------- COPYRIGHT FUNCTIONS -----------------

def check_video_fingerprint(video_content_bytes: bytes) -> Optional[str]:
    """
    अपलोड किए गए वीडियो/ऑडियो बाइट्स का MD5 हैश निकालकर
    रजिस्टर्ड कॉपीराइट डेटाबेस से मैच करता है।
    """
    file_hash = hashlib.md5(video_content_bytes).hexdigest()
    if file_hash in REGISTERED_FINGERPRINTS:
        return REGISTERED_FINGERPRINTS[file_hash]
    return None

def file_copyright_claim(claim: CopyrightClaimRequest) -> CopyrightClaimResponse:
    """
    कॉपीराइट क्लेम दर्ज करना और चैनल पर स्ट्राइक की जाँच करना।
    """
    claim_id = len(CLAIMS_DATABASE) + 1
    new_claim = {
        "claim_id": claim_id,
        "video_id": claim.video_id,
        "claimant_user_id": claim.claimant_user_id,
        "claimant_channel": claim.claimant_channel_name,
        "reason": claim.reason,
        "status": "under_review",
        "created_at": datetime.now().isoformat()
    }
    CLAIMS_DATABASE.append(new_claim)

    return CopyrightClaimResponse(
        claim_id=claim_id,
        status="Under Review",
        message="आपका कॉपीराइट क्लेम दर्ज कर लिया गया है। समीक्षा 24-48 घंटों में की जाएगी।",
        action_taken="Video flagged for manual moderation"
    )

def apply_strike(channel_id: int) -> dict:
    """
    नियम उल्लंघन पर चैनल को स्ट्राइक देना (3 स्ट्राइक्स पर सस्पेंशन वार्निंग)।
    """
    current_strikes = CHANNEL_STRIKES.get(channel_id, 0) + 1
    CHANNEL_STRIKES[channel_id] = current_strikes

    action = "Warning Issued"
    if current_strikes == 1:
        action = "Strike 1: 1 सप्ताह के लिए वीडियो अपलोड ब्लॉक"
    elif current_strikes == 2:
        action = "Strike 2: 2 सप्ताह के लिए सभी फ़ीचर्स ब्लॉक"
    elif current_strikes >= 3:
        action = "Strike 3: चैनल सस्पेंशन के लिए मार्क कर दिया गया"

    return {
        "channel_id": channel_id,
        "total_strikes": current_strikes,
        "action": action
    }
