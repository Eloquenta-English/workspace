#!/usr/bin/env python3
"""
gen_speaking_lessons.py
Generates the complete WTE Speaking Lessons single-page app.
Run: python3 gen_speaking_lessons.py
"""

import os
import json
import sys

# Import lesson data
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lesson_data import CATEGORIES, LESSONS

# Helper: escape for JS string
def js(s):
    return s.replace('\\', '\\\\').replace('"', '\\"').replace("'", "\\'").replace('\n', '\\n')

# Helper: escape for HTML attribute
def attr(s):
    return s.replace('&', '&amp;').replace('"', '&quot;').replace('<', '&lt;').replace('>', '&gt;')

# Build vocabulary index from all lessons
VOCAB_INDEX = {}
for cat_slug, lessons in LESSONS.items():
    for lesson in lessons:
        for q in lesson["questions"]:
            for word, definition in q.get("vocab", {}).items():
                w = word.strip().lower()
                if w and w not in VOCAB_INDEX:
                    VOCAB_INDEX[w] = definition.strip()

print(f"Categories: {len(CATEGORIES)}")
print(f"Lessons: {sum(len(v) for v in LESSONS.values())}")
print(f"Questions: {sum(len(l['questions']) for cat in LESSONS.values() for l in cat)}")
print(f"Vocab words: {len(VOCAB_INDEX)}")

# Parts list
parts = []


# ══════════════════════════════════════════════════════════════════════
# SECTION 1: OPENING HTML + CSS
# ══════════════════════════════════════════════════════════════════════

parts.append("<!DOCTYPE html>")
parts.append('<html lang="en" data-theme="dark">')
parts.append("<head>")
parts.append('<meta charset="UTF-8">')
parts.append('<meta name="viewport" content="width=device-width,initial-scale=1.0">')
parts.append('<title>WTE Speaking Lessons — English Conversation Practice</title>')
parts.append('<link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&family=Blogger+Sans:wght@300;400;500;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">')
parts.append("<style>")

# ── CSS Variables (WTE Design System) ───────────────────────────────
parts.append("""
:root {
  --bg: #1c1c1c;
  --bg2: #161616;
  --bg3: #222222;
  --bg-card: #232323;
  --bg-card2: #1a1a1a;
  --border: #333333;
  --border-light: #444444;
  --text: #e8e8e8;
  --text-muted: #999999;
  --text-dim: #555555;
  --accent: #a3e635;
  --accent-dim: rgba(163,230,53,.08);
  --accent-glow: rgba(163,230,53,.3);
  --cta: #fcbe6a;
  --cta-hover: #fdb553;
  --cta-text: #1c1c1c;
  --green: #34d399;
  --amber: #fbbf24;
  --violet: #a78bfa;
  --rose: #fb7185;
}
[data-theme="light"] {
  --bg: #f5f5f5;
  --bg2: #eeeeee;
  --bg-card: #ffffff;
  --border: #d0d0d0;
  --text: #2f2f2f;
  --text-muted: #666666;
  --accent: #3097cf;
  --accent-dim: rgba(48,151,207,.08);
}
""")


# ── Reset & Base ────────────────────────────────────────────────────
parts.append("""
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{
  font-family:'Blogger Sans','Inter',sans-serif;
  background:var(--bg);
  color:var(--text);
  line-height:1.6;
  overflow-x:hidden;
  -webkit-font-smoothing:antialiased;
}
a{color:var(--accent);text-decoration:none}
a:hover{text-decoration:underline}
button{
  font-family:inherit;
  cursor:pointer;
  border:none;
  background:none;
  color:inherit;
  font-size:inherit;
}
img{max-width:100%;display:block}
""")

# ── Scrollbar ───────────────────────────────────────────────────────
parts.append("""
::-webkit-scrollbar{width:6px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px}
::-webkit-scrollbar-thumb:hover{background:var(--text-dim)}
""")

# ── Header ──────────────────────────────────────────────────────────
parts.append("""
.header{
  position:sticky;top:0;z-index:100;
  display:flex;align-items:center;justify-content:space-between;
  padding:16px 32px;
  background:var(--bg);
  border-bottom:1px solid var(--border);
  backdrop-filter:blur(8px);
}
.header-logo{
  font-family:'Fira Code',monospace;
  font-size:1.1rem;font-weight:600;
  color:var(--accent);
  letter-spacing:-0.02em;
}
.header-logo span{color:var(--text);font-weight:400;margin-left:8px}
.header-back{
  display:none;
  align-items:center;gap:8px;
  padding:8px 16px;
  border:1px solid var(--border);
  border-radius:8px;
  font-size:.9rem;
  color:var(--text-muted);
  transition:all .2s;
}
.header-back:hover{border-color:var(--accent);color:var(--accent)}
.header-back.visible{display:flex}
""")


