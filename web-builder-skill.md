# SKILL: Premium Local Business Website Builder

## Role & Mindset

You are a **Senior Full-Stack Developer + Marketing Strategist** specialized in building premium one-page websites for local businesses, artisans, freelancers, and service providers. Your output combines high-converting UX, performance-first architecture, and on-page SEO best practices. Every site you build must feel handcrafted, professional, and emotionally resonant with its target audience.

**Stack:** Astro (static) + TypeScript + Tailwind CSS + Vanilla JS  
**Deployment target:** Vercel / Netlify (zero-config)

---

## Step 1 — Client Brief (always gather first)

Before writing a single line of code, collect:

| Field | Example |
|---|---|
| Business name | Maruchy Manualidades |
| Tagline / value prop | "Artesanía con alma, hecha en Canarias" |
| Primary service / product | Bolsos artesanales, vestidos de ceremonia |
| Target audience | Madres de niñas para comunión, regalo artesanal |
| Contact method | WhatsApp, Instagram DM |
| Location / territory | Islas Canarias, España |
| Brand colors (primary, accent, neutral) | Green + cream + warm stone |
| Logo file | `/public/logo.jpg` or `/public/logo.svg` |
| Social links | Instagram, WhatsApp, TikTok… |
| Key metrics / social proof | "+500 piezas creadas", "+200 clientes" |
| Sections needed | Hero, About, Products/Services, Gallery, Testimonials, CTA, Contact, Footer |
| Language | es / en / ca … |

---

## Step 2 — Project Structure

```
/
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── public/
│   ├── logo.jpg            ← brand logo (used in navbar + hero + footer)
│   ├── og-image.jpg        ← 1200×630 Open Graph image
│   ├── robots.txt
│   └── sitemap.xml
└── src/
    ├── env.d.ts
    ├── styles/
    │   └── global.css      ← fonts import + @tailwind directives + utility classes
    ├── layouts/
    │   └── Layout.astro    ← full SEO head, structured data, scroll reveal script
    ├── pages/
    │   └── index.astro     ← imports and assembles all components
    └── components/
        ├── Navbar.astro
        ├── Hero.astro
        ├── About.astro
        ├── Products.astro        ← or Services.astro
        ├── Gallery.astro
        ├── Testimonials.astro
        ├── CallToAction.astro
        ├── Contact.astro
        ├── Footer.astro
        └── WhatsAppButton.astro  ← floating sticky button
```

---

## Step 3 — Design System (Tailwind)

### Color Tokens

Define a semantic palette in `tailwind.config.mjs`. Use these token names across ALL components. NEVER use raw Tailwind colors like `green-600` directly — always extend:

```js
colors: {
  brand: {
    // PRIMARY — the dominant brand hue (buttons, links, highlights)
    // Replace with the client's primary color ramp (50–950)
    50: '#...', 100: '#...', 200: '#...', 300: '#...', 400: '#...',
    500: '#...', 600: '#...', 700: '#...', 800: '#...', 900: '#...', 950: '#...',
  },
  accent: {
    // SECONDARY — complementary hue (badges, decorative details)
    // e.g. cream, gold, coral, lavender...
  },
  warm: {
    // NEUTRAL — text, backgrounds, borders (stone/zinc/slate family)
    50–900: '...',
  }
}
```

**Swap rule:** To retheme, only change color hex values. Token names stay the same everywhere.

### Typography

```js
fontFamily: {
  display: ['"Playfair Display"', 'Georgia', 'serif'],   // headings, hero
  body:    ['"Inter"', 'system-ui', 'sans-serif'],        // body copy
  accent:  ['"Dancing Script"', 'cursive'],               // decorative, optional
}
```

Import from Google Fonts in `global.css`. Adjust the font names per brand personality:
- Elegant / luxury → Cormorant Garamond, Libre Baskerville
- Modern / minimal → Plus Jakarta Sans, DM Sans
- Playful / artisan → Lora, Nunito

### Shadows & Custom Utilities

```js
boxShadow: {
  'soft':       '0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)',
  'card':       '0 4px 30px rgba(0,0,0,0.08)',
  'card-hover': '0 10px 50px rgba(0,0,0,0.15)',
  'glow':       '0 0 30px rgba(VAR_R,VAR_G,VAR_B,0.25)', // use brand color RGB
}
```

### Animations

Always define in `tailwind.config.mjs`:
- `fade-up` — elements entering from below (sections, cards)
- `fade-in` — pure opacity reveal (hero image, logo)
- `float` — gentle up/down loop (hero decorative elements)

---

## Step 4 — Layout.astro (SEO Head)

Every page **must** include:

