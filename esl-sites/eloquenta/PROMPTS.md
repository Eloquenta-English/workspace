# ELOQUENTA — Prompt Library & Quick Reference

## How to Use This File
Copy any prompt below into a new Hermes session to continue work on that specific task.
Each prompt is self-contained with file paths and verification steps.

---

## CHROMASKIN PROMPTS

### Prompt: Build ChromaSkin CSS Library
```
Build the ChromaSkin standalone CSS library at ~/William's Projects/ChromaSkin/chromaskin.css

Requirements:
- Single --hue CSS variable (0-360) drives entire palette
- Derived variables: --bg, --bg2, --text, --text-muted, --accent, --accent2, --border, --green, --amber, --rose, --violet
- 6 built-in presets as CSS classes: .midnight, .mustard, .burgundy, .forest, .ocean, .classic-white
- Dark/light mode: add [data-theme="light"] overrides
- Smooth 300ms transition on all color properties
- No external dependencies

Preset values:
- midnight:  hue=220, sat=15%, lit=8%
- mustard:   hue=45,  sat=60%, lit=12%
- burgundy:  hue=350, sat=45%, lit=10%
- forest:    hue=140, sat=35%, lit=10%
- ocean:     hue=200, sat=50%, lit=12%
- classic-white: hue=220, sat=5%, lit=95%

Verify: Create a test HTML that includes the CSS, apply each preset class to <body>, confirm colors change.
```

### Prompt: Build ChromaSkin JS Controller
```
Build the ChromaSkin JS controller at ~/William's Projects/ChromaSkin/chromaskin.js

Requirements:
- Global `ChromaSkin` object
- ChromaSkin.setPreset(name) — apply a preset (updates <body> class)
- ChromaSkin.setHue(h) — custom hue 0-360
- ChromaSkin.setMode('dark'|'light') — toggle data-theme attribute
- ChromaSkin.save() — persist to localStorage
- ChromaSkin.load() — restore from localStorage (call on page load)
- ChromaSkin.exportCSS() — return CSS string for download
- URL parameter support: ?theme=mustard&hue=45&mode=dark
- Dispatch 'chromaskin:change' event on every theme change

Verify: Console test — ChromaSkin.setPreset('mustard'), check body class, reload page, confirm persistence.
```

### Prompt: Build ChromaSkin Widget UI
```
Build the ChromaSkin floating widget at ~/William's Projects/ChromaSkin/widget.html

Requirements:
- Compact floating widget, bottom-right corner
- 6 preset color swatches (click to apply)
- Hue slider (rainbow gradient background, 0-360)
- Dark/Light toggle switch
- Save button + Reset to default
- Collapsible: small colored dot when closed, expands on click
- Position: fixed, bottom: 20px, right: 20px
- z-index: 9999
- Include chromaskin.css + chromaskin.js
- Works on any page that includes those two files

Verify: Open widget.html, toggle all presets, check collapse/expand, verify persistence.
```

---

## ELOQUENTA SITE PROMPTS

### Prompt: Build Eloquenta Base Template
```
Build the Eloquenta base template at ~/William's Projects/Eloquenta/template.html

Requirements:
- Include chromaskin.css + chromaskin.js from ../ChromaSkin/
- Sticky navbar: "ELOQUENTA" logo + nav links + "Book Free Trial" CTA button
- Nav links: How It Works, Curriculum, Pricing, Login
- Footer: copyright, privacy, terms, theme toggle
- ChromaSkin widget embedded (bottom-right)
- Theme persists via ChromaSkin.load() on page load
- Responsive: hamburger menu on mobile (<768px)
- Default theme: mustard (dark)
- Space Grotesk for headings, Inter for body
- No emoji — clean text only

Verify: Open in browser, toggle theme, check responsive, confirm persistence.
```

### Prompt: Build Eloquenta Landing Page
```
Build the Eloquenta landing page at ~/William's Projects/Eloquenta/index.html

Use the base template from template.html. Content:

HERO:
- H1: "Online English for Adults" (mustard accent on "Adults")
- Sub: "1-on-1 lessons with live translation. Structured curriculum from beginner to advanced."
- CTA: "Book Your Free Trial" (links to /pricing.html#booking)
- Background: dark, subtle gradient

HOW IT WORKS (4 cards):
1. Book Free Trial — "Schedule your free 30-minute session across time zones"
2. Placement Test — "We assess your level (FL0-FL13) covering all skill areas"
3. Start Learning — "1-on-1 lessons via video call with live translations"
4. Track Progress — "End-of-block assessments, level ups, clear progress reports"

PRICING PREVIEW:
- 3 tiers shown as cards (Trial/Standard/Intensive)
- "View Full Pricing" link

CTA SECTION:
- "Ready to improve your English?"
- "Book Free Trial" + "View Pricing" buttons

All images from Unsplash. No emoji. ChromaSkin theme persists.

Verify: Open in browser, check all sections render, toggle theme, test responsive.
```

