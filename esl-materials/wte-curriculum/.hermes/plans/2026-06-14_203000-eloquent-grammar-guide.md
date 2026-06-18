# Eloquenta Grammar Guide — Character-Driven Interactive Lessons

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task. Build in the existing WTE-Curriculum app. Each task = 2-5 min focused work.

**Goal:** Transform the existing WTE-Curriculum grammar section into an "Eloquenta Grammar Guide" with a Gemma-powered AI character guide, test-english-inspired interactive content redesigned with Eloquenta's premium dark aesthetic, and eloquence-level-specific professional English focus.

**Architecture:** 
- Keep existing file structure: `index.html` (shell) + `grammar-data.js` (data) pattern already established
- Add `grammar-guide.js` for character interaction + lesson navigation logic
- Add `grammar-guide.css` for character animations + eloquenta-themed design
- Extend `grammar-data.js` with richer content per test-english model (more sections, more exercise types, real-world examples)
- Character is an SVG-animated guide that appears in a side panel during lessons

**Tech Stack:** Vanilla HTML/CSS/JS (existing pattern). No frameworks. CSS animations for character. All inline SVG for character art (no external image deps).

---

## Context & Research

### Test-English.com Model (https://test-english.com/grammar-points/)
- **Structure:** Each grammar point has → Form table → Explanation with examples → "Don't forget" warnings → Multiple exercises (4 per topic)
- **Exercise style:** "Choose the correct option" with A/B distractors targeting common mistakes
- **Content style:** Short rules → clear examples → immediate practice
- **Key insight:** They explain WHY wrong answers are wrong, not just what's right

### Eloquenta Design System (from landing.html / eloquent-curriculum.html)
- Dark teal bg `#0d1f22`, mustard accent `#f59e0b`, cyan `#22d3ee`
- Playfair Display for headings, Inter for body
- Eloquence Bands: A (cyan), B (violet/violet), C (gold)
- Professional, corporate feel — not cute/kids
- Glass-effect cards with backdrop-filter

### Existing WTE-Curriculum (index.html + grammar-data.js)
- 49 topics A1-C1 with tables, flipcards, reveals, warnings, exercises
- Anti-slop: no gradients, no glassmorphism, no emoji in buttons, no generic SaaS cards
- Backup at `index.html.bak.*`
- Grammar filter: single level, B1 default
- Data pattern: `{t, intro, sections:[{type, title, content|cards|items|examples}], exercises:[{type, q, choices?, a}]}`

