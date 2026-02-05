# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Femina Plus is a beauty and wellness center website built with Astro and Tailwind CSS. The site showcases various beauty services including makeup, hair color, hair patch/wigs, nails, and skin treatments across multiple salon locations.

## Common Commands

```bash
# Development
npm run dev              # Start dev server at localhost:4321 with HMR

# Building
npm run build            # Build production site to ./dist/

# Preview
npm run preview          # Serve production build locally for testing

# Dependencies
npm install              # Install all dependencies
```

## Architecture

### Tech Stack

- **Framework**: Astro v5.15.5 (SSG mode)
- **Styling**: Tailwind CSS with custom fonts (Antic Didone, Manrope)
- **Runtime JS**: jQuery for mobile menu, AOS for scroll animations, Slick carousel
- **Analytics**: Google Tag Manager (G-TG9QGE938J)

### Project Structure

```
src/
├── pages/               # File-based routing
│   ├── index.astro      # Homepage
│   ├── makeup.astro     # Makeup services page
│   ├── hair-color.astro # Hair color services page
│   ├── hair-patch-wigs.astro
│   └── api/             # API endpoints (e.g., Instagram integration)
├── components/          # Astro components
│   ├── SEOHead.astro    # Comprehensive SEO meta tags component
│   ├── LocalBusinessSchema.astro  # Schema.org structured data for local SEO
│   ├── FAQ.astro        # Reusable FAQ component with Schema.org FAQPage markup
│   ├── Header.astro     # Navigation with mobile menu
│   ├── Hero.astro       # Homepage hero
│   ├── HeroWithBooking.astro  # Service page hero with booking form
│   ├── *Services.astro  # Service-specific components (MakeupServices, HairColorService, etc.)
│   ├── *Gallery.astro   # Gallery components (BeforeAfterGallery, MakeUp, HairColor)
│   ├── EmpoweringWomen.astro  # Services grid section
│   ├── NextGenHealth.astro    # Health solutions carousel
│   ├── Promotional.astro      # Promotional banners
│   ├── Locations.astro  # Salon location cards
│   ├── Testimonials.astro     # Customer testimonials carousel
│   ├── BookingForm.astro      # Appointment booking form (currently commented out)
│   ├── InstagramFeed.astro    # Instagram integration
│   ├── YoutubeVideos.astro    # YouTube video embeds
│   ├── Footer.astro     # Footer with contact info
│   └── GMT.astro        # Google Tag Manager component
├── js/
│   └── Global.js        # jQuery-based mobile menu and AOS initialization
└── css/
    └── style.css        # Custom CSS (imported where needed)

public/                  # Static assets (images, logos, etc.)
```

### Page Architecture Pattern

All pages follow a consistent structure:

1. **Import components** in frontmatter
2. **Define page-specific data** (e.g., `services` array for Header customization)
3. **HTML structure**:
   - Head with meta tags, title, and scripts
   - GMT component (Google Tag Manager)
   - Header component
   - Main content with service-specific components
   - Common sections (Testimonials, InstagramFeed, Locations)
   - Footer component
4. **Scripts**: jQuery, Slick carousel, AOS, and Global.js loaded at bottom

### Component Patterns

- **Header**: Accepts optional `services` prop (array of strings) to display service descriptions
- **Hero variants**:
  - `Hero.astro`: Simple hero for homepage
  - `HeroWithBooking.astro`: Hero with integrated booking form for service pages
    - Props: `title`, `subtitle`, `backgroundImage`, `autoSelectFirst`, `type`
- **Service components**: Service-specific content (pricing, descriptions, features)
- **Gallery components**: Display before/after images or service galleries with consistent styling
- **Carousels**: Use Slick carousel library (loaded via CDN)

### SEO Components (AEO & GEO Optimized)

All pages now use dedicated SEO components for better search engine optimization, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO):

- **SEOHead.astro**: Comprehensive meta tags component
  - Required props: `title`, `description`
  - Optional props: `keywords`, `canonical`, `ogType`, `ogImage`, `noindex`, `schema`
  - Automatically handles: Open Graph tags, Twitter Card tags, canonical URLs, favicon, preconnect hints
  - Example usage:
    ```astro
    <SEOHead
      title="Professional Makeup Services"
      description="Expert makeup services at Femina Plus..."
      keywords="makeup, bridal makeup, party makeup"
      canonical="https://feminaplussalon.com/makeup"
      ogImage="https://assets.feminaplussalon.com/public/makeup_bg_new.webp"
    />
    ```

- **LocalBusinessSchema.astro**: Structured data for local business SEO
  - Optional prop: `serviceType` (e.g., "makeup", "hair-color", "hair-patch")
  - Generates Schema.org markup for BeautySalon, Service, and BreadcrumbList
  - Includes business info, ratings, opening hours, and service catalogs
  - Example usage:
    ```astro
    <LocalBusinessSchema serviceType="makeup" />
    ```

- **FAQ.astro**: Reusable FAQ component with Schema.org FAQPage markup
  - Required prop: `faqs` (array of {question, answer} objects)
  - Optional props: `title`, `subtitle`
  - Features: Accordion functionality, AOS animations, Schema.org structured data
  - SEO benefits: Rich snippets in search results, voice search optimization
  - Example usage:

    ```astro
    const faqs = [
      {
        question: "What services does Femina Plus offer?",
        answer: "Femina Plus offers comprehensive beauty services..."
      }
    ];

    <FAQ faqs={faqs} subtitle="Get answers to common questions" />
    ```

### Styling

- Tailwind CSS is the primary styling method
- Custom fonts: `font-anticdidone` and `font-manrope` (configured in [tailwind.config.mjs](tailwind.config.mjs))
- Color scheme: Black, white, and gold accents
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- AOS (Animate On Scroll) used throughout for scroll animations