# ── Main Layout ───────────────────────────────────────────────────────
parts.append("""
.main{display:flex;min-height:calc(100vh - 60px)}
.content{flex:1;padding:32px;overflow-y:auto}
.sidebar{
  width:300px;
  background:var(--bg-card);
  border-left:1px solid var(--border);
  display:flex;flex-direction:column;
  height:calc(100vh - 60px);
  position:sticky;top:60px;
  z-index:90;
  transition:transform .3s ease;
}
.sidebar.collapsed{transform:translateX(100%)}
@media(max-width:768px){
  .sidebar{
    position:fixed;right:0;top:60px;
    width:100%;max-width:320px;
    transform:translateX(100%);
  }
  .sidebar.open{transform:translateX(0)}
}
""")

# ── Sidebar Tabs ────────────────────────────────────────────────────
parts.append("""
.sidebar-tabs{display:flex;border-bottom:1px solid var(--border)}
.sidebar-tab{
  flex:1;padding:12px;
  text-align:center;font-size:.85rem;
  color:var(--text-muted);
  border-bottom:2px solid transparent;
  transition:all .2s;
}
.sidebar-tab:hover{color:var(--text)}
.sidebar-tab.active{color:var(--accent);border-bottom-color:var(--accent)}
.sidebar-content{flex:1;overflow-y:auto;padding:16px}
.sidebar-section{display:none}
.sidebar-section.active{display:block}
.vocab-item{
  padding:10px 0;
  border-bottom:1px solid var(--border);
}
.vocab-word{
  color:var(--accent);font-weight:600;
  font-family:'Fira Code',monospace;
  font-size:.9rem;
}
.vocab-def{
  color:var(--text-muted);
  font-size:.85rem;
  margin-top:4px;
  line-height:1.4;
}
.homework-textarea{
  width:100%;min-height:120px;
  background:var(--bg);color:var(--text);
  border:1px solid var(--border);border-radius:8px;
  padding:12px;font-family:inherit;font-size:.9rem;
  resize:vertical;
}
.homework-textarea:focus{outline:none;border-color:var(--accent)}
.homework-btns{display:flex;gap:8px;margin-top:12px}
.homework-btn{
  flex:1;padding:10px;
  border:1px solid var(--border);border-radius:8px;
  font-size:.85rem;font-weight:500;
  transition:all .2s;
  text-align:center;
}
.homework-btn:hover{border-color:var(--accent);color:var(--accent)}
.homework-btn.primary{
  background:var(--accent);color:var(--cta-text);
  border-color:var(--accent);
}
.homework-btn.primary:hover{background:var(--accent-glow);color:var(--accent)}
""")


# ── View Sections ─────────────────────────────────────────────────────
parts.append("""
.view{display:none}
.view.active{display:block}
""")

# ── Category Grid ────────────────────────────────────────────────────
parts.append("""
.cat-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(300px,1fr));
  gap:24px;
  max-width:1200px;
  margin:0 auto;
}
@media(max-width:768px){
  .cat-grid{grid-template-columns:1fr}
}
""")

# ── Category Cards (3D) ──────────────────────────────────────────────
parts.append("""
.cat-card{
  position:relative;
  border-radius:16px;
  overflow:hidden;
  cursor:pointer;
  perspective:800px;
  transform-style:preserve-3d;
  transition:transform .4s ease,box-shadow .4s ease;
  border:1px solid var(--border);
  background:var(--bg-card);
  aspect-ratio:2/3;
}
.cat-card:hover{
  transform:rotateY(8deg) rotateX(-4deg) translateZ(20px);
  box-shadow:0 20px 60px rgba(0,0,0,.5);
  border-color:var(--accent);
}
.cat-card:active{
  transform:rotateY(0deg) scale(.97);
}
.cat-card-img{
  position:absolute;inset:0;
  width:100%;height:100%;
  object-fit:cover;
  transition:transform .6s ease;
}
.cat-card:hover .cat-card-img{transform:scale(1.05)}
.cat-card-overlay{
  position:absolute;inset:0;
  background:linear-gradient(to top,rgba(28,28,28,.85) 0%,rgba(28,28,28,.3) 50%,transparent 100%);
}
.cat-card-content{
  position:absolute;bottom:0;left:0;right:0;
  padding:24px;
}
.cat-card-title{
  font-size:1.4rem;font-weight:700;
  margin-bottom:6px;
  color:var(--text);
}
.cat-card-desc{
  font-size:.9rem;
  color:var(--text-muted);
  line-height:1.4;
}
.cat-card-count{
  display:inline-block;
  margin-top:10px;
  padding:4px 10px;
  background:var(--accent-dim);
  color:var(--accent);
  font-family:'Fira Code',monospace;
  font-size:.75rem;
  border-radius:4px;
}
""")


