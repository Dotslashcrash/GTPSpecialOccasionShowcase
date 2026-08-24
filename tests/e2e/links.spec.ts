import { test, expect } from '@playwright/test';

test('all internal links resolve and approved external destinations are used', async ({
  page,
  request,
}) => {
  await page.goto('/');
  const hrefs = await page
    .locator('a[href]')
    .evaluateAll(
      (links) =>
        [...new Set(links.map((link) => link.getAttribute('href')).filter(Boolean))] as string[],
    );
  for (const href of hrefs.filter((item) => item.startsWith('/'))) {
    const response = await request.get(href);
    expect(response.status(), href).toBeLessThan(400);
  }
  const external = hrefs.filter((item) => item.startsWith('http'));
  expect(
    external.every((href) => href.startsWith('https://www.griffintechnologypartners.com/')),
  ).toBe(true);
});

test('forms in public samples do not transmit data', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', (request) => {
    if (request.method() !== 'GET') requests.push(`${request.method()} ${request.url()}`);
  });
  await page.goto('/samples/weddings');
  await page.getByLabel('Sample response').selectOption('Joyfully attending');
  await page.getByRole('button', { name: 'Save sample response' }).click();
  await expect(page.locator('.rsvp-status')).toContainText('browser-only');
  expect(requests).toEqual([]);
});
