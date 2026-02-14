# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UDC Signup Form is a multi-form web application for Utila Dive Center. It collects diver registration data (personal info, emergency contacts, ID documents, liability releases, medical questionnaires) via a multi-step wizard, then submits to a Google Apps Script backend that stores data in Google Sheets and generates PDFs in Google Drive.

## Architecture

The project has two distinct halves:

**Frontend (Express + EJS + Lit Web Components):** Deployed to Vercel as a serverless function. Express renders EJS templates (`views/`) which load Lit-based web components (`public/js/components/`) and Alpine.js-based form logic (`public/js/alpine-components.js`). Forms submit directly to the Google Apps Script endpoint (not to the Express server).

**Backend (Google Apps Script):** Lives in `src/backend/`. Pushed to Google via `clasp`. Receives form POST data, writes to Sheets, creates customer folders in Drive (organized by month > week > package type), and generates filled PDFs from templates using pdf-lib (`lib/PDFLib.js`).

### Key integration point

Forms POST to a deployed Google Apps Script web app URL (hardcoded in `public/js/formHandling.js` and `public/js/alpine-components.js`). The GAS `doPost` in `src/backend/Code.js` dispatches to `FormProcessor` based on `formId`.

### Two i18n systems coexist

- `public/js/i18n.js` — Uses lit-i18n + jQuery i18next for the Lit web component pages (liability, medical)
- `public/js/alpine-i18n.js` — Alpine.js plugin with i18next for the Alpine-based UDC form

Translation files are in `public/locales/{en,es}/`. Supported languages: English (primary), Spanish (partially implemented).

### Form types

Defined in `src/backend/FormProcessor.js` as `FormsTypes`: UDC, LIABILITY, SAFE_DIVING (not yet implemented), MEDICAL.

### Custom web components (`public/js/components/`)

All are Lit elements: `form-input`, `date-picker`, `form-phone`, `form-file`, `form-country-select`, `form-radio`, `form-accordion`, `form-signature`, `form-tab`, `language-selector`, `spinner-modal`, `success-failure-display`. They use `formAssociated` for native form participation.

### URL query params drive form behavior

`pkg` (fd, ow, aow, goPro) selects the diving package. `pathway` chains forms together — after submission, redirects to the next form carrying prefill data (`first_name`, `last_name`, `dob`, `di`, `di_policy_nb`).

## Commands

```bash
# Local dev server (requires .env file)
npm run dev

# Format code
npm run prettier

# Push GAS backend to Google
npm run deploy-spreadsheet-only    # push code only
npm run deploy-backend             # push + create new deployment
```

## Deployment

- Frontend: Vercel (all routes rewrite to `/api` via `vercel.json`)
- Backend: Google Apps Script via clasp (`appsscript.json` config, `.clasp.json` for project binding)