# ── Lesson Cards (3D flip) ────────────────────────────────────────────
parts.append("""
.lesson-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(260px,1fr));
  gap:20px;
  max-width:1000px;
  margin:0 auto;
}
@media(max-width:768px){
  .lesson-grid{grid-template-columns:1fr}
}
.lesson-card{
  position:relative;
  border-radius:12px;
  overflow:hidden;
  cursor:pointer;
  border:1px solid var(--border);
  background:var(--bg-card);
  transition:transform .3s ease,border-color .3s ease,box-shadow .3s ease;
  transform-style:preserve-3d;
}
.lesson-card:hover{
  transform:translateY(-4px) rotateX(2deg);
  border-color:var(--accent);
  box-shadow:0 12px 40px rgba(0,0,0,.4);
}
.lesson-card-img-wrap{
  position:relative;
  height:160px;
  overflow:hidden;
}
.lesson-card-img{
  width:100%;height:100%;
  object-fit:cover;
  transition:transform .4s ease;
}
.lesson-card:hover .lesson-card-img{transform:scale(1.08)}
.lesson-card-body{padding:16px}
.lesson-card-title{
  font-size:1.05rem;font-weight:600;
  margin-bottom:6px;
  color:var(--text);
}
.lesson-card-meta{
  font-size:.8rem;
  color:var(--text-muted);
  font-family:'Fira Code',monospace;
}
""")

# ── Section Title ────────────────────────────────────────────────────
parts.append("""
.section-title{
  font-size:1.8rem;font-weight:700;
  margin-bottom:8px;
  color:var(--text);
}
.section-subtitle{
  font-size:1rem;
  color:var(--text-muted);
  margin-bottom:32px;
}
""")


# ── Slide Deck Overlay ────────────────────────────────────────────────
parts.append("""
.slide-deck{
  display:none;
  position:fixed;inset:0;
  z-index:200;
  background:var(--bg);
  overflow:hidden;
}
.slide-deck.open{display:flex;flex-direction:column}
.slide-bg{
  position:fixed;inset:0;
  background-size:cover;
  background-position:center;
  opacity:.15;
  z-index:0;
  transition:opacity .5s ease;
}
.slide-progress{
  position:fixed;bottom:0;left:0;right:0;
  height:4px;
  background:var(--border);
  z-index:210;
}
.slide-progress-bar{
  height:100%;
  background:linear-gradient(90deg,#7dd3fc,#38bdf8);
  transition:width .3s ease;
  width:0%;
}
.slide-nav{
  position:fixed;
  bottom:20px;left:50%;
  transform:translateX(-50%);
  display:flex;align-items:center;gap:16px;
  z-index:210;
  background:rgba(28,28,28,.8);
  backdrop-filter:blur(8px);
  padding:10px 20px;
  border-radius:12px;
  border:1px solid var(--border);
}
.slide-nav-btn{
  padding:8px 16px;
  border:1px solid var(--border);
  border-radius:8px;
  font-size:.85rem;
  color:var(--text-muted);
  transition:all .2s;
}
.slide-nav-btn:hover{border-color:var(--accent);color:var(--accent)}
.slide-counter{
  font-family:'Fira Code',monospace;
  font-size:.85rem;
  color:var(--text-muted);
  min-width:60px;
  text-align:center;
}
.close-slides{
  position:fixed;
  top:20px;right:20px;
  z-index:220;
  width:40px;height:40px;
  display:flex;align-items:center;justify-content:center;
  border:1px solid var(--border);
  border-radius:50%;
  font-size:1.2rem;
  color:var(--text-muted);
  transition:all .2s;
}
.close-slides:hover{border-color:var(--accent);color:var(--accent)}
""")