### Prompt: Build Pricing Page with Cal.com
```
Build the Eloquenta pricing page at ~/William's Projects/Eloquenta/pricing.html

Use base template. Content:

PRICING TIERS (3 cards):
- Trial: Free, 30 minutes, 1 session
- Standard: $X/month, 4 lessons, 1-on-1, materials included
- Intensive: $X/month, 8 lessons, 1-on-1, materials + recordings

BOOKING SECTION:
- Cal.com inline embed (calLink: "eloquenta/free-trial")
- Layout: month_view
- Pre-fill timezone from browser

FAQ (accordion, 6 questions):
- What happens after the trial?
- Can I reschedule?
- What do I need for lessons?
- Which level am I?
- Do you offer group classes?
- What payment methods?

Verify: Cal.com widget loads, accordion works, theme persists.
```

### Prompt: Build Video Classroom Page
```
Build the Eloquenta classroom page at ~/William's Projects/Eloquenta/classroom.html

Requirements:
- talky.io embed (iframe, allow camera/mic/fullscreen/display-capture)
- Room name from URL param: ?room=eloquenta-{student}-{date}
- Pre-join screen: camera/mic check, "Enter Classroom" button
- In-call controls: mute, camera, screen share, leave (with confirm)
- Connection quality indicator
- ChromaSkin theme applied to wrapper (not iframe)
- Fullscreen toggle
- Post-call: feedback form (1-5 stars + comment) + "Book Next Lesson" link

Verify: Join room from two tabs, test all controls, check theme.
```

### Prompt: Build Student Dashboard
```
Build the Eloquenta student dashboard at ~/William's Projects/Eloquenta/dashboard.html

Requirements:
- Sidebar nav: Overview, Materials, Progress, Settings
- Overview section: next lesson card (date/time + join button), current level badge, lesson streak
- Materials section: links to Topical Conversations, grammar resources, vocabulary lists
- Progress section: level indicator (FL0-FL13), skills radar chart (canvas), assessment history table
- Settings section: ChromaSkin theme picker, notification preferences, account info
- If not logged in: redirect to /login.html
- Mock data in localStorage for now

Verify: Navigate all sections, theme toggle in settings works, mock data displays.
```

### Prompt: Build Materials Page with Topical Conversations
```
Build the materials page at ~/William's Projects/Eloquenta/materials.html

Requirements:
- Display the 109 topics from Topical Conversations (scraped data)
- Two-column layout: topic list (left) + question display (right)
- Filter: by category (10 categories), by level (beginner/intermediate/advanced)
- Search: filter topics by keyword
- Each topic shows: title, question count, "View Questions" button
- Question view: original + paraphrased, numbered list
- Print/PDF button (window.print())
- ChromaSkin theme persists

Verify: Browse topics, filter, search, view questions, print preview.
```

---

## INTEGRATION PROMPTS

### Prompt: Apply ChromaSkin to Alien Metronome
```
Add ChromaSkin theme engine to the Alien Metronome at ~/William's Projects/Alien Metronome/index.html

Requirements:
- Add chromaskin.css + chromaskin.js includes (from ../ChromaSkin/)
- Add ChromaSkin widget (bottom-right)
- Add theme picker to the effects section (preset swatches + hue slider)
- Default theme: mustard (dark with mustard accent)
- All existing functionality preserved
- Theme persists across page reloads

Verify: Open metronome, play a beat, toggle themes, check all UI updates, reload to confirm persistence.
```

### Prompt: Apply ChromaSkin to Guitar Fretboard
```
Add ChromaSkin theme engine to Guitar Fretboard at ~/William's Projects/Guitar Fretboard/index.html

Requirements:
- Add chromaskin.css + chromaskin.js includes
- Add ChromaSkin widget
- Default theme: forest (dark green)
- Fretboard colors update with theme (fret wires, string lines, note dots)
- Theme persists

Verify: Open fretboard, select a scale, toggle themes, check fretboard colors update.
```

---

## DEBUG PROMPTS

### Prompt: Debug ChromaSkin Not Applying
```
Debug ChromaSkin theme not applying to a page.

Steps:
1. Check browser console for JS errors
2. Verify chromaskin.css and chromaskin.js are loading (Network tab)
3. Check if ChromaSkin object exists: `console.log(ChromaSkin)`
4. Check body class: `document.body.className`
5. Check CSS variables: `getComputedStyle(document.body).getPropertyValue('--hue')`
6. Check localStorage: `localStorage.getItem('chromaskin')`

File to check: [paste file path]
Error observed: [paste exact error]
```

### Prompt: Debug Cal.com Widget Not Loading
```
Debug Cal.com booking widget not loading on pricing page.

Steps:
1. Check browser console for errors
2. Verify embed.js is loading (Network tab)
3. Check if `Cal` function exists: `console.log(typeof Cal)`
4. Check the cal-embed div exists: `document.getElementById('cal-embed')`
5. Test with minimal Cal.com embed in isolation
6. Check if ad blocker is interfering

File: ~/William's Projects/Eloquenta/pricing.html
```

### Prompt: Debug talky.io Embed Not Working
```
Debug talky.io video classroom not loading.

Steps:
1. Check browser console for errors
2. Verify iframe src URL is correct
3. Check if camera/mic permissions are granted
4. Test talky.io URL directly in a new tab
5. Check if HTTPS is required (talky.io needs secure context)
6. Verify allow attribute on iframe includes camera, microphone, fullscreen

File: ~/William's Projects/Eloquenta/classroom.html
```

---

*Last updated: 2026-06-06*
