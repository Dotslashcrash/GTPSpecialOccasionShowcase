# GTP Special Occasion Website Portfolio

A static-first portfolio of twelve fictional public occasion websites and twelve tailored, interactive client-portal previews for Griffin Technology Partners.

## What is included

- Astro 7 with strict TypeScript and static output to `dist`
- Twelve distinct guest experiences and twelve browser-only portal previews
- Central content and offer configuration in `src/content/`
- No backend, API routes, analytics, cookies, authentication, or personal-data transmission
- Azure Static Web Apps Free deployment through GitHub Actions
- Playwright, Axe, route, interaction, responsive, and broken-link tests

All people, dates, events, messages, and organizations are fictional. Stock-photo subjects are not GTP customers.

## Supported runtime

Node.js 22 LTS or newer is required. CI uses Node 22. Dependency versions are pinned in `package.json` and the lockfile.

## Local development

```powershell
npm ci
npm run dev
```

Open `http://localhost:4321`. Portal-preview edits remain in the current browser under keys beginning with `gtp-occasion-demo:`.

## Build and verify

```powershell
npm run format:check
npm run lint
npm run check
npm run test:unit
npm run build
npx playwright install chromium
npm run test:e2e
npm run audit
```

`npm run validate` runs the complete sequence after Chromium is installed.

## Common updates

- Starting price and included features: `src/content/site.ts`
- Sample names, writing, modules, and media paths: `src/content/occasions.ts`
- Global and occasion-specific presentation: `src/styles/global.css`
- Portal interactions and local data behavior: `public/scripts/admin-preview.js`
- Static-host headers and routing: `public/staticwebapp.config.json`

See the `docs/` folder for architecture, content, extension, preview behavior, and Azure deployment details.