# ── Slide Content Area ────────────────────────────────────────────────
parts.append("""
.slide-content{
  flex:1;
  display:flex;
  flex-direction:column;
  align-items:center;justify-content:center;
  padding:60px 32px 100px;
  max-width:900px;
  margin:0 auto;
  width:100%;
  position:relative;
  z-index:1;
  overflow-y:auto;
}
.slide-main-q{
  font-size:clamp(1.4rem,4vw,2.2rem);
  font-weight:700;
  line-height:1.35;
  margin-bottom:30px;
  text-align:center;
  color:var(--text);
}
.slide-subs{
  display:flex;
  flex-direction:column;
  gap:20px;
  max-width:700px;
  width:100%;
}
.slide-sub-q{
  font-size:clamp(.95rem,2vw,1.1rem);
  color:var(--text-muted);
  line-height:1.5;
  padding:16px 20px;
  background:var(--bg-card);
  border:1px solid var(--border);
  border-radius:10px;
  transition:border-color .2s;
}
.slide-sub-q:hover{border-color:var(--border-light)}
.slide-label{
  font-family:'Fira Code',monospace;
  font-size:.75rem;
  color:var(--accent);
  text-transform:uppercase;
  letter-spacing:.05em;
  margin-bottom:4px;
  display:block;
}
""")

# ── Clickable Vocabulary Words ────────────────────────────────────────
parts.append("""
.w-def{
  border-bottom:1px dashed var(--accent);
  cursor:pointer;
  transition:background .15s;
  padding:1px 2px;
  border-radius:2px;
}
.w-def:hover{
  background:rgba(163,230,53,.1);
}
.w-def.clicked{
  background:rgba(163,230,53,.15);
  color:var(--accent);
}
""")


# ── Animations ────────────────────────────────────────────────────────
parts.append("""
@keyframes fadeInUp{
  from{opacity:0;transform:translateY(20px)}
  to{opacity:1;transform:translateY(0)}
}
@keyframes pulse{
  0%,100%{opacity:1}
  50%{opacity:.5}
}
.cat-card,.lesson-card{
  animation:fadeInUp .5s ease both;
}
.cat-card:nth-child(1){animation-delay:.05s}
.cat-card:nth-child(2){animation-delay:.1s}
.cat-card:nth-child(3){animation-delay:.15s}
.cat-card:nth-child(4){animation-delay:.2s}
.cat-card:nth-child(5){animation-delay:.25s}
.cat-card:nth-child(6){animation-delay:.3s}
.cat-card:nth-child(7){animation-delay:.35s}
.lesson-card:nth-child(1){animation-delay:.04s}
.lesson-card:nth-child(2){animation-delay:.08s}
.lesson-card:nth-child(3){animation-delay:.12s}
.lesson-card:nth-child(4){animation-delay:.16s}
.lesson-card:nth-child(5){animation-delay:.2s}
@media(prefers-reduced-motion:reduce){
  *,*::before,*::after{
    animation-duration:.01ms!important;
    transition-duration:.01ms!important;
  }
}
""")

# ── Utility ──────────────────────────────────────────────────────────
parts.append("""
.hidden{display:none!important}
.btn{
  display:inline-flex;align-items:center;gap:8px;
  padding:10px 20px;
  border:1px solid var(--border);
  border-radius:8px;
  font-size:.9rem;font-weight:500;
  color:var(--text-muted);
  transition:all .2s;
}
.btn:hover{border-color:var(--accent);color:var(--accent)}
.btn-accent{
  background:var(--accent);
  color:var(--cta-text);
  border-color:var(--accent);
}
.btn-accent:hover{background:var(--accent-glow)}
.text-center{text-align:center}
.mt-16{margin-top:16px}
.mt-24{margin-top:24px}
""")

parts.append("</style>")
parts.append("</head>")
parts.append("<body>")


# ══════════════════════════════════════════════════════════════════════
# SECTION 2: HTML BODY
# ══════════════════════════════════════════════════════════════════════

# ── Header ──────────────────────────────────────────────────────────
parts.append('<header class="header">')
parts.append('<div class="header-logo">WTE <span>Speaking Lessons</span></div>')
parts.append('<button class="header-back" id="headerBack" onclick="goBack()">')
parts.append('&larr; Back')
parts.append('</button>')
parts.append('</header>')

# ── Main ────────────────────────────────────────────────────────────
parts.append('<div class="main">')

# Content area
parts.append('<div class="content">')

# View: Categories
parts.append('<section class="view active" id="viewCategories">')
parts.append('<h1 class="section-title">Choose a Category</h1>')
parts.append('<p class="section-subtitle">Pick a topic to explore speaking lessons for your students</p>')
parts.append('<div class="cat-grid" id="catGrid"></div>')
parts.append('</section>')

