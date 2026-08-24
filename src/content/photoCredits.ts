export type PhotoCredit = {
  photographer: string;
  profileUrl: string;
  photoUrl: string;
};

type CreditPair = { hero: PhotoCredit; detail: PhotoCredit };

const utm = 'utm_source=gtp_special_occasions&utm_medium=referral';
const profile = (username: string) => `https://unsplash.com/@${username}?${utm}`;
const photo = (slug: string) => `https://unsplash.com/photos/${slug}?${utm}`;

const credit = (photographer: string, username: string, photoSlug: string): PhotoCredit => ({
  photographer,
  profileUrl: profile(username),
  photoUrl: photo(photoSlug),
});

export const photoCredits: Record<string, CreditPair> = {
  birthdays: {
    hero: credit('sadiq abdulmalik', 'velvetcabana', 'rxBAxFpjotM'),
    detail: credit('sadiq abdulmalik', 'velvetcabana', 'rxBAxFpjotM'),
  },
  holidays: {
    hero: credit('krakenimages', 'krakenimages', '7BpuzmcxlHU'),
    detail: credit('krakenimages', 'krakenimages', '7BpuzmcxlHU'),
  },
  weddings: {
    hero: credit('Rafa Sanfilippo', 'rafasanfilippo', 'cWLEzYAcI3Q'),
    detail: credit('Rafa Sanfilippo', 'rafasanfilippo', 'cWLEzYAcI3Q'),
  },
  memorials: {
    hero: credit('Valentin Karisch', 'valentin_karisch', 'VH6PqLkz1lo'),
    detail: credit('Valentin Karisch', 'valentin_karisch', 'VH6PqLkz1lo'),
  },
  anniversaries: {
    hero: credit('Elist Nguyen', 'hieuanhcauam', 'SKK6woNj4n8'),
    detail: credit('Filip Rankovic Grobgaard', 'filipgrobgaard', 'mNlQo7I3M-A'),
  },
  graduations: {
    hero: credit('Md.Sabbir Sikder', 'sabbirbdbu', 'b3uW0NoKFSg'),
    detail: credit('Md.Sabbir Sikder', 'sabbirbdbu', 'b3uW0NoKFSg'),
  },
  retirements: {
    hero: credit('Age Cymru', 'agecymru', 'dxVDFXW3aAI'),
    detail: credit('Age Cymru', 'agecymru', 'dxVDFXW3aAI'),
  },
  reunions: {
    hero: credit('Ashwini Chaudhary (Monty)', 'suicide_chewbacca', 'GmDVGjqeVEk'),
    detail: credit('Ashwini Chaudhary (Monty)', 'suicide_chewbacca', 'GmDVGjqeVEk'),
  },
  'just-because': {
    hero: credit('Apartment Life', 'apartmentlife', 'luwwu7ysyKU'),
    detail: credit('Apartment Life', 'apartmentlife', 'luwwu7ysyKU'),
  },
  funerals: {
    hero: credit('Chanatip Sangbunnag', 'ayaka2547', '1fCBr1EpyM0'),
    detail: credit('Chanatip Sangbunnag', 'ayaka2547', '1fCBr1EpyM0'),
  },
  announcements: {
    hero: credit('Vitaly Gariev', 'silverkblack', 'x8l4lN6-xd0'),
    detail: credit('Vitaly Gariev', 'silverkblack', 'x8l4lN6-xd0'),
  },
  'baby-showers': {
    hero: credit('Samuel Lopez Cruz', 'fotogugu', 'o8_OaIAQ-R4'),
    detail: credit('Samuel Lopez Cruz', 'fotogugu', 'pvDXZKJjCdg'),
  },
};

export function getPhotoCredits(slug: string): CreditPair {
  const credits = photoCredits[slug];
  if (!credits) throw new Error(`Missing photo credits for ${slug}`);
  return credits;
}
