# Articulate English — Complete Sitemap

**Brand:** Articulate English (public/consumer)
**Positioning:** Affordable, high-quality English lessons for individuals
**Target:** Individual learners — professionals, exam candidates, young learners, accent seekers
**Teacher pay:** EUR 7–9 per 30-min session
**Client pricing:** EUR 14–39 per 30-min session (depending on course type + premiums)

---

## Site Structure

```
articulateenglish.com/
│
├── index.html                          ← Landing page
├── login.html                          ← Login (student or teacher)
├── signup.html                         ← Sign up (student or teacher)
├── terms.html                          ← Terms of service
├── privacy.html                        ← Privacy policy
├── contact.html                        ← Contact form
├── payment-policy.html                 ← Teacher payment policy (public)
│
├── pricing/
│   └── index.html                      ← Interactive pricing calculator
│
├── services/
│   ├── index.html                      ← Services overview
│   ├── general-english.html            ← General English & Young Learners
│   ├── exam-prep.html                  ← Exam preparation
│   ├── accent-training.html            ← Accent coaching (understanding + reduction)
│   └── business-english.html           ← Business English
│
├── teachers/
│   ├── index.html                      ← Browse/search teachers (directory)
│   ├── become-a-teacher.html           ← Teacher application
│   └── profile.html                    ← Individual teacher profile (template)
│
├── student/
│   ├── dashboard.html                  ← Student dashboard
│   ├── lessons.html                    ← Lesson history + recordings
│   └── account.html                    ← Account settings
│
└── teacher/
    ├── dashboard.html                  ← Teacher dashboard (schedule, earnings)
    ├── lessons.html                    ← Lesson management
    ├── earnings.html                   ← Earnings breakdown + payout history
    └── training.html                   ← Training modules + exam
```

---

## Page Descriptions

### index.html — Landing Page
**Purpose:** Convert visitors to students or teachers.
**Key sections:** Hero (free lesson CTA), 4 services, how it works, pricing preview (3 examples: EUR 14 base, EUR 21 exam, EUR 39 premium), what sets us apart (6 diffs), teacher spotlight, testimonials, FAQ, final CTA.

### /pricing/index.html — Interactive Pricing Calculator
**Purpose:** Let prospects build their custom plan and see real-time pricing.
**Key feature:** Interactive calculator with course type, bundle size, teacher language level (with explainer popup), industry experience toggle, accent coaching toggle, live price display. Per-session rate largest text. Includes full pricing tables below calculator.

### /services/ — Service Pages
**Purpose:** Explain each service type, who it's for, and what it costs.
**Each page:** Hero with price, what you'll learn, who it's for, lesson format, pricing table, premium options, FAQ, CTA.

### /teachers/ — Teacher Directory + Application
**Purpose:** Help students find teachers. Help teachers apply.
**Directory:** Filter by service, price, rating, language, availability. Teacher cards with SVG avatar, rating, languages, price, specialty.
**Become a Teacher:** Requirements, pay structure, graduation path to Eloquenta, application form.

### /student/dashboard.html — Student Dashboard
**Purpose:** Manage learning journey.
**Content:** Upcoming lessons, progress overview, quick book, recent lesson notes. Placeholder data with localStorage auth mock.

### /teacher/dashboard.html — Teacher Dashboard
**Purpose:** Manage teaching business.
**Content:** Today's schedule, weekly earnings, rating summary, quick links, graduation progress toward Eloquenta. Placeholder data with localStorage auth mock.

### /login.html — Login
**Purpose:** Authenticate students and teachers.
**Test accounts:** student@test.com / test123, teacher@test.com / test123. Redirects to appropriate dashboard based on role stored in localStorage.

### /signup.html — Sign Up
**Purpose:** Create student or teacher account.
**Fields:** Name, email, password, student/teacher toggle, terms checkbox.

---

## Key Differences from Eloquenta (Corporate)

| Aspect | Articulate English | Eloquenta |
|--------|-------------------|-----------|
| Audience | Individual learners | Corporate B2B (HR/L&D) |
| Pricing | EUR 14-39/session | EUR 60-80/session |
| Pricing display | Per-session rate prominent | Per-session rate + monthly total |
| Teacher directory | Public, searchable | Not public (assigned) |
| Booking | Self-service | Account manager |
| Group classes | 2-6 students | Company teams |
| Curriculum | Standardized + teacher choice | Customized per Company |
| Teacher pay | EUR 7-9/session | EUR 11-14/session |
| Brand feel | Warm, accessible | Professional, corporate |
| Primary accent | Mustard (#f59e0b) | Cyan (#22d3ee) |
| Font | Space Grotesk + Inter | Space Grotesk + Inter |
| Tone | Friendly, encouraging | Formal, results-oriented |
