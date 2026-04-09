# Development Roadmap: Anara Gelado Artesanal

## Role & Directives
You are an expert AI web developer building a high-end, mobile-first Single Page Application (SPA). This `roadmap.md` is your master task list and source of truth. 

Before writing any code or making architectural decisions, you must read the `.agent.md` file in the root directory. This will direct you to the specific constraint files located in the `.agent/context/` and `.agent/skills/` directories. Do not guess parameters; always pull them from the context files.

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
* [ ] **2.4 Mobile Navigation Menu:**
  * Implement the hamburger menu utilizing a thin-stroke `lucide-react` icon.
  * Build a full-screen overlay or right-side slide-out drawer for mobile navigation.
  * Ensure all mobile links have a minimum touch target of 44x44 pixels.
  * Place the Language Toggle (PT | EN) at the bottom of this mobile menu.
*[ ] **2.5 Footer Component Construction:**
  * Create the `<Footer>` component using a minimalist warm off-white or solid white background.
  * Add the clickable Instagram link (using a Lucide icon).
  * Add the clickable Email link (`mailto:hello@anaragelado.pt` with a fallback to `anara.gelado@gmail.com`). 
  * Add text links for Imprint and Privacy Policy.
* [ ] **2.6 Webmaster Backlink Integration:**
  * Embed the required developer signature in the bottom right (desktop) or bottom center (mobile) of the footer.
  * Exact text: "Web design by VideoMetrixs. Like this site? Let's build yours."
  * Ensure "VideoMetrixs" correctly hyperlinks to `https://www.videometrixs.com` with `target="_blank"` and `rel="noopener noreferrer"`.


  ## Phase 3: Core Features & SPA Sections
**Goal:** Build the content sections of the one-pager, enforcing the "farm-to-cone" storytelling, the warm aesthetics, and the dynamic location data.

* [ ] **3.1 Hero Section (`#hero`):**
  * Implement responsive media rendering:
    * Mobile: Load a vertical (9:16) looping video.
    * Desktop: Load a landscape (16:9) looping video or an ultra-wide static image (to prevent stretching).
  * Build the text overlay using `next-intl` for translations.
  * H1: "Artesanal Ice Cream" (Use the clean, elegant headline font).
  * H2: "From the farm to the cone" (Use the handwritten `Amatic SC` accent font).
  * Add a pill-shaped CTA button ("Find Us") that triggers a smooth scroll to `#locations`.
* [ ] **3.2 Trust & Story Section (`#story`):**
  * Build an image-and-text layout detailing the "Best Ingredients" philosophy.
  * Emphasize core USPs: Bourbon Vanilla from Madagascar, 50% to 75% pure fruit content, real milk/cream, and zero artificial additives.
  * Apply strict `rounded-2xl` or `rounded-3xl` classes to all imagery to enforce the "warm, no hard corners" design rule.
* [ ] **3.3 Menu & Flavors Grid (`#menu`):**
  * Create a static data array for staple flavors and a highlighted "Flavor of the Week" (avoiding daily dynamic lists to prevent maintenance bloat).
  * Build a responsive grid (1 column mobile, 2 to 3 columns desktop).
  * Implement completely rounded (`rounded-full`) badges for "Vegan" and "Gluten-Free".
  * Explicitly note next to the GF badge that "All flavors are Gluten-Free except Oreo".
* [ ] **3.4 Sustainability & Takeaway Section (`#takeaway`):**
  * Create a dedicated section focusing on eco-conscious operations.
  * Highlight the recyclable takeaway boxes using dedicated photos.
  * Ensure the background color provides a warm, soft contrast (e.g., `#FAFAFA`).
* [ ] **3.5 Dynamic Data Fetching (Locations & Hours):**
  * Create a Next.js Server Component to fetch dynamic hours/locations.
  * *Method:* Fetch from a "Published to Web" Google Sheet (CSV format) to bypass API keys, OAuth, and GCP requirements, ensuring a flawless handover.
  * Parse the CSV data on the server and pass it to the UI components.
  * *Static Fallback:* Hardcode standard baseline hours directly in the app as a final safety net if the Google Sheet is deleted or unpublished.
* [ ] **3.6 Locations UI & Events Callout (`#locations`):**
  * Build a layout showcasing the two locations: HQ (Charneca) and Mobile Shop (Costa). Use a toggle switch for mobile and a two-column split for desktop.
  * Embed Google Maps iframes for both addresses.
  * Display the dynamically fetched hours clearly with an "Open Now / Closed" visual indicator (using the brand-green or a soft red).
  * Add a dedicated "Private Events & Catering" block below the locations. State that the mobile shop is available for booking and include a `mailto:hello@anaragelado.pt` CTA.
  * *CRITICAL CHECK:* Ensure no mentions, logos, or links to Uber Eats exist anywhere in this section.
* [ ] **3.7 Social Proof & Reviews Component (`#reviews`):**
  * Create a static data array (.agent/context/05-content-data.md) containing 3 to 4 handpicked 5-star Google Maps reviews. 
  * Build an elegant review slider or grid. 
  * Design: Use the clean, thin typography. Include 5 yellow stars (Lucide icons filled with `#FDDB00`) and the reviewer's first name.
  * Apply `rounded-2xl` to the review cards and use a very soft shadow (`shadow-sm`) or a thin border to keep the UI warm and minimal.


  ## Phase 4: Secondary Pages & UI Polish
