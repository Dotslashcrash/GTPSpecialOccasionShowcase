export const site = {
  name: 'GTP Special Occasion Websites',
  company: 'Griffin Technology Partners',
  baseUrl: 'https://zealous-flower-0d3d54610.7.azurestaticapps.net',
  offerUrl: 'https://www.griffintechnologypartners.com/web-services/special-occasion-sites',
  salesEmail: 'sales@griffintechnologypartners.com',
  hero: 'Give the moment its own place online.',
  price: '$149.99',
  billing: 'one-time starting package',
  inclusions: [
    'One custom special-occasion website',
    'One standard domain registration, subject to availability',
    '30 days of managed hosting after launch',
    'Protected administration for approved content and media',
  ],
} as const;

export type SiteConfig = typeof site;