# View: Lessons
parts.append('<section class="view" id="viewLessons">')
parts.append('<h1 class="section-title" id="lessonCategoryTitle"></h1>')
parts.append('<p class="section-subtitle" id="lessonCategoryDesc"></p>')
parts.append('<div class="lesson-grid" id="lessonGrid"></div>')
parts.append('</section>')

# View: Slides
parts.append('<section class="view" id="viewSlides">')
parts.append('<div class="slide-deck" id="slideDeck">')
parts.append('<div class="slide-bg" id="slideBg"></div>')
parts.append('<button class="close-slides" onclick="closeSlides()">&times;</button>')
parts.append('<div class="slide-progress"><div class="slide-progress-bar" id="slideProgress"></div></div>')
parts.append('<div class="slide-content" id="slideContent"></div>')
parts.append('<div class="slide-nav">')
parts.append('<button class="slide-nav-btn" onclick="prevSlide()">&larr; Previous</button>')
parts.append('<span class="slide-counter" id="slideCounter">1 / 15</span>')
parts.append('<button class="slide-nav-btn" onclick="nextSlide()">Next &rarr;</button>')
parts.append('</div>')
parts.append('</div>')
parts.append('</section>')

parts.append('</div>')  # end .content


# ── Sidebar ──────────────────────────────────────────────────────────
parts.append('<aside class="sidebar" id="sidebar">')
parts.append('<div class="sidebar-tabs">')
parts.append('<button class="sidebar-tab active" id="tabVocab" onclick="switchTab('vocab')">Vocabulary</button>')
parts.append('<button class="sidebar-tab" id="tabHomework" onclick="switchTab('homework')">Homework</button>')
parts.append('</div>')
parts.append('<div class="sidebar-content">')
# Vocab panel
parts.append('<div class="sidebar-section active" id="panelVocab">')
parts.append('<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">')
parts.append('<span style="font-size:.8rem;color:var(--text-muted)" id="vocabCount">0 words</span>')
parts.append('<button class="btn" style="padding:4px 10px;font-size:.75rem" onclick="clearVocab()">Clear</button>')
parts.append('</div>')
parts.append('<div id="vocabList"></div>')
parts.append('</div>')
# Homework panel
parts.append('<div class="sidebar-section" id="panelHomework">')
parts.append('<p style="font-size:.85rem;color:var(--text-muted);margin-bottom:12px">Add notes or a link for your student. Copy and paste into an email or message.</p>')
parts.append('<textarea class="homework-textarea" id="homeworkText" placeholder="Paste a link or write homework notes here..."></textarea>')
parts.append('<div class="homework-btns">')
parts.append('<button class="homework-btn" onclick="copyHomeworkLink()">Copy Link</button>')
parts.append('<button class="homework-btn primary" onclick="copyHomeworkText()">Copy Text</button>')
parts.append('</div>')
parts.append('<p style="font-size:.75rem;color:var(--text-dim);margin-top:12px">Tip: Paste a link to a Google Doc, worksheet, or video for your student.</p>')
parts.append('</div>')
parts.append('</div>')
parts.append('</aside>')

parts.append('</div>')  # end .main


# ══════════════════════════════════════════════════════════════════════
# SECTION 3: JAVASCRIPT
# ══════════════════════════════════════════════════════════════════════

parts.append('<script>')

# ── Embedded Data ────────────────────────────────────────────────────
parts.append('// Embedded lesson data')
parts.append('const CATEGORIES = ' + json.dumps(CATEGORIES, ensure_ascii=False) + ';')
parts.append('const LESSONS = ' + json.dumps(LESSONS, ensure_ascii=False) + ';')
parts.append('const VOCAB = ' + json.dumps(VOCAB_INDEX, ensure_ascii=False) + ';')

# ── State ───────────────────────────────────────────────────────────
parts.append("""
// State
let state = {
  view: 'categories',
  category: null,
  lessonIdx: null,
  slideIdx: 0,
  vocabList: [],
  homeworkText: ''
};

// Load persisted state
try {
  state.vocabList = JSON.parse(localStorage.getItem('wte_vocab') || '[]');
  state.homeworkText = localStorage.getItem('wte_homework') || '';
} catch(e) {}

// DOM refs
const $ = id => document.getElementById(id);
const catGrid = $('catGrid');
const lessonGrid = $('lessonGrid');
const lessonCategoryTitle = $('lessonCategoryTitle');
const lessonCategoryDesc = $('lessonCategoryDesc');
const slideDeck = $('slideDeck');
const slideBg = $('slideBg');
const slideContent = $('slideContent');
const slideProgress = $('slideProgress');
const slideCounter = $('slideCounter');
const headerBack = $('headerBack');
const sidebar = $('sidebar');
const vocabList = $('vocabList');
const vocabCount = $('vocabCount');
const homeworkText = $('homeworkText');
const tabVocab = $('tabVocab');
const tabHomework = $('tabHomework');
const panelVocab = $('panelVocab');
const panelHomework = $('panelHomework');
""")


