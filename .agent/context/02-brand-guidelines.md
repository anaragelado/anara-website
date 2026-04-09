# Brand Guidelines & Design System

This document defines the visual identity for Anara Gelado Artesanal. AI agents must strictly adhere to these parameters to ensure an elegant, minimalistic, and "warm" artisanal aesthetic. 

## 1. Brand Identity
* **Brand Name:** Anara Gelado Artesanal
* **Core Vibe:** Elegant, minimalistic, warm, artisanal, natural ("farm to cone").
* **Responsive Priority:** 100% Mobile-First. The smartphone experience dictates all design decisions.

## 2. Color Palette (Tailwind Configuration)
Do not use default bright colors. The design relies on a restrained palette to maintain elegance. 

**Base Colors:**
* `background-primary`: `#FAFAFA` (Warm off-white, use for main page backgrounds to create "warmth").
* `background-secondary`: `#FFFFFF` (Pure white, use for the solid navigation bar and specific content cards).
* `text-primary`: `#1A1A1A` (Very dark grey. Do not use pure black `#000000`).
* `text-secondary`: `#4A4A4A` (Mid grey for subtitles and less important text).

**Primary Brand Accents (Use for buttons, badges, key highlights):**
* `brand-yellow`: `#FDDB00` (Logo yellow).
* `brand-green`: `#68B34A` (A slightly muted, organic "leafy" version of her original `#70C051` to pair better with the yellow).

**The Instagram Sequence (Ordered Section Divider Palette):**
The client requires specific brand colors to appear in a strict sequence (matching her Instagram highlights). Use these colors specifically for horizontal section dividers (e.g., thin top borders on `<section>` elements). 
* Sequence 1 (Orange): `#FF7802`
* Sequence 2 (Yellow): `#FDDB00` (Logo Yellow)
* Sequence 3 (Green): `#68B34A` (Optimized Brand Green)
* Sequence 4 (Sand): `#DEA361`
* Sequence 5 (Pink): `#EA567A`

**Strict Usage Rule for Sequence Colors:** 
These colors must only be used for micro-interactions, flavor dots, or extremely thin (1px to 2px) horizontal section dividers. Never use them for large background sections or main buttons.

**Legacy Client Hex Codes (Do Not Use Unless Explicitly Requested):**
* Legacy Yellow: `#F2E209` (Replaced by Logo Yellow).
* Legacy Green 1: `#70C051` (Replaced by Optimized Brand Green).
* Legacy Green 2: `#8BCF68` (Discarded to prevent color clutter).

## 3. Typography (Google Fonts via next/font)
Set up the following fonts in the Next.js layout file.

* **Body Text:** `Work Sans` (Provides the clean look of her preferred SuisseIntl, but with a slightly warmer, rounder geometry).
* **Main Headlines (H1, H2, Section Titles):** `Playfair Display` (Elegant, classic) or `Montserrat` (Set to thin/light weights, e.g., 200 or 300).
* **Accent / Decorative Text:** `Amatic SC` or `Caveat`. 
    * *STRICT USAGE RULE:* Use this handwritten font exclusively for small, decorative accent phrases (e.g., "Da quinta para o cone" or a signature). Never use it for body copy or important informational headers.

## 4. UI / UX Principles
* **Borders & Corners:** Soft and warm. All buttons, image containers, and cards must have heavily rounded corners (e.g., Tailwind `rounded-full` for pill-shaped buttons, `rounded-2xl` for images). Absolute ban on sharp, 90-degree square corners.
* **Navigation Bar:** Solid `#FFFFFF` background. No transparent nav bars.
* **Iconography:** Use `lucide-react`. Icons must be minimalist line art with a thin stroke width (`strokeWidth={1.5}`).
* **Spacing:** Use generous padding and margins (whitespace) to enforce the minimalistic, high-end feel. 

## 5. Media & Imagery Strategy
* **Overall Style:** Natural lighting, focus on fresh ingredients and the "farm to cone" transformation. 
* **Hero Video (Mobile):** Render a vertical video (9:16 aspect ratio). The sequence is: extraction (hook) -> farm/fruits (backstory) -> final cone (climax). Use the provided Pastel de Nata IG Reel as a placeholder during development.
* **Hero Media (Desktop):** Do not stretch vertical video. Provide a fallback 16:9 landscape placeholder video or a high-quality static ultra-wide hero image.