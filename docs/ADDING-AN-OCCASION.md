# Adding an occasion

1. Add a unique slug to `occasionSlugs` in `src/content/occasions.ts`.
2. Add a complete typed `Occasion` record with at least three story sections, three timeline items, two fictional messages, useful resources, and tailored portal modules.
3. Add optimized local hero and detail images under `public/media/`; record their sources and licenses.
4. Add a palette and a structural layout treatment in `src/styles/global.css`. A new occasion should not be a recolored existing page.
5. Decide whether a countdown and RSVP are appropriate. Quiet remembrance pages should not receive celebratory motion.
6. Add the slug to the Playwright route list and any category-filter mapping on the homepage.
7. Run the full validation suite and inspect the new guest and admin routes at all required viewports.

Astro’s `getStaticPaths` will generate `/samples/<slug>` and `/samples/<slug>/admin-preview` automatically after the record is present.

## Adding a portal module

Add the module label to the occasion’s `portalModules`. If it needs more than section visibility, add a clearly labeled panel and browser-only state in `AdminPreview.astro` and `admin-preview.js`. Every visible control must change the local preview, update a status, navigate, or explain its intentional behavior.
