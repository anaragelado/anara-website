# UI & Layout Specifications

This document defines the strict layout mathematics, spatial system, and responsive behaviors for the Anara Gelado Artesanal SPA. 

## 1. Global Navigation Layout (Header)
The header must be sticky, non-transparent, and use a solid white background (`bg-white`) with a subtle, soft drop shadow appearing only when scrolling down.

* **Desktop Layout (lg and above):** Use a Flexbox row with `justify-between` and `items-center`.
  * **Left:** Brand Logo (SVG).
  * **Center:** Navigation Anchor Links (Story, Flavors, Takeaway, Locations). Spaced evenly with generous gaps (`gap-8`).
  * **Right:** Language Toggle (PT | EN) and a small Call to Action (CTA) button labeled "Visit Us" (or localized equivalent) that scrolls to the `#locations` section. 
* **Mobile Layout (base to md):**
  * **Left:** Brand Logo (scaled down slightly).
  * **Right:** Hamburger Menu Icon (Lucide icon, thin stroke).
  * **Mobile Menu Behavior:** A full-screen overlay (`h-screen w-screen`) or a right-sided slide-out drawer. The CTA and Language Toggle must be placed inside this menu.

## 2. Page Flow & Container Constraints
To maintain a minimalistic and high-end feel, content must never stretch infinitely on ultra-wide desktop monitors, and sections must breathe.

* **Main Container:** Wrap all page content in a centered container with a maximum width constraint (e.g., `max-w-7xl mx-auto`).
* **Section Padding:** Every semantic `<section>` must have generous vertical padding to separate thoughts. 
  * Mobile padding: `py-16` or `py-20`.
  * Desktop padding: `md:py-24` or `lg:py-32`.
* **Horizontal Padding:** All sections must have a base horizontal padding to prevent text from touching screen edges on mobile (`px-4` or `px-6`, scaling up to `md:px-8` on desktop).

## 3. Geometry & "Warmth" Specs (Crucial)
Lucinda explicitly requested a "warm" aesthetic with absolutely no hard corners. The AI must enforce these geometric rules:

* **Buttons & Badges:** Must be completely pill-shaped (`rounded-full`). 
* **Cards & Images:** Must have heavily rounded corners (`rounded-2xl` or `rounded-3xl`). Never use `rounded-none` or `rounded-sm`.
* **Shadows:** Avoid harsh, dark shadows. If shadows are needed for depth, use large, highly diffused, low-opacity shadows (e.g., `shadow-xl shadow-black/5`).
* **Dividers:** If separating sections or grid items, use very thin, soft grey lines (`border-gray-100`) or subtle dashed lines.

## 4. Mobile Responsiveness & Accessibility
Because this is a 100% Mobile-First project, the UI must be optimized for thumbs and touchscreens.

* **Touch Targets:** All clickable elements (buttons, links, icons) must have a minimum physical size of 44x44 pixels (`min-h-[44px] min-w-[44px]`).
* **Grid Degradation:** 
  * Images and content blocks that sit side-by-side on desktop (2-column or 3-column grids) must gracefully stack into a single column (`grid-cols-1`) on mobile.
  * Exception: If displaying a grid of small flavor badges, a 2-column grid (`grid-cols-2`) is acceptable on mobile if it remains uncluttered.
* **Typography Scaling:** Use Tailwind's responsive text utilities to ensure headers shrink gracefully on small devices (e.g., `text-4xl md:text-6xl`). 

## 5. Micro-Interactions (Hover States)
* Desktop interactions must feel fluid. Apply a standard transition class to all interactive elements (`transition-all duration-300 ease-in-out`).
* **Buttons:** On hover, slightly scale up (`hover:scale-105`) or gently shift the background color. 
* **Links:** On hover, use the secondary Instagram colors (defined in Brand Guidelines) as very subtle underlines or text color shifts.