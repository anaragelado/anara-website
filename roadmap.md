# Development Roadmap: Anara Gelado Artesanal

## Role & Directives
You are an expert AI web developer building a high-end, mobile-first Single Page Application (SPA). This `roadmap.md` is your master task list and source of truth. 

Before writing any code or making architectural decisions, you must read the `AGENTS.md` file in the root directory. This will direct you to the specific constraint files located in the `.agent/context/` and `.agent/skills/` directories. Do not guess parameters; always pull them from the context files.

Update this roadmap by checking off tasks (`[x]`) as they are completed.

---

## Phase 1: Foundation & Architecture Setup
**Goal:** Establish the strict technical base, styling configuration, and internationalization routing.

* [x] **1.1 Next.js Initialization:** Verify or initialize Next.js App Router with TypeScript. Clean out default boilerplate code from `app/page.tsx` and `app/globals.css`.
* [x] **1.2 Tailwind CSS v4 Configuration:** Set up the exact brand color variables (backgrounds, primary text, brand-yellow, brand-green, and secondary IG colors) as defined in the Brand Guidelines context file.
* [x] **1.3 Typography Setup:** Implement `next/font/google` in the root layout. Load `Work Sans` (Body), `Playfair Display` (Headings), and `Amatic SC` (Decorative).
* [x] **1.4 i18n Setup (next-intl):** 
  * Install and configure `next-intl`.
  * Set up Next.js middleware for browser language auto-detection.
  * Create the `messages/` folder with `pt.json` (default) and `en.json`.
  * Establish the `[locale]` dynamic routing structure in the `app/` directory.
* [x] **1.5 Asset Directory Organization:** Ensure `public/assets/images` and `public/assets/videos` are correctly mapped and base assets (logo, favicon) are accessible.
* [x] **1.6 Dependency Installation:** Install required production packages (`lucide-react`, `framer-motion`, `lenis` — replaces deprecated `@studio-freight/react-lenis`).


## Phase 2: Global UI & Core Layout
**Goal:** Build the persistent global components (Header, Footer) and establish the responsive, mobile-first page layout.

* [x] **2.1 Root Layout & Smooth Scrolling Integration:** 
  * Configure `app/[locale]/layout.tsx` to wrap all pages with `NextIntlClientProvider` + `SmoothScrollProvider`.
  * Implement the Lenis smooth scrolling provider wrapper (`src/components/SmoothScrollProvider.tsx`).
  * *CRITICAL:* Touch device detection via `ontouchstart` / `maxTouchPoints` — Lenis is fully skipped on mobile/tablet, defaulting to native scroll physics.
* [x] **2.2 Global Section Wrapper Component:**
  * Created reusable `<SectionWrapper>` (`src/components/SectionWrapper.tsx`) enforcing `px-4 md:px-8` and `max-w-7xl mx-auto`.
  * Standardized vertical padding: `py-16 md:py-24 lg:py-32`.
* [x] **2.3 Sticky Navigation Bar (Desktop):**
  * Created `<Header>` component (`src/components/Header.tsx`) with solid `bg-background-secondary` (white).
  * Scroll event listener adds `shadow-xl shadow-black/5` when scrolled past 10px.
  * 3-column flex layout: Logo (Left), Anchor Links (Center), pill-shaped "Visit Us" CTA (Right).
  * Correct anchor IDs: `#story`, `#menu`, `#takeaway`, `#locations`.
* [x] **2.4 Mobile Navigation Menu:**
  * Hamburger icon (Lucide `Menu`, `strokeWidth={1.5}`) triggers right-to-left slide-out drawer (`src/components/MobileMenu.tsx`).
  * Animated with Framer Motion (`AnimatePresence` + slide transition).
  * All links use `min-h-[44px] min-w-[44px]` touch targets.
  * Language Toggle (`src/components/LanguageToggle.tsx`) placed at the bottom of the menu. Also added to desktop header right column.
* [x] **2.5 Footer Component Construction:**
  * Created `<Footer>` (`src/components/Footer.tsx`) with solid white `bg-background-secondary`.
  * Instagram link (custom inline SVG — `lucide-react` doesn't export an Instagram icon) + Email `mailto:hello@anaragelado.pt`.
  * Imprint and Privacy Policy text links. All interactive elements meet 44px touch target.
* [x] **2.6 Webmaster Backlink Integration:**
  * Integrated into Footer bottom row. Text-center on mobile (`text-center`), text-right on desktop (`md:text-right`).
  * Exact text: "Web design by VideoMetrixs. Like this site? Let's build yours."
  * "VideoMetrixs" links to `https://www.videometrixs.com` with `target="_blank"` and `rel="noopener noreferrer"`.


  ## Phase 3: Core Features & SPA Sections
**Goal:** Build the content sections of the one-pager, enforcing the "farm-to-cone" storytelling, the warm aesthetics, and the dynamic location data.

* [x] **3.1 Hero Section (`#hero`):**
  * Responsive video: mobile loads `hero-video-smartphone.mp4` (9:16, hidden on `md:`), desktop loads `hero-video-desktop.mp4` (16:9, hidden below `md:`). Both `autoPlay muted loop playsInline`.
  * Dark overlay (`bg-black/30`) for text legibility. H1 in `font-heading`, H2 in `font-accent`.
  * Pill-shaped CTA scrolls to `#locations`. Full viewport height (`min-h-[100svh]`).
* [x] **3.2 Trust & Story Section (`#story`):**
  * 2-column grid (stacks on mobile): image column with `rounded-3xl` main image + overlapping accent product shot (`rounded-2xl`), text column with USP copy.
  * Key mentions: Bourbon Vanilla, 50-75% fruit, real milk/cream, zero artificial.
* [x] **3.3 Menu & Flavors Grid (`#menu`):**
  * Static data array in `src/data/flavors.ts` — 12 staple flavors with images, vegan flag, and `flavorOfTheWeek` highlight.
  * Grid: `grid-cols-2` mobile, `md:grid-cols-3`. Hover zoom on images.
  * `rounded-full` badges for Vegan (green) and Gluten-Free (yellow). Note: "All flavors are Gluten-Free except Oreo" shown above grid.
* [x] **3.4 Sustainability & Takeaway Section (`#takeaway`):**
  * 2-column grid (text left, image right on desktop; image-first on mobile). Recyclable badge with Lucide `Recycle` icon.
  * Image: `food-cart-exterior-with-anara-branding-sign.jpg` with `rounded-3xl`. Background: `bg-background-primary` (#FAFAFA).
* [x] **3.5 Dynamic Data Fetching (Locations & Hours):**
  * Server-side fetcher in `src/lib/fetch-hours.ts`. Fetches CSV from Google Sheet URL (stored in `.env` as `HOURS_CSV_URL`).
  * Parses CSV headers: `location_id, location_name, day, status, open_time, close_time`. Maps full day names to abbreviations.
  * `next: { revalidate: 3600 }` — 1-hour ISR cache. Confirmed in build output.
  * Silent fallback to `src/data/locations.ts` on any failure (network, malformed CSV, missing env var).
  * Page fetches server-side in `page.tsx` and passes `locations` as props to `LocationsSection`.
* [x] **3.6 Locations UI & Events Callout (`#locations`):**
  * Two-column desktop split, mobile tab toggle (pill-shaped buttons). Location data in `src/data/locations.ts` with static fallback hours.
  * Google Maps embed iframes from coordinates. "Open Now / Closed" indicator using `isOpenNow()` with Lisbon timezone.
  * Hours table per location. "Get Directions" CTA linking to Google Maps. All cards `rounded-2xl`, maps `rounded-2xl`.
  * "Private Events & Catering" block with `mailto:hello@anaragelado.pt` CTA.
  * *VERIFIED:* Zero mentions, logos, or links to Uber Eats.
* [x] **3.7 Social Proof & Reviews Component (`#reviews`):**
  * Static data in `src/data/reviews.ts` — 4 handpicked 5-star reviews (René Pfitzner, Carolina Mello, Rita Moreira, Kristine Joy Martin).
  * 2-column grid with `rounded-2xl` cards, `border-gray-100`, `shadow-sm`. 5 filled yellow stars via Lucide `Star` (fill `#FDDB00`).
* [x] **3.8 Language selector**
  * Removed `LanguageToggle` from desktop Header. Added to Footer (`hidden lg:flex`). Mobile: remains in hamburger menu below "Visit Us" button.
* [x] **3.9 Button hover over effect**
  * Added `hover:bg-brand-green hover:text-white` to all pill-shaped CTA buttons (Header, MobileMenu, HeroSection).
* [x] **3.10 Favicon**
  * Copied `public/assets/favicon.ico` to `src/app/favicon.ico` (Next.js App Router metadata convention).
* [x] **3.11 We're open indicator**
  * `OpenBadge` component in `Header.tsx` — pill-shaped badge with pulsing green dot (open) or red dot (closed). Tapping links to `#locations`.
  * Uses `isOpenNow()` against real hours data (fetched server-side, passed via layout → PageShell → Header).
  * Client-only rendering (deferred until mount) to avoid hydration mismatch. Re-checks every 60 seconds via `setInterval`.
  * Visible on both desktop and mobile viewports (next to logo).
* [x] **3.12 Google Review badge**
  * Two badges between section header and review cards — Charneca (4.7) and Costa (5.0). Each shows Google "G" icon, rating number, star row, and location name.
  * Badges link to the respective Google Maps listing. `rounded-2xl`, `shadow-sm`, hover lifts to `shadow-md`.
* [x] **3.13 Active Section indicator**
  * `useActiveSection` hook in `PageShell.tsx` — `IntersectionObserver` on all section IDs with `rootMargin: "-20% 0px -60% 0px"` to trigger when a section enters the top 20-40% of the viewport.
  * Desktop: active link turns `text-brand-green` with an animated underline (`h-0.5 rounded-full bg-brand-green`, width transitions from `w-0` to `w-full`).
  * Mobile menu: active link text turns `text-brand-green`. State reflects whatever section was visible when the menu opened.
* [x] **3.14 Font testsite**
  * Route: `/[locale]/font-test`. Client component with 5 pill-shaped option buttons in a sticky header.
  * Full hero section replica (video, overlay, CTA) — only the H1/H2 font-family swaps via inline `style`.
  * Pairings: (1) Playfair Display + Amatic SC, (2) Montserrat Light + Caveat, (3) Cormorant Garamond + Work Sans, (4) Bodoni Moda + Playfair Italic, (5) Work Sans Light + Amatic SC.
  * Mobile: horizontal-scrollable option bar. Description bar below shows active pairing name.
* [x] **3.15 Client Presentation Color Theme Test Route:**
  * Route: `/[locale]/color-test`. Client component with 6 pill-shaped option toggles in a sticky header.
  * 5 mock sections (Story, Menu, Takeaway, Reviews, Locations) with the Instagram color sequence applied differently per option.
  * Options: (1) thick color block divider, (2) colored accent dot, (3) fixed top-edge gradient bar, (4) card with colored `border-t-4`, (5) thin minimalist top border, (6) Instagram-ring around circular image.
  * Color legend bar above sections. Immediate transitions, no layout shift.

  ## Phase 4: Secondary Pages & UI Polish
**Goal:** Build out the required legal/utility pages, apply smooth scroll-triggered animations, and conduct a strict UI audit against the brand guidelines.

* [x] **4.1 Legal Pages Integration (Imprint & Privacy):**
  * Imprint: `app/[locale]/imprint/page.tsx` — Company info (business name, address, email, VAT as placeholders), Alternative Dispute Resolution section, WebDesign credit. Full PT/EN i18n.
  * Privacy: `app/[locale]/privacy/page.tsx` — No-tracking policy, essential cookies only, Google Maps embed disclosure, GDPR rights note, contact. Full PT/EN i18n.
  * Both wrapped in `<SectionWrapper>`, Work Sans body text, locale-aware footer links updated.
* [x] **4.2 Custom 404 Page (`not-found.tsx`):**
  * `app/[locale]/not-found.tsx` — "Looks like this flavor melted" / "Parece que este sabor derreteu". Large `404` in accent font, pill-shaped CTA back to homepage.
* [x] **4.3 GDPR & Cookie Banner Strategy:**
  * *Verified:* Zero third-party tracking scripts installed. No Google Analytics, no Meta Pixel, no tracking cookies.
  * Privacy policy explicitly states: no data collection, essential technical cookies only (language preference).
  * Only third-party embed: Google Maps iframes (disclosed in privacy policy).
  * **No cookie banner built** — fully GDPR compliant as-is.
* [x] **4.4 Framer Motion Implementation (Scroll Reveals):**
  * Created reusable `<FadeIn>` client component (`src/components/FadeIn.tsx`) with `initial={{ opacity: 0 }}`, `whileInView`, directional slide (`up`/`down`/`left`/`right`), configurable `delay`.
  * `viewport={{ once: true, margin: "-100px" }}` — animations fire once per session.
  * Applied to: Hero (text overlay), Story (image left, text right staggered), Menu (header + grid), Takeaway (text + image staggered), Locations (header, desktop grid, events block), Reviews (header, badges, cards).
* [x] **4.5 Micro-Interactions & Hover Polish:**
  * All buttons and links confirmed using `transition-all duration-300 ease-in-out`.
  * Instagram hover colors applied: Footer legal links (`hover:text-highlight-orange`), Imprint email (`hover:text-highlight-sand`), Imprint webdesign link (`hover:text-highlight-green`), Privacy email (`hover:text-highlight-sand`), OpenBadge border (`hover:border-highlight-green`), Review Google badges (`hover:border-highlight-pink`).
  * All pill-shaped buttons confirmed using `hover:scale-105`. Location tab toggles updated.
* [x] **4.6 Geometry & "Warmth" UI Audit:**
  * DOM-wide sweep: zero `rounded-none` found. Zero pure `#000000` or `text-black` usage.
  * All images use `rounded-2xl` or `rounded-3xl` (or sit inside `overflow-hidden rounded-2xl` containers).
  * All map iframes wrapped in `overflow-hidden rounded-2xl`. All cards use `rounded-2xl`.
  * All buttons and badges use `rounded-full`. Text colors use warm dark grey `#1A1A1A` (`text-primary`) throughout.
  * Only `bg-black/30` is the hero video overlay (30% opacity for text legibility) — correct and intentional.

  ## Phase 4A: Improvements and fixes
**Goal:** Improvements and fixes of various elements

* [x] **4A.1 active page indicator:**
  * Fixed: hero section is now observed by the IntersectionObserver. When hero is visible, active resets to `""` so no nav link highlights. Scrolling to "our story" highlights it; scrolling back up clears it.
  * Replaced the underline indicator with a warm pill-shaped background (`bg-brand-yellow/20 rounded-full`) on both desktop nav and mobile menu.
* [x] **4A.2 Paralaxx effect:**
  * Created `HeroParallax` client component using Framer Motion `useScroll` + `useTransform`. Video translates at 30% scroll speed for a subtle vertical parallax effect.
* [x] **4A.3 Our Story Text:**
  * Desktop text column now uses `md:sticky md:top-24` with `md:items-start` so it starts at the top and follows the scroll. Removed all em dashes from PT and EN translations (replaced with commas or middle dots). Reduced global SectionWrapper padding from `py-16 md:py-24 lg:py-32` to `py-12 md:py-16 lg:py-24` (~30% tighter spacing across all sections).
* [x] **4A.4 Vegan and gluten free:**
  * Emphasize more in that short text line the aspect of vegan and gluten free falvours. Tell the user that Anara has special flavours like [placeholder] which are changing daily. And the photos show a variation of stable falvours.Also mention, that the oreo has gluten, but mention that in a appropiate way.The hover over effect on the image boxes should affect the box and not only the image within the box. Get rid of the flavour of the week indicator on mobile. I did not see that on desktop, but we do not use it on both. I actually would like to see some of the special flavours but we need to mark them with a info sign that they are not always available. Any ideas on how to do that? The image for the lemon ice cream shows fresh lemons. change that to an actual ice cream cone; also just a placeholder ice cream cone image would be fine for now.
* [x] **4A.5 Our story image:**
  * Added CSS order classes: text column is `order-1 md:order-2`, image column is `order-2 md:order-1`. Mobile shows text first, desktop keeps image on the left.  
* [x] **4A.6 Takeaway section:**
  * Swapped image to `takeaway-box (30).jpg` (branded box with Anara logo sign in background). Text-first on mobile already done (4A.5 pattern). Spacing reduced globally via 4A.3. Em dashes removed in 4A.3. Updated PT/EN text to mention 0.5L and 1L box sizes. Added `md:sticky md:top-24` to text column for same sticky scroll behavior as Story section.
* [x] **4A.7 Location section:**
  * Make also here the spacing between takeaway and location a bit smaller. The pin is missing on the google map. Furthermore I like to see a picture for the mobile shop and the HQ shop. On desktop try to show them both, on mobile only show the one which is active. Try to come up with a suitable way to display the shop photo. There should be a suitable photo of each in the images folder. 
* [x] **4A.8 Review section:**
  * Spacing reduced globally via 4A.3 SectionWrapper padding reduction.
* [x] **4A.9 Footer:**
  * Redesigned two-column layout. Left: logo, "Anara Gelado Artesanal", HQ address (two lines), email link. Right: social icons (Instagram + Mail), legal links (Imprint + Privacy), language toggle (now visible on all screen sizes). Bottom: copyright + VideoMetrixs backlink. Mobile stacks vertically (left-aligned).
* [x] **4A.10 Privacy Policy:**
  * Sharpened language in PT/EN: intro now opens with "We do not track you." Collection section leads with "We do not track you in any way." Cookies section explicitly states the only cookie is for language preference (Portuguese or English), no tracking cookies.
* [x] **4A.11 404 Page:**
  * Redesigned with animated melting ice cream cone SVG (pink scoop with dripping animation, waffle cone, puddle). Playful copy: "This scoop hit the floor!" / "We searched the entire farm..." / "Don't cry over dropped gelato." CTA: "Back to the cone." Full PT/EN translations.
* [x] **4A.12 Our Story part two:**
  * Improve the text. Emphasize the farm to cone aspect more. Fresh fruits and ingredients. No artificial additives. So, the thing that bothers me with the current text is the beginning with the bourbon vanilla. The rest is not too bad and also the lenght is pretty good. So maybe we do only need a fine tuning. For the image I would like to see another approach. Maybe a slider that changes to iamges? showing a tree with the fruits, fresh fruites in a crate, an extraciton and then a finished cone. Or are there any other ways to show this off a bit nicer? I would like to see that solution on desktop and mobile.

  ## Phase 4B: Client Feedback Implementation (V0)
**Goal:** Implement client design choices, add the new "Creations" section, refine slider UX, and adjust media positioning.

* [x] **4B.1 Finalize Typography & Color Sequence:**
  * **Typography:** Permanently set the Hero fonts to Option 1 (`Playfair Display` for H1, `Amatic SC` for H2). Remove the font-test route.
  * **Color Sequence (Responsive):** 
    * *Mobile:* Implement Option 1 but with half the thickness (e.g., a very thin 1px or 2px top border on sections).
    * *Desktop:* Implement Option 2 (Typographic Accent Dots next to `<h2>` headers).
    * Ensure only the single, optimized brand green is used.

* [x] **4B.2 Language & Localization (EN-UK):**
  * Audit the `en.json` file to ensure strictly British English spelling (e.g., "flavour" instead of "flavor", "craftsmanship", "colour").

* [x] **4B.3 Image Slider UX & Content Fixes:**
  * Adjust the existing sliding photos component (mangos/lemons) to allow manual dragging/swiping on touch devices.
  * Increase the auto-scroll speed slightly.
  * Replace the generic cone photo with the "Morango Flavour" placeholder image (until the final photos arrive).

* [x] **4B.4 New Section: Creations (`#creations`):**
  * Create a new semantic `<section>` placed immediately after the staple Menu section.
  * Add the introductory text: "We create at least one or two special flavours each week. Our creations are born from unexpected inspirations, where classic gelato craftsmanship meets flavours from diverse culinary traditions and global influences."
  * Build a drag-enabled horizontal slider for 10 square images (Instagram posts).
  * Build a secondary, smaller visual grid underneath for 4 specific "Creation Cone" photos.

* [x] **4B.5 Mobile Hero Video Repositioning:**
  * Adjust the CSS `object-position` or positioning logic of the vertical Pastel de Nata video in the mobile Hero section. Shift the focal point down (e.g., `object-[center_top]` or `object-position: 50% 20%`) so the top part of the video (cinnamon falling on the cone) is not cropped by the viewport edge.

  * [x] **4B.6 Creations Section Text Update & IG Link:**
  * Update the first sentence in the Creations section to: "We create at least one or two special flavours each week, shared on Instagram."
  * Make the phrase "shared on Instagram" a clickable hyperlink pointing to her Instagram account (`https://www.instagram.com/anara.geladoartesanal`).
  * Style the hyperlink text using the optimized brand green color (e.g., `text-[#68B34A]` or the respective Tailwind config variable) to make it stand out elegantly.
  * Ensure the link opens in a new tab (`target="_blank" rel="noopener noreferrer"`).

  * [x] **4B.7 Mobile menu Logo position:**
  * Move the logo witihn the mobile menu from the top left to the center above the menu items

## Phase 4C: UI Overhaul, Sticky Layouts & Logic Fixes
**Goal:** Implement the V1 design feedback, refine mobile alignment, split the status pills, build the Creations prototypes, and update routing logic.

* [x] **4C.1 Global Styling & Typography Refinement:**
  * **Remove Accents:** Remove the Instagram color sequence implementations, this means no colored dots, no colored divider lines across both mobile and desktop. 
  * **Mobile Alignment:** Apply `text-center md:text-left` to all `h1`, `h2`, and body text elements across the entire SPA.
  * **Takeaway Pill:** Ensure the green call-to-action/info pill in the Takeaway section is horizontally centered on mobile (`mx-auto md:mx-0`).
  * **Text Standardization:** Audit the `<p>` tags in the `#menu` (Our Flavours) and `#story` (Our Story) sections. Ensure they use the exact same Tailwind text size and line-height classes (e.g., `text-base` or `text-lg`).

* [x] **4C.2 Status Pills & Header Layout:**
  * **Split Badges:** Refactor the `OpenBadge` component into two distinct status pills (HQ and Mobile Shop). 
  * **Pill Layout:** 
    * Desktop: Render side-by-side (HQ primary on the left, Mobile secondary on the right). 
    * Mobile: Render stacked vertically (HQ on top, Mobile on bottom).
  * **Closed State Optimization:** When a shop is "Closed" / "Fechado", apply smaller padding and text-size classes to that specific pill to save vertical space on mobile.
  * **Time Logic:** Change the `isClosingSoon` mathematical trigger from 30 minutes to 15 minutes.

* [x] **4C.3 Navigation & Routing Updates:**
  * **Nav Links:** Add `#creations` ("Creations") and `#reviews` ("Your reviews" in EN / "Your opinions" in PT) to both the desktop and mobile navigation menus. "Creations" after "Flavours" and "Reviews" after "Locations".
  * **i18n Middleware Logic:** Update `next-intl` configuration. Set strict browser header detection: Default to Portuguese (`pt`) **only** if the user's browser language corresponds to a Portuguese-speaking locale (e.g., `pt`, `pt-PT`, `pt-BR`). For **all** other languages globally, force the default to English (`en`).
  * **Email Update:** Update all `mailto:` links across the site to `info@anaragelado.pt`.

* [x] **4C.4 Section Layouts & Content Injections:**
  * **Sticky Scrolling:** In the `#story` and `#takeaway` sections, wrap the text columns in a `sticky top-24` (or similar offset) container so the text follows the user down the screen while they scroll past the image column.
  * **Story Update:** Add a localized sentence to the end of the story text stating that the owner was "trained in Italy".
  * **File Cleanup:** Delete the files `cone-no-V1` through `cone-no-V30` from the public images directory to keep the repo clean.

* [x] **4C.5 Creations Section Prototypes (A/B Test):**
  * Build two distinct code prototypes for the "Special Cones" grid within the `#creations` section so the client can evaluate them. To be clear it is the 4 image grid below the scrolling flavour section. Make the first two like described in prototype 1 and the last two like described in prototype 2. use this image for all 4 images: "cone-carrot-cake-v1.webp":
    * **Prototype 1:** Standard layout matching the existing staple flavors cards.
    * **Prototype 2:** Overlay layout, where the Vegan / Gluten-Free / flavour name badges hover as absolute overlays directly on top of the cone images.

* [x] **4C.6 Imprint details:**
  * for business name display "Anara Gelado Artesanal" and delete the VAT number entry. Everything else can stay the same. 

  * [x] **4C.7 Flavour Curator Results & File Cleanup:**
  * I will provide the final selection list from the WhatsApp payload (e.g., `Chocolate Belga -> SELECTED: cone-chocolate-belga-v2.jpg`).
  * Update the UI data arrays (in the Menu and Creations sections) to strictly reference these winning filenames.
  * Delete all unselected/unused `-vX.jpg` variations from `public/assets/images/` to clean up the repository. Do not rename the winning files; just move the losers to a new folder witihn the project, which I will than cut and archive somewhere else, in case we need it again.

  * [x] **4C.8 Nav bar logo**
  * The nav bar logo should link back to the top of the page (home section).

  * [x] **4C.9 Text behaviour in the takeaway section on the desktop version**
  * The text in the takeaway section should follow the scrolling position until it is reaching the end of that section. Since the image next to it is vertical, we have a lot of white space under the text column on the left. And furthermore it is easiert to read and to look at the image if we implement that behaviour.



## Phase 4D: Content Injection, Final Layout Fixes & New Tooling
**Goal:** Apply all final text/review content, fix header pill logic, format the Creations grid, and build new tools for photo naming and flavor sorting.

* [ ] **4D.1 Manual Tasks (Patrick):**
  * *Photo Editing:* Use Nano Banana 2 to alter one of the Strawberry cone photos into a Raspberry cone (darker red, slightly different shape). Wait for her reference photo before starting.
  * *Email Communication:* Draft an email clarifying the Instagram Slider options (1, 2, and 3) in simpler terms, as she seems confused about how the automated code vs. manual image options work.

* [x] **4D.2 Header & Navigation Logic Updates:**
  * **Nav Bar Text:** Change the navigation link "Creations" to "Our Creations".
  * **Portuguese CTA:** Change the top-right button text on the PT version from "Visite-nos" to "Visita-nos".
  * **Smart Indicator Pills Consolidation:** Update the logic in the Header. 
    * If both shops are "Open", render only ONE generic green pill that says "Open" (or "Aberto").
    * If both shops are "Closed", render only ONE generic red pill that says "Closed" (or "Fechado").
    * Only render two separate pills if their statuses are different (e.g., one is open, one is closed).

* [x] **4D.3 Content & Text Injections:**
  * **Global Text:** Apply all text corrections precisely as defined in `.agent/context/06-text-corrections.md` across both English and Portuguese routes.
  * **Reviews Section:** Update the static reviews data. Only use the 4 specific reviews (João Augusto, Bénédicte Hure, Josien Nation - Galama, Iris KdR) located at IDs 19-22 in `.agent/context/05-content-data.md`. Ensure the English page pulls the translated English strings, and the Portuguese page pulls the native Portuguese strings.

* [x] **4D.4 Creations Section Formatting:**
  * **Square Grid:** Set the "Creations" cone cards to Option A (the standard UI layout without overlays), but forcefully change the image aspect ratio to `aspect-square` (1:1) so it matches the warm, friendly feeling of the "Our Flavours" section.
  * **Slider Mockup Cleanup:** Remove the "Natas Morango" dummy card from the sliding Instagram prototype and ensure "Strawberry" is represented instead.

* [x] **4D.5 Tooling: Unified Image Review & Curator Portal:**
  * Build a new hidden route (e.g., `app/[lang]/master-review/page.tsx`).
  * **Data Prep:** Scan the directory where Patrick saved the pre-grouped images -> public\assets\new-cones. Group them programmatically by their base slug (e.g., group `cone-unknown-1-v1.jpg` and `cone-unknown-1-v2.jpg` together).
  * **UI - The "Unknowns":** If the slug contains `unknown`, display the image(s) and force a text `<input>` field so she must type the name.
  * **UI - The "Knowns":** If the slug has a valid name (e.g., `chocolate`), display "Suggested Flavor: Chocolate". Render a ✅ (Confirm) and ❌ (Change) button. If ❌ is clicked, reveal a text input for her to rename it.
  * **UI - Image Selection:** For ANY group that contains more than 1 image, force her to tap her favorite version. Highlight the tapped image with a thick green border `ring-4 ring-[#68B34A]` and a ✅ icon.
  * **Payload:** When she clicks "Send to WhatsApp" at the bottom, generate a clean list mapping the final confirmed name to the single selected filename (e.g., `[Chocolate Belga] -> SELECTED: cone-chocolate-v2.jpg`).

* [ ] **4D.6 Tooling: Flavor Sorting Portal:**
  * Build a separate hidden route (e.g., `app/[lang]/flavor-sorter/page.tsx`) to be used AFTER the image names are finalized.
  * **Data:** Pull the confirmed lists of flavours from `.agent/context/07-flavours.md` (separate lists for Staple Flavours and Creations).
  * **UI:** Render the flavours as two vertical lists. Add simple "Move Up" and "Move Down" arrow buttons so she can visually reorder them.
  * **Payload:** Add a "Send Order to WhatsApp" button that generates a numbered list of the final order for both sections, so Patrick can update the final arrays.

  * [x] **4D.7 Flavour Delta Extraction (Missing Images Check):**
  * *Note: This is a data extraction script, not a UI change.*
  * Read the `.agent/context/07-flavours.md` file.
  * Extract the baseline array of flavours from the first section (Flavours we had on April 16th).
  * Extract the target arrays of flavours from the second section (Staple Flavours) and third section (Creations Flavours) and combine them.
  * Run a programmatic comparison to find the "Delta" (Flavours that exist in the combined target list but are MISSING from the April 16th baseline list).
  * Output this Delta list clearly in the console/chat so Patrick can use it to manually identify the unlabelled images in the `public/assets/new-cones/` folder.

  * [x] **4D.8 new raspberry image**
  * use this image for raspberry: public\assets\images\cone-raspberry-v2.webp


  * [x] **4D.9 Tooling: Instagram URL Mapper Portal:**
  * Build a new hidden route (e.g., `app/[lang]/instagram-url-mapper/page.tsx`).
  * **Data Scan:** Read `public/assets/images/` and filter strictly for files starting with `Instagram-` (case-insensitive).
  * **Header Instructions:** Add clear text at the top: "Please paste the Instagram link for each image. To get the link: Open the post on Instagram, tap the Paper Airplane (Share) icon, and tap 'Copy link'."
  * **UI:** Render a vertical list. For each file, display the image (`h-32 object-contain`), a clean title (the filename minus "Instagram-" and ".jpg"), and a text `<input>` field.
  * **State & Validation:** Track the URL inputs in React state. The "Send to WhatsApp" button must be strictly disabled (and greyed out) until every single input contains text.
  * **Payload Logic (Future-Proofed for Patrick):** 
    * Write a helper to clean the URLs (strip any `?igsh=...` tracking parameters).
    * Write a helper to slugify the clean title (lowercase, replace spaces with hyphens, remove accents).
    * Generate the formatted message for all 22 items: 
      `Title: [Clean Title]`
      `URL: [Cleaned_URL]`
      `FILE: insta-[slugified-title].jpg`
      `(Empty Line)`
    * URL-encode the string and trigger the `window.open('https://wa.me/393402362566?text=...')` action.


    * [x] **4D.10 Tooling: Flavor Sorting Portal:**
  * Build a new hidden route (e.g., `app/[lang]/flavor-sorter/page.tsx`).
  * **Data Integration:** Pull the final, confirmed list of Staple Flavours and Creations cones (including their finalized `cone-[slug]-vX.jpg` image paths).
  * **UI Layout:** 
    * Render two distinct sections: "Order: Staple Flavours" and "Order: Our Creations".
    * For each item, display a visual row containing: the ice cream image (`w-16 h-16 object-cover rounded-lg`), the flavour name, and interactive controls.
  * **Sorting Mechanics:** Implement simple "Move Up" and "Move Down" arrow buttons (using `lucide-react` icons like `ChevronUp` and `ChevronDown`) for each item. This is much more reliable on mobile touchscreens than drag-and-drop.
  * **State Management:** Keep track of the reordered arrays in React state.
  * **Payload Logic:** 
    * Add a "Send Order to Patrick" button at the very bottom.
    * Generate a clean, numbered text list for both categories based on the final state:
      `[Staple Flavours]`
      `1. [Flavour Name]`
      `2. [Flavour Name]`
      `[Creations]`
      `1. [Flavour Name]`
    * URL-encode the string and trigger `window.open('https://wa.me/393402362566?text=...')`.


    * [x] **4D.11 Asset Management, UI Updates & Instagram Extraction:**
  * **File Management (Instagram Images):**
    * Move the 3 new images (`Instagram-Kombucha Maracuja 3.webp`, `Instagram-Pastel de Nata2.webp`, `Instagram-SalameChocolate2.webp`) from `public/assets/images/new-instagram-slider/` into `public/assets/images/`.
    * Delete the now-empty `new-instagram-slider` folder.
    * Move the 3 corresponding old images (`Instagram-Kombucha de Maracujá2.webp`, `Instagram-Pastel de Nata.webp`, `Instagram-Salame de Chocolate.webp`) from `public/assets/images/` into `public/assets/images/_archive/`.
    * Update the Instagram slider data array in the codebase to reference the 3 new filenames.
  * **File Management & UI Updates (Cone Images):**
    * *Belgian Chocolate w/ Orange:* Move `cone-belgian-chocolate-with-algarve-orange-v2.webp` from the `_archive` folder back to `public/assets/images/`. Update the Staple Flavours data to use this image (replacing the current placeholder).
    * *Raspberry:* Update the Flavours data to use `cone-raspberry-v4.jpg`. Move the old `cone-raspberry-v2.webp` into the `_archive` folder.
    * *Strawberry:* Update the Flavours data AND the image slider in the "Our Story" section to use `cone-strawberry-v4.jpg`. Move the old `cone-strawberry-v3.jpg` into the `_archive` folder.
  * **Text/Translation Update:**
    * In the "Our Creations" section / `en.json` translation file, change the English translation of "Natas com Toffe e Pinhões Caramelizados" to exactly: "Fior di Latte with Toffee and Caramelised Pine Nuts".
  * **Data Extraction (Terminal Output):**
    * Run a quick script to read the `public/assets/images/` directory and list all 22 active `Instagram-...` filenames. Output this clean list directly in the chat/console so Patrick can copy it for the client to define the order.


    * [x] **4D.12 Slider UX Overhaul & 6th Special Creation:**
  * **Instagram Slider "Infinite Loop" Fix:** 
    * Strip out the glitchy 3x array duplication and debounce "teleport" logic. Revert to a single, clean array of the 22 items.
    * Keep it as a standard finite slider (Start to End) using native CSS scroll-snapping.
    * Update the Right Arrow logic: if the user reaches the absolute end of the slider, clicking the Right Arrow should smoothly scroll them back to the very first image.
  * **Mobile Slider Arrows & Alignment:**
    * Un-hide the Left/Right navigation arrows on mobile viewports.
    * Ensure the slider mounts displaying the FIRST image perfectly aligned/centered, not starting partially scrolled.
    * Implement scroll state detection: The "Left" arrow must be completely hidden when the slider is at the starting position (index 0). It should only appear once the user swipes or clicks right.
    * Ensure native touch-swiping remains fully enabled alongside the new arrow buttons.
  * **6th Special Creation Addition & Optimization:**
    * Locate `public/assets/images/cone-limao-pepino-hortela-v1.jpg` and optimize it into a highly compressed `.webp` format, matching the standards of the other images.
    * Add this new flavour to the active UI array for the "Our Creations" special cones section.
  * **Creations Grid Layout Update:**
    * Adjust the Tailwind grid classes for the Special Creations block.
    * **Mobile:** Set to 2 columns (`grid-cols-2`), resulting in 3 rows.
    * **Desktop:** Set to 3 columns (`md:grid-cols-3`), resulting in exactly 2 rows.


    * [x] **4D.13 Final Text Corrections & SEO Optimization:**
  * *Agent Directive:* Meticulously double-check both `en.json` and `pt.json` (or your localized data files) to ensure these exact text replacements are applied without breaking surrounding text or layout.
  * **Menu Translation Update:**
    * Locate the flavour "Morango Natas com calda de Morango". Update its English translation to exactly: "Strawberry Fior di Latte with Strawberry Swirl".
  * **Hero Title Update:**
    * In the English version, replace the word "Ice Cream" in the main H1 title with "Gelato" (e.g., "Artisanal Gelato").
  * **Badge Terminology (Portuguese):**
    * In the Portuguese version, change the dietary badge text from "Vegano" to strictly "Vegan" across all flavor and creation cards.
  * **Missing Sentence (Our Flavours / Os Nossos Sabores):**
    * EN: Immediately after the sentence ending in "...contain cookies.", add: "We also have non added sugar gelato."
    * PT: Immediately after the sentence ending in "...conter bolacha.", add: "Também temos sabores sem aditivos de açúcar."
  * **SEO Keyword Injections (Find and Replace):**
    * *Our Flavours (EN):* Update text to "...our staple artisanal ice cream flavours..."
    * *Os Nossos Sabores (PT):* Update text to "...os nossos sabores de gelado artesanal habituais..."
    * *Sustainable by Nature (EN):* Update text to "...keep your artisanal gelato fresh all the way home..."
    * *Sustentável por natureza (PT):* Update text to "...e mantêm o teu gelado artesanal fresco..."
    * *Sustainable by Nature (EN) Part 2:* Update text to "...We believe delicious handcrafted gelato..."
    * *Sustentável por natureza (PT) Part 2:* Update text to "...acreditamos que um delicioso gelado feito à mão e responsabilidade..."
    * *Private Events (EN):* Update text to "...Our Italian-style gelatos and sorbets are available..."
    * *Private Events & Catering (PT):* Update text to "...Os nossos gelados e sorbets de estilo italiano estão..."

* [x] **4D.14 Media Optimization, Grid Updates & Flavor Reordering:**
  * **"Our Story" Image Swap & Optimization:**
    * Locate the file `public/assets/images/cone-strawberry-horizontal.jpg`.
    * Convert and compress this image into an appropriately sized `.webp` format for web performance (e.g., `cone-strawberry-horizontal.webp`).
    * Update the "Our Story" image slider array to use this new horizontal WebP image, replacing the previous vertical strawberry photo.
  * **"Our Creations" Special Cones Reduction:**
    * Reduce the active array of special creation cones from 6 back to exactly 4 items.
    * Set the exact display order to: 
      1. Pastel de Nata
      2. Morango Natas (Strawberry Fior di Latte with Strawberry Swirl)
      3. Carrot Cake
      4. Vanilla Damson
    * Adjust the Tailwind grid classes (e.g., `md:grid-cols-2` or `md:grid-cols-4`) so the 4 cards are displayed perfectly balanced on desktop, avoiding empty row spaces.
  * **Staple Flavours Reordering:**
    * Read the target order specified in the `.agent/context/09_order-stable-flavours.md` file.
    * Update the hardcoded staple flavours array in the codebase to exactly match this new sequence.


* [x] **4D.15 Minor Text Fixes, Reordering, and Media Swaps:**
  * **Text Fix (Punctuation):**
    * In the "Our Story" translation strings (both EN and PT), locate the sentence: "No artificial additives, no colourings, no preservatives [long dash] just pure flavour with up to 75% fruit in each scoop."
    * Remove the long dash character entirely and replace it with a standard hyphen (-) or a comma to ensure clean typography.
  * **Text Fix (Content Deletion):**
    * In the English translation file (`en.json`) for the "Our Flavours" section, delete the sentence: "Find weekly specials at our Charneca da Caparica and Costa da Caparica locations."
    * Do not touch the Portuguese version. Ensure this exact sentence remains intact within the "Creations" section.
  * **Creations Reordering:**
    * Update the array order for the special cones in "Our Creations" to strictly follow this sequence: 1. Carrot Cake, 2. Morango Natas, 3. Pastel de Nata, 4. Vanilla Damson.
  * **Flavours Section Image Swaps:**
    * Convert `public/assets/images/cone-strawberry-v5.jpg` and `public/assets/images/cone-raspberry-v7.png` into highly optimized `.webp` formats, adjusting file sizes for web performance.
    * Update the "Our Flavours" data array in the codebase to reference these two new `.webp` files.
    * Move the previously active Strawberry and Raspberry image files into the `public/assets/images/_archive/` directory.
  * **"Our Story" Slider Image Swap:**
    * Convert `public/assets/images/cone-strawberry-horizontal-v2.jpg` into an optimized `.webp` format, adjusting the resolution and file size for smooth slider performance.
    * Update the image slider array in the "Our Story" section to point to this new `.webp` file.
    * Move the previously used horizontal strawberry image into the `public/assets/images/_archive/` folder.

  ## Phase 5: Technical SEO, Media & Launch Prep
**Goal:** Optimize the SPA for search engines, secure contact methods against spam, optimize all media assets, and conduct rigorous mobile testing.

* [x] **5.1 Dynamic Metadata & Canonical Tags:**
  * Configure the `generateMetadata` API in `app/[lang]/layout.tsx` and `app/[lang]/page.tsx` for both Portuguese and English.
  * Define localized `title` (e.g., "Anara Gelado Artesanal | Da quinta para o cone"), `description`, and Open Graph (OG) images.
  * Implement dynamic canonical URLs to prevent duplicate content issues across i18n routing.
* [x] **5.2 Schema Markup (JSON-LD):**
  * Generate and inject `LocalBusiness` (or `IceCreamShop`) schema JSON-LD scripts into the `<head>`.
  * Ensure the schema includes data for **both** locations (Charneca HQ and Costa Mobile Shop), including their respective coordinates and dynamic hours. See alos .agent\context\03-architecture-content.md section ## 5. Core Business Data for google maps infos. In case that is needed.
* [x] **5.3 Sitemaps & Robots.txt:**
  * Create `app/sitemap.ts` to automatically generate the XML sitemap, ensuring all localized routes (`/pt` and `/en`) are indexed.
  * Create `app/robots.ts` to allow crawling while blocking unnecessary internal/API routes.
* [ ] **5.4 Media Quality Improvements & Optimization:  (do not execute this task for now)**
  * *Design Task:* Enhance smartphone photos/videos using AI tools (Topaz, Midjourney, Nano Banana Pro) to match the high-end "farm-to-cone" aesthetic.
  * *Dev Task:* Route all images through Next.js `<Image>` components with `priority` on above-the-fold assets. Ensure strict use of `alt` tags emphasizing local SEO (e.g., "Gelado Artesanal Costa de Caparica").
  * *Dev Task:* Compress the looping hero videos. Ensure video tags include `playsInline`, `autoPlay`, `muted`, and `loop` so they play flawlessly on iOS/Android without requiring user interaction.
* [x] **5.5 Email Bot Protection:**
  * Do not expose the raw `hello@anaragelado.pt` address in the DOM.
  * Implement an obfuscation technique (e.g., encoding the email in base64 and decoding it client-side, or requiring a user interaction like `onClick` to reveal the `mailto:` link) to prevent spam scrapers.
* [x] **5.6**
  * Clean Up: Default Next.js SVGs removed from /public? (file.svg, globe.svg, next.svg, vercel.svg, window.svg). — Already absent from /public.
* [x] **5.7**
  * check and correct favicon. I used a favicon checker and apperantly there is not svg favicon, there is no desktop png favicon, no touch icon declared, no touch web app title declared, no web app manifest declared. these files are needed in the public folder: `favicon.ico` (multi-resolution: 16, 32, 48), `favicon.svg` (Scalable, color-scheme aware), `favicon-16x16.png`, `favicon-32x32.png`, `favicon-96x96.png` (Recommended), `apple-touch-icon.png` (180×180, with padding), `web-app-manifest-192x192.png` (Maskable safe zone), `web-app-manifest-512x512.png` (Maskable safe zone), `site.webmanifest`
* [x] **5.8**
  * please check the site.webmanifest. What input do you need or do zou have all the input by looking at the current website and the google maps entries of the HQ and the mobile shop? (.agent\context\03-architecture-content.md section 5) Please check that:
    * `name` & `short_name` are correct.
    * `start_url: "/"`
    * `display: "standalone"`
    * `theme_color` & `background_color` match brand.
    * `icons`: Includes BOTH "maskable" AND "any" purpose entries.
* [x] **5.9**
  * please check the metadata. Title and Description change to the correct language and every page has its own?. (See chrome browser tab)
* [x] **5.10**
  * Please check the alt text of the images. Make sure that the description is suitable for all the images, for the corresponding images, and it should be in the correct language.
* [x] **5.11**
  * Please check Hreflang Tags: View Page Source. Do we see: <link rel="alternate" hreflang="de" ... />?
* [x] **5.12**
  * Please check The Open Graph Image. Make sure, if we have not defined an Open Graph Image, please choose one and make sure it has a resolution of 1200 x 630 pixels. I would prefer to use an image that showcases the HQ ice cream shop, so also feel free to look into the archive if there is an image that we can use. The social title should be in the social title format: client name, then the vertical line, then the slogan. Please choose a slogan that fits the business, which is basically the H1 of the website. I'm not sure if you can choose a title for both languages, but obviously for English use the English H1 of the homepage and for Portuguese use the Portuguese H1 of the website homepage. 
* [x] **5.13**
  * Please check the Copyright in the footer: Year updates automatically (new Date()). — Already implemented.
* [x] **5.14**
  * Please check lazy loading for images and videos in order to have a good speed performance.Layout Shift (CLS): Text stays stable while fonts load (Score < 0.1). Also make sure that all the images have an appropriate file size and resolution and are in the WebP format. 
* [x] **5.15**
  * Please check H-Tags: Exactly one H1 per page. Canonical Tags: Self-referencing tags present (stripping query params like ?ref=). Sitemap: /sitemap.xml is valid. Robots: /robots.txt allows indexing (User-agent: * Allow: /). Schema Markup: Verified LocalBusiness + VideoObject via Google Rich Results Test. Credits: "Bildnachweis" (Image Credits) included in Legal page.The images and videos have been provided by Anara itself.
* [x] **5.16**
  * Please check the imprint page. there seems to miss a few details. in the section "Alternative Dispute Resolution" the info for "entity" and "website" is missing. please check the context and search for the right infos. I suppose it is some sort of legal binding complaint book that portuguese business have to have. Make sure to adjust it in both languages.
* [x] **5.17**
  * You changed the favicon to a symbol that I did not ask for. We need to change back the favicon to basically use this file and create out of this file the favicon: public\assets\logo.svg
* [x] **5.18**
  * Corrections: you changed some things that I did not ask for. Correct email adress "info@anaragelado.pt" and the business name in the footer should be Anara Gelado Artesanal. Please also check the imprint page and the privacy page in english as well als portuguese.
* [x] **5.19**
  * When clikcing on the logo in the nav bar, it should link back to the homepage header.
* [x] **5.20**
  * The favicon should be the logo public\assets\logo.svg on white background and not on yellow background. please update and check all favicons and icons.
* [x] **5.21**
  * Add this feature to the locations section: when the shop (doesnt mattetr if HQ or mobile) is closed but in "custom_display_text_en" and "custom_display_text_pt" is a text, that it should display that text instead of "closed". We will basically use this to tell the customer that for example the mobile shop will open soon (that means it the upcoming days or weeks). Also provide a rule list that I can add to the google spreadsheet manually, that explains the behaviour of the google spreadsheet. This should be a reminder cheat sheet for the customer in order to give the customer clear instructions what she needs to do. provide that as a text that I can copy and paste into the google spreadsheet... 


  ## Phase 6: Manual testing and importaint steps 
* [ ] **6.1 Final Mobile QA & Performance Testing: (This is a manual testitng task) do not execute.**
  * Test the site on actual iOS Safari and Android Chrome environments (do not rely solely on Chrome DevTools resizing).
  * Run a Lighthouse Audit to guarantee 90+ scores in Performance, Accessibility, Best Practices, and SEO.
  * Verify the smooth scrolling behavior (Lenis) is correctly disabled on touch devices.
  * Verify the language toggle correctly shifts URL parameters and translations without breaking the UI.
* [ ] **6.2**
  * Make sure to set up a new google spreadsheet for the client, where she can update the business hours. Important is to update that connection within the coede so that the wbesite synchronizes to that new google spreadsheet.