import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const slugs = [
  'birthdays',
  'holidays',
  'weddings',
  'memorials',
  'anniversaries',
  'graduations',
  'retirements',
  'reunions',
  'just-because',
  'funerals',
  'announcements',
  'baby-showers',
];
const routes = [
  '/',
  '/about-the-demos',
  '/photo-credits',
  '/private-access-demo',
  ...slugs.flatMap((slug) => [`/samples/${slug}`, `/samples/${slug}/admin-preview`]),
];

for (const route of routes) {
  test(`${route} loads directly without serious accessibility violations`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    const response = await page.goto(route, { waitUntil: 'networkidle' });
    expect(response?.status()).toBe(200);
    await expect(page.locator('main')).toBeVisible();
    if (/^\/samples\/[^/]+$/.test(route)) {
      await expect(page.locator('[data-public-gallery] .gallery-grid img')).toHaveCount(6);
    }
    if (route.endsWith('/admin-preview')) {
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        'content',
        'noindex,follow',
      );
    }
    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations.filter((item) => ['critical', 'serious'].includes(item.impact ?? '')),
    ).toEqual([]);
    expect(errors).toEqual([]);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
  });
}

test('homepage filters and every sample destination are present', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Remember' }).click();
  await expect(page.locator('[data-group="remember"]')).toHaveCount(2);
  await expect(page.locator('[data-group="celebrate"]:visible')).toHaveCount(0);
  await page.getByRole('button', { name: 'All' }).click();
  for (const slug of slugs) {
    await expect(page.locator(`a[href="/samples/${slug}"]`).first()).toBeVisible();
    await expect(page.locator(`a[href="/samples/${slug}/admin-preview"]`).first()).toHaveCount(1);
  }
  await expect(
    page.getByRole('link', { name: 'Try the private access website cover' }),
  ).toBeVisible();
  await expect(page.getByText('Demo key: Surprise').first()).toBeVisible();
});

test('homepage carries the GTP brand and complete one-time offer', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.brand-mark img')).toHaveAttribute(
    'src',
    '/brand/griffin-mark-160.webp',
  );
  await expect(
    page.getByRole('heading', { name: 'Turn the moment into a place everyone can visit.' }),
  ).toBeVisible();
  await expect(page.getByText('One time. No subscription.')).toBeVisible();
  await expect(
    page.getByText('Optional private hosting with a shareable secure access key'),
  ).toBeVisible();
  await expect(
    page.getByText(
      'Stock and AI-generated images are used for demonstration purposes only. They will not be used in a customer’s custom design unless the customer specifically requests and approves their use.',
    ),
  ).toBeVisible();
  const checkoutLinks = await page
    .locator('a[href^="https://buy.stripe.com/"]')
    .evaluateAll((links) => [...new Set(links.map((link) => link.getAttribute('href')))]);
  expect(checkoutLinks).toHaveLength(3);
  await expect(page.locator('[data-filter-result]')).toHaveText('Showing all 13 experiences.');
  await page.getByRole('button', { name: 'Remember' }).click();
  await expect(page.locator('[data-filter-result]')).toHaveText('Showing 2 remember experiences.');
});

