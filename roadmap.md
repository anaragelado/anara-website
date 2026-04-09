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