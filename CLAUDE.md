# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Femina Plus is a beauty and wellness center website (multi-location salons in India). Built with Astro (SSG) and Tailwind CSS. Domain: `feminaplussalon.com`.

## Commands

```bash
npm run dev       # Dev server at localhost:4321
npm run build     # Production build to ./dist/
npm run preview   # Serve production build locally
```

No test runner or linter is configured.

## Architecture

**Tech Stack**: Astro v5 (static site generation), Tailwind CSS v3, jQuery (mobile menu), AOS (scroll animations), Slick (carousels). All JS libraries loaded via CDN except jQuery and AOS which are npm dependencies imported in `src/js/Global.js`.

**External Assets**: Images are hosted at `assets.feminaplussalon.com` (not in `public/`). Reference them with full URLs like `https://assets.feminaplussalon.com/public/filename.webp`.

### Page Structure

Every page follows this template (see `src/pages/makeup.astro` as canonical example):

1. **Frontmatter**: Import components, define `services` array (for Header banner text) and `faqs` array
2. **`<head>`**: `<SEOHead>`, `<LocalBusinessSchema>`, GMT script, jQuery/AOS/Slick CDN links, Google Analytics gtag
3. **`<body>`**: `<GMT>` noscript, `<Header services={services}>`, page-specific content sections, shared sections (`Testimonials`, `InstagramFeed`, `Locations`), `<FAQ faqs={faqs}>`, `<Footer>`
4. **Bottom scripts**: Slick init, `Global.js` import, AOS CSS

Homepage (`index.astro`) uses `<Hero>`. Service pages use `<HeroWithBooking>` with props: `title`, `subtitle`, `backgroundImage`, `type`, `autoSelectFirst`.

### Key Components

- **SEOHead.astro**: Required props `title`, `description`. Optional: `keywords`, `canonical`, `ogImage`, `noindex`, `schema`. Auto-appends "| Femina Plus" to titles.
- **LocalBusinessSchema.astro**: Takes optional `serviceType` prop (e.g., `"makeup"`, `"hair-color"`). Generates Schema.org BeautySalon + Service + BreadcrumbList markup.
- **FAQ.astro**: Takes `faqs` array of `{question, answer}` objects. Renders accordion with Schema.org FAQPage markup.
- **Header.astro**: Takes optional `services` prop (string array) for the top banner. Falls back to default promotional text.
- **HeroWithBooking.astro**: Hero with embedded booking form. Contains hardcoded salon list (`allSalons` array) with branch codes and addresses.

### Styling Conventions

- Tailwind utility classes everywhere. Custom fonts: `font-anticdidone` (headings), `font-manrope` (body)
- Color scheme: black, white, gold accents
- AOS animations via data attributes: `data-aos="fade-up"`, etc.
- Scripts using jQuery/Slick need `is:inline` directive

### Sitemap

Configured via `@astrojs/sitemap` in `astro.config.mjs` with custom pages for service routes. Update `customPages` array when adding new service pages.

## Important Patterns

- **Asset paths**: Use leading slash for local public assets (`/logo.svg`), full URLs for external assets (`https://assets.feminaplussalon.com/...`)
- **BookingForm**: Currently commented out across pages (`<!-- <BookingForm /> -->`)
- **Script loading order matters**: jQuery CDN first, then Slick, then component inline scripts, then `Global.js`, then AOS
- **TypeScript casting**: gtag scripts use `(window as any).dataLayer`
- **Carousel init**: Slick carousels are initialized in inline `<script is:inline>` blocks within each page, not in components
- **Mobile menu**: jQuery-based in `Global.js` — `.menu-click` opens, `.menu-close` closes, auto-closes above 1023px

## Adding a New Service Page

1. Create `src/pages/service-name.astro` following `makeup.astro` pattern
2. Create service-specific components in `src/components/`
3. Add the page URL to `customPages` in `astro.config.mjs` for sitemap
4. Include all SEO components (`SEOHead`, `LocalBusinessSchema`, `FAQ`) with page-specific content
5. Each page should have 8-10 FAQ items with conversational answers for rich snippet eligibility
