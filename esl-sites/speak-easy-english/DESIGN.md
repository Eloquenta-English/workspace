---
version: alpha
name: Articulate English
description: Warm, accessible online English learning platform for individual learners. Modern dark theme with mustard and burgundy accents. Professional but approachable.
colors:
  bg: "#0a0e1a"
  bg2: "#0d1117"
  bg3: "#111827"
  bg-card: "#111827"
  bg-card2: "#0f1629"
  border: "#1e3a5f"
  border-light: "#2a4a7f"
  text: "#e0f2fe"
  text-muted: "#94a3b8"
  text-dim: "#4a6080"
  accent: "#f59e0b"
  accent2: "#dc2626"
  accent-dim: "rgba(245,158,11,.08)"
  accent-glow: "rgba(245,158,11,.35)"
  green: "#34d399"
  amber: "#fbbf24"
  violet: "#a78bfa"
  rose: "#fb7185"
  white: "#ffffff"
  black: "#000000"
typography:
  h1:
    fontFamily: Space Grotesk
    fontSize: 3.2rem
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  h2:
    fontFamily: Space Grotesk
    fontSize: 2.2rem
    fontWeight: 700
    lineHeight: 1.2
  h3:
    fontFamily: Space Grotesk
    fontSize: 1.05rem
    fontWeight: 700
    lineHeight: 1.3
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    lineHeight: 1.6
  body-sm:
    fontFamily: Inter
    fontSize: 0.85rem
    lineHeight: 1.7
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 0.7rem
    fontWeight: 700
    letterSpacing: "0.08em"
  price-display:
    fontFamily: Space Grotesk
    fontSize: 2.4rem
    fontWeight: 900
    lineHeight: 1
  price-period:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.5
  btn-text:
    fontFamily: Space Grotesk
    fontSize: 0.65rem
    fontWeight: 700
    letterSpacing: "0.1em"
rounded:
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 80px
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.black}"
    rounded: "{rounded.md}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.black}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.md}"
    padding: 12px
  button-outline-hover:
    textColor: "{colors.text}"
  card:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: 28px
  card-hover:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: 28px
  price-card:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.text}"
    rounded: "{rounded.xl}"
    padding: 32px
  price-card-featured:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.text}"
    rounded: "{rounded.xl}"
    padding: 32px
  nav:
    backgroundColor: "rgba(10,14,26,0.92)"
    textColor: "{colors.text}"
  input:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: 10px
  badge:
    backgroundColor: "{colors.bg3}"
    textColor: "{colors.accent}"
    rounded: "{rounded.full}"
    padding: 6px
  tag:
    backgroundColor: "{colors.bg-card}"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.sm}"
    padding: 6px
  tooltip:
    backgroundColor: "{colors.bg3}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: 12px
  modal-overlay:
    backgroundColor: "rgba(0,0,0,0.7)"
    textColor: "{colors.text}"
  modal:
    backgroundColor: "{colors.bg2}"
    textColor: "{colors.text}"
    rounded: "{rounded.xl}"
    padding: 32px
---

## Overview

Articulate English is a public-facing online English learning platform. The brand is warm, modern, and accessible — designed to make individual learners feel welcomed and motivated. The visual identity uses a dark theme with mustard (#f59e0b) as the primary accent and burgundy (#dc2626) as secondary, creating a distinct separation from the corporate Eloquenta brand (which uses cyan).

The platform feels professional but never cold. Typography is bold and geometric (Space Grotesk for headings, Inter for body). Buttons have responsive animations — hover glow, active press states, subtle transitions. No emoji anywhere — all icons are inline SVG with text labels.

## Colors

- **Primary Accent (#f59e0b):** Mustard/amber. Used for primary buttons, price highlights, active states, and brand moments. This is the dominant brand color.
- **Secondary Accent (#dc2626):** Burgundy/red. Used for secondary actions, badges, and accent elements. Sparingly.
- **Background (#0a0e1a):** Deep navy-black. Page background.
- **Card Background (#111827):** Slightly lighter than page bg. Used for cards, modals, and elevated surfaces.
- **Text (#e0f2fe):** Cool white. Primary text.
- **Muted Text (#94a3b8):** Secondary text, descriptions, metadata.
- **Dim Text (#4a6080):** Tertiary text, captions, disabled states.
- **Border (#1e3a5f):** Subtle blue-gray. Card borders, dividers.
- **Green (#34d399):** Success states, checkmarks, positive indicators.
- **Rose (#fb7185):** Error states, sale/discount badges.

## Typography

Space Grotesk for all headings, buttons, labels, and price displays. Inter for body text, descriptions, and form inputs. The combination gives geometric precision to headings and readability to body content.

Hierarchy is driven by size and weight, not font family. H1 is large and bold (3.2rem/800). H2 is section-level (2.2rem/700). H3 is card-level (1.05rem/700). Body is 1rem with 1.6 line-height. Labels are small caps (0.7rem, 700 weight, 0.08em letter-spacing).

Price displays use Space Grotesk at 2.4rem/900 for the number, with a smaller Inter label below for the period.

## Layout

Spacing follows a 4px baseline scale. Section padding is 80px vertical, 40px horizontal (20px on mobile). Card padding is 28px. Price cards get 32px. Gaps between cards are 20px. Inter-section gaps are 56px.

Grid: 4-column for feature cards on desktop, 2-column on tablet, 1-column on mobile. Pricing grid is 3-column on desktop, 1-column on mobile.

## Shapes

Rounded corners are modest. Buttons use 8px. Cards use 12px. Price cards use 16px. Badges and tags use full (9999px) for pill shapes. Avatars are circular.

## Components

- **button-primary:** Mustard background, black text, 8px radius. Hover brightens to amber with subtle glow. Active state scales down slightly (0.98).
- **button-outline:** Transparent with border. Text is muted. Hover brightens border and text.
- **card:** Dark background (#111827), 12px radius, 28px padding. Hover lifts 3px with shadow.
- **price-card:** Same as card but 16px radius, 32px padding. Featured variant has accent border and glow shadow.
- **nav:** Sticky, frosted glass (rgba background + blur), 56px height.
- **input:** Dark background, 8px radius, border that highlights on focus.
- **badge:** Pill-shaped, accent-dim background, accent text. Used for tags and labels.
- **tooltip:** Dark bg3, 8px radius, appears on hover/focus. Used for second language level explanations.
- **modal:** Centered, overlay backdrop, 16px radius, 32px padding. Used for pricing calculator.

## Do's and Don'ts

- **Do** use token references ({colors.accent}) instead of literal hex in component definitions.
- **Don't** use cyan (#22d3ee) — that is Eloquenta's accent. Articulate English uses mustard (#f59e0b).
- **Don't** use emoji in buttons, labels, or icons. Always use inline SVG + text labels.
- **Do** make per-session rate the largest text in pricing displays. Period/secondary info is smaller.
- **Don't** use "per-lesson" framing. Use "per session" or "per 30-min session".
- **Do** include responsive animations on buttons (hover glow, active press, transition).
- **Don't** use excessive motion. Subtle fade-in on scroll is enough. Respect prefers-reduced-motion.
- **Do** verify no emoji characters in output after generating HTML.
- **Don't** nest component variants. button-primary-hover is a sibling key, not a child.