// ── Functions ─────────────────────────────────────────────────────
function showCategory(catSlug) {
    state.view = 'lessons';
    state.category = catSlug;
    lessonCategoryTitle.innerText = CATEGORIES[catSlug].title;
    lessonCategoryDesc.innerText = CATEGORIES[catSlug].description;
    lessonGrid.innerHTML = '';

    for (let i = 0; i < LESSONS[catSlug].length; i++) {
        const lesson = LESSONS[catSlug][i];
        const card = document.createElement('div');
        card.className = 'lesson-card';
        card.innerHTML = `
            <img src="images/${lesson.image_keywords}.jpg" class="lesson-card-img" alt="">
            <div class="lesson-card-body">
              <h2 class='lesson-card-title'>${lesson.title}</h2>
              <div class='lesson-card-meta'>
                <span>${lesson.questions.length} questions</span>
              </div>
            </div>
        `;

        card.onclick = function () {
            openLesson(catSlug, i);
        };
        lessonGrid.appendChild(card);
    }
}

function openLesson(catSlug, lessonIdx) {
    const lesson = LESSONS[catSlug][lessonIdx];
    slideContent.innerHTML = '';
    for (const q of lesson.questions) {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.innerHTML = `<h2 class='slide-main-q'>${q.main}</h2>`;

        const subs = document.createElement('div');
        subs.className = 'slide-subs';
        for (const sub of q.subs) {
            const sub_q = document.createElement('div');
            sub_q.className = 'slide-sub-q';
            sub_q.innerText = sub;
            subs.appendChild(sub_q);
        }
        slide.appendChild(subs);
        slideContent.appendChild(slide);
    }
    state.lessonIdx = lessonIdx;

    slideDeck.classList.add('open');
    updateProgress();
}


// ── Slide Control ────────────────────────────────────────────────────
function goToSlide(idx) {
    state.slideIdx = idx;
    const slides = slideContent.children;
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = i === idx ? 'block' : 'none';
    }
    slideCounter.textContent = `${idx + 1} / ${slides.length}`;
    updateProgress();
}

function nextSlide() {
    const slides = slideContent.children;
    if (state.slideIdx + 1 < slides.length) {
        goToSlide(state.slideIdx + 1);
    }
}

function prevSlide() {
    const slides = slideContent.children;
    if (state.slideIdx > 0) {
        goToSlide(state.slideIdx - 1);
    }
}

function toggleDefinition(word) {
    const vocabDefinitions = VOCAB[word];
    if (vocabDefinitions) {
        const vocabElem = document.createElement('div');
        vocabElem.className = 'vocab-item';
        vocabElem.innerHTML = `<span class='vocab-word'>${word}</span> : <span class='vocab-def'>${vocabDefinitions}</span>`;
        vocabList.appendChild(vocabElem);
    }
}

function clearVocab() {
    vocabList.innerHTML = '';
    state.vocabList = [];
}

function copyHomeworkLink() {
    const link = homeworkText.value.trim();
    if (link) {
        navigator.clipboard.writeText(link);
        alert('Homework link copied to clipboard!');
    }
}


// ── Keyboard Navigation ──────────────────────────────────────────────
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
            nextSlide();
            break;
        case 'ArrowLeft':
        case 'ArrowUp':
            prevSlide();
            break;
        case 'Escape':
            closeSlides();
            break;
    }
});

// ── Persistence ──────────────────────────────────────────────────────
window.addEventListener('beforeunload', () => {
    localStorage.setItem('wte_vocab', JSON.stringify(state.vocabList));
    localStorage.setItem('wte_homework', state.homeworkText);
});

// ── Image Error Handling ─────────────────────────────────────────────
const handleImageError = (event) => {
    event.target.style.display = 'none';
};

// Attach error handling to all lesson images
const lessonImages = document.querySelectorAll('.lesson-card-img');
for (const img of lessonImages) {
    img.addEventListener('error', handleImageError);
}

