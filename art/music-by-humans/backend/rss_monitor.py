# SQLite Utility Functions

def connect_db():
    conn = sqlite3.connect(config.DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def create_candidates_table():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS candidates (id INTEGER PRIMARY KEY, title TEXT, link TEXT, published TEXT, source TEXT, genre TEXT, UNIQUE(link))")
    conn.commit()
    conn.close()


def add_candidate(title, link, published, source, genre):
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("INSERT OR IGNORE INTO candidates (title, link, published, source, genre) VALUES (?, ?, ?, ?, ?)", (title, link, published, source, genre))
    conn.commit()
    conn.close()


def fetch_candidates():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM candidates")
    candidates = cursor.fetchall()
    conn.close()
    return candidates


def clear_candidates():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM candidates")
    conn.commit()
    conn.close()


# RSS Feed Parsing & Filtering Functions


def parse_feed(url):
    html = fetch_url(url)
    if html is None:
        return []
    entries = []

    try:
        from feedparser import parse
        feed = parse(html)
        for entry in feed.entries:
            title = entry.title
            link = entry.link
            published = entry.published
            entries.append((title, link, published, source))
    except Exception as e:
        print(f"Error parsing feed: {e}")

    return entries


def filter_candidates(entries):
    filtered = []
    for entry in entries:
        title, link, published, source = entry
        genre = detect_genre(title)

        if genre and not is_mainstream(title):
            filtered.append((title, link, published, source, genre))

    return filtered


def detect_genre(title):
    for genre, keywords in config.GENRE_KEYWORDS.items():
        if any(keyword.lower() in title.lower() for keyword in keywords):
            return genre
    return None


def is_mainstream(title):
    title_lower = title.lower()
    return any(blocked in title_lower for blocked in config.MAINSTREAM_BLOCKLIST)
