# Portal preview behavior

## What works

- Edit the page title, introductory copy, date, and primary detail
- Reorder and show or hide tailored sections
- Add, edit, and remove timeline or schedule items
- Add local image previews with `FileReader` and remove gallery items
- Approve and remove pre-seeded fictional messages
- Review a fictional RSVP snapshot where relevant
- Update the occasion’s resource labels and destinations
- Switch the embedded preview between desktop and mobile widths
- Open the full public sample
- Reset all browser-only state

## Storage and privacy

Each occasion uses `gtp-occasion-demo:<slug>:v1` in `localStorage`. No personal data is requested, no cookies are required, and no state is sent over the network. A local image is converted to a data URL; the 3 MB preview limit keeps browser storage manageable.

Reset removes that key and restores the data embedded during the build. Clearing site data in the browser has the same effect.

## Real-customer distinction

The entry screen is not a login form. Every preview states that real customer portals are protected and configured for approved users. The demo never claims that a browser-only save changed Azure or a customer account.