### JavaScript Patterns

- jQuery used for mobile menu toggling ([src/js/Global.js](src/js/Global.js))
- Slick carousel initialized in component inline scripts
- AOS initialized in Global.js with `once: true`
- `is:inline` directive used for scripts that need to run immediately (jQuery, Slick)
- Google Analytics gtag loaded in each page head

### Key Integrations

- **Google Tag Manager**: GMT component included in every page
- **Instagram Feed**: Component ready for API integration (currently uses placeholder data)
  - API endpoint structure exists at `src/pages/api/instagram.ts`
  - Requires `INSTAGRAM_ACCESS_TOKEN` and `INSTAGRAM_USER_ID` in `.env`
- **WhatsApp**: FloatingWhatsApp component for quick contact
- **YouTube**: YoutubeVideos component for embedded videos

## Development Notes

### Adding New Pages

1. Create new `.astro` file in `src/pages/`
2. Follow existing page structure pattern (see [makeup.astro](src/pages/makeup.astro) or [hair-color.astro](src/pages/hair-color.astro))
3. Import necessary components including SEO components:
   ```astro
   import SEOHead from "../components/SEOHead.astro";
   import LocalBusinessSchema from "../components/LocalBusinessSchema.astro";
   import FAQ from "../components/FAQ.astro";
   ```
4. Define page-specific data:
   - `services` array for Header customization
   - `faqs` array with page-specific FAQ questions and answers
5. In the `<head>` section:
   - Use `<SEOHead>` with appropriate title, description, keywords, canonical, and ogImage
   - Add `<LocalBusinessSchema>` with appropriate serviceType (if applicable)
   - Include GMT, jQuery, AOS, Slick, and Google Analytics scripts
6. In the `<body>` section:
   - Include GMT, Header, main content sections
   - Add `<FAQ>` component before InstagramFeed or Footer
   - Include Footer
7. Add scripts at bottom (Slick, Global.js, AOS)

### Adding New Components

- Create `.astro` file in `src/components/`
- Use Tailwind classes for styling
- If using carousels, ensure Slick is initialized in component script section
- For animations, use AOS data attributes (`data-aos="fade-up"`, etc.)

### Working with Images

- Static images go in `public/` directory
- Reference in components with `/image-name.ext` (leading slash is root of public/)
- Common images: hero backgrounds, service images, before/after galleries, brand logos

### Mobile Menu

- Handled by jQuery in [Global.js](src/js/Global.js)
- `.menu-click` opens navigation
- `.menu-close` closes navigation
- Body overflow is toggled to prevent scrolling when menu is open
- Navigation auto-closes on window resize above 1023px

### Environment Variables

If enabling Instagram integration:

```env
INSTAGRAM_ACCESS_TOKEN=your_token
INSTAGRAM_USER_ID=me
```

## Important Patterns

- **BookingForm**: Currently commented out in most pages (`<!-- <BookingForm /> -->`)
- **Asset paths**: Use leading slash for public assets (`/logo.svg`, not `./logo.svg`)
- **TypeScript casting**: Used in gtag scripts: `(window as any).dataLayer`
- **Script loading**: External libraries loaded via CDN (jQuery, Slick, AOS)
- **Component reusability**: Common components (Testimonials, Locations, InstagramFeed, Footer) used across multiple pages

## SEO Best Practices

### Current SEO Implementation

All pages are optimized for traditional SEO, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO):

1. **Meta Tags**: Comprehensive meta tags via SEOHead component
   - Title tags (50-60 characters, includes brand name)
   - Meta descriptions (150-160 characters, compelling CTAs)
   - Keywords (relevant, specific to page content)
   - Canonical URLs (prevent duplicate content)
   - Open Graph tags (social media sharing)
   - Twitter Card tags (Twitter sharing optimization)

2. **Structured Data**: Schema.org markup for rich snippets
   - LocalBusiness/BeautySalon schema on all pages
   - Service schema on service-specific pages
   - FAQPage schema on all pages with FAQ sections
   - BreadcrumbList schema for navigation hierarchy
   - AggregateRating schema for reviews/ratings

3. **FAQ Sections**: Every page has relevant FAQs
   - 8-10 questions per page
   - Detailed, conversational answers (50-150 words each)
   - Schema.org FAQPage markup for rich snippets
   - Optimized for voice search and featured snippets
   - Answers common user queries for AEO/GEO

4. **Content Optimization**:
   - Semantic HTML structure (proper heading hierarchy)
   - Descriptive, keyword-rich titles and headings
   - Natural keyword integration in content
   - Internal linking structure (between service pages)
   - Alt text for images (implement when adding images)

5. **Technical SEO**:
   - Fast page load times (static site generation)
   - Mobile-responsive design (Tailwind responsive classes)
   - Clean URL structure (file-based routing)
   - Preconnect hints for external resources
   - Proper robots meta tags

### Adding FAQ Content

When adding or updating FAQ sections:

- Write 8-10 questions per page minimum
- Focus on long-tail keywords and conversational queries
- Answer in natural, helpful language (not keyword-stuffed)
- Include specific details (prices, duration, process)
- Address common objections and concerns
- Use question formats people actually search for
- Keep answers between 50-150 words for optimal snippet length

### Service-Specific Keywords

- **Homepage**: beauty salon, wellness center, multiple locations
- **Makeup**: bridal makeup, party makeup, HD makeup, airbrush makeup
- **Hair Color**: highlights, balayage, ombre, color correction, gray coverage
- **Hair Patch/Wigs**: hair replacement, hair systems, natural wigs, toupee