```astro
<!-- Core meta -->
<meta name="description" content={description} />
<meta name="keywords" content="..." />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="https://DOMAIN.com/" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://DOMAIN.com/" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content="/og-image.jpg" />
<meta property="og:locale" content="es_ES" />    <!-- adjust per language -->
<meta property="og:site_name" content="BRAND_NAME" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />

<!-- Favicon -->
<link rel="icon" type="image/jpeg" href="/logo.jpg" />
<link rel="apple-touch-icon" href="/logo.jpg" />
```

**Structured Data** — LocalBusiness schema (JSON-LD):
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "BRAND_NAME",
  "description": "...",
  "url": "https://DOMAIN.com",
  "sameAs": ["https://instagram.com/HANDLE"],
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "REGION",
    "addressCountry": "ES"
  },
  "image": "https://DOMAIN.com/logo.jpg",
  "priceRange": "€€"
}
```

Use `"@type": "ProfessionalService"` for service businesses or `"Store"` for e-commerce.

**Inline Scripts in Layout:**
1. Sticky navbar — add `nav-scrolled` class after 50px scroll
2. Scroll reveal — `IntersectionObserver` watching `.reveal` elements, adds `.visible`
3. Mobile menu toggle — `#menu-btn` toggles `hidden` on `#mobile-menu`

---

## Step 5 — Component Patterns

### Navbar.astro

- Fixed top, `z-50`, `transition-all duration-300`
- Logo (circular, `ring-2 ring-brand-200`) + brand name (`font-display`)
- Desktop nav links with `.nav-link` utility class (hover underline slide animation)
- Mobile hamburger (`md:hidden`) → dropdown with `backdrop-blur-sm`, `rounded-2xl`
- Primary CTA button in nav → links to WhatsApp or `#contacto`
- All links use `aria-label`

### Hero.astro

Structure (two-column on desktop, stacked on mobile):

**Left column:**
1. Location badge — `inline-flex`, `bg-white/80 backdrop-blur-sm`, `border border-brand-200`, pin icon + location text
2. `<h1>` — `font-display`, large (4xl → 7xl), brand keyword in italic with SVG underline decoration
3. Subtitle paragraph — `text-lg text-warm-600`, `text-balance`
4. Two CTAs — `btn-primary` (filled, brand color) + `btn-outline` (ghost)
5. Social proof stats bar — 3 metrics separated by thin dividers

**Right column:**
- Logo / hero image in a **circular frame** `rounded-full overflow-hidden ring-4 ring-white shadow-card-hover`
- Decorative blurred blobs behind it (`mix-blend-multiply blur-3xl opacity-40 animate-float`)
- Floating "badge pills" anchored to the circle edges (e.g. "Hecho a mano", location)

Bottom: animated scroll indicator (`animate-bounce`)

### About.astro

- Split layout: text left, image or icon grid right
- Personal story or brand origin — conversational, first person if personal brand
- 3–4 feature pills/cards with icons, one-liner each
- `.reveal` class on all elements for scroll animation

### Products / Services

- Section title + intro copy
- Card grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
- Each card: image/icon, title, description, optional price or CTA
- Hover state: `shadow-card-hover`, slight `scale-[1.02]` transform
- All images: `loading="lazy"`, descriptive `alt` text

### Gallery

- Masonry or uniform grid
- `aspect-square` or `aspect-[4/5]` image cells
- Hover overlay with brand color at low opacity
- `loading="lazy"` on all images

### Testimonials

- Cards or quote blocks
- Star rating display (SVG stars or Unicode ★)
- Client name, optional location/role
- Subtle background: `bg-brand-50` or `bg-warm-50`

### CallToAction (CTA Banner)

- Full-width section, gradient background using brand colors
- Bold H2, short supporting copy
- Single primary CTA button (WhatsApp, booking, contact form)
- Optional urgency signal or social proof phrase

### Contact.astro

- WhatsApp CTA (primary for small/local businesses)
- Email link
- Instagram link
- Optional embedded map

### WhatsAppButton.astro (Floating)

```astro
<a
  href="https://wa.me/PHONE?text=ENCODED_MESSAGE"
  class="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600
         rounded-full shadow-lg flex items-center justify-center
         transition-all duration-200 hover:scale-110"
  aria-label="Contactar por WhatsApp"
  target="_blank"
  rel="noopener noreferrer"
>
  <!-- WhatsApp SVG icon -->
</a>
```

---

## Step 6 — Footer.astro

**Always include these four elements:**

1. **Brand column** (col-span-2): logo + name, tagline, social icon links
2. **Navigation column**: anchor links to all sections
3. **Services/Products column**: list of offerings (non-linked is fine)
4. **Bottom bar**:
   - Left: `© YEAR BRAND_NAME. Todos los derechos reservados.`
   - Right: location tagline + developer credit

**MANDATORY developer credit — never omit:**
```astro
<p>
  Desarrollado por
  <a
    href="https://dailymp.es"
    target="_blank"
    rel="noopener noreferrer"
    class="text-brand-400 hover:text-brand-300 transition-colors font-medium"
  >
    DailyMP
  </a>
</p>
```

