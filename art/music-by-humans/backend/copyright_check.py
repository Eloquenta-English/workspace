#!/usr/bin/env python3
"""
Music By Humans — Copyright Compliance Checker
Downloads, caches, and checks copyright laws for internet content.
Runs on session start and weekly via cron.

Usage:
    python3 copyright_check.py --update          # Download/cache all sources
    python3 copyright_check.py --check "YouTube embed of music video"
    python3 copyright_check.py --check "artist image from Bandcamp" --type image
    python3 copyright_check.py --summary         # Print structured rules summary
    python3 copyright_check.py --rights-log      # Show current rights log
"""

import argparse
import json
import os
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from html.parser import HTMLParser

try:
    import urllib.request
    import urllib.error
except ImportError:
    print("ERROR: urllib not available", file=sys.stderr)
    sys.exit(1)

# ── Paths ────────────────────────────────────────────────────────────────────

PROJECT_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = PROJECT_DIR / "data"
COPYRIGHT_DIR = DATA_DIR / "copyright-laws"
RIGHTS_LOG = DATA_DIR / "rights-log.json"
SUMMARY_FILE = COPYRIGHT_DIR / "summary.json"

# ── Sources ──────────────────────────────────────────────────────────────────

SOURCES = {
    "us_dmca": {
        "url": "https://www.copyright.gov/dmca/",
        "label": "US DMCA",
        "type": "html",
    },
    "eu_copyright_directive": {
        "url": "https://eur-lex.europa.eu/eli/dir/2019/790/oj",
        "label": "EU Copyright Directive",
        "type": "html",
    },
    "sa_copyright_act": {
        "url": "https://www.gov.za/documents/copyright-act",
        "label": "SA Copyright Act",
        "type": "html",
    },
    "creative_commons": {
        "url": "https://creativecommons.org/licenses/",
        "label": "Creative Commons Licenses",
        "type": "html",
    },
    "youtube_tos": {
        "url": "https://www.youtube.com/t/terms",
        "label": "YouTube Terms of Service",
        "type": "html",
    },
    "youtube_api_tos": {
        "url": "https://developers.google.com/youtube/terms",
        "label": "YouTube API Terms",
        "type": "html",
    },
}

# ── Key Rules (structured for programmatic checking) ─────────────────────────

KEY_RULES = {
    "youtube_embed": {
        "risk": "low",
        "rule": "YouTube embeds via official IFrame API are generally permitted under YouTube ToS. Do NOT download/rehost audio or video.",
        "conditions": [
            "Must use official YouTube IFrame API",
            "Must not modify or obscure YouTube branding",
            "Must not download audio/video for rehosting",
            "Must comply with YouTube API rate limits",
        ],
    },
    "artist_image": {
        "risk": "medium",
        "rule": "Artist images/EPK material may be copyrighted. Need permission, fair use analysis, or use CC-licensed images only.",
        "conditions": [
            "Check for Creative Commons license first",
            "If no CC license, seek explicit permission from artist/label",
            "Fair use may apply for editorial/review purposes (case-by-case)",
            "Always attribute the source",
            "Log all image sources in rights-log.json",
        ],
    },
    "music_snippet": {
        "risk": "high",
        "rule": "NEVER host audio files. Only embed via YouTube. Music snippets may require licensing.",
        "conditions": [
            "Never upload MP3/WAV/FLAC to the site",
            "Only embed via YouTube IFrame API",
            "Do not create 'preview clips' from downloaded audio",
            "Link to Bandcamp/SoundCloud for full tracks",
        ],
    },
    "user_content": {
        "risk": "medium",
        "rule": "User-generated content requires Terms of Service covering content ownership and licensing.",
        "conditions": [
            "ToS must state user grants license to display content",
            "ToS must include DMCA takedown procedure",
            "Must have process for handling copyright complaints",
        ],
    },
    "bandcamp_embed": {
        "risk": "low",
        "rule": "Bandcamp embeds are permitted under Bandcamp's terms. Use official embed codes.",
        "conditions": [
            "Use official Bandcamp embed widget",
            "Do not scrape or rehost Bandcamp audio",
            "Link to Bandcamp for purchases",
        ],
    },
    "soundcloud_embed": {
        "risk": "low",
        "rule": "SoundCloud embeds are permitted for tracks with embedding enabled. Use official embed codes.",
        "conditions": [
            "Use official SoundCloud embed widget",
            "Only embed tracks where artist has enabled embedding",
            "Do not download or rehost audio",
        ],
    },
    "rss_content": {
        "risk": "low",
        "rule": "RSS feed content aggregation is generally permitted for headlines and summaries. Full article text may require permission.",
        "conditions": [
            "Only display headlines, short summaries, and links",
            "Do not republish full articles without permission",
            "Always link to original source",
            "Respect robots.txt and feed terms",
        ],
    },
    "original_content": {
        "risk": "none",
        "rule": "Original written content (reviews, interviews, articles) is owned by Music By Humans.",
        "conditions": [
            "All original content is (c) Music By Humans",
            "License original content under CC BY-NC-SA 4.0 unless otherwise stated",
        ],
    },
}


