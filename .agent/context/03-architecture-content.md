# Architecture, Content & Page Structure

This document defines the layout, routing, and semantic structure for the Anara Gelado Artesanal website. This is a 100% Mobile-First Single Page Application (SPA).

## 1. Routing & Internationalization (i18n)
* **Architecture:** App Router with `next-intl` dynamic segments (`/[lang]`).
* **Languages:** `/pt` (Portuguese, default) and `/en` (English).
* **Navigation:** Since it is a one-pager, routing relies on smooth anchor links (e.g., `/#menu`, `/#locations`).

## 2. Global Elements
### Navigation Bar (`<header>`)
* **Styling:** Sticky, solid white background (`bg-white`). Never transparent. Soft drop shadow on scroll.
* **Desktop Layout:** Logo (Left), Anchor Links (Center), Language Toggle `PT | EN` (Right).
* **Mobile Layout:** Logo (Left), Hamburger Menu Icon (Right, thin stroke Lucide icon).
* **Mobile Menu:** Full-screen or slide-out overlay. Contains large anchor links. The Language Toggle (`PT | EN`) must be placed at the very bottom of this menu.

### Footer (`<footer>`)
* **Styling:** Minimalist, warm off-white or solid white background.
* **Contact Links:** 
  * Clickable Instagram icon/link.
  * Clickable Email link (`mailto:hello@anaragelado.pt` with fallback to `anara.gelado@gmail.com`).
  * *CRITICAL RULE:* Do not build a contact form. 
* **Legal:** Links to Imprint and Privacy Policy.
* **Webmaster Backlink:** Must be positioned bottom right (desktop) or bottom center (mobile). 
  * Text exactly as follows: "Web design by VideoMetrixs. Like this site? Let's build yours."
  * Link: "VideoMetrixs" must hyperlink to `https://www.videometrixs.com` with `target="_blank"` and `rel="noopener noreferrer"`.

## 3. Page Structure (Top to Bottom)
The `page.tsx` file must render the following semantic `<section>` blocks in order:

### A. Hero Section (`#hero`)
* **Media (Mobile):** Vertical video (9:16) looping background (hook, farm, cone sequence). Use placeholder if unavailable.
* **Media (Desktop):** 16:9 Landscape video or ultra-wide static image. Do not stretch vertical video.
* **Content Overlay:** 
  * `<h1>`: "Artesanal Ice Cream" (or localized equivalent).
  * `<h2>`: "From the farm to the cone." (or localized equivalent). Set in the handwritten accent font.

### B. Trust & Story Section (`#story`)
* **Focus:** "Best ingredients" philosophy. 
* **Key Mentions:** Bourbon Vanilla from Madagascar, pure fruit content (50% to 75%), real milk and cream, zero artificial additives/powders.
* **Visuals:** Farm to cone transformation imagery (rounded corners).

### C. The Menu / Flavors (`#menu`)
* **Layout:** Visual grid of staple flavors. 
* **Badges:** Clear, elegant badges or icons for "Vegan" (50% of menu) and "Gluten-Free" (All flavors except Oreo).
* *Note:* No dynamic daily flavor lists. Keep it to staples and a "Flavor of the Week" highlight.

### D. Sustainability / Takeaway Section (`#takeaway`)
* **Focus:** Eco-conscious operations.
* **Content:** Highlight the recyclable takeaway boxes using dedicated photos.

### E. Locations & Hours (`#locations`)
* **Layout:** Two distinct blocks or a mobile toggle switch for:
  1. HQ (Charneca de Caparica).
  2. Mobile Shop (Costa de Caparica).
* **Data per location:** Address, embedded Google Map, opening hours.
* **Architecture Note:** Build the hours display to accept dynamic data (via Google My Business API or Google Sheets) but include a static fallback.
* **Events Note:** Include a small text block stating the mobile shop is available for private events (weddings, catering) with a prompt to email for inquiries.
* *CRITICAL RULE:* Exclude Uber Eats or any delivery service entirely.

## 4. Semantic SEO Requirements
* Use strict HTML5 semantic tags (`<main>`, `<section>`, `<article>`, `<nav>`).
* Ensure exactly one `<h1>` per page (in the Hero). Follow strictly with `<h2>` and `<h3>` tags for sections.
* All imagery must include descriptive `alt` text focusing on local SEO keywords (e.g., "Gelado Artesanal Costa de Caparica", "Fresh fruit ice cream").