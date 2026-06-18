# Eloquenta — B2B Corporate Build Plan (Updated)

**Folder:** `/home/irieb/William's Projects/Eloquenta/`
**Reference:** https://williamthomason.github.io/ESL-Edutech/Eloquenta/landing.html
**Design:** Cool dark theme (cyan #22d3ee + blue #0ea5e9). Space Grotesk + Inter. No emoji.

---

## Key Changes from Current Landing Page

The existing landing.html (490 lines) targets individual learners with consumer pricing ($29-65/session). It needs to be restructured for B2B corporate buyers (HR, L&D, training managers).

**What to keep:** CSS architecture, button styles, section patterns, FAQ accordion, footer.
**What to change:** Hero messaging, pricing (EUR 60-80/hr), services framing, add corporate-specific sections, remove consumer-facing elements.

---

## Updated Pricing (Corporate B2B)

**Per 30-min session rates:**

| Tier | Team Size | Per Session | Monthly Estimate |
|------|-----------|-------------|------------------|
| Team | 2-10 employees | EUR 70 | EUR 2,800 (40 sess) |
| Department | 11-50 employees | EUR 65 | EUR 10,400 (160 sess) |
| Enterprise | 51+ employees | EUR 60 | Custom |

**What's included in every corporate plan:**
- Dedicated account manager
- Customized curriculum per company/industry
- Progress reports per employee (monthly)
- Teacher matching and scheduling
- Cancellation protection (full pay if client cancels <24hr)
- Corporate invoicing (NET 30)
- Access to teacher profiles and ratings

**Positioning vs competitors:**
- EF Corporate: EUR 300-500/month per employee
- Berlitz: EUR 400-800/month per employee
- Wall Street English B2B: EUR 500+/month per employee
- Eloquenta: More flexible, better value, personalized

---

## Updated Landing Page Prompt

```
Update the Eloquenta landing page at /home/irieb/William's Projects/Eloquenta/landing.html

Keep ALL existing CSS (button styles, card styles, grid layouts, animations, media queries). Only change content and section structure.

CRITICAL: Do NOT change the color scheme. Keep cyan (#22d3ee) as primary accent. Keep all existing CSS class names and structure.

CHANGES:

1. HERO:
   - Badge: "Corporate English Training"
   - H1: "Professional English Training for Your Team" (accent on "Professional")
   - Subtitle: "Customized language training for companies of all sizes. Dedicated account managers. Measurable results. Teams of 10 to 10,000."
   - CTAs: "Book a Demo" (primary cyan) + "Get a Quote" (outline)
   - Trust: "Trusted by 50+ companies worldwide"

2. TRUST BAR: Keep but update to corporate clients. Placeholder logos: SIEMENS, HSBC, DELOITTE, SAMSUNG, L'OREAL, UNILEVER, BOSCH, ACCENTURE.

3. SERVICES (section-num "01"): Reframe 4 cards for B2B:
   - Business English for Teams — "Industry-specific training. Meetings, presentations, emails, negotiations."
   - Exam Preparation Programs — "IELTS, TOEFL, Cambridge — for employees needing certification."
   - Accent Training for Client-Facing Roles — "Help your sales and support teams communicate clearly with international clients."
   - English for Employee Onboarding — "Fast-track English proficiency for new international hires."

4. HOW IT WORKS (section-num "02"): 3 B2B steps:
   - Step 1: Free consultation — "We assess your team's needs and goals"
   - Step 2: Custom program design — "We match expert teachers and build a curriculum"
   - Step 3: Track and optimize — "Monthly progress reports and program adjustments"

5. WHAT SETS US APART (section-num "03"): 6 diff cards, corporate-focused:
   - Dedicated Account Manager
   - Customized Curriculum (industry-specific)
   - Progress Reporting (per-employee monthly reports)
   - Flexible Scheduling (works around your team's calendar)
   - Vetted Teachers (all certified, many with corporate experience)
   - ROI Tracking (measure improvement and business impact)

6. PRICING (section-num "04"): Corporate pricing tiers:
   - Team (2-10 employees): EUR 70/session
   - Department (11-50): EUR 65/session
   - Enterprise (51+): EUR 60/session (custom quote)
   Show per-session rate as LARGEST text. Monthly estimate as secondary.
   Below: "All plans include dedicated account manager, progress reports, and customized curriculum."
   Comparison table: Eloquenta vs EF Corporate vs Berlitz vs WS English.

7. CORPORATE CONTACT FORM: Company name, contact name, email, phone, team size, training interest (multi-select), message. Submit: "Request Proposal."

8. CASE STUDIES PLACEHOLDER: 2-3 placeholder cards: "Client case study coming soon."

9. FAQ: 8 corporate questions:
    - How do you match teachers to our industry?
    - What does a typical corporate program look like?
    - How do you measure progress?
    - Can we customize the curriculum?
    - What's the minimum commitment?
    - How does billing work?
    - What if an employee leaves mid-program?
    - Do you offer volume discounts?

10. CTA: "Book Your Free Consultation" — large, prominent.

11. FOOTER: Update copyright to 2026. Keep all links.

REMOVE:
- Beta Pioneer section (consumer-facing)
- Referral program section (consumer-facing)
- Individual pricing cards ($29, $45, $55)
- FL0-FL13 level system references (keep internal, not on corporate site)

VERIFICATION: After updating, verify: file exists, no emoji, valid HTML, cyan accent preserved, per-session rate is largest text, no "per-lesson" language, no consumer pricing visible.
```

---

## Additional Corporate Pages to Build

### /solutions/index.html
Corporate solutions overview. 4 solution cards linking to sub-pages.

### /solutions/business-english.html
Business English for teams. Program structure, customization options, pricing.

### /solutions/exam-prep.html
Corporate exam prep. For companies sponsoring employee certification.

### /pricing/index.html
Full corporate pricing page. Team/Department/Enterprise tiers. Competitor comparison.

### /case-studies/index.html
Case studies listing. Placeholder cards until real clients are available.

### /contact/index.html
Corporate contact form. Company name, contact, email, team size, training interest.

### /teachers/become-a-teacher.html
Invite-only teacher recruitment. Explains the Articulate English → Eloquenta path.

---

## Verification Checklist

1. No emoji characters
2. Cyan accent (#22d3ee) preserved
3. Per-session rate is largest text in pricing
4. No "per-lesson" language
5. No consumer pricing ($29-65) visible
6. All corporate messaging targets HR/L&D
7. Valid HTML structure