class HTMLTextExtractor(HTMLParser):
    """Extract text from HTML, ignoring tags."""

    def __init__(self):
        super().__init__()
        self.text_parts = []
        self.skip_tags = {"script", "style", "nav", "footer", "header"}
        self._skip = False

    def handle_starttag(self, tag, attrs):
        if tag in self.skip_tags:
            self._skip = True

    def handle_endtag(self, tag):
        if tag in self.skip_tags:
            self._skip = False

    def handle_data(self, data):
        if not self._skip:
            stripped = data.strip()
            if stripped:
                self.text_parts.append(stripped)

    def get_text(self):
        return " ".join(self.text_parts)


def fetch_url(url: str, timeout: int = 30) -> str:
    """Fetch URL content with error handling."""
    headers = {
        "User-Agent": "Mozilla/5.0 (compatible; MusicByHumans/1.0; +https://williamthomason.github.io)"
    }
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            charset = resp.headers.get_content_charset() or "utf-8"
            return resp.read().decode(charset, errors="replace")
    except urllib.error.URLError as e:
        return f"ERROR: {e}"
    except Exception as e:
        return f"ERROR: {e}"


def extract_text(html: str) -> str:
    """Extract readable text from HTML."""
    extractor = HTMLTextExtractor()
    try:
        extractor.feed(html)
    except Exception:
        pass
    return extractor.get_text()


def update_cache():
    """Download and cache all copyright sources."""
    COPYRIGHT_DIR.mkdir(parents=True, exist_ok=True)
    results = {}

    for key, source in SOURCES.items():
        print(f"Fetching: {source['label']}...")
        html = fetch_url(source["url"])
        text = extract_text(html) if source["type"] == "html" else html

        cache_file = COPYRIGHT_DIR / f"{key}.txt"
        cache_file.write_text(text, encoding="utf-8")

        results[key] = {
            "label": source["label"],
            "url": source["url"],
            "cached_at": datetime.now(timezone.utc).isoformat(),
            "size_chars": len(text),
            "status": "ok" if not text.startswith("ERROR") else "error",
        }
        print(f"  -> {len(text)} chars cached")
        time.sleep(2)  # Rate limiting

    # Save structured rules summary
    summary = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "sources": results,
        "rules": KEY_RULES,
    }
    SUMMARY_FILE.write_text(json.dumps(summary, indent=2), encoding="utf-8")
    print(f"\nSummary saved to {SUMMARY_FILE}")
    return summary


def check_content(content_description: str, content_type: str = None) -> dict:
    """Check a content item against copyright rules."""
    # Match content type from description if not provided
    if not content_type:
        desc_lower = content_description.lower()
        if any(w in desc_lower for w in ["youtube", "embed", "video"]):
            content_type = "youtube_embed"
        elif any(w in desc_lower for w in ["image", "photo", "art", "cover", "epk"]):
            content_type = "artist_image"
        elif any(w in desc_lower for w in ["audio", "mp3", "wav", "snippet", "clip", "music file"]):
            content_type = "music_snippet"
        elif any(w in desc_lower for w in ["user", "upload", "submit", "comment"]):
            content_type = "user_content"
        elif any(w in desc_lower for w in ["bandcamp"]):
            content_type = "bandcamp_embed"
        elif any(w in desc_lower for w in ["soundcloud"]):
            content_type = "soundcloud_embed"
        elif any(w in desc_lower for w in ["rss", "feed", "article", "headline"]):
            content_type = "rss_content"
        elif any(w in desc_lower for w in ["original", "review", "interview", "written"]):
            content_type = "original_content"
        else:
            content_type = "unknown"

    rule = KEY_RULES.get(content_type, {
        "risk": "unknown",
        "rule": "No specific rule found. Consult copyright laws manually.",
        "conditions": ["Seek legal advice if unsure"],
    })

    result = {
        "content": content_description,
        "type": content_type,
        "risk": rule["risk"],
        "rule": rule["rule"],
        "conditions": rule["conditions"],
        "checked_at": datetime.now(timezone.utc).isoformat(),
    }

    return result