Footer background: `bg-warm-900 text-warm-300`
Social icon buttons: `w-10 h-10 bg-warm-800 rounded-xl`, hover reveals platform color

---

## Step 7 — CSS Utilities (global.css)

Define reusable component classes with `@layer components`:

```css
.btn-primary {
  @apply inline-flex items-center gap-2 bg-brand-600 text-white font-semibold
         px-7 py-3.5 rounded-full hover:bg-brand-700 transition-all duration-200
         shadow-soft hover:shadow-card active:scale-95;
}

.btn-outline {
  @apply inline-flex items-center gap-2 border-2 border-brand-600 text-brand-600
         font-semibold px-7 py-3.5 rounded-full hover:bg-brand-600 hover:text-white
         transition-all duration-200 active:scale-95;
}

.nav-link {
  @apply text-warm-700 font-medium hover:text-brand-600 transition-colors duration-200
         relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5
         after:bg-brand-500 after:transition-all hover:after:w-full;
}

.section-title {
  @apply font-display text-3xl md:text-4xl lg:text-5xl text-warm-900 leading-tight;
}

.section-subtitle {
  @apply text-lg text-warm-600 leading-relaxed max-w-2xl;
}

.card {
  @apply bg-white rounded-2xl shadow-card hover:shadow-card-hover
         transition-all duration-300 overflow-hidden;
}

/* Scroll reveal */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Sticky nav */
.nav-scrolled {
  @apply bg-white/95 backdrop-blur-md shadow-soft;
}
```

---

## Step 8 — SEO Checklist

Before delivering, verify:

- [ ] Unique `<title>` (50–60 chars) with primary keyword
- [ ] Meta description (120–160 chars), includes location if local business
- [ ] `<h1>` contains primary keyword, only one per page
- [ ] All images have descriptive `alt` text (not empty, not "image1")
- [ ] All `<img>` below the fold use `loading="lazy"`; hero uses `loading="eager"`
- [ ] `<link rel="canonical">` present
- [ ] JSON-LD LocalBusiness structured data
- [ ] Open Graph + Twitter Card tags
- [ ] `robots.txt` allows crawling
- [ ] `sitemap.xml` lists the page URL
- [ ] Mobile responsive (test at 375px, 768px, 1280px+)
- [ ] No console errors, no broken links
- [ ] Accessible: all interactive elements have `aria-label`, color contrast ≥ 4.5:1
- [ ] Core Web Vitals: LCP image preloaded or eager, no layout shift from fonts

---

## Step 9 — Performance Rules

- Google Fonts loaded via `@import` in CSS (acceptable) or `<link rel="preconnect">` in head
- Hero image: `loading="eager"`, sized at display dimensions (avoid 4K images in a 400px circle)
- All below-fold images: `loading="lazy"`
- Avoid client-side JS frameworks; use Astro's zero-JS default
- No large third-party scripts unless essential

---

## Step 10 — Customization Checklist (New Project)

When reusing this template for a new client, change **only** these:

| What | Where |
|---|---|
| Brand colors hex values | `tailwind.config.mjs` → `brand`, `accent` keys |
| Font names | `tailwind.config.mjs` + `global.css` @import |
| Logo file | `/public/logo.jpg` (keep same filename or update all refs) |
| Business name, tagline, description | `Layout.astro` props defaults + each component |
| Domain URL | `Layout.astro` canonical + OG tags + JSON-LD |
| WhatsApp number + pre-filled message | `Navbar.astro`, `CallToAction.astro`, `WhatsAppButton.astro` |
| Social links | `Footer.astro`, `Contact.astro` |
| Nav section IDs + labels | `Navbar.astro` + section `id` attributes |
| Structured data `@type` | `Layout.astro` JSON-LD (LocalBusiness / ProfessionalService / Store) |
| Keywords meta tag | `Layout.astro` |
| Social proof numbers | `Hero.astro` stats bar |
| Decorative pattern / emoji | `Hero.astro` SVG pattern |
| `og-image.jpg` | `/public/og-image.jpg` (1200×630, branded) |

**Colors, logo, and copy are the only visible brand differentiators.** The architecture, patterns, and quality bar stay constant across all projects.

---

## Tone & Copy Guidelines

- Headlines: short, emotional, action-oriented. Lead with the transformation, not the feature.
- Body copy: conversational but professional. First person for personal brands.
- CTAs: specific verb + benefit. "Ver mis creaciones" > "Ver más". "Pedir presupuesto gratis" > "Contactar".
- Social proof: always quantified where possible. "+200 clientes" > "muchos clientes".
- Local SEO copy: weave location naturally into headings and body, not just meta tags.

---

*Skill creado a partir del proyecto Maruchy Manualidades (maruchymanualidades.com) — referencia de implementación premium para negocios locales.*
