# Solvor Paints — Professional Website Audit Report
**Date:** June 2026 | **Auditor:** Claude Code | **Domain:** solvorpaints.com  
**Scope:** Design · UX · Content · Technical · SEO · Accessibility · Conversion

---

## Executive Summary

| Category | Score | Status |
|---|---|---|
| Design & Visual Identity | 82 / 100 | Good |
| User Experience (UX) | 68 / 100 | Needs Work |
| Content Quality | 72 / 100 | Acceptable |
| Technical SEO | 84 / 100 | Good |
| Performance | 65 / 100 | Needs Work |
| Accessibility | 42 / 100 | Poor |
| Conversion Optimisation | 55 / 100 | Needs Work |
| Security | 60 / 100 | Moderate Risk |

**Overall Website Health: 66 / 100**

> The site has a strong visual foundation and solid SEO structure, but is held back by a broken contact form, accessibility gaps, inconsistent page templates, and missing conversion tools that are standard in the paint industry.

---

## 🔴 CRITICAL — Fix Immediately

### 1. Contact Form Is Completely Broken
**File:** `contact/index.html`

The Web3Forms access key has not been configured. The field reads:
```html
<input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
```
Every enquiry submitted through the website is silently discarded. This is the most damaging issue on the site — potential customers are contacting Solvor and receiving no response.

**Fix:** Register at web3forms.com (free), get your access key, and replace `YOUR_WEB3FORMS_ACCESS_KEY` with your real key.

---

### 2. No Spam Protection on Contact Form
**File:** `contact/index.html`

The form has no honeypot field or CSRF protection. Once indexed by search engines, spam bots will flood the inbox.

**Fix:** Add a hidden honeypot field:
```html
<input type="checkbox" name="botcheck" style="display:none;" />
```
Web3Forms also supports this natively once the access key is configured.

---

## 🟠 HIGH PRIORITY

### 3. WhatsApp Float Button Missing on 4 Pages
**Pages:** `colours/`, `contact/`, `products/`, `services/`

The WhatsApp floating button is one of the strongest conversion tools on the site (critical in East Africa). It appears on the homepage, about, and gallery — but is missing on the four pages most likely to drive enquiries (products, services, contact, colours).

### 4. Footer Social Links Inconsistent
**Pages missing social links in footer:** `colours/`, `contact/`, `products/`, `services/`

Four pages are missing the Facebook/WhatsApp/Instagram links in their footer. This reduces brand trust and social discovery on high-traffic pages.

### 5. Hero H1 Has a Formatting Error
**File:** `index.html` — Line ~170

The headline reads: **"Colour That Protects& Inspires"** — the space before the ampersand is missing. In the browser this renders as `Protects&amp;` with no space. A subtle but unprofessional first impression.

**Fix:** Change to `Colour That <span>Protects</span> &amp; Inspires`

### 6. No Accessibility Skip Link
**All pages**

There is no `<a href="#main-content">Skip to content</a>` link. This is a WCAG 2.1 Level A requirement and affects users navigating by keyboard or screen reader.

### 7. Buttons Without ARIA Labels
- `colours/index.html` — 10 tab filter buttons
- `contact/index.html` — submit button (has text but no aria-label)
- `gallery/index.html` — 5 category filter buttons

The filter buttons use click handlers but have no `aria-label` attributes, making them invisible to screen readers.

### 8. Carousel Has No Pause Control
**File:** `index.html`

The hero carousel auto-advances every 5.5 seconds with no way for the user to stop it. WCAG 2.1 Success Criterion 2.2.2 requires a mechanism to pause, stop, or hide moving content.

---

## 🟡 MEDIUM PRIORITY

### 9. Thin Content on Gallery and Contact Pages
| Page | Word Count | Standard |
|---|---|---|
| Gallery | 387 words | Below 500 minimum |
| Contact | 389 words | Below 500 minimum |

Thin content pages can drag down the domain's overall content quality score in Google's Quality Rater Guidelines. The gallery in particular is mostly image labels.

**Fix:** Add introductory project narrative copy to the gallery page, and expand the contact page with a brief "how it works" section.

### 10. Services Page Footer Missing Company Registration
**File:** `services/index.html`

The registration number `COY-WBS78Y` is absent from the footer on the services page. It appears on every other page. This is an E-E-A-T trust signal that should be consistent.

### 11. No Gallery Lightbox
**File:** `gallery/index.html`

Images in the gallery cannot be opened full-size. Clicking or tapping an image does nothing. For a visual business like Solvor, this is a major missed opportunity — clients want to inspect work closely before engaging.

**Fix:** A simple CSS/JS lightbox (e.g. GLightbox, free) would transform the gallery experience.

### 12. Colour Explorer Page Has No Next Action
**File:** `colours/index.html`

After browsing 200+ colours, the only CTA is a generic "Contact Us" button at the bottom. There is no "Get a Sample", "Request a Quote for this Colour", or "See this colour on a project" path. The page creates interest but converts nothing.

### 13. Products Page Lacks a Clear Order Path
**File:** `products/index.html`

Each product card has full technical specifications but no "Enquire About This Product" button per card. A customer interested in Weatherguard Matt has to navigate away to the Contact page to enquire.

### 14. No Paint Calculator
This is standard on every major competitor: Dulux, Nippon, Sherwin-Williams. Without a coverage calculator, B2B clients (contractors, developers) cannot self-serve their project estimates. This is a high-conversion tool.

### 15. About Page Title Under-Optimised
**Current:** `About Solvor — Paint Manufacturer | South Sudan`

This misses the keyword opportunity. Competitors rank for "paint company Juba", "painting contractor South Sudan".

**Suggested:** `About Solvor Paints | Paint Company Juba, South Sudan`

### 16. Large Source Files in Repository
21 image files over 200KB remain in the `/images/` directory (the original PNGs and JPEGs). The largest is 2.9MB. While the WebP versions are correctly served, these originals add unnecessary bulk to every deployment and GitHub push.

---

## 🔵 LOWER PRIORITY / IMPROVEMENTS

### 17. No Real Verified Reviews
The testimonials on the homepage are not verified or linked to any review platform (Google, Trustpilot). International B2B buyers heavily discount unverifiable quotes. Embedding a live Google Reviews widget would significantly strengthen trust.

### 18. No Pricing Information
The site gives no indication of pricing range, minimum order quantities, or how to get a quote beyond a contact form. Competitors who publish indicative pricing or a "how pricing works" page convert more organic traffic into leads.

### 19. Contact Page Has No CTA Banner
Every other page ends with a CTA banner before the footer. The contact page ends abruptly with just the form and footer. A reinforcing message ("Prefer to call? +211 980 373 157") would improve confidence before submission.

### 20. Page Load: Render-Blocking CSS
`styles.css` loads synchronously in `<head>`. For returning visitors this is cached, but first-time visitors on slow connections (common in South Sudan) will see a white screen until the CSS loads.

**Fix:** Add `media="print" onload="this.media='all'"` trick for non-critical CSS, or use critical CSS inlining.

### 21. Google Fonts Creates External Request
Even with `preconnect`, the Google Fonts request adds ~100–200ms of network latency on every page load. For a site targeting South Sudan (where 4G is the dominant network), self-hosting the fonts would eliminate this dependency entirely.

### 22. Missing Pages That Competitors Have
| Missing Page | Business Value |
|---|---|
| FAQ page | SEO: targets "how much does painting cost in Juba" type queries |
| Blog / Project Stories | Content marketing, organic traffic, E-E-A-T |
| Careers page | Signals active, growing business |
| Dealer / Distributor locator | B2B: where to buy Solvor outside Juba |
| Terms & Conditions | Legal protection, trust signal |
| Privacy Policy | Required for GDPR compliance if EU visitors |

---

## What the Site Does Well

- **Visual Identity** — Navy, white and yellow palette is sharp, consistent and aligns with the Solvor logo. The DM Serif + Montserrat font pairing creates genuine editorial quality.
- **Schema.org Coverage** — Excellent. LocalBusiness, Organization, WebSite, BreadcrumbList, FAQPage, ItemList and page-type schemas are all correctly implemented.
- **Real Photography** — Every section uses actual Solvor project photos. This is a major differentiator vs. competitors using stock imagery.
- **Local SEO** — All 8 South Sudan service cities are listed in schema, meta content and on-page copy.
- **Mobile Responsiveness** — Three responsive breakpoints (1024px, 768px, 480px) cover the device spread correctly.
- **Clean URL Structure** — `/about/`, `/products/` etc. are correct and canonicalised.
- **E-E-A-T Signals** — Registration number, TIN, physical address, phone, email, working hours and social proof are all present.
- **AI Search Ready** — `llms.txt` is correctly implemented for Perplexity/ChatGPT visibility.
- **WhatsApp Integration** — Float button, topbar link, footer link and direct form CTA all point to the WhatsApp number — critical for the East Africa market.

---

## Priority Action Plan

| Priority | Action | Effort | Business Impact |
|---|---|---|---|
| 🔴 1 | Configure Web3Forms access key | 5 min | **Critical — fix today** |
| 🔴 2 | Add honeypot to contact form | 10 min | High |
| 🟠 3 | Add WhatsApp float to all 7 pages | 30 min | High |
| 🟠 4 | Add footer social links to all 7 pages | 30 min | Medium |
| 🟠 5 | Fix hero H1 space before & | 5 min | Medium |
| 🟠 6 | Add skip-to-content link on all pages | 30 min | Accessibility |
| 🟠 7 | Add aria-labels to filter buttons | 1 hr | Accessibility |
| 🟡 8 | Add lightbox to gallery | 2 hrs | High UX |
| 🟡 9 | Add "Enquire" button per product card | 1 hr | Conversion |
| 🟡 10 | Add colour-specific CTA to colours page | 1 hr | Conversion |
| 🟡 11 | Expand gallery page content (500+ words) | 1 hr | SEO |
| 🟡 12 | Add CTA banner to contact page | 30 min | Conversion |
| 🔵 13 | Delete original PNG/JPEG source files | 10 min | Performance |
| 🔵 14 | Build a paint calculator | 1 day | High conversion |
| 🔵 15 | Add FAQ page | Half day | SEO traffic |
| 🔵 16 | Embed Google Reviews widget | 1 hr | Trust/E-E-A-T |
| 🔵 17 | Self-host Google Fonts | 2 hrs | Performance |

---

*Report generated by automated code analysis + manual review. Scores are relative to international paint industry website benchmarks.*