def load_rights_log() -> dict:
    """Load the rights log."""
    if RIGHTS_LOG.exists():
        return json.loads(RIGHTS_LOG.read_text(encoding="utf-8"))
    return {"entries": [], "created_at": datetime.now(timezone.utc).isoformat()}


def save_rights_log(log: dict):
    """Save the rights log."""
    RIGHTS_LOG.write_text(json.dumps(log, indent=2), encoding="utf-8")


def add_rights_entry(entry: dict):
    """Add an entry to the rights log."""
    log = load_rights_log()
    entry["logged_at"] = datetime.now(timezone.utc).isoformat()
    log["entries"].append(entry)
    save_rights_log(log)


def print_summary():
    """Print the structured rules summary."""
    if SUMMARY_FILE.exists():
        summary = json.loads(SUMMARY_FILE.read_text(encoding="utf-8"))
    else:
        summary = {"rules": KEY_RULES, "sources": {}}

    print("=" * 60)
    print("MUSIC BY HUMANS — Copyright Rules Summary")
    print("=" * 60)

    if "generated_at" in summary:
        print(f"Generated: {summary['generated_at']}")
    print()

    for key, rule in summary.get("rules", KEY_RULES).items():
        risk = rule["risk"].upper()
        risk_icon = {"NONE": "  ", "LOW": "  ", "MEDIUM": "!!", "HIGH": "XX"}.get(risk, "  ")
        print(f"[{risk_icon}] {risk} — {key.replace('_', ' ').title()}")
        print(f"    Rule: {rule['rule']}")
        for cond in rule.get("conditions", []):
            print(f"    • {cond}")
        print()

    print("=" * 60)
    print("SOURCES:")
    for key, src in summary.get("sources", {}).items():
        status = src.get("status", "?")
        size = src.get("size_chars", 0)
        print(f"  {src.get('label', key)}: {status} ({size} chars)")
    print("=" * 60)


def main():
    parser = argparse.ArgumentParser(description="Music By Humans — Copyright Checker")
    parser.add_argument("--update", action="store_true", help="Download/cache all sources")
    parser.add_argument("--check", type=str, help="Check a content description")
    parser.add_argument("--type", type=str, help="Content type override")
    parser.add_argument("--summary", action="store_true", help="Print rules summary")
    parser.add_argument("--rights-log", action="store_true", help="Show rights log")
    parser.add_argument("--add-entry", type=str, help="Add a rights log entry (JSON)")
    parser.add_argument("--json", action="store_true", help="Output JSON")
    args = parser.parse_args()

    if args.update:
        summary = update_cache()
        if args.json:
            print(json.dumps(summary, indent=2))
        else:
            print_summary()

    elif args.check:
        result = check_content(args.check, args.type)
        if args.json:
            print(json.dumps(result, indent=2))
        else:
            risk = result["risk"].upper()
            print(f"Risk: {risk}")
            print(f"Rule: {result['rule']}")
            print("Conditions:")
            for c in result["conditions"]:
                print(f"  • {c}")

    elif args.summary:
        print_summary()

    elif args.rights_log:
        log = load_rights_log()
        if args.json:
            print(json.dumps(log, indent=2))
        else:
            print(f"Rights Log — {len(log.get('entries', []))} entries")
            for entry in log.get("entries", []):
                print(f"  [{entry.get('status', '?')}] {entry.get('description', 'N/A')}")

    elif args.add_entry:
        try:
            entry = json.loads(args.add_entry)
            add_rights_entry(entry)
            print("Entry added to rights log")
        except json.JSONDecodeError:
            print("ERROR: Invalid JSON for --add-entry", file=sys.stderr)
            sys.exit(1)

    else:
        parser.print_help()


if __name__ == "__main__":
    main()
