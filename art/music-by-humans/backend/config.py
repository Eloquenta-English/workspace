#!/usr/bin/env python3
"""
Music By Humans — Configuration
API keys, feed URLs, genre settings, email/SMTP config.

Loads sensitive values from environment variables or .env file.
"""

import os
from pathlib import Path

PROJECT_DIR = Path(__file__).resolve().parent.parent

# ── YouTube API ─────────────────────────────────────────────────────────────
YOUTUBE_API_KEY = os.environ.get("YOUTUBE_API_KEY", "")
YOUTUBE_API_DAILY_QUOTA = 10000
YOUTUBE_SEARCH_COST = 100  # units per search

# ── RSS Feeds ───────────────────────────────────────────────────────────────
RSS_FEEDS = {
    "kexp": {
        "url": "https://www.kexp.org/feeds/song-of-the-day/",
        "label": "KEXP Song of the Day",
        "genres": ["jazz", "rock", "experimental", "electronic"],
        "weight": 1.2,
    },
    "npr_music": {
        "url": "https://www.npr.org/rss/rss.php?id=1039",
        "label": "NPR Music",
        "genres": ["jazz", "rock", "experimental"],
        "weight": 1.0,
    },
    "bandcamp_daily": {
        "url": "https://daily.bandcamp.com/feed",
        "label": "Bandcamp Daily",
        "genres": ["jazz", "ska", "dub", "psy", "dnb", "rock", "electro", "metal", "experimental"],
        "weight": 1.5,
    },
    "resident_advisor": {
        "url": "https://www.residentadvisor.net/rss.xml",
        "label": "Resident Advisor",
        "genres": ["electro", "dnb", "dub", "psy"],
        "weight": 1.3,
    },
    "the_quietus": {
        "url": "https://thequietus.com/feed",
        "label": "The Quietus",
        "genres": ["rock", "metal", "experimental", "psy"],
        "weight": 1.2,
    },
    "stereogum": {
        "url": "https://www.stereogum.com/feed",
        "label": "Stereogum",
        "genres": ["rock", "jazz", "experimental"],
        "weight": 1.0,
    },
    "brooklyn_vegan": {
        "url": "https://www.brooklynvegan.com/feed",
        "label": "Brooklyn Vegan",
        "genres": ["rock", "metal", "ska", "dnb", "electro"],
        "weight": 1.1,
    },
    "tiny_mix_tapes": {
        "url": "https://www.tinymixtapes.com/feed",
        "label": "Tiny Mix Tapes",
        "genres": ["jazz", "experimental", "psy", "dub"],
        "weight": 1.3,
    },
    "pitchfork": {
        "url": "https://pitchfork.com/rss/news/",
        "label": "Pitchfork",
        "genres": ["jazz", "rock", "electronic", "experimental"],
        "weight": 0.8,
    },
}

# ── Genre Keywords ─────────────────────────────────────────────────────────
GENRE_KEYWORDS = {
    "jazz": ["jazz", "fusion", "bebop", "swing", "improv", "saxophone", "trumpet", "piano trio"],
    "ska": ["ska", "reggae", "dubsteady", "2-tone", "toasting"],
    "dub": ["dub", "dancehall", "riddim", "sound system", "reverb", "delay"],
    "psy": ["psychedelic", "psy", "psych", "shoegaze", "dream pop", "trippy", "krautrock"],
    "dnb": ["drum and bass", "dnb", "d&b", "jungle", "breakstep", "neurofunk", "liquid funk"],
    "rock": ["rock", "indie", "post-punk", "grunge", "alternative", "garage", "shoegaze"],
    "electro": ["electronic", "electro", "synth", "techno", "house", "idm", "ambient", "modular"],
    "metal": ["metal", "black metal", "death metal", "doom", "sludge", "post-metal", "thrash"],
}

# ── Underground Filter ─────────────────────────────────────────────────────
UNDERGROUND_WEIGHT_KEYWORDS = {
    "boost": [
        "underground", "independent", "indie", "self-released", "diy",
        "small label", "unsigned", "emerging", "up-and-coming",
        "bedroom", "lo-fi", "experimental", "avant-garde",
    ],
    "reduce": [
        "major label", "universal", "sony", "warner", "emi",
        "top 40", "billboard", "chart", "platinum", "gold",
        "mainstream", "commercial", "arena", "stadium",
        "spotify viral", "tiktok", "million streams",
    ],
}

# ── Mainstream Blocklist ───────────────────────────────────────────────────
MAINSTREAM_BLOCKLIST = [
    "taylor swift", "drake", "bad bunny", "the weeknd", "billie eilish",
    "harry styles", "beyoncé", "justin bieber", "ariana grande",
    "post malone", "kendrick lil", "sza", "doja cat", "olivia rodrigo",
    "morgan wallen", "luke combs", "miley cyrus", "ed sheeran",
    "adele", "bruno mars", "rihanna", "kanye", "jay-z",
]

# ── Email / SMTP ───────────────────────────────────────────────────────────
SMTP_HOST = os.environ.get("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USER = os.environ.get("SMTP_USER", "")
SMTP_PASS = os.environ.get("SMTP_PASS", "")
EMAIL_FROM = os.environ.get("EMAIL_FROM", "Music By Humans <noreply@williamthomason.github.io>")

# ── WhatsApp (via Hermes) ──────────────────────────────────────────────────
WHATSAPP_TARGET = os.environ.get("WHATSAPP_TARGET", "")

# ── Database ───────────────────────────────────────────────────────────────
DB_PATH = PROJECT_DIR / "data" / "rss_candidates.db"

# ── Shortlist ──────────────────────────────────────────────────────────────
SHORTLIST_SIZE = 10
SHORTLIST_MAX_PER_FEED = 3

# ── File Paths ─────────────────────────────────────────────────────────────
FEATURED_ARTISTS_FILE = PROJECT_DIR / "data" / "featured_artists.json"
BLOCKLIST_FILE = PROJECT_DIR / "data" / "blocklist.json"
RIGHTS_LOG_FILE = PROJECT_DIR / "data" / "rights-log.json"
COMPONENTS_FILE = PROJECT_DIR / "data" / "components.json"