test('private access demo reveals the site only with the shared key', async ({ page }) => {
  await page.goto('/private-access-demo');
  await expect(page.getByRole('heading', { name: 'A surprise is waiting.' })).toBeVisible();
  await expect(page.getByText('Demo access key:')).toContainText('Surprise');
  await expect(page.locator('[data-private-reveal]')).toBeHidden();

  await page.getByLabel('Secure access key').fill('Not the key');
  await page.getByRole('button', { name: 'Open the surprise' }).click();
  await expect(page.locator('[data-private-key-status]')).toContainText('Try Surprise');
  await expect(page.locator('[data-private-reveal]')).toBeHidden();

  await page.getByLabel('Secure access key').fill('Surprise');
  await page.getByRole('button', { name: 'Open the surprise' }).click();
  await expect(
    page.getByRole('heading', { name: 'Here’s to your brightest year yet.' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Lock the demo again' }).click();
  await expect(page.getByRole('heading', { name: 'A surprise is waiting.' })).toBeVisible();
});

for (const slug of slugs) {
  test(`${slug} portal edits, reorders, moderates, previews, and resets locally`, async ({
    page,
  }) => {
    await page.goto(`/samples/${slug}/admin-preview`);
    await page.getByRole('button', { name: 'Enter Interactive Admin Preview' }).click();
    await page.getByRole('button', { name: 'Page content' }).click();
    const title = page.getByLabel('Page title');
    const original = await title.inputValue();
    await title.fill(`Edited ${slug} title`);
    await page.getByRole('button', { name: 'Save to this demo' }).click();
    await expect(page.locator('[data-save-indicator]')).toContainText('Saved');
    await page.getByRole('button', { name: 'Overview' }).click();
    await expect(page.locator('[data-preview-title]')).toHaveText(`Edited ${slug} title`);
    await page.getByRole('button', { name: 'Mobile' }).click();
    await expect(page.locator('[data-preview-frame]')).toHaveClass(/mobile/);
    await page.getByRole('button', { name: 'Sections' }).click();
    const firstSwitch = page.locator('[data-section-list] input').first();
    await firstSwitch.uncheck();
    await expect(page.locator('[data-save-indicator]')).toContainText('hidden');
    await page.getByRole('button', { name: 'Gallery', exact: true }).click();
    await expect(page.locator('[data-gallery-list] figure')).toHaveCount(6);
    await expect(page.locator('[data-gallery-count]')).toHaveText('6 visible / 6 total');
    const firstGalleryItem = page.locator('[data-gallery-list] figure').first();
    await firstGalleryItem.getByLabel('Caption').fill(`Edited ${slug} caption`);
    await firstGalleryItem.getByRole('button', { name: 'Save details' }).click();
    await firstGalleryItem.getByRole('button', { name: 'Hide image' }).click();
    await expect(page.locator('[data-gallery-count]')).toHaveText('5 visible / 6 total');
    await page.getByRole('button', { name: /Guest messages|Guests & replies/ }).click();
    const approve = page.getByRole('button', { name: 'Approve' }).first();
    if (await approve.isVisible()) await approve.click();
    await page.getByRole('button', { name: 'Reset demo' }).click();
    await page.getByRole('button', { name: 'Page content' }).click();
    await expect(title).toHaveValue(original);
  });
}

test('public gallery lightbox supports keyboard navigation and restores focus', async ({
  page,
}) => {
  await page.goto('/samples/weddings');
  const first = page.locator('[data-gallery-open]').first();
  await first.focus();
  await first.press('Enter');
  const dialog = page.locator('[data-gallery-dialog]');
  await expect(dialog).toBeVisible();
  await expect(page.locator('[data-gallery-position]')).toHaveText('1 of 6');
  await dialog.press('ArrowRight');
  await expect(page.locator('[data-gallery-position]')).toHaveText('2 of 6');
  await dialog.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(first).toBeFocused();
});

test('non-RSVP occasions use tailored public interactions', async ({ page }) => {
  await page.goto('/samples/memorials');
  await expect(page.locator('[data-countdown]')).toHaveCount(0);
  await expect(
    page.getByRole('heading', { name: 'Contribute to the family archive' }),
  ).toBeVisible();
  await page.goto('/samples/just-because');
  await expect(page.locator('[data-countdown]')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Send a little appreciation' })).toBeVisible();
  await page.goto('/samples/announcements');
  await expect(page.getByRole('heading', { name: 'Celebrate the news' })).toBeVisible();
  await page.goto('/samples/funerals');
  await expect(page.getByLabel('Sample response').locator('option')).toHaveText([
    'Choose a response',
    'Planning to attend',
    'Unable to attend, but sending condolences',
    'Leave a condolence for family review',
  ]);
});

for (const viewport of [
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
]) {
  test(`responsive journey at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/samples/birthdays');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.goto('/samples/birthdays/admin-preview');
    await page.getByRole('button', { name: 'Enter Interactive Admin Preview' }).click();
    await expect(page.locator('[data-panel="overview"]')).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
  });
}
