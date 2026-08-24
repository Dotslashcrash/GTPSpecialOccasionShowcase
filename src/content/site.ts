export const site = {
  name: 'GTP Special Occasion Websites',
  company: 'Griffin Technology Partners',
  baseUrl: 'https://occasions.griffintechnologypartners.com',
  offerUrl: 'https://www.griffintechnologypartners.com/web-services/special-occasion-sites',
  salesEmail: 'sales@griffintechnologypartners.com',
  hero: 'Turn the moment into a place everyone can visit.',
  price: '$149.99',
  billing: 'one-time starting package',
  inclusions: [
    'One custom special-occasion website',
    'One standard domain registration, subject to availability',
    '30 days of managed hosting after launch',
    'Protected administration for approved content and media',
  ],
  purchaseOptions: [
    {
      name: 'Starting package',
      price: '$149.99',
      detail: 'Website, standard domain registration, 30 days of hosting, and admin access.',
      url: 'https://buy.stripe.com/9B6cN4gAJ3mz3IG5aZ1wY09',
    },
    {
      name: 'Additional 30 days',
      price: '$49.99',
      detail: 'One-time hosting extension for an existing GTP special-occasion website.',
      url: 'https://buy.stripe.com/eVq00i2JT9KXgvsbzn1wY0a',
    },
    {
      name: 'One-year hosting',
      price: '$449.99',
      detail: 'One-time hosting extension for an existing GTP special-occasion website.',
      url: 'https://buy.stripe.com/aFaeVc7092iv7YW0UJ1wY0b',
    },
  ],
} as const;

export type SiteConfig = typeof site;
