# Tech Stack & Core Dependencies

This document defines the strict technology stack for the Anara Gelado Artesanal website. Do not introduce alternative frameworks or libraries without explicit permission.

## Core Framework
* **Next.js (App Router):** Latest stable version. Strict adherence to React Server Components (RSC) by default. Use client components (`"use client"`) only when interactivity or hooks are required.
* **TypeScript:** Strict typing is mandatory for all components, utilities, and data structures.
* **Deployment:** Vercel. 
* **Version Control:** GitHub (Repository: `anara-website`).

## Styling & UI
* **Tailwind CSS v4:** Use utility-first classes exclusively. No custom CSS files unless absolutely necessary for complex animations not achievable via Tailwind.
* **Icons:** `lucide-react`. Use thin stroke widths (e.g., `strokeWidth={1.5}`) to maintain an elegant, warm, and artisanal aesthetic.

## Animation & Interactions
* **Framer Motion:** Use for all component entrances, micro-interactions, and page transitions. Keep animations subtle and elegant (smooth fades, gentle y-axis reveals). 
* **Lenis (Smooth Scrolling):** Implement for a premium scroll feel. 
    * *CRITICAL RULE:* Lenis MUST be disabled on touch devices/mobile. Rely purely on native scrolling for smartphones to preserve UX.

## Internationalization (i18n)
* **Library:** `next-intl` (integrated with Next.js App Router and Middleware).
* **Languages:** 
    * Primary/Default: Portuguese (`pt`)
    * Secondary: English (`en`)
* **Routing Logic:** Use Next.js middleware to auto-detect the user's browser language. If English, route to `/en`. For all other languages or Portuguese, default to `/pt` (or the base domain).
* **UI Placement:** The language toggle switch must be located:
    * Desktop: In the footer.
    * Mobile: At the bottom of the opened hamburger navigation menu.

## Specific Developer Requirements
* **Webmaster Backlink:** The footer must contain the following text exactly, positioned in the bottom right corner (desktop) or bottom center (mobile):
    * Text: "Web design by VideoMetrixs. Like this site? Let's build yours."
    * The word "VideoMetrixs" must link to: `https://www.videometrixs.com` (open in new tab, `rel="noopener noreferrer"`).