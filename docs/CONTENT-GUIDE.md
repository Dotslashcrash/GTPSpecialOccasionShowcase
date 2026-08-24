# Content guide

## Offer updates

Edit `src/content/site.ts` to update the starting price, billing language, inclusions, purchase options, Stripe Payment Links, offer URL, or sales address. Components read these values directly, so the portfolio does not scatter price strings.

Stripe checkout URLs are hosted Payment Links. Each corresponding Stripe price must remain `one_time` with no recurring interval. Never place a Stripe secret or restricted API key in this repository.

## Sample writing

Each record in `src/content/occasions.ts` controls one experience: names, title, description, introduction, key details, story sections, timeline, fictional messages, useful resources, portal modules, and local media paths.

Write with a specific human voice. Prefer observed details over generic praise. Avoid testimonials, performance claims, stereotypes, lorem ipsum, and formulaic phrases. Memorial and funeral copy should be calm, clear, and compassionate.

## Images

Place production assets in `public/media/`, use lowercase descriptive filenames, and keep dimensions large enough for the intended crop. Create WebP or AVIF versions where practical. Add useful alt text to the occasion record; use empty alt text only for genuinely decorative duplicates.

Only use customer-approved files or media with a license suitable for this commercial portfolio. Add the source and license to `THIRD_PARTY_NOTICES.md` before committing. Never hotlink production media, and never imply stock-photo subjects are customers.

## Fictional demonstrations

Keep every portfolio person, organization, date, message, and RSVP fictional. Do not add Event structured data for sample events. The global Organization data describes GTP only.
