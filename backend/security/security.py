"""
=========================================================
BHARATTUBE SECURITY & PROTECTION SYSTEM
=========================================================
"""

import html
import re
from typing import Tuple, Optional
from datetime import datetime, timedelta

# ----------------- CONFIGURATION -----------------

ALLOWED_VIDEO_EXTENSIONS = {".mp4", ".webm", ".mov", ".mkv"}
ALLOWED_IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
MAX_VIDEO_SIZE_BYTES = 500 * 1024 * 1024  # 500 MB
MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024    # 5 MB

# इन-मेमरी रेट लिमिटर ट्रैकिंग (IP Address / User ID -> Requests log)
REQUEST_LOGS = {}
RATE_LIMIT_PER_MINUTE = 60  # प्रति मिनट अधिकतम 60 रिक्वेस्ट्स

# ----------------- SANITIZATION & XSS PROTECTION -----------------

def sanitize_text(input_text: str) -> str:
    """
    यूज़र द्वारा दिए गए टेक्स्ट (कमेंट्स, टाइटल्स आदि) से 
    XSS अटैक और ख़तरनाक HTML टैग्स को निष्प्रभावी बनाना।
    """
    if not input_text:
        return ""
    # HTML स्पेशल कैरेक्टर्स को एस्केप करना (&, <, >, ", ')
    clean_text = html.escape(input_text.strip())
    # ख़तरनाक जावास्क्रिप्ट प्रोटोकॉल या इवेंट्स की सफ़ाई
    clean_text = re.sub(r'javascript:', '', clean_text, flags=re.IGNORECASE)
    return clean_text

def validate_channel_handle(handle: str) -> bool:
    """
    चैनल हैंडल केवल लेटर्स, नंबर्स, अंडरस्कोर और हाइफ़न से बना हो (उदा. @charandas)
    """
    pattern = r'^[a-zA-Z0-9_\-]{3,30}$'
    return bool(re.match(pattern, handle))

# ----------------- FILE VALIDATION -----------------

def validate_video_file(filename: str, file_size: int) -> Tuple[bool, Optional[str]]:
    """
    अपलोड किए जा रहे वीडियो के फ़ाइल एक्सटेंशन और साइज़ की जाँच करना।
    """
    ext = "." + filename.split(".")[-1].lower() if "." in filename else ""
    
    if ext not in ALLOWED_VIDEO_EXTENSIONS:
        return False, f"अमान्य वीडियो फ़ॉर्मैट ({ext})। केवल MP4, WEBM, MOV की अनुमति है।"
    
    if file_size > MAX_VIDEO_SIZE_BYTES:
        return False, "फ़ाइल साइज़ 500MB से अधिक है।"
    
    return True, None

def validate_thumbnail_file(filename: str, file_size: int) -> Tuple[bool, Optional[str]]:
    """
    अपलोड किए जा रहे थंबनेल के फ़ाइल एक्सटेंशन और साइज़ की जाँच करना।
    """
    ext = "." + filename.split(".")[-1].lower() if "." in filename else ""
    
    if ext not in ALLOWED_IMAGE_EXTENSIONS:
        return False, f"अमान्य इमेज फ़ॉर्मैट ({ext})। केवल JPG, PNG, WEBP की अनुमति है।"
        
    if file_size > MAX_IMAGE_SIZE_BYTES:
        return False, "थंबनेल साइज़ 5MB से अधिक है।"
        
    return True, None

# ----------------- RATE LIMITING -----------------

def is_rate_limited(client_ip: str) -> bool:
    """
    DDoS और ब्रूट-फ़ोर्स स्पैम रोकने के लिए सरल रेट लिमिटिंग चेक।
    """
    now = datetime.now()
    cutoff = now - timedelta(minutes=1)
    
    if client_ip not in REQUEST_LOGS:
        REQUEST_LOGS[client_ip] = [now]
        return False
        
    # 1 मिनट से पुराने टाइमस्टैम्प हटाना
    valid_requests = [t for t in REQUEST_LOGS[client_ip] if t > cutoff]
    
    if len(valid_requests) >= RATE_LIMIT_PER_MINUTE:
        return True  # लिमिट पार हो गई
        
    valid_requests.append(now)
    REQUEST_LOGS[client_ip] = valid_requests
    return False