### What We're NOT Doing
- Not copying test-english content — using their pedagogical approach as inspiration
- Not adding frameworks — vanilla JS only
- Not breaking existing Speaking Practice tab
- Not changing WTE brand colors (lime #a3e635) — keeping WTE identity

---

## Proposed Approach

### Phase 1: Character Design & SVG Art
Create an original SVG character — "Luma" — a sleek, abstract light-being that guides learners. Not a cartoon mascot. Think: geometric/abstract, premium feel. Appears in a fixed side panel during grammar lessons.

### Phase 2: Enhanced Grammar Content
Rewrite ALL grammar topics with:
- More sections per topic (test-english style: Form → Use → Common Mistakes → Practice)
- More exercise types: add "reorder words" and "find the error" types
- Professional English context for Eloquenta levels
- More examples per section (test-english uses 3-5 examples per grammar point)

### Phase 3: Character Interaction
Luma character:
- Shows tips when user gets an exercise wrong
- Celebrates when user gets 3+ correct in a row
- Has idle animations (breathing, blinking)
- Has speech bubbles with grammar tips
- Can be minimized/maximized

### Phase 4: Design Overhaul (Claude-Design)
Apply Eloquenta-inspired premium design:
- Dark teal texture background
- Playfair Display for grammar section headings
- Band-colored accents per level (A=cyan, B=violet, C=gold)
- Refined card hover states
- Character panel with backdrop-filter glass effect

---

## Files That Will Change

- **Create:** `/home/irieb/William's Projects/web-apps/WTE-Curriculum/grammar-guide.js` — Character interaction + lesson logic
- **Create:** `/home/irieb/William's Projects/web-apps/WTE-Curriculum/grammar-guide.css` — Character animations + design
- **Modify:** `/home/irieb/William's Projects/web-apps/WTE-Curriculum/index.html` — Add character panel, update nav, add guide tab
- **Modify:** `/home/irieb/William's Projects/web-apps/WTE-Curriculum/grammar-data.js` — Enhanced content for all 49 topics
- **Backup:** `index.html.bak.<timestamp>` (CRITICAL)

---

## Step-by-Step Plan

### Task 1: Backup Current Files
**Objective:** Create timestamped backups before any changes.

**Files:**
- Backup: `/home/irieb/William's Projects/web-apps/WTE-Curriculum/index.html`

```bash
cp "/home/irieb/William's Projects/web-apps/WTE-Curriculum/index.html" "/home/irieb/William's Projects/web-apps/WTE-Curriculum/index.html.bak.$(date +%Y%m%d_%H%M%S)"
```

**Step 1:** Run backup command
**Step 2:** Verify backup exists: `ls -la *.bak.*`

---

### Task 2: Create grammar-guide.css — Character & Design System
**Objective:** Create the character SVG + CSS animations + premium Eloquenta-inspired design for the grammar section.

**Files:**
- Create: `/home/irieb/William's Projects/web-apps/WTE-Curriculum/grammar-guide.css`

**Content:** Complete CSS file including:

```css
/* ═══ CHARACTER: Luma ═══ */
.luma-panel{position:fixed;right:20px;bottom:20px;z-index:100;width:220px;transition:all .3s}
.luma-panel.minimized{width:56px;height:56px}
.luma-avatar{width:100%;height:180px;position:relative}
.luma-avatar svg{width:100%;height:100%}
.luma-bubble{background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:12px;font-size:12px;line-height:1.5;color:var(--text);margin-top:8px;position:relative}
.luma-bubble::before{content:'';position:absolute;top:-6px;left:50%;transform:translateX(-50%);border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:6px solid var(--border)}
.luma-speech{text-align:center;animation:bounce-in .3s ease}
.luma-controls{display:flex;justify-content:space-between;margin-top:8px}
.lume-btn{padding:4px 10px;border-radius:6px;border:1px solid var(--border);background:var(--bg3);color:var(--text-dim);font-size:10px;cursor:pointer;font-family:inherit}
.luma-btn:hover{border-color:var(--accent);color:var(--accent)}

/* Character animations */
@keyframes luma-breathe{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.03)}}
@keyframes luma-blink{0%,90%,100%{opacity:1}95%{opacity:0}}
@keyframes luma-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
@keyframes bounce-in{0%{opacity:0;transform:scale(.9)}100%{opacity:1;transform:scale(1)}}
@keyframes celebrate{0%,100%{transform:rotate(0)}25%{transform:rotate(-5deg)}75%{transform:rotate(5deg)}}
.luma-idle .luma-body{animation:luma-breathe 3s ease-in-out infinite;transform-origin:center bottom}
.luma-idle .luma-eyes{animation:luma-blink 4s ease-in-out infinite}
.luma-idle .luma-glow{animation:luma-float 2.5s ease-in-out infinite}
.luma-celebrate .luma-body{animation:celebrate .5s ease-in-out 3}

/* ═══ GRAMMAR SECTION REDESIGN ═══ */
/* Band colors */
.band-a{--band:#22d3ee}
.band-b{--band:#a78bfa}
.band-c{--band:#fbbf24}

/* Grammar header */
.grammar-header{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;cursor:pointer;transition:background .15s}
.grammar-header:hover{background:var(--bg3)}
.grammar-header-left{display:flex;align-items:center;gap:10px}
.grammar-band-dot{width:8px;height:8px;border-radius:50%;background:var(--band,var(--accent))}
.grammar-topic-title{font-size:15px;font-weight:600;font-family:'Playfair Display',serif}

/* Enhanced sections */
.grammar-section{margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid var(--border)}
.grammar-section:last-child{border-bottom:none;margin-bottom:0}
.grammar-section-title{font-family:'Playfair Display',serif;font-size:14px;font-weight:700;color:var(--band,var(--accent));margin-bottom:12px;letter-spacing:.5px}

/* Example sentences */
.example-list{display:flex;flex-direction:column;gap:8px}
.example-item{padding:10px 14px;background:var(--bg3);border-radius:8px;font-size:13px;line-height:1.6;border-left:2px solid var(--border)}
.example-item:hover{border-left-color:var(--band,var(--accent))}
.example-item .highlight{color:var(--band,var(--accent));font-weight:600}
.example-item .note{font-size:11px;color:var(--text-dim);margin-top:4px;font-style:italic}

/* Common mistakes */
.mistake-cards{display:grid;gap:8px}
.mistake-card{padding:12px;background:rgba(251,113,133,.04);border:1px solid rgba(251,113,133,.15);border-radius:8px}
.mistake-wrong{color:var(--rose);text-decoration:line-through;font-size:13px}
.mistake-correct{color:var(--green);font-size:13px;margin-top:4px}
.mistake-why{font-size:11px;color:var(--text-dim);margin-top:6px}

/* Reorder exercise */
.reorder-words{display:flex;flex-wrap:wrap;gap:6px;margin:12px 0}
.reorder-word{padding:6px 12px;background:var(--bg3);border:1px solid var(--border);border-radius:6px;font-size:13px;cursor:grab;user-select:none;transition:all .15s}
.reorder-word:hover{border-color:var(--band,var(--accent))}
.reorder-word.selected{background:var(--accent-dim);border-color:var(--accent)}
.reorder-answer{min-height:36px;padding:8px;background:var(--bg);border:1px dashed var(--border);border-radius:8px;margin-top:8px;display:flex;flex-wrap:wrap;gap:4px}

/* Error-find exercise */
.error-sentence{padding:12px;background:var(--bg3);border-radius:8px;font-size:14px;line-height:1.8;cursor:pointer}
.error-sentence:hover{background:var(--bg2)}
.error-word{text-decoration:underline wavy var(--rose);cursor:pointer}
.error-word:hover{background:rgba(251,113,133,.15)}

/* Tip bubbles */
.tip-bubble{background:rgba(163,230,53,.08);border:1px solid rgba(163,230,53,.2);border-radius:8px;padding:12px;font-size:12px;color:var(--accent);margin:12px 0;line-height:1.5}
.tip-bubble::before{content:'💡 Tip: ';font-weight:700}

/* Progress bar */
.grammar-progress{height:3px;background:var(--bg3);border-radius:2px;margin-top:16px;overflow:hidden}
.grammar-progress-fill{height:100%;background:var(--band,var(--accent));transition:width .3s;border-radius:2px}
```

**Verification:**
```bash
node --check grammar-guide.css  # CSS doesn't need syntax check, but verify no corruption
wc -l grammar-guide.css  # Should be ~150+ lines
```

---

### Task 3: Create grammar-guide.js — Character Logic & Lesson Interaction
**Objective:** Character state management, tip generation, exercise feedback, progress tracking.

**Files:**
- Create: `/home/irieb/William's Projects/web-apps/WTE-Curriculum/grammar-guide.js`

**Key functions:**

```javascript
// Character states
var Luma = {
  state: 'idle', // idle, thinking, celebrating, helping
  streak: 0,
  tips: {},
  visible: true,
  
  // SVG character markup (geometric light-being)
  svg: '<svg viewBox="0 0 200 180">...</svg>',
  
  // Show a tip in the speech bubble
  showTip: function(text) { ... },
  
  // React to exercise result
  onExerciseResult: function(correct, topicId, exerciseId) { ... },
  
  // Get contextual help when stuck
  getHelp: function(topicId) { ... },
  
  // Toggle minimize
  toggleMinimize: function() { ... },
  
  // Render character panel
  render: function() { ... },
  
  // Animate to state
  animateTo: function(state) { ... }
};

// Tip database — contextual tips per grammar topic
var LumaTips = {
  // Generated from grammar data — tips appear when user gets answer wrong
  // e.g., "A1-0-ex-0": "Remember: 'I' always pairs with 'am', never 'is' or 'are'"
};

// Exercise interaction enhancements
function setupReorderExercise(exId, correctOrder) { ... }
function setupErrorFindExercise(exId, errors) { ... }
function updateProgress(topicId) { ...}

// Initialize character on page load
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('luma-panel')) Luma.render();
});
```

**Verification:**
```bash
node --check grammar-guide.js
```

---

### Task 4: Rewrite grammar-data.js — Enhanced Content (A1 Topics)
**Objective:** Rewrite all 16 A1 topics with test-english-inspired depth: more sections, more examples, professional context.

**Pattern per topic (test-english model adapted):**
```
{
  t: "Topic Name",
  intro: "Brief explanation",
  sections: [
    {title: "Form", type: "table", content: "..."},           // The rule/table
    {title: "How to Use", type: "reveal", items: [...]},      // When to use it
    {title: "Examples", type: "example-list", examples: [...]}, // Real sentences
    {title: "Common Mistakes", type: "warning", examples: [...]}, // ❌ vs ✓
    {title: "Remember", type: "tip", content: "..."}          // Memory tip
  ],
  exercises: [
    {type: "choice", ...},     // Traditional multiple choice
    {type: "fill", ...},       // Fill in blank
    {type: "reorder", ...},    // NEW: reorder words to make sentence
    {type: "error-find", ...}, // NEW: find the error in sentence
    {type: "error", ...}       // Traditional error correction
  ]
}
```

**Key changes from current grammar-data.js:**
1. Add `example-list` section type with bordered example sentences
2. Add `tip` section type for memory aids
3. Add `mistake-card` style in warnings (separate wrong/correct/why)
4. Add `reorder` exercise type (drag words or click to build sentence)
5. Add `error-find` exercise type (click the wrong word in a sentence)
6. More examples per topic (3-5 instead of 2-3)
7. Professional English context where appropriate (Eloquenta focus)

**Files:**
- Modify: `/home/irieb/William's Projects/web-apps/WTE-Curriculum/grammar-data.js`

---

### Task 5: Rewrite grammar-data.js — Enhanced Content (A2 Topics)
**Objective:** Rewrite all 11 A2 topics with enhanced depth.

**Same pattern as Task 4, applied to A2 topics.**

---

### Task 6: Rewrite grammar-data.js — Enhanced Content (B1 Topics)
**Objective:** Rewrite all 9 B1 topics with enhanced depth.

---

### Task 7: Rewrite grammar-data.js — Enhanced Content (B2 + C1 Topics)
**Objective:** Rewrite all 13 B2+C1 topics with enhanced depth.

---

### Task 8: Update index.html — Main Shell Integration
**Objective:** Add character panel HTML, update CSS/JS references, refine design.

**Files:**
- Modify: `/home/irieb/William's Projects/web-apps/WTE-Curriculum/index.html`

**Changes:**
1. Add `<link rel="stylesheet" href="grammar-guide.css">` in `<head>`
2. Add `<script src="grammar-guide.js"></script>` before `</body>`
3. Add character panel HTML:
```html
<div id="luma-panel" class="luma-panel">
  <div class="luma-avatar" id="luma-avatar"></div>
  <div class="luma-bubble" id="luma-bubble" style="display:none">
    <div class="luma-speech" id="luma-speech"></div>
    <div class="luma-controls">
      <button class="luma-btn" onclick="Luma.toggleMinimize()">Minimize</button>
      <button class="luma-btn" onclick="Luma.getHelp(currentTopic)">Help</button>
    </div>
  </div>
</div>
```
4. Add Google Fonts link for Playfair Display
5. Refine grammar section CSS variables for band colors

---

### Task 9: Update renderGrammar() for New Section Types
**Objective:** Update the rendering function in grammar-data.js to handle new section types and exercise types.

**Functions to add/update in grammar-data.js:**
- `renderSection()` — add cases for `example-list` and `tip` types
- `renderExercise()` — add cases for `reorder` and `error-find` types
- Call `setupReorderExercise()` and `setupErrorFindExercise()` from grammar-guide.js after render

---

### Task 10: Testing & Verification
**Objective:** Verify everything works end-to-end.

**Steps:**
1. Open `index.html` in browser (via local server, not file://)
2. Navigate to Lessons tab → verify B1 level shows by default
3. Open a grammar topic → verify all section types render correctly
4. Complete exercises → verify character responds (correct/incorrect feedback)
5. Test search filter → verify filtering works
6. Test level switching → verify character persists
7. Test minimize/maximize → verify character panel toggles
8. Verify no console errors: `Ctrl+Shift+J` in browser
9. Backup again after successful test

---

## Risks & Tradeoffs

1. **File size:** Enhanced grammar-data.js could grow to 150KB+. Mitigation: keep data dense, use abbreviations in keys
2. **Rendering performance:** 49 topics × many sections could be slow on render. Mitigation: render only visible level (already done), lazy render topics on expand
3. **Character SVG complexity:** Complex SVG = more CSS = potential jank. Mitigation: keep SVG simple (geometric shapes only), use CSS transforms for animations (GPU-accelerated)
4. **Scope creep:** This is a large rewrite. Mitigation: tasks are ordered — can stop after Task 2-3 if needed for a working increment

## Open Questions

1. Should the character be an SVG animation or a CSS-only geometric shape? (Recommend SVG for more detail)
2. Should we keep the existing WTE lime green or switch to Eloquenta teal for the grammar guide section? (Recommend keeping WTE lime, adding teal accents for band colors)
3. Should the character have voice/audio tips using the TTS system we installed? (Future enhancement, not in this plan)

---

## Execution Order

**Phase 1 (Foundation):** Tasks 1, 2, 3 → Character + design system ready
**Phase 2 (Content):** Tasks 4, 5, 6, 7 → All grammar content rewritten  
**Phase 3 (Integration):** Tasks 8, 9 → Shell + rendering connected
**Phase 4 (Polish):** Task 10 → Testing + refinement

**Recommended:** Execute Phase 1 first (gives us the character + design), test it looks good, then proceed with content rewrite. This way we can see the character in action before committing to the full rewrite.
