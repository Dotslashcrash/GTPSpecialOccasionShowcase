import test from 'node:test';
import assert from 'node:assert/strict';
import { occasions, occasionSlugs, getOccasion } from '../../src/content/occasions.ts';
import { site } from '../../src/content/site.ts';

test('contains twelve unique, complete occasions', () => {
  assert.equal(occasions.length, 12);
  assert.equal(new Set(occasions.map(({ slug }) => slug)).size, 12);
  assert.deepEqual(
    occasions.map(({ slug }) => slug),
    [...occasionSlugs],
  );
  for (const occasion of occasions) {
    assert.ok(occasion.sections.length >= 3, `${occasion.slug} needs story sections`);
    assert.ok(occasion.portalModules.length >= 6, `${occasion.slug} needs tailored modules`);
    assert.ok(occasion.timeline.length >= 3, `${occasion.slug} needs timeline content`);
    assert.ok(occasion.heroImage.startsWith('/media/'));
    assert.equal(getOccasion(occasion.slug), occasion);
  }
});

test('central offer matches the approved one-time package', () => {
  assert.equal(site.price, '$149.99');
  assert.match(site.billing, /one-time/i);
  assert.equal(site.inclusions.length, 4);
  assert.equal(
    site.offerUrl,
    'https://www.griffintechnologypartners.com/web-services/special-occasion-sites',
  );
});

test('all people and sample organizations are identified as fictional in site framing', () => {
  assert.ok(occasions.every((occasion) => occasion.sampleName && occasion.introduction));
  assert.equal(getOccasion('not-real'), undefined);
});
