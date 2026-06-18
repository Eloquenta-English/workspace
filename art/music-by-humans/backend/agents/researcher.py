#!/usr/bin/env python3
"""
Music By Humans — Web Researcher Agent
Searches for underground artists across 8 genres.
Runs daily at 8am via cron.

Usage:
    python3 researcher.py                    # Full run: all genres
    python3 researcher.py --genre jazz       # Single genre
    python3 researcher.py --genre jazz --limit 5
    python3 researcher.py --output /path/to/output.json
"""

import argparse
import json
import sys
import time
import urllib.request
import urllib.parse
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import config

# ── Genre Search Queries ───────────────────────────────────────────────────
GENRE_SEARCH_QUERIES = {
    "jazz": [
        "underground jazz artist 2026 site:bandcamp.com",
        "new jazz musician independent 2026",
        "experimental jazz artist emerging 2026",
    ],
    "ska": [
        "underground ska band 2026 site:bandcamp.com",
        "new ska artist independent 2026",
        "ska punk emerging band 2026",
    ],
    "dub": [
        "underground dub artist 2026 site:bandcamp.com",
        "new dub musician independent 2026",
        "dub reggae emerging artist 2026",
    ],
    "psy": [
        "underground psychedelic band 2026 site:bandcamp.com",
        "new psych rock artist independent 2026",
        "psychedelic emerging band 2026",
    ],
    "dnb": [
        "underground drum and bass artist 2026 site:bandcamp.com",
        "new dnb producer independent 2026",
        "drum and bass emerging artist 2026",
    ],
    "rock": [
        "underground rock band 2026 site:bandcamp.com",
        "new indie rock artist independent 2026",
        "post-punk emerging band 2026",
    ],
    "electro": [
        "underground electronic artist 2026 site:bandcamp.com",
        "new synth artist independent 2026",
        "electronic experimental emerging 2026",
    ],
    "metal": [
        "underground metal band 2026 site:bandcamp.com",
        "new black metal artist independent 2026",
        "doom sludge emerging band 2026",
    ],
}

# ── Mainstream Exclusion ──────────────────────────────────────────────────
MAINSTREAM_INDICATORS = [
    "spotify.com", "apple.com/music", "tiktok",
    "billboard", "grammy", "mtv", "vevo",
    "universal music", "sony music", "warner music",
    "major label", "mainstream",
]


def search_web(query, num_results=10):
    """Search the web using DuckDuckGo instant answer API (no key needed)."""
    encoded = urllib.parse.quote(query)
    url = f"https://html.duckduckgo.com/html/?q={encoded}"
    headers = {"User-Agent": "Mozilla/5.0 (compatible; MusicByHumans/1.0)"}
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return resp.read().decode("utf-8", errors="replace")
    except Exception as e:
        print(f"  Search error: {e}")
        return ""


def extract_results(html):
    """Extract search result titles and URLs from DuckDuckGo HTML."""
    results = []
    # Simple regex extraction from DDG HTML
    pattern = r'result__url[^>]*>([^<]+)<'
    url_matches = re.findall(pattern, html) if html else []

    snippet_pattern = r'result__snippet[^>]*>([^<]+)<'
    snippet_matches = re.findall(snippet_pattern, html) if html else []

    for i, url in enumerate(url_matches[:10]):
        snippet = snippet_matches[i] if i < len(snippet_matches) else ""
        results.append({"url": url.strip(), "snippet": snippet.strip()})

    return results


def is_mainstream(result):
    """Check if a result is from a mainstream source."""
    combined = (result.get("url", "") + " " + result.get("snippet", "")).lower()
    return any(indicator in combined for indicator in MAINSTREAM_INDICATORS)


def find_artists_for_genre(genre, limit=10):
    """Find underground artists for a given genre."""
    import re
    queries = GENRE_SEARCH_QUERIES.get(genre, [])
    all_results = []

    for query in queries:
        print(f"  Searching: {query}")
        html = search_web(query)
        if html:
            results = extract_results(html)
            for r in results:
                r["genre"] = genre
                r["search_query"] = query
            all_results.extend(results)
        time.sleep(1)  # Rate limit

    # Filter out mainstream
    filtered = [r for r in all_results if not is_mainstream(r)]

    # Deduplicate by URL
    seen_urls = set()
    deduped = []
    for r in filtered:
        if r["url"] not in seen_urls:
            seen_urls.add(r["url"])
            deduped.append(r)

    return deduped[:limit]


def run_research(genres=None, limit=10, output_file=None):
    """Run full research across all genres."""
    if genres is None:
        genres = list(GENRE_SEARCH_QUERIES.keys())

    all_artists = []
    for genre in genres:
        print(f"\nResearching genre: {genre}")
        artists = find_artists_for_genre(genre, limit=limit)
        all_artists.extend(artists)
        print(f"  Found {len(artists)} candidates")

    # Build output
    output = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "total_candidates": len(all_artists),
        "genres_searched": genres,
        "candidates": all_artists,
    }

    # Save to file
    if output_file is None:
        output_file = config.PROJECT_DIR / "data" / "research_results.json"

    with open(output_file, "w") as f:
        json.dump(output, f, indent=2)

    print(f"\nResearch complete: {len(all_artists)} candidates saved to {output_file}")
    return output


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Music By Humans — Web Researcher")
    parser.add_argument("--genre", help="Single genre to research")
    parser.add_argument("--limit", type=int, default=10, help="Results per genre")
    parser.add_argument("--output", help="Output JSON file path")
    args = parser.parse_args()

    genres = [args.genre] if args.genre else None
    run_research(genres=genres, limit=args.limit, output_file=args.output)
