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
    await page.getByRole('button', { name: /Guest messages|Guests & replies/ }).click();
    const approve = page.getByRole('button', { name: 'Approve' }).first();
    if (await approve.isVisible()) await approve.click();
    await page.getByRole('button', { name: 'Reset demo' }).click();
    await page.getByRole('button', { name: 'Page content' }).click();
    await expect(title).toHaveValue(original);
  });
}

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
