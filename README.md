# Dr. Omar Farouk — Cosmetic Dentist & Implantologist (Demo Portfolio)

> ⚠️ **This is a fictional demo / training portfolio project.** Dr. Omar Farouk, the clinic, all credentials, and all contact details are fictional and created purely for demonstration purposes. This is **not** a real medical website and should not be used to represent an actual practice.

## Project Goal

Showcase a premium, single-page dental portfolio website for a fictional cosmetic dentist & implantologist, with the **Before & After Smile Transformation portfolio** as the visual centerpiece, driving visitors toward a demo appointment booking flow.

## Live Structure (single page, anchor navigation)

All content lives in `index.html`. Navigation scrolls smoothly to in-page sections:

| Anchor | Section |
|---|---|
| `#home` | Hero |
| `#about` | About Dr. Omar |
| `#specialties` | Specialties (4 cards) |
| `#services` | Services (2×2 grid) |
| `#portfolio` | Before & After Case Portfolio (filterable, drag slider, lightbox) |
| `#why-us` | Why Choose Dr. Omar |
| `#credentials` | Credentials & Certifications (placeholders) + Download CV (`#cv`, non-functional demo link) |
| `#appointment` | Appointment Booking form (front-end only, simulated) |
| `#contact` | Contact details, social links, map placeholder |

No query parameters or additional routes — it's a static single page.

## Implemented Features

- Premium light-mode visual identity (`#F8FAFC` background, `#0284C7` / `#0D9488` accents, `#1E293B` text) per spec.
- Sticky navigation with scroll shadow, smooth-scroll anchor links, and an animated hamburger menu on mobile.
- Editorial split-layout hero with SVG dentist portrait placeholder, floating "6+ Years of Experience" and "Digital Dentistry" cards.
- About section with stat highlights and Digital Smile Design mention.
- 4 Specialty cards + 4 Service cards with hover states.
- **Before & After Case Portfolio** — the visual centerpiece:
  - 3 cases (Full Veneers Transformation, Immediate Dental Implant, Laser Whitening), each tagged by category.
  - Category filters: All / Cosmetic Dentistry / Dental Implants / Whitening.
  - Interactive drag-to-compare BEFORE/AFTER slider (pointer + touch support) with an accessible keyboard-operable handle.
  - Click-to-expand lightbox/modal showing an enlarged, independently interactive slider.
- Why Choose Dr. Omar trust section (typography-led, not oversized stat blocks).
- Credentials section using clearly labeled **placeholder** certification categories (no invented institutions/awards) + "Download CV" link.
- Appointment booking form with required-field validation, inline error states, a loading spinner state, and a success message — entirely client-side/simulated, **not connected to any backend, email, or database**.
- Contact section with demo email/WhatsApp/social links and a map placeholder.
- Footer with nav, socials, CTA, and copyright.
- Subtle scroll-reveal animations, hover states, and fast, minimal transitions throughout.
- Fully responsive from 320px to 1920px+; mobile hamburger navigation; no horizontal overflow.
- Semantic HTML, alt/aria labels on interactive and image elements, keyboard-accessible slider handle and filters.

## Images / Media

Per the project instructions, no image generation was used. All dentist portrait, clinic, and before/after case visuals are **hand-built inline SVG placeholders** styled to match the premium color palette — no real patient photos or identities are depicted or implied anywhere.

## Not Implemented (by design — out of scope for a static demo)

- Real backend / database / server-side processing.
- Actual appointment booking integration (email, SMS, WhatsApp, calendar).
- Authentication or admin dashboard/CMS.
- Real clinic address, real map embed, real certifications, or real CV file.
- Any AI-generated imagery (explicitly excluded per brief).

## Suggested Next Steps (if turning into a real production site)

1. Replace SVG placeholders with real licensed photography of the dentist, clinic, and (consented) patient cases.
2. Connect the appointment form to a real backend (e.g., serverless function + email/CRM integration) — requires moving beyond static-site capabilities.
3. Embed a real map (e.g., Google Maps iframe) once a real address exists.
4. Add real, verifiable credentials/certifications with issuing bodies.
5. Add analytics and SEO enhancements (structured data, sitemap) once content is real.

## Tech Stack

- Plain HTML5 + CSS3 (`css/style.css`) + vanilla JavaScript (`js/main.js`) — no frameworks, no build step.
- Google Fonts (Sora + Inter), Font Awesome 6 (icons) via CDN.
- No table/database usage — this project has no data persistence needs (the appointment form is a UI-only simulation).

## File Structure

```
index.html          Main single-page site (all 11 sections + lightbox markup)
css/style.css        Full design system + responsive breakpoints (1024 / 900 / 640 / 380px)
js/main.js           Nav, mobile menu, smooth scroll, scroll-reveal, before/after sliders,
                      portfolio filters, lightbox, appointment form validation & simulated submit
README.md           This file
```

## Deployment

To publish this site, use the **Publish tab** in the project — it will handle deployment and provide a live URL.
