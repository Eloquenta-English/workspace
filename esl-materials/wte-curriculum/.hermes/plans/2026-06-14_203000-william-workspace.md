# William's Workspace — Project Gallery & Routing Fix

> **For Hermes:** Implement task-by-task. Each task = 2-5 min focused work.

**Goal:** Fix `williamthomason.github.io/ESL-Edutech/` to show William's Workspace (project gallery) as the landing page, with all projects that have an `index.html` displayed as clickable cards. Hermes Dashboard should be a project card, NOT the root page.

**Root Cause:** The root `/home/irieb/github_project/index.html` was overwritten with the Hermes Dashboard content. GitHub Pages serves this as the site root instead of the Agentic-OS workspace.

**Architecture:**
- Root `index.html` = William's Workspace (project gallery showing all projects with cards)
- Each project directory keeps its own `index.html` (unchanged)
- Project cards link to `/ProjectName/` subdirectory
- Agentic-OS workspace functionality preserved as a project card linking to `/Agentic-OS/`
- Hermes Dashboard fixed separately (port 8645, free fallback models)

---

## Current State

**Problem:** `williamthomason.github.io/ESL-Edutech/` serves Hermes Dashboard as root.

**Projects with `index.html` (17 total):**
```
Agentic-OS/index.html          ← This IS the workspace (3D galaxy view)
Alien-Recorder/index.html
ChromaSkin/index.html
Crop-Circles/index.html
Diabetes and Anandamide/index.html
Eloquenta Video Call/index.html
Forest-Friends/index.html
Guitar Fretboard/index.html
Hermes-Window-Manager/index.html
Language-Widget/index.html
Music-By-Humans/index.html
OobzoO/index.html
Past Simple Masterclass/index.html
Resonance-DAW/index.html
eloquenta-knowledge-base/index.html
recruit/index.html
wte-content/index.html
```

**Key Insight:** `Agentic-OS/index.html` is a 3D galaxy visualization workspace (Three.js). It was designed to be the root or a separate app. William's actual "workspace" should be a simple, clean project gallery that lists ALL projects. The Agentic-OS 3D galaxy can be one of the project cards.

---

## Design Approach

**Style:** Match WTE brand — dark `#1c1c1c`, lime accent `#a3e635`, surfaces `#232323`. No gradients, no glassmorphism, no emoji in buttons. Clean, terminal-inspired. Fidgetty/draggable cards as easter egg.

**Layout:**
- Fixed top bar: "W<span>T</span>E" logo + "William's Workspace" title
- Filter bar: search input + category pills (All / Websites / Apps / Games / Learning / Design / Archive)
- Project grid: cards with folder name, file count, last modified date, color dot
- Click card → opens `/ProjectName/` in new tab
- Easter egg: draggable cards (fidgetty), double-click card → secret animation

**Card design:**
- Folder icon (simple SVG, no emoji)
- Project name (title case, derived from folder name)
- File count badge
- Last modified date
- Color dot based on category
- Hover: subtle transform + border color change
- No screenshots (too complex to generate)
