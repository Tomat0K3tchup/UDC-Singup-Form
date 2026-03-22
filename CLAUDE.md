# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UDC Signup Form is a multi-form web application for Utila Dive Center. It collects diver registration data (personal info, emergency contacts, ID documents, liability releases, medical questionnaires) via a multi-step wizard, then submits to a Google Apps Script backend that stores data in Google Sheets and generates PDFs in Google Drive.

## Architecture

The project has two distinct halves:

**Frontend (Static HTML + Alpine.js, minimal Express):** Deployed to Vercel. Most forms are static HTML files in `public/` using Alpine.js for multi-step wizard logic. Express is only used to serve the Medical form via EJS. Vercel's `cleanUrls` serves static files without extensions (e.g. `/udc` → `public/udc.html`). No build step — all frontend JS is served as-is.

**Backend (Google Apps Script):** Lives in `src/backend/`. Pushed to Google via `clasp`. Receives form POST data, writes to Sheets, creates customer folders in Drive (organized by month > week > package type), and generates filled PDFs from templates using pdf-lib (`lib/PDFLib.js`).

### Frontend routing

- `vercel.json` redirects `/` → `/home` and rewrites all other paths to `/api` (Express)
- Express (`api/Router.js`) defines only one route: `GET /medical` → EJS render
- All other paths resolve to static HTML in `public/` via Vercel's static file serving

| Route | File | Framework |
|-------|------|-----------|
| `/home` | `public/home.html` | Static |
| `/udc` | `public/udc.html` | Alpine.js |
| `/liability` | `public/liability.html` | Alpine.js |
| `/medical` | `views/index.ejs` → `views/medical.ejs` | Express + EJS + Lit |
| `/pages/forms/safeDiving` | `public/pages/forms/safeDiving.html` | Static |

### Key integration point

Forms POST to a deployed Google Apps Script web app URL (hardcoded in `public/js/formHandling.js` and `public/js/alpine-components.js`). The GAS `doPost` in `src/backend/Code.js` dispatches to `FormProcessor` based on `formId`.

### Two i18n systems coexist

- `public/js/i18n.js` — Uses lit-i18n + jQuery i18next for the Lit web component pages (medical)
- `public/js/alpine-i18n.js` — Alpine.js plugin with i18next for the Alpine-based forms (UDC, liability)

Translation files are in `public/locales/{en,es}/`. Supported languages: English (primary), Spanish (partially implemented).

### Form types

Defined in `src/backend/FormProcessor.js` as `FormsTypes`: UDC, LIABILITY, SAFE_DIVING (not yet implemented), MEDICAL.

### Alpine.js forms (`public/js/alpine-components.js`)

The UDC and Liability forms use Alpine.js `wizardForm` data component for multi-step navigation, validation, and form submission. Form handling logic lives in `public/js/formHandling.js`.

### Lit web components (`public/js/components/`)

Used primarily by the Medical form (served via EJS). All are Lit elements: `form-input`, `date-picker`, `form-phone`, `form-file`, `form-country-select`, `form-radio`, `form-accordion`, `form-signature`, `form-tab`, `language-selector`, `spinner-modal`, `success-failure-display`. They use `formAssociated` for native form participation. Some components (header, language selector) are shared across static pages too.

### URL query params drive form behavior

`pkg` (fd, ow, aow, goPro) selects the diving package. `pathway` chains forms together — after submission, redirects to the next form carrying prefill data (`first_name`, `last_name`, `dob`, `di`, `di_policy_nb`).

## Commands

```bash
# Local dev server (requires .env file)
pnpm run dev

# Format code
pnpm run prettier

# Push GAS backend to Google
pnpm run deploy-spreadsheet-only    # push code only
pnpm run deploy-backend             # push + create new deployment
```

## Deployment

- Frontend: Vercel — static files from `public/`, single Express serverless function in `api/` for `/medical` only. `vercel.json` handles redirects/rewrites. `cleanUrls: true` strips `.html` extensions.
- Backend: Google Apps Script via clasp (`appsscript.json` config, `.clasp.json` for project binding)