**Goal:** Build out the required legal/utility pages, apply smooth scroll-triggered animations, and conduct a strict UI audit against the brand guidelines.

* [ ] **4.1 Legal Pages Integration (Imprint & Privacy):**
  * Create static routes for `app/[lang]/imprint/page.tsx` and `app/[lang]/privacy/page.tsx`.
  * Wrap content in the global `<SectionWrapper>` to maintain consistent constraints and padding.
  * Use simple, clean typography (Work Sans) for high readability.
  * Ensure localization is fully mapped via `next-intl`.
* [ ] **4.2 Custom 404 Page (`not-found.tsx`):**
  * Create a custom, brand-aligned 404 page (e.g., a simple message like "Looks like this flavor melted").
  * Include a pill-shaped `rounded-full` CTA button to return users smoothly to the homepage.
* [ ] **4.3 GDPR & Cookie Banner Strategy:**
  * *Compliance Check:* Verify that zero third-party tracking scripts (Google Analytics, Meta Pixel, etc.) are installed. 
  * If absolutely no tracking scripts are used, **do not build a cookie banner**. This keeps the minimalist UI pristine and is fully GDPR compliant (essential session cookies do not require consent).
  * If tracking is later added, build a strictly minimalistic banner using `bg-white`, `rounded-2xl` corners, and a subtle drop shadow, placed at the bottom-left of the screen.
* [ ] **4.4 Framer Motion Implementation (Scroll Reveals):**
  * Wrap core `<section>` elements and internal grids with `<motion.div>`.
  * Implement `whileInView` for subtle, elegant reveal animations (e.g., `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}`).
  * Configure `viewport={{ once: true, margin: "-100px" }}` so animations only trigger once per session and feel natural as the user scrolls.
* [ ] **4.5 Micro-Interactions & Hover Polish:**
  * Apply uniform transitions to all buttons and links (`transition-all duration-300 ease-in-out`).
  * Implement the secondary Instagram colors (`#8BCF68`, `#DEA361`, `#EA567A`, `#FF7802`) **strictly** as subtle hover effects (e.g., link underlines or text color shifts on hover).
  * Add a subtle scale effect (`hover:scale-105`) to all pill-shaped buttons.
* [ ] **4.6 Geometry & "Warmth" UI Audit:**
  * Conduct a DOM-wide sweep to verify absolutely **zero** sharp corners exist (`rounded-none`).
  * Ensure all images, map iframes, and cards use `rounded-2xl` or `rounded-3xl`.
  * Ensure all buttons and badges use `rounded-full`.
  * Verify text colors are using the warm dark grey (`#1A1A1A`) and not pure black (`#000000`).


  ## Phase 5: Technical SEO, Media & Launch Prep
**Goal:** Optimize the SPA for search engines, secure contact methods against spam, optimize all media assets, and conduct rigorous mobile testing.

* [ ] **5.1 Dynamic Metadata & Canonical Tags:**
  * Configure the `generateMetadata` API in `app/[lang]/layout.tsx` and `app/[lang]/page.tsx` for both Portuguese and English.
  * Define localized `title` (e.g., "Anara Gelado Artesanal | Da quinta para o cone"), `description`, and Open Graph (OG) images.
  * Implement dynamic canonical URLs to prevent duplicate content issues across i18n routing.
* [ ] **5.2 Schema Markup (JSON-LD):**
  * Generate and inject `LocalBusiness` (or `IceCreamShop`) schema JSON-LD scripts into the `<head>`.
  * Ensure the schema includes data for **both** locations (Charneca HQ and Costa Mobile Shop), including their respective coordinates and dynamic hours.
* [ ] **5.3 Sitemaps & Robots.txt:**
  * Create `app/sitemap.ts` to automatically generate the XML sitemap, ensuring all localized routes (`/pt` and `/en`) are indexed.
  * Create `app/robots.ts` to allow crawling while blocking unnecessary internal/API routes.
* [ ] **5.4 Media Quality Improvements & Optimization:**
  * *Design Task:* Enhance smartphone photos/videos using AI tools (Topaz, Midjourney, Nano Banana Pro) to match the high-end "farm-to-cone" aesthetic.
  * *Dev Task:* Route all images through Next.js `<Image>` components with `priority` on above-the-fold assets. Ensure strict use of `alt` tags emphasizing local SEO (e.g., "Gelado Artesanal Costa de Caparica").
  * *Dev Task:* Compress the looping hero videos. Ensure video tags include `playsInline`, `autoPlay`, `muted`, and `loop` so they play flawlessly on iOS/Android without requiring user interaction.
* [ ] **5.5 Email Bot Protection:**
  * Do not expose the raw `hello@anaragelado.pt` address in the DOM.
  * Implement an obfuscation technique (e.g., encoding the email in base64 and decoding it client-side, or requiring a user interaction like `onClick` to reveal the `mailto:` link) to prevent spam scrapers.
* [ ] **5.6 Final Mobile QA & Performance Testing:**
  * Test the site on actual iOS Safari and Android Chrome environments (do not rely solely on Chrome DevTools resizing).
  * Run a Lighthouse Audit to guarantee 90+ scores in Performance, Accessibility, Best Practices, and SEO.
  * Verify the smooth scrolling behavior (Lenis) is correctly disabled on touch devices.
  * Verify the language toggle correctly shifts URL parameters and translations without breaking the UI.