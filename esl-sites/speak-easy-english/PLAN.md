# Articulate English — Complete Build Plan

**Folder:** `/home/irieb/William's Projects/Articulate English/`
**Reference design:** https://williamthomason.github.io/ESL-Edutech/Eloquenta/landing.html
**Design spec:** DESIGN.md (in this folder)
**Pricing spec:** PRICING.md (in this folder)

---

## Architecture

Single-page-app style but built as separate HTML files. Each page is self-contained with embedded CSS and JS. Shared components (nav, footer, button styles) are duplicated per page initially — can be refactored into includes later if a build step is added.

**No build tools. No npm. No frameworks.** Plain HTML/CSS/JS. Opens directly in browser via file:// or GitHub Pages.

---

## File Structure

```
Articulate English/
├── DESIGN.md                          ← Design token spec (authoritative)
├── PRICING.md                         ← Pricing rules and calculator spec
├── PLAN.md                            ← This file — build plan with prompts
├── SITEMAP.md                         ← Site structure reference
├── TEACHER_PAYMENT_POLICY.md          ← Teacher-facing payment policy
│
├── index.html                         ← Landing page
├── login.html                         ← Login page
├── signup.html                        ← Sign up page
├── terms.html                         ← Terms of service
├── privacy.html                       ← Privacy policy
├── contact.html                       ← Contact page
├── payment-policy.html                ← Public teacher payment policy
│
├── pricing/
│   └── index.html                     ← Interactive pricing calculator
│
├── services/
│   ├── index.html                     ← Services overview
│   ├── general-english.html           ← General English / Young Learners
│   ├── exam-prep.html                 ← Exam preparation
│   ├── accent-training.html           ← Accent coaching
│   └── business-english.html          ← Business English
│
├── teachers/
│   ├── index.html                     ← Teacher directory (browse/search)
│   ├── become-a-teacher.html          ← Teacher application
│   └── profile.html                   ← Individual teacher profile (template)
│
├── student/
│   ├── dashboard.html                 ← Student dashboard
│   ├── lessons.html                   ← Lesson history
│   └── account.html                   ← Account settings
│
└── teacher/
    ├── dashboard.html                 ← Teacher dashboard
    ├── lessons.html                   ← Teacher lesson management
    ├── earnings.html                  ← Earnings + payout history
    └── training.html                  ← Training modules + exam
```

---

## Build Order

### Phase 1: Landing Page + Pricing Calculator (Week 1)

These are the two most important pages. The landing page converts visitors. The pricing calculator closes them.

#### Task 1: index.html — Landing Page

**Reference:** The existing Eloquenta landing.html (490 lines) is the structural template. Keep the same section patterns (nav, hero, trust bar, offer grid, diff grid, pricing, referral, beta, FAQ, CTA, footer) but rebrand everything for Articulate English.

**Key changes from Eloquenta landing:**
- Colors: mustard (#f59e0b) instead of cyan (#22d3ee)
- Brand name: "Articulate English" instead of "Eloquenta"
- Audience: individual learners, not corporate
- Services: General English, Exam Prep, Accent Training, Business English
- Pricing: EUR 14-39/session instead of $29-65
- Remove corporate/enterprise section
- Remove beta pioneer section (or repurpose as launch offer)
- Add prominent "Pricing Calculator" CTA
- Teacher section: show teacher directory preview

**Prompt:**
```
Create the Articulate English landing page at /home/irieb/William's Projects/Articulate English/index.html

REFERENCE: Study the existing Eloquenta landing page at /home/irieb/William's Projects/Eloquenta/landing.html for structural patterns, CSS architecture, and section layout. Use the same overall structure but rebrand completely.

DESIGN: Warm dark theme. Mustard (#f59e0b) primary accent. Burgundy (#dc2626) secondary. Space Grotesk for headings/buttons/prices. Inter for body. No emoji — inline SVG icons only.

TOKEN REFERENCE: Load DESIGN.md from the same directory and use its color/spacing/typography tokens as CSS variables.

SECTIONS (in order):

1. NAV: Sticky, frosted glass. Logo: "ARTICULATE ENGLISH" (mustard on "ARTICULATE"). Links: Services, Pricing, Teachers, Become a Teacher, Login. CTA: "Book a Lesson" (mustard bg, black text).

2. HERO: Centered. Badge: "Online English Lessons" with green pulse dot. H1: "Speak English with Confidence" (mustard on "Confidence"). Subtitle: "Professional teachers. Flexible scheduling. Real results. AI translation in your language." CTAs: "Try a Free Lesson" (primary mustard) and "Calculate Your Price" (outline, links to /pricing/). Trust: "Join 500+ learners already improving."

3. TRUST BAR: "Trusted by learners worldwide" + placeholder company logos (SVG text).

4. SERVICES (section-num "01"): 4 cards in responsive grid.
   - General English & Young Learners — "All levels, all ages. With AI translation in your language."
   - Exam Preparation — "IELTS, TOEFL, Cambridge, OET, and more. Specialist tutors."
   - Accent Training — "Understand any accent. Or reduce your own."
   - Business English — "Professional English for your career. +50% for industry specialists."
   Each card: SVG icon, title, description, "Learn more" link to /services/[name].html.

5. HOW IT WORKS (section-num "02"): 3 steps with connecting line.
   - Step 1: Choose your teacher (filter by language, specialty, price)
   - Step 2: Book a time (instant scheduling, no back-and-forth)
   - Step 3: Start learning (video classroom, AI translation, lesson recordings)

6. PRICING PREVIEW (section-num "03"): Show 3 example pricing cards:
   - Conversational: EUR 14/session (base)
   - Exam Prep: EUR 21/session (1.5x)
   - Full Premium: EUR 39/session (exam + B2 + industry + accent)
   Below cards: "Every lesson includes AI translation in your home language" + "Use our pricing calculator to build your custom plan" link to /pricing/.

7. WHAT SETS US APART (section-num "04"): 6 diff cards:
   - Multi-Lingual Teachers (filter by language level)
   - AI-Powered Translation (real-time in-lesson)
   - Industry-Specialist Teachers (+EUR 6/session)
   - Accent Coaching (+EUR 5/session)
   - Flexible Bundles (12-64 sessions, up to 25% off)
   - Career Path for Teachers (graduate to Eloquenta corporate)

8. TEACHER SPOTLIGHT: 3 teacher cards with placeholder SVG avatar, name, rating (SVG stars), languages, specialty, price. "Browse all teachers" link.

9. TESTIMONIALS: 3 student testimonials. Name, quote, star rating (SVG).

10. FAQ: 8 questions in accordion format:
    - How does the free trial work?
    - What is the AI translation widget?
    - How do I choose a teacher who speaks my language?
    - What does B1 or B2 mean for teacher language levels?
    - How do bundles work?
    - Can I cancel or reschedule?
    - What exams do you prepare for?
    - How is this different from Eloquenta?

11. CTA: "Ready to start?" + "Book Your Free Lesson" button.

12. FOOTER: Logo, links, copyright.

BUTTON STYLES: Primary = mustard bg, black text, 8px radius, Space Grotesk uppercase 0.65rem 700 0.1em spacing. Hover = brighter + glow. Active = scale(0.98). Outline = border only, muted text, hover brightens.

ANIMATIONS: Fade-in on scroll (IntersectionObserver). Button hover glow. Card hover translateY(-3px). Accordion smooth height transition. No infinite loops. Respect prefers-reduced-motion.

RESPONSIVE: Mobile-first. Breakpoints 520px, 768px, 900px, 1100px. All grids collapse to single column on mobile. Nav links hide on mobile (will add hamburger later).

VERIFICATION: After writing, verify: file exists, no emoji characters, valid HTML, uses mustard accent (not cyan), per-session rate is largest text in pricing displays.
```

#### Task 2: /pricing/index.html — Interactive Pricing Calculator

**This is the most complex page. It must be a fully functional interactive calculator.**

**Prompt:**
```
Create the Articulate English pricing calculator page at /home/irieb/William's Projects/Articulate English/pricing/index.html

REFERENCE: Study the existing Eloquenta landing.html pricing section for card/table layout patterns.

DESIGN: Same warm dark theme. Mustard accent. Space Grotesk + Inter.

LOAD PRICING.md from the same directory and implement the full pricing specification as an interactive calculator.

PAGE SECTIONS:

1. NAV: Same as landing page.

2. HERO: "Build Your Learning Plan" — subtitle: "Select your options below to see your personalized pricing. Every 30-minute session includes AI translation in your home language."

3. CALCULATOR (main section):

   Layout: Two-column on desktop (options left, price display right). Stacked on mobile.

   LEFT COLUMN — Options:

   a. Course Type (required, dropdown/select):
      - Young Learners (Primary School) — base rate
      - Conversational Adult — base rate
      - Exam Prep (IELTS, TOEFL, Cambridge, OET, etc.) — 1.5x
      - Business English — 1.5x

   b. Session Bundle (required, toggle/radio):
      - Pay-as-you-go (1 session) — 0% discount
      - Starter (12 sessions) — 10% discount
      - Standard (24 sessions) — 15% discount
      - Committed (48 sessions) — 20% discount
      - Intensive (64 sessions) — 25% discount
      Show: session count, discount %, total bundle price.

   c. Teacher Language Level (dropdown with ? info popup):
      - Below B1 (included in base) — +EUR 0.00
      - B1- — +EUR 2.50
      - B1 — +EUR 4.00
      - B1+ — +EUR 5.50
      - B2 — +EUR 7.00
      Each level has a ? icon that opens a tooltip/popup explaining what that level means with grammar examples. Use the exact explainer text from PRICING.md.

   d. Industry Experience (checkbox):
      - "Teacher with industry experience" — +EUR 6.00/session
      When checked, show multi-select: Finance, Medical, Legal, Technology, Engineering, Hospitality, Marketing, Education, Logistics, Energy.

   e. Accent Coaching (checkbox):
      - "Add accent coaching" — +EUR 5.00/session
      When checked, show track selector: Accent Understanding, Accent Reduction.

   RIGHT COLUMN — Live Price Display:

   Large price card that updates in real-time as options change:

   ```
   EUR 26.50 /session          ← LARGEST text (Space Grotesk, 2.4rem, 900 weight, mustard color)
   ─────────────────────────
   Course: Exam Prep
   Bundle: 24 sessions (15% off)
   Teacher: B1+ (EUR 5.50)
   Industry: None
   Accent: None
   ─────────────────────────
   EUR 23.35/session effective
   EUR 373.60/month (8 sess/mo)
   Bundle total: EUR 560.40
   ```

   Below the price card: "Book This Plan" CTA button (mustard, links to signup).

4. PRICING TABLES (below calculator):
   Show the full pricing tables from PRICING.md for all 4 course types × 5 bundles. Use tabbed interface to switch between course types.

5. PREMIUM ADD-ONS EXPLANATION:
   Explain the 3 premium options (language level, industry, accent) with icons and short descriptions. Link to the teacher language level explainer popup.

6. CANCELLATION POLICY: Summary of terms.

7. FAQ: 8 pricing-related questions.

8. CTA: "Ready to start? Book your free trial lesson."

9. FOOTER.

INTERACTIVE BEHAVIOR:
- All price calculations must work client-side in JavaScript.
- Price updates immediately when any option changes.
- Bundle discount applies to base rate only, not premiums.
- Show breakdown: base rate, bundle discount, premiums, effective per-session, monthly estimate, bundle total.
- Monthly estimate assumes 8 sessions/month (2 per week).

VERIFICATION: Test the calculator logic manually. Verify: base EUR 14, exam prep EUR 21, business EUR 21, B1+ adds EUR 5.50, industry adds EUR 6, accent adds EUR 5. Bundle discounts apply correctly. No emoji in output.
```

---

### Phase 2: Service Pages (Week 2)

#### Task 3: /services/index.html — Services Overview

**Prompt:**
```
Create the services overview page at /home/irieb/William's Projects/Articulate English/services/index.html

Same design system. Sections:
1. NAV
2. HERO: "Our Services" — subtitle
3. 4 large service cards (destination pages): General English, Exam Prep, Accent Training, Business English. Each with SVG icon, description, starting price, "Learn more" link.
4. Comparison table: services vs features (1-on-1, group, exam focus, accent focus, business focus, young learners, AI translation)
5. CTA: "Calculate your price" link to /pricing/
6. FOOTER
```

#### Task 4-7: Individual Service Pages

**Prompt for each (/services/general-english.html, /services/exam-prep.html, /services/accent-training.html, /services/business-english.html):**

```
Create the [Service Name] page at /home/irieb/William's Projects/Articulate English/services/[filename].html

Same design system. Sections:
1. NAV
2. HERO: Service name, subtitle, starting price, CTA "Calculate your price"
3. What you'll learn (6 bullet points with SVG icons)
4. Who it's for (3 learner profiles)
5. Lesson format (1-on-1 and group options)
6. Pricing: Embed the relevant pricing table from PRICING.md with bundle options
7. Premium options: Show how language level, industry, and accent add-ons apply to this service
8. FAQ: 5 service-specific questions
9. CTA: "Book your free trial"
10. FOOTER
```

---

### Phase 3: Auth + Dashboard Pages (Week 3)

#### Task 8: login.html

```
Create login page at /home/irieb/William's Projects/Articulate English/login.html

Same design system. Centered card layout.
Fields: Email, Password. Submit: "Log In".
Links: "Forgot password?" / "Don't have an account? Sign up"
Below: "Are you a teacher? Log in to your teacher dashboard" (links to /teacher/dashboard.html)
VERIFICATION: No emoji, valid HTML, mustard accent.
```

#### Task 9: signup.html

```
Create signup page at /home/irieb/William's Projects/Articulate English/signup.html

Same design system. Centered card layout.
Fields: Full name, Email, Password, Confirm password.
Toggle: "I'm a student" / "I'm a teacher" (changes submit endpoint).
Checkbox: "I agree to the Terms of Service and Privacy Policy"
Submit: "Create Account"
Link: "Already have an account? Log in"
VERIFICATION: No emoji, valid HTML, mustard accent.
```

#### Task 10: student/dashboard.html

```
Create student dashboard at /home/irieb/William's Projects/Articulate English/student/dashboard.html

Same design system. Dashboard layout: sidebar (or top nav on mobile) + main content.

Sidebar nav: Dashboard, My Lessons, Account, Logout.

Main content:
- Welcome message: "Welcome back, [Name]"
- Upcoming lessons (next 5): teacher name, date/time, service type, "Join Lesson" button
- Progress overview: sessions completed, current bundle remaining, current level
- Quick book: "Book a new lesson" button
- Recent lesson notes: last 3 lessons with teacher notes

Placeholder data (no backend yet — static content).
VERIFICATION: No emoji, valid HTML, mustard accent.
```

#### Task 11: teacher/dashboard.html

```
Create teacher dashboard at /home/irieb/William's Projects/Articulate English/teacher/dashboard.html

Same design system. Dashboard layout.

Sidebar nav: Dashboard, My Lessons, Earnings, Training, Account, Logout.

Main content:
- Welcome: "Welcome back, [Name]"
- Today's schedule: time, student name, service type, "Join Lesson" button
- This week's earnings: total sessions, total earnings, pending payout
- Rating summary: average rating, total reviews, recent reviews (last 3)
- Quick links: Set availability, View earnings, Access training
- Graduation progress: if applicable, show progress toward Eloquenta (500 lessons, 100 reviews, etc.)

Placeholder data.
VERIFICATION: No emoji, valid HTML, mustard accent.
```

---

### Phase 4: Teacher-Facing Pages (Week 4)

#### Task 12: /teachers/become-a-teacher.html

```
Create the "Become a Teacher" page at /home/irieb/William's Projects/Articulate English/teachers/become-a-teacher.html

Same design system.

Sections:
1. NAV
2. HERO: "Teach on Articulate English" — "Set your own schedule. Earn EUR 7-9 per 30-min session. Graduate to Eloquenta for EUR 11-14."
3. WHY TEACH WITH US: 5 benefits with SVG icons
4. REQUIREMENTS: Checklist
5. PAY STRUCTURE: Visual breakdown of 4 tiers
6. GRADUATION PATH: How to move from Articulate English to Eloquenta (500 lessons, 100 reviews, B1+ language, tech exam)
7. APPLICATION FORM: Name, email, phone, certification, languages spoken, experience, why you want to teach
8. FAQ: 8 questions
9. FOOTER
```

#### Task 13: /teachers/index.html — Teacher Directory

```
Create the teacher directory at /home/irieb/William's Projects/Articulate English/teachers/index.html

Same design system.

Sections:
1. NAV
2. HERO: "Find Your Teacher"
3. FILTERS (sidebar or top bar): Service type, Price range, Rating, Language spoken, Availability
4. TEACHER CARDS: Grid of cards. Each: SVG avatar (initials), name, rating (SVG stars), review count, languages, specialties, price per session, "View Profile" link, "Book Lesson" button.
5. Pagination or infinite scroll placeholder.
6. FOOTER

Placeholder: 6 teacher cards with realistic fake data.
VERIFICATION: No emoji, valid HTML, mustard accent.
```

---

### Phase 5: Utility Pages (Week 5)

#### Task 14-17: terms.html, privacy.html, contact.html, payment-policy.html

```
Create [page] at /home/irieb/William's Projects/Articulate English/[path]

Same design system. Standard nav/footer.

terms.html: Placeholder legal text with proper headings (10 sections).
privacy.html: Placeholder privacy policy with proper headings (8 sections).
contact.html: Contact form (name, email, subject, message) + office email.
payment-policy.html: Render TEACHER_PAYMENT_POLICY.md content as styled HTML.
```

---

## Testable Accounts (Placeholder)

For testing the login/dashboard flow without a backend, create a simple JS auth mock:

**Student test account:**
- Email: student@test.com
- Password: test123

**Teacher test account:**
- Email: teacher@test.com
- Password: test123

**Admin/test account:**
- Email: admin@test.com
- Password: test123

The login page should accept these credentials and redirect to the appropriate dashboard (student or teacher). Store the "logged in" state in localStorage. The dashboard pages should read from localStorage to display the user's name and role.

---

## Verification Checklist (Every Page)

1. File exists at correct path
2. No emoji characters (search output for U+1F300-U+1F9FF range)
3. Valid HTML (DOCTYPE, html, head, body)
4. Uses mustard accent (#f59e0b), NOT cyan (#22d3ee)
5. Responsive meta viewport tag
6. All icons are inline SVG (no emoji, no icon fonts)
7. All text labels use Space Grotesk (headings/buttons) or Inter (body)
8. CSS variables defined in :root matching DESIGN.md tokens
9. No inline styles (all CSS in <style> block)
10. Per-session rate is largest text in any pricing display
11. No "per-lesson" language anywhere
