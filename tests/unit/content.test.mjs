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
    assert.equal(occasion.gallery.length, 6, `${occasion.slug} needs six gallery images`);
    assert.equal(new Set(occasion.gallery.map(({ src }) => src)).size, 6);
    assert.ok(
      occasion.gallery.every(
        ({ alt, caption, width, height }) => alt && caption && width > 0 && height > 0,
      ),
    );
    assert.equal(occasion.gallery.filter(({ cover }) => cover).length, 1);
    assert.equal(getOccasion(occasion.slug), occasion);
  }
});

test('event dates and interaction modes are appropriate and centrally consistent', () => {
  const rsvpSlugs = [
    'birthdays',
    'holidays',
    'weddings',
    'anniversaries',
    'graduations',
    'retirements',
    'reunions',
    'baby-showers',
  ];
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  for (const occasion of occasions) {
    assert.equal(occasion.interaction === 'rsvp', rsvpSlugs.includes(occasion.slug));
    if (occasion.eventDate) {
      const date = new Date(occasion.eventDate);
      assert.ok(date.getTime() > Date.now(), `${occasion.slug} date must be future-facing`);
      assert.match(occasion.dateValue, new RegExp(String(date.getFullYear())));
      assert.match(occasion.dateValue, new RegExp(monthNames[date.getMonth()]));
    }
  }
  assert.equal(getOccasion('memorials').eventDate, null);
  assert.equal(getOccasion('just-because').eventDate, null);
  assert.equal(getOccasion('announcements').interaction, 'announcement');
  assert.equal(getOccasion('funerals').interaction, 'condolence');
  assert.doesNotMatch(JSON.stringify(occasions), /example\.com/i);
});

test('central offer matches the approved one-time package', () => {
  assert.equal(site.price, '$149.99');
  assert.match(site.billing, /one-time/i);
  assert.equal(site.inclusions.length, 5);
  assert.ok(site.inclusions.some((item) => /private hosting.*access key/i.test(item)));
  assert.equal(
    site.offerUrl,
    'https://www.griffintechnologypartners.com/web-services/special-occasion-sites',
  );
  assert.deepEqual(
    site.purchaseOptions.map(({ price }) => price),
    ['$149.99', '$49.99', '$449.99'],
  );
  assert.ok(site.purchaseOptions.every(({ url }) => url.startsWith('https://buy.stripe.com/')));
});

test('all people and sample organizations are identified as fictional in site framing', () => {
  assert.ok(occasions.every((occasion) => occasion.sampleName && occasion.introduction));
  assert.equal(getOccasion('not-real'), undefined);
});
