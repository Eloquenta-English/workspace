# ELOQUENTA — Complete Build Plan

## Vision
A premium ESL platform for adult learners. Dark-first design with mustard/burgundy accents that stands out in the ESL space. "Protect your eyes" positioning. Cal.com booking → trial lesson → paid subscriptions. Video classes via talky.io. Every project (Alien Metronome, Guitar Fretboard, etc.) gets the ChromaSkin theme engine.

## Design System
- **Default theme:** Dark with mustard (#fbbf24) + burgundy (#991b1b) accents
- **Classic mode:** Clean white/light theme toggle
- **Theme picker:** ChromaSkin-powered, 6+ presets + custom hue slider
- **Typography:** Space Grotesk (headings) + Inter (body)
- **No emoji in UI** — Unsplash images only
- **CTA on every page** — Book trial / View pricing

---

## PHASE 0: ChromaSkin Widget Redesign (Foundation)
*Everything depends on this. Build once, use everywhere.*

### Task 0.1 — ChromaSkin Standalone Library
**File:** `/home/irieb/William's Projects/ChromaSkin/chromaskin.css`
- Extract the HSL engine from index.html into a standalone CSS file
- Single `--hue` variable drives entire palette
- Export: `--bg`, `--bg2`, `--text`, `--text-muted`, `--accent`, `--accent2`, `--border`, `--green`, `--amber`, `--rose`, `--violet`
- Dark/light mode: add `--mode: dark|light` toggle
- 6 built-in presets: `midnight` (default), `mustard`, `burgundy`, `forest`, `ocean`, `classic-white`
- Smooth 300ms transition on theme change

**Verify:** Open in browser, toggle presets, check all CSS variables update.

### Task 0.2 — ChromaSkin JS Controller
**File:** `/home/irieb/William's Projects/ChromaSkin/chromaskin.js`
- `ChromaSkin.setPreset(name)` — apply a preset
- `ChromaSkin.setHue(h)` — custom hue 0-360
- `ChromaSkin.setMode('dark'|'light')` — toggle dark/light
- `ChromaSkin.save()` / `ChromaSkin.load()` — localStorage persistence
- `ChromaSkin.exportCSS()` — return CSS string for download
- URL param: `?theme=mustard&hue=45&mode=dark`

**Verify:** Console test — `ChromaSkin.setPreset('mustard')` updates all colors.

### Task 0.3 — ChromaSkin Widget UI
**File:** `/home/irieb/William's Projects/ChromaSkin/widget.html`
- Compact floating widget (bottom-right corner)
- Preset swatches (6 color dots)
- Hue slider (0-360 rainbow gradient)
- Dark/Light toggle switch
- "Save" button + "Reset to default"
- Collapsible — small dot when closed, expands on click
- Works on any page that includes chromaskin.css + chromaskin.js

**Verify:** Embed in a test page, toggle themes, check persistence across reload.

---

## PHASE 1: Eloquenta Site Architecture
*Build the shell. No booking/payments yet — just structure and design.*

### Task 1.1 — Site Map & Routing
**File:** `/home/irieb/William's Projects/Eloquenta/site-structure.md`
```
/                   → Landing page (hero + steps + CTA)
/curriculum         → Curriculum overview (FL0-FL13 levels)
/teachers           → Teacher profiles
/pricing            → Pricing plans + Cal.com booking widget
/trial              → Free trial booking flow
/classroom          → Video call (talky.io embed)
/materials          → Learning materials (Topical Conversations, etc.)
/theme              → ChromaSkin theme picker page
/login              → Student login
/dashboard          → Student dashboard (progress, next lesson, materials)
```

### Task 1.2 — Base Template with ChromaSkin
**File:** `/home/irieb/William's Projects/Eloquenta/template.html`
- Include chromaskin.css + chromaskin.js
- Navbar: logo + links + "Book Free Trial" CTA
- Footer: links + copyright
- ChromaSkin widget embedded (bottom-right)
- Theme persists across all pages via localStorage
- Responsive: mobile hamburger menu

**Verify:** Open template, toggle theme, navigate between test pages.

### Task 1.3 — Landing Page (Dark Theme Default)
**File:** `/home/irieb/William's Projects/Eloquenta/index.html`
- Hero: "Online English for Adults" + mustard accent + "Book Free Trial" CTA
- How It Works: 4-step cards (Book → Placement → Learn → Track)
- Pricing preview: 3 tiers + "View Full Pricing" link
- Testimonials section (placeholder)
- Footer
- All images from Unsplash (no emoji)
- ChromaSkin theme picker accessible from footer

**Verify:** Open in browser, check responsive, toggle to classic-white mode.

### Task 1.4 — Pricing Page
**File:** `/home/irieb/William's Projects/Eloquenta/pricing.html`
- 3 tiers: Trial (free), Standard (monthly), Intensive (2x/week)
- Feature comparison table
- "Book Free Trial" button → Cal.com embed
- FAQ accordion
- ChromaSkin theme persists

**Verify:** Cal.com widget loads, theme toggle works on this page.

---

## PHASE 2: Booking & Payment Flow
*Cal.com integration → trial lesson → payment.*

### Task 2.1 — Cal.com Booking Widget
**File:** Inline in pricing.html + trial.html
- Embed Cal.com inline widget (free trial event type)
- Pre-fill: name, email, timezone
- After booking: redirect to `/dashboard?booked=true`
- Confirmation email via Cal.com

**Verify:** Book a test appointment, receive confirmation.

### Task 2.2 — Trial Lesson Flow
**File:** `/home/irieb/William's Projects/Eloquenta/trial.html`
- Pre-lesson checklist: test microphone, camera, internet
- "Join Classroom" button → talky.io room (Task 3.1)
- Countdown timer to lesson start
- Materials download link

**Verify:** Full flow from booking → reminder → join classroom.

### Task 2.3 — Payment Integration
**File:** `/home/irieb/William's Projects/Eloquenta/dashboard.html`
- After trial: show payment options
- Stripe checkout link (monthly subscription)
- PayPal button
- Crypto payment option (BTC/ETH via Coinbase Commerce)
- Payment success → unlock dashboard

**Verify:** Test payment flow with Stripe test mode.

---

## PHASE 3: Video Classroom (talky.io)
*Replace Google Meet with talky.io for lower latency, better for ESL.*

### Task 3.1 — talky.io Integration
**File:** `/home/irieb/William's Projects/Eloquenta/classroom.html`
- talky.io embed (iframe or JS SDK)
- Room name: `eloquenta-{student}-{date}`
- Pre-join: camera/mic check
- In-call: chat, screen share, recording toggle
- Post-call: feedback form + next lesson booking

**Verify:** Join room from two browser tabs, test audio/video/chat.

### Task 3.2 — Classroom UI Polish
- ChromaSkin theme applied to classroom wrapper
- "Leave Call" button (confirms before leaving)
- Connection quality indicator
- Mute/unmute, camera on/off, screen share buttons
- Fullscreen toggle

**Verify:** All controls work, theme persists, no console errors.

---

## PHASE 4: Student Dashboard
*Post-login experience. Progress tracking, materials, next lesson.*

### Task 4.1 — Dashboard Shell
**File:** `/home/irieb/William's Projects/Eloquenta/dashboard.html`
- Sidebar nav: Overview, Materials, Progress, Settings
- Overview: next lesson card, current level, streak
- ChromaSkin theme toggle in settings

**Verify:** Navigate between sections, theme persists.

### Task 4.2 — Learning Materials Hub
**File:** `/home/irieb/William's Projects/Eloquenta/materials.html`
- Topical Conversations integration (the 1,452 questions we scraped)
- Filter by topic, level, question type
- Print/PDF export per topic
- Search functionality

**Verify:** Browse topics, filter, export a topic to PDF.

### Task 4.3 — Progress Tracking
**File:** Dashboard → Progress section
- Level indicator (FL0-FL13)
- Lessons completed counter
- Skills radar chart (speaking, listening, reading, writing, grammar, vocabulary)
- Assessment history

**Verify:** Data persists in localStorage (backend later).

---

## PHASE 5: Content Pages
*Curriculum, teachers, extras.*

### Task 5.1 — Curriculum Page
**File:** `/home/irieb/William's Projects/Eloquenta/curriculum.html`
- 14 levels (FL0-FL13) with descriptions
- Skills covered per level
- Sample materials per level
- "Find Your Level" → placement test link

### Task 5.2 — Teachers Page
**File:** `/home/irieb/William's Projects/Eloquenta/teachers.html`
- Teacher cards: photo, bio, languages, specialties
- "Book with [Name]" → Cal.com with teacher-specific link

### Task 5.3 — Extras / Blog
**File:** `/home/irieb/William's Projects/Eloquenta/blog.html`
- Health content (Anandamide research, etc.)
- ESL tips
- Guitar tools cross-promotion

---

## PHASE 6: Apply ChromaSkin to All Projects
*Every existing project gets the theme engine.*

### Task 6.1 — Alien Metronome
- Add chromaskin.css + chromaskin.js includes
- Theme picker in settings panel
- Default: mustard/burgundy dark theme

### Task 6.2 — Guitar Fretboard / Alien Fret
- Add ChromaSkin
- Theme persists across all music tools

### Task 6.3 — Forest Friends
- Kid-friendly presets (bright, playful)
- Parent theme override

### Task 6.4 — OobzoO DAW
- Dark theme default (musicians prefer dark)
- ChromaSkin for accent colors only

---

## PHASE 7: Polish & Launch
*Testing, performance, deployment.*

### Task 7.1 — Cross-Browser Testing
- Chrome, Firefox, Safari, Edge
- Mobile: iOS Safari, Android Chrome
- Test all forms, booking, video call

### Task 7.2 — Performance
- Lighthouse score > 90
- Image optimization (WebP, lazy loading)
- CSS/JS minification

### Task 7.3 — SEO & Meta
- Open Graph tags per page
- Meta descriptions
- Sitemap.xml
- robots.txt

### Task 7.4 — Deployment
- GitHub Pages (existing: williamthomason.github.io/ESL-Edutech)
- Custom domain: eloquenta.com
- SSL via Cloudflare

### Task 7.5 — Analytics
- Google Analytics 4
- Cal.com conversion tracking
- Heatmap (Hotjar free tier)

---

## Debug Protocol (Per Task)
1. **Reproduce** — open the specific file/page, note exact failure
2. **Isolate** — read only the files touched by the error
3. **One change** — fix one thing at a time
4. **Verify** — `node --input-type=module` for JS, browser for HTML/CSS
5. **Document** — note root cause + edge case before moving on
6. **Rule of 3** — 3 failed fixes → stop, question architecture, ask William

---

## Timeline Estimate
| Phase | Tasks | Est. Time |
|-------|-------|-----------|
| 0 — ChromaSkin | 3 | 2-3 days |
| 1 — Site Architecture | 4 | 3-4 days |
| 2 — Booking & Payment | 3 | 2-3 days |
| 3 — Video Classroom | 2 | 1-2 days |
| 4 — Dashboard | 3 | 2-3 days |
| 5 — Content Pages | 3 | 2-3 days |
| 6 — Apply to Projects | 4 | 3-4 days |
| 7 — Polish & Launch | 5 | 2-3 days |
| **Total** | **27** | **17-25 days** |

---

## Prompt Library (For Easy Lookup)

### ChromaSkin Presets
```
midnight:  hue=220, sat=15, lit=8   (dark blue-grey)
mustard:   hue=45,  sat=60, lit=12   (dark with mustard accent)
burgundy:  hue=350, sat=45, lit=10   (dark with burgundy accent)
forest:    hue=140, sat=35, lit=10   (dark green)
ocean:     hue=200, sat=50, lit=12   (dark teal)
classic:   hue=220, sat=5,  lit=95   (white/light mode)
```

### Key File Paths
```
ChromaSkin engine:  ~/William's Projects/ChromaSkin/
Eloquenta site:     ~/William's Projects/Eloquenta/
Landing page:       ~/William's Projects/Eloquenta/index.html
Pricing:            ~/William's Projects/Eloquenta/pricing.html
Classroom:          ~/William's Projects/Eloquenta/classroom.html
Dashboard:          ~/William's Projects/Eloquenta/dashboard.html
Materials:          ~/William's Projects/Eloquenta/materials.html
Video call:         ~/William's Projects/Eloquenta Video Call/index.html
```

### Cal.com Embed Code
```html
<!-- Inline embed -->
<div id="cal-embed"></div>
<script>
  Cal("init", {origin:"https://cal.com"});
  Cal("inline", {
    elementOrSelector:"#cal-embed",
    calLink:"eloquenta/free-trial",
    layout:"month_view"
  });
</script>
<script async src="https://cal.com/embed.js"></script>
```

### talky.io Embed Code
```html
<iframe
  src="https://talky.io/eloquenta-{room-name}"
  allow="camera; microphone; fullscreen; display-capture"
  style="width:100%;height:100vh;border:none;">
</iframe>
```

### ChromaSkin CSS Variable Pattern
```css
:root {
  --hue: 45;    /* mustard default */
  --sat: 60%;
  --lit: 12%;
  --bg:        hsl(var(--hue), calc(var(--sat) * 0.3), var(--lit));
  --bg2:       hsl(var(--hue), calc(var(--sat) * 0.25), calc(var(--lit) * 0.7));
  --text:      hsl(var(--hue), calc(var(--sat) * 0.1), 95%);
  --text-muted:hsl(var(--hue), calc(var(--sat) * 0.08), 65%);
  --accent:    hsl(var(--hue), var(--sat), 55%);
  --accent2:   hsl(calc(var(--hue) + 30), var(--sat), 50%);
  --border:    hsl(var(--hue), calc(var(--sat) * 0.15), 18%);
  --green:     hsl(145, 50%, 50%);
  --amber:     hsl(45, 90%, 55%);
  --rose:      hsl(350, 60%, 55%);
  --violet:    hsl(270, 50%, 60%);
}
```

---

*Plan created: 2026-006-06*
*Next action: Start with Task 0.1 — ChromaSkin standalone CSS library*
