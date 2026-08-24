export const occasionSlugs = [
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
] as const;

export type OccasionSlug = (typeof occasionSlugs)[number];

export type Detail = { label: string; value: string };
export type StorySection = { eyebrow: string; title: string; body: string; items?: string[] };

export type Occasion = {
  slug: OccasionSlug;
  category: string;
  sampleName: string;
  title: string;
  shortDescription: string;
  introduction: string;
  dateLabel: string;
  dateValue: string;
  theme: string;
  layout: string;
  mood: string;
  heroImage: string;
  detailImage: string;
  heroAlt: string;
  detailAlt: string;
  details: Detail[];
  sections: StorySection[];
  timeline: { year: string; title: string; body: string }[];
  messages: {
    name: string;
    relationship: string;
    message: string;
    status: 'Approved' | 'Pending';
  }[];
  resources: { label: string; value: string; kind: string }[];
  portalModules: string[];
};

export const occasions: Occasion[] = [
  {
    slug: 'birthdays',
    category: 'Birthday',
    sampleName: 'Maya at Forty',
    title: 'Forty bright chapters. One unforgettable night.',
    shortDescription:
      'A cinematic milestone story filled with photographs, memories, and plans for the party.',
    introduction:
      'Maya has spent four decades making ordinary rooms feel warmer. This is a little corner of the internet for the stories, laughter, and people she has gathered along the way.',
    dateLabel: 'Celebration countdown',
    dateValue: 'September 19, 2026 · 6:30 PM',
    theme: 'marigold',
    layout: 'cinematic',
    mood: 'Joyful · cinematic · personal',
    heroImage: '/media/birthdays-hero.webp',
    detailImage: '/media/birthdays-detail.webp',
    heroAlt: 'Friends celebrating together beneath warm string lights',
    detailAlt: 'Colorful birthday cake set for a milestone celebration',
    details: [
      { label: 'Gather', value: 'The Glasshouse · Brookfield' },
      { label: 'Dress', value: 'Color, sparkle, and dancing shoes' },
      { label: 'RSVP by', value: 'September 5' },
    ],
    sections: [
      {
        eyebrow: 'Her story',
        title: 'A collector of good people',
        body: 'From weekend road trips to kitchen-table pep talks, Maya remembers what matters: the person in front of her.',
        items: ['Community mentor', 'Amateur ceramicist', 'Sunday-dinner host'],
      },
      {
        eyebrow: 'The celebration',
        title: 'Dinner, stories, then the dance floor',
        body: 'We will begin with a family-style dinner, raise a glass, and make room for the playlist Maya has been building since 2004.',
        items: ['6:30 · Welcome drinks', '7:15 · Dinner and toasts', '9:00 · Dancing'],
      },
      {
        eyebrow: 'Forty notes',
        title: 'Leave one bright memory',
        body: 'Guests can share a message, a photograph, or one small thing they love about Maya.',
      },
    ],
    timeline: [
      {
        year: '1986',
        title: 'A bright beginning',
        body: 'Born on the first cool morning of autumn.',
      },
      { year: '2008', title: 'Found her calling', body: 'Began teaching art in her hometown.' },
      {
        year: '2026',
        title: 'Chapter forty',
        body: 'Still curious, still laughing, still making room.',
      },
    ],
    messages: [
      {
        name: 'Jon Bell',
        relationship: 'College friend',
        message: 'You have always made the table bigger. Happy forty, Maya.',
        status: 'Approved',
      },
      {
        name: 'Nina Cole',
        relationship: 'Cousin',
        message: 'Save me the first dance.',
        status: 'Pending',
      },
    ],
    resources: [
      { label: 'Maya’s wish list', value: 'https://example.com/maya-wishes', kind: 'Wishlist' },
      { label: 'RSVP form', value: 'Local demonstration', kind: 'RSVP' },
    ],
    portalModules: [
      'Story',
      'Timeline',
      'Celebration details',
      'RSVPs',
      'Wishlist',
      'Guest messages',
      'Gallery',
    ],
  },
  {
    slug: 'holidays',
    category: 'Holiday',
    sampleName: 'The Alder House Homecoming',
    title: 'Come home to the table.',
    shortDescription:
      'A calm, welcoming holiday hub for traditions, recipes, travel notes, and the family schedule.',
    introduction:
      'This year, the Alder House will be full again. Bring the recipe you know by heart, a story for the fire, and enough time to stay awhile.',
    dateLabel: 'Homecoming weekend',
    dateValue: 'December 18–20, 2026',
    theme: 'evergreen',
    layout: 'hearth',
    mood: 'Seasonal · welcoming · textured',
    heroImage: '/media/holidays-hero.webp',
    detailImage: '/media/holidays-detail.webp',
    heroAlt: 'A warmly lit family table prepared for a holiday gathering',
    detailAlt: 'Hands finishing a seasonal dessert together',
    details: [
      { label: 'Friday', value: 'Soup supper and porch lights' },
      { label: 'Saturday', value: 'Market, feast, and gift exchange' },
      { label: 'Sunday', value: 'Slow breakfast and goodbyes' },
    ],
    sections: [
      {
        eyebrow: 'Old and new',
        title: 'Traditions that make room',
        body: 'We will keep the cinnamon rolls and handwritten place cards, then add whatever the newest generation brings.',
        items: ['Recipe swap', 'Neighborhood lights walk', 'Story hour by the fire'],
      },
      {
        eyebrow: 'From the kitchen',
        title: 'The shared-table menu',
        body: 'A flexible feast with vegetarian choices and allergy notes clearly marked.',
        items: ['Roasted squash and sage', 'Citrus winter salad', 'Aunt June’s cardamom cake'],
      },
      {
        eyebrow: 'Travel notes',
        title: 'Arrive without the guesswork',
        body: 'Parking, nearby lodging, train pickup, and weather updates live in one place.',
      },
    ],
    timeline: [
      { year: 'Friday', title: 'Settle in', body: 'Soup from 6:00 and no formal start time.' },
      { year: 'Saturday', title: 'Gather', body: 'The table is set at 5:30.' },
      {
        year: 'Sunday',
        title: 'Stay for coffee',
        body: 'Breakfast begins when the first person wakes.',
      },
    ],
    messages: [
      {
        name: 'June Alder',
        relationship: 'Host',
        message: 'The guest room is ready and the kettle is on.',
        status: 'Approved',
      },
      {
        name: 'Theo Reed',
        relationship: 'Family friend',
        message: 'Bringing the orange rolls.',
        status: 'Pending',
      },
    ],
    resources: [
      { label: 'Lodging guide', value: 'https://example.com/alder-lodging', kind: 'Travel' },
      { label: 'Gift exchange notes', value: 'Handmade, found, or under $25', kind: 'Exchange' },
    ],
    portalModules: [
      'Weekend schedule',
      'Guest list',
      'Menu & recipes',
      'Gift exchange',
      'Travel notes',
      'Gallery',
    ],
  },
  {
    slug: 'weddings',
    category: 'Wedding',
    sampleName: 'Elena & Marcus',
    title: 'A promise, set beside the sea.',
    shortDescription:
      'An elegant editorial wedding site with every practical detail woven into the couple’s story.',
    introduction:
      'A late-night bookstore meeting became Sunday walks, two cities, and one shared home. We cannot wait to begin the next chapter with you.',
    dateLabel: 'Wedding day',
    dateValue: 'October 3, 2026 · Port Rowan',
    theme: 'ink-rose',
    layout: 'editorial',
    mood: 'Editorial · romantic · assured',
    heroImage: '/media/weddings-hero.webp',
    detailImage: '/media/weddings-detail.webp',
    heroAlt: 'A newly married couple walking outside after their ceremony',
    detailAlt: 'Elegant table details at a seaside wedding reception',
    details: [
      { label: 'Ceremony', value: '4:00 PM · North Bluff Gardens' },
      { label: 'Reception', value: '5:30 PM · The Tide Room' },
      { label: 'Attire', value: 'Garden formal' },
    ],
    sections: [
      {
        eyebrow: 'The beginning',
        title: 'Shelves, rain, and a borrowed umbrella',
        body: 'Elena reached for the same novel. Marcus offered the umbrella. The rain lasted an hour; the conversation lasted all evening.',
      },
      {
        eyebrow: 'The people beside us',
        title: 'Our wedding party',
        body: 'Eight friends and siblings who have known our before, our becoming, and nearly every version in between.',
        items: ['Nora · Honor attendant', 'Jalen · Best person', 'Priya · Ceremony reader'],
      },
      {
        eyebrow: 'Plan your stay',
        title: 'A weekend by the water',
        body: 'Room blocks, shuttle times, accessibility notes, and favorite breakfast spots are gathered here.',
      },
    ],
    timeline: [
      { year: '2021', title: 'The bookstore', body: 'One umbrella and a very long walk.' },
      { year: '2024', title: 'The little blue house', body: 'Keys, paint samples, and a garden.' },
      { year: '2026', title: 'The promise', body: 'Surrounded by our favorite people.' },
    ],
    messages: [
      {
        name: 'Nora Wells',
        relationship: 'Honor attendant',
        message: 'The easiest yes I have ever witnessed.',
        status: 'Approved',
      },
      {
        name: 'Jalen Price',
        relationship: 'Best person',
        message: 'I have the rings. Probably.',
        status: 'Pending',
      },
    ],
    resources: [
      { label: 'Registry', value: 'https://example.com/elena-marcus', kind: 'Registry' },
      { label: 'Hotel block', value: 'https://example.com/port-rowan-stay', kind: 'Travel' },
    ],
    portalModules: [
      'RSVPs',
      'Wedding party',
      'Schedule',
      'Venues',
      'Travel & lodging',
      'Registry',
      'FAQ',
      'Gallery',
    ],
  },
  {
    slug: 'memorials',
    category: 'Memorial',
    sampleName: 'The Life of Evelyn Hart',
    title: 'A life remembered in the details.',
    shortDescription:
      'A lasting digital remembrance shaped around a life story, favorite memories, and quiet reflection.',
    introduction:
      'Evelyn listened closely, planted generously, and kept every letter. This remembrance gathers the moments her family returns to again and again.',
    dateLabel: 'Remembering',
    dateValue: '1938–2026',
    theme: 'linen-sage',
    layout: 'archive',
    mood: 'Calm · enduring · reflective',
    heroImage: '/media/memorials-hero.webp',
    detailImage: '/media/memorials-detail.webp',
    heroAlt: 'Soft morning light crossing an open family photo album',
    detailAlt: 'A quiet garden path bordered by sage and wildflowers',
    details: [
      { label: 'In her words', value: '“Notice the small kindnesses.”' },
      { label: 'A cause she loved', value: 'The fictional Northfield Reading Room' },
      { label: 'Family archive', value: 'Letters, recipes, and photographs' },
    ],
    sections: [
      {
        eyebrow: 'Her life',
        title: 'A careful observer of ordinary wonder',
        body: 'Evelyn taught generations of readers, tended a stubborn garden, and sent birthday letters that arrived exactly on time.',
      },
      {
        eyebrow: 'Remembered by family',
        title: 'The blue kitchen table',
        body: 'Every important conversation happened there, usually beside tea and something still warm from the oven.',
      },
      {
        eyebrow: 'Carry it forward',
        title: 'Read, plant, write',
        body: 'Her family invites friends to honor Evelyn with a library donation, a native plant, or a handwritten note.',
      },
    ],
    timeline: [
      {
        year: '1938',
        title: 'Northfield',
        body: 'The third of four children and the first to love books.',
      },
      { year: '1962', title: 'The classroom', body: 'Began a thirty-eight-year teaching career.' },
      {
        year: '1998',
        title: 'The reading room',
        body: 'Helped open a neighborhood place for stories.',
      },
    ],
    messages: [
      {
        name: 'Clara Hart',
        relationship: 'Granddaughter',
        message: 'You taught us that attention is a form of love.',
        status: 'Approved',
      },
      {
        name: 'Sam Ortiz',
        relationship: 'Former student',
        message: 'Mrs. Hart gave me my first library card.',
        status: 'Pending',
      },
    ],
    resources: [
      { label: 'Reading-room fund', value: 'https://example.com/reading-room', kind: 'Donation' },
      { label: 'Family values', value: 'Curiosity · patience · kindness', kind: 'Legacy' },
    ],
    portalModules: [
      'Life story',
      'Timeline',
      'Portraits',
      'Family tribute',
      'Memories',
      'Guest messages',
      'Donations',
    ],
  },
  {
    slug: 'anniversaries',
    category: 'Anniversary',
    sampleName: 'Rosa & David · 50 Years',
    title: 'Fifty years, still choosing each other.',
    shortDescription:
      'A warm then-and-now anniversary story built from photographs, letters, and family memories.',
    introduction:
      'They began with a borrowed car and a tiny apartment. Five decades later, the house is louder, the table is longer, and the joke still lands.',
    dateLabel: 'Golden celebration',
    dateValue: 'August 22, 2026 · 5:00 PM',
    theme: 'gold-plum',
    layout: 'scrapbook',
    mood: 'Warm · nostalgic · celebratory',
    heroImage: '/media/anniversaries-hero.webp',
    detailImage: '/media/anniversaries-detail.webp',
    heroAlt: 'An older couple laughing together in afternoon light',
    detailAlt: 'A vintage wedding photograph beside a recent portrait',
    details: [
      { label: 'Gathering', value: 'The Orchard Room' },
      { label: 'Dinner', value: 'Their favorites, family style' },
      { label: 'Surprise', value: 'A film made from fifty years of photos' },
    ],
    sections: [
      {
        eyebrow: '1976 / 2026',
        title: 'Then, now, always',
        body: 'The matching has changed; the way David reaches for Rosa’s hand has not.',
      },
      {
        eyebrow: 'Letters home',
        title: 'What their love taught us',
        body: 'Children, grandchildren, neighbors, and old friends share the lessons they learned by watching.',
      },
      {
        eyebrow: 'At the party',
        title: 'Bring one memory',
        body: 'We are building a time capsule with photographs, recipes, ticket stubs, and stories.',
      },
    ],
    timeline: [
      {
        year: '1976',
        title: 'The city hall steps',
        body: 'A small ceremony and a very large bouquet.',
      },
      { year: '1993', title: 'The orchard house', body: 'A forever home with room to gather.' },
      { year: '2026', title: 'Fifty years', body: 'A family shaped by their steady love.' },
    ],
    messages: [
      {
        name: 'Leah Moreno',
        relationship: 'Daughter',
        message: 'Your love made home feel certain.',
        status: 'Approved',
      },
      {
        name: 'Ben Moreno',
        relationship: 'Grandson',
        message: 'I am bringing the old baseball photo.',
        status: 'Pending',
      },
    ],
    resources: [
      { label: 'Shared gallery', value: 'Local demonstration', kind: 'Photos' },
      { label: 'RSVP list', value: '24 attending · 3 awaiting reply', kind: 'RSVP' },
    ],
    portalModules: [
      'Then & now',
      'Milestones',
      'Letters',
      'Celebration details',
      'RSVPs',
      'Favorite memories',
      'Gallery',
    ],
  },
  {
    slug: 'graduations',
    category: 'Graduation',
    sampleName: 'Jordan Lee · Class of 2026',
    title: 'Built for the questions ahead.',
    shortDescription:
      'An energetic graduate profile balancing achievements, personality, ceremony details, and future plans.',
    introduction:
      'Jordan leaves Westbridge with a robotics medal, a stack of sketchbooks, and a plan to make public transit easier for everyone.',
    dateLabel: 'Commencement',
    dateValue: 'May 29, 2026 · 10:00 AM',
    theme: 'cobalt-lime',
    layout: 'manifesto',
    mood: 'Energetic · optimistic · smart',
    heroImage: '/media/graduations-hero.webp',
    detailImage: '/media/graduations-detail.webp',
    heroAlt: 'A graduate smiling outdoors in cap and gown',
    detailAlt: 'Sketchbook and engineering models on a study table',
    details: [
      { label: 'Ceremony', value: 'Westbridge Field House' },
      { label: 'Open house', value: '2:00–6:00 PM · Lee family garden' },
      { label: 'Next stop', value: 'Urban systems engineering' },
    ],
    sections: [
      {
        eyebrow: 'The work',
        title: 'Curiosity with a purpose',
        body: 'Jordan’s senior project mapped safer bus stops with neighborhood residents rather than designing from assumptions.',
        items: ['Robotics team captain', 'Civic design fellow', 'Jazz ensemble'],
      },
      {
        eyebrow: 'The day',
        title: 'Cheer loudly',
        body: 'Doors open at 9:15. Accessible seating and livestream details are listed with the ceremony information.',
      },
      {
        eyebrow: 'Next chapter',
        title: 'Designing movement for everyone',
        body: 'This fall begins with urban systems, a new city, and at least one carefully packed trumpet.',
      },
    ],
    timeline: [
      {
        year: '2022',
        title: 'First prototype',
        body: 'A cardboard robot that moved almost three feet.',
      },
      {
        year: '2024',
        title: 'City design fellowship',
        body: 'Learned to ask residents before drawing solutions.',
      },
      { year: '2026', title: 'Commencement', body: 'Ready for the next hard question.' },
    ],
    messages: [
      {
        name: 'Marisol Lee',
        relationship: 'Parent',
        message: 'You make hard work look hopeful.',
        status: 'Approved',
      },
      {
        name: 'Dev Brooks',
        relationship: 'Teammate',
        message: 'Save us a seat at the first transit opening.',
        status: 'Pending',
      },
    ],
    resources: [
      { label: 'College fund', value: 'https://example.com/jordan-future', kind: 'Gift' },
      { label: 'Ceremony livestream', value: 'https://example.com/westbridge-live', kind: 'Video' },
    ],
    portalModules: [
      'Graduate profile',
      'Academic journey',
      'Achievements',
      'Ceremony',
      'Celebration',
      'Future plans',
      'Messages',
      'Gift links',
    ],
  },
  {
    slug: 'retirements',
    category: 'Retirement',
    sampleName: 'Dr. Amir Patel · The Next Chapter',
    title: 'Thirty-two years of useful work.',
    shortDescription:
      'A dignified career celebration centered on contributions, colleague stories, and the road ahead.',
    introduction:
      'Amir built teams that stayed curious, clinics that listened, and a career measured most honestly in people helped.',
    dateLabel: 'Retirement dinner',
    dateValue: 'November 7, 2026 · 6:00 PM',
    theme: 'navy-copper',
    layout: 'folio',
    mood: 'Dignified · accomplished · forward-looking',
    heroImage: '/media/retirements-hero.webp',
    detailImage: '/media/retirements-detail.webp',
    heroAlt: 'A respected professional smiling in a sunlit office',
    detailAlt: 'Colleagues sharing stories around a dinner table',
    details: [
      { label: 'Venue', value: 'Harbor Science Museum' },
      { label: 'Program', value: 'Dinner, stories, and a short film' },
      { label: 'Next', value: 'Teaching, travel, and a very patient garden' },
    ],
    sections: [
      {
        eyebrow: 'The contribution',
        title: 'Care designed around people',
        body: 'Across three decades, Amir brought clinicians, designers, and families into the same room to improve everyday care.',
      },
      {
        eyebrow: 'Colleague notes',
        title: 'The questions he taught us to ask',
        body: 'Was the patient heard? Is the system helping? What have we missed?',
      },
      {
        eyebrow: 'Beyond the office',
        title: 'A calendar with more sky in it',
        body: 'There are train routes to explore, tomatoes to attempt, and students to mentor without a meeting invitation.',
      },
    ],
    timeline: [
      { year: '1994', title: 'First clinic', body: 'Joined a small community practice.' },
      { year: '2009', title: 'The access project', body: 'Led a regional care redesign.' },
      {
        year: '2026',
        title: 'A generous handoff',
        body: 'Leaving the work stronger and the team ready.',
      },
    ],
    messages: [
      {
        name: 'Dr. Kira Moss',
        relationship: 'Colleague',
        message: 'You made the room more thoughtful every time you entered it.',
        status: 'Approved',
      },
      {
        name: 'Owen Li',
        relationship: 'Former fellow',
        message: 'Thank you for teaching us to listen first.',
        status: 'Pending',
      },
    ],
    resources: [
      { label: 'Mentorship fund', value: 'https://example.com/amir-mentorship', kind: 'Donation' },
      { label: 'Event RSVP', value: '58 attending · 6 awaiting reply', kind: 'RSVP' },
    ],
    portalModules: [
      'Career timeline',
      'Contributions',
      'Roles & honors',
      'Stories',
      'Celebration RSVP',
      'Photo archive',
      'Next chapter',
    ],
  },
  {
    slug: 'reunions',
    category: 'Reunion',
    sampleName: 'Camp Alder · 25 Years Later',
    title: 'Same lake. New stories.',
    shortDescription:
      'A friendly multi-day reunion hub with schedules, travel planning, attendee profiles, and shared memories.',
    introduction:
      'The cabins are a little better insulated, but the dock still tilts left. Come back for one long weekend with the people who remember the songs.',
    dateLabel: 'Reunion weekend',
    dateValue: 'July 16–19, 2026',
    theme: 'lake-red',
    layout: 'field-guide',
    mood: 'Welcoming · outdoorsy · communal',
    heroImage: '/media/reunions-hero.webp',
    detailImage: '/media/reunions-detail.webp',
    heroAlt: 'Friends gathered on a lakeside dock at sunset',
    detailAlt: 'Old camp photographs and handwritten notes on a table',
    details: [
      { label: 'Base camp', value: 'Alder Lake Lodge' },
      { label: 'Saturday', value: 'Paddle, picnic, story night' },
      { label: 'Who’s coming', value: '34 confirmed from seven cities' },
    ],
    sections: [
      {
        eyebrow: 'The weekend',
        title: 'Enough structure, plenty of porch time',
        body: 'Choose the early paddle, the family hike, or absolutely nothing until lunch.',
      },
      {
        eyebrow: 'Who is coming',
        title: 'Names, faces, and what changed',
        body: 'A fictional attendee directory helps everyone reconnect before arrival.',
        items: [
          'Tessa · Minneapolis · brings a canoe',
          'Miles · Denver · brings twins',
          'Rae · Chicago · brings the songbook',
        ],
      },
      {
        eyebrow: 'The archive',
        title: 'Add the photo no one has seen',
        body: 'Scan the cabin pictures, write the story behind them, and add them to the shared memory wall.',
      },
    ],
    timeline: [
      { year: 'Friday', title: 'Dockside welcome', body: 'Open arrival from 3:00 PM.' },
      { year: 'Saturday', title: 'Lake day', body: 'Activities, picnic, and story night.' },
      { year: 'Sunday', title: 'One last circle', body: 'Breakfast and the big group photo.' },
    ],
    messages: [
      {
        name: 'Tessa Grant',
        relationship: 'Cabin Cedar',
        message: 'I still know every word to the paddle song.',
        status: 'Approved',
      },
      {
        name: 'Miles Avery',
        relationship: 'Cabin Pine',
        message: 'The twins are ready for their first dock jump.',
        status: 'Pending',
      },
    ],
    resources: [
      { label: 'Lodge rooms', value: 'https://example.com/alder-lodge', kind: 'Lodging' },
      { label: 'Travel board', value: 'Three ride shares available', kind: 'Travel' },
    ],
    portalModules: [
      'Attendees',
      'Multi-day schedule',
      'Travel & lodging',
      'History',
      'Photo archive',
      'Memory submissions',
      'FAQ',
      'RSVPs',
    ],
  },
  {
    slug: 'just-because',
    category: 'Just Because',
    sampleName: 'For June, On an Ordinary Tuesday',
    title: 'No occasion. Every reason.',
    shortDescription:
      'An intimate appreciation letter made from quiet observations, photographs, and words from loved ones.',
    introduction:
      'You never wait for a reason to show up for us. So we decided not to wait for a reason to tell you what that has meant.',
    dateLabel: 'A small surprise',
    dateValue: 'Made for June · With love',
    theme: 'paper-coral',
    layout: 'letter',
    mood: 'Intimate · handmade · sincere',
    heroImage: '/media/just-because-hero.webp',
    detailImage: '/media/just-because-detail.webp',
    heroAlt: 'A handwritten letter and flowers on a sunny table',
    detailAlt: 'Two friends sharing a quiet laugh outdoors',
    details: [
      { label: 'Reason 01', value: 'You remember the small things' },
      { label: 'Reason 02', value: 'You make time feel generous' },
      { label: 'Reason 03', value: 'You bring the good snacks' },
    ],
    sections: [
      {
        eyebrow: 'Dear June',
        title: 'The long version of thank you',
        body: 'For every porch conversation, emergency ride, perfectly timed joke, and note left where we would find it.',
      },
      {
        eyebrow: 'A few witnesses',
        title: 'What we notice',
        body: 'Short letters from the people who know exactly how your kindness changes a day.',
      },
      {
        eyebrow: 'Press play when ready',
        title: 'A song for the kitchen',
        body: 'An optional music presentation is available by choice only. Nothing plays automatically.',
      },
    ],
    timeline: [
      { year: 'Always', title: 'The first call', body: 'When someone needs steadiness.' },
      { year: 'Often', title: 'The extra chair', body: 'You find room without making it a favor.' },
      { year: 'Today', title: 'Our turn', body: 'We hope you let this appreciation land.' },
    ],
    messages: [
      {
        name: 'Cam Ellis',
        relationship: 'Friend',
        message: 'You make care feel easy, even when it is not.',
        status: 'Approved',
      },
      {
        name: 'Ari Fox',
        relationship: 'Neighbor',
        message: 'Thank you for every doorstep tomato.',
        status: 'Pending',
      },
    ],
    resources: [
      { label: 'Optional song', value: 'Paused · visitor chooses to play', kind: 'Music' },
      { label: 'Private share link', value: 'Local demonstration', kind: 'Share' },
    ],
    portalModules: [
      'Dedication',
      'Reasons',
      'Letters',
      'Photo memories',
      'Optional music',
      'Surprise reveal',
      'Sharing',
    ],
  },
  {
    slug: 'funerals',
    category: 'Funeral',
    sampleName: 'Service for Thomas Reed',
    title: 'Service information and family notices.',
    shortDescription:
      'A compassionate, immediate source for visitation, service, directions, and family-approved updates.',
    introduction:
      'The Reed family shares these arrangements for Thomas. This page keeps the practical details clear while honoring a loved and deeply familiar life.',
    dateLabel: 'Funeral service',
    dateValue: 'Monday, October 12, 2026 · 11:00 AM',
    theme: 'charcoal-dove',
    layout: 'service',
    mood: 'Compassionate · clear · dignified',
    heroImage: '/media/funerals-hero.webp',
    detailImage: '/media/funerals-detail.webp',
    heroAlt: 'White flowers arranged beside a softly lit window',
    detailAlt: 'A quiet chapel prepared for a remembrance service',
    details: [
      { label: 'Visitation', value: 'Sunday · 3:00–6:00 PM' },
      { label: 'Service', value: 'Monday · 11:00 AM' },
      { label: 'Location', value: 'Fictional Reed Community Chapel' },
    ],
    sections: [
      {
        eyebrow: 'Obituary',
        title: 'Thomas Reed, 1949–2026',
        body: 'Thomas repaired radios, told patient stories, and made the first pancake on Saturdays for more than forty years.',
      },
      {
        eyebrow: 'Order of service',
        title: 'A time to gather and remember',
        body: 'Prelude, family welcome, readings, remembrance, music, and closing.',
        items: ['Prelude · 10:45 AM', 'Family remembrance', 'Closing and procession'],
      },
      {
        eyebrow: 'Family notice',
        title: 'Flowers and memorial gifts',
        body: 'Flowers may be sent to the chapel. Memorial gifts may be directed to the fictional Harbor Tool Library.',
      },
    ],
    timeline: [
      { year: 'Sunday', title: 'Visitation', body: '3:00–6:00 PM · quiet room available.' },
      { year: 'Monday', title: 'Funeral service', body: '11:00 AM · seating begins at 10:30.' },
      {
        year: 'Afterward',
        title: 'Family reception',
        body: 'Community Hall · directions provided.',
      },
    ],
    messages: [
      {
        name: 'Elaine Park',
        relationship: 'Neighbor',
        message: 'Thomas always had the right tool and enough time to help.',
        status: 'Approved',
      },
      {
        name: 'Noah Reed',
        relationship: 'Grandson',
        message: 'I will miss Saturday pancakes.',
        status: 'Pending',
      },
    ],
    resources: [
      {
        label: 'Livestream placeholder',
        value: 'Available 30 minutes before service',
        kind: 'Livestream',
      },
      { label: 'Harbor Tool Library', value: 'https://example.com/tool-library', kind: 'Donation' },
      {
        label: 'Printable service details',
        value: 'Use your browser print command',
        kind: 'Print',
      },
    ],
    portalModules: [
      'Obituary',
      'Service details',
      'Visitation',
      'Order of service',
      'Directions',
      'Livestream',
      'Donations',
      'Participants',
      'Condolences',
    ],
  },
  {
    slug: 'announcements',
    category: 'Announcement',
    sampleName: 'The Kims Have News',
    title: 'A new key. A new view. A new chapter.',
    shortDescription:
      'A flexible, dramatic reveal for a new home, engagement, adoption, pregnancy, or other big news.',
    introduction:
      'After twelve apartments, four cities, and one heroic moving plant, Priya and Daniel finally found the place that feels like theirs.',
    dateLabel: 'Reveal date',
    dateValue: 'News shared August 28, 2026',
    theme: 'electric-violet',
    layout: 'reveal',
    mood: 'Dramatic · playful · flexible',
    heroImage: '/media/announcements-hero.webp',
    detailImage: '/media/announcements-detail.webp',
    heroAlt: 'A couple holding keys in front of a new front door',
    detailAlt: 'Moving boxes, a houseplant, and a painted welcome sign',
    details: [
      { label: 'The news', value: 'We bought our first home' },
      { label: 'The place', value: 'Fictional Maple Crossing' },
      { label: 'Next update', value: 'The paint-color decision' },
    ],
    sections: [
      {
        eyebrow: 'Surprise',
        title: 'Yes, the plant survived another move',
        body: 'This time the boxes are landing somewhere permanent, with a sunny corner already reserved.',
      },
      {
        eyebrow: 'The details',
        title: 'A tiny blue door and room to grow',
        body: 'Closing is complete. We are unpacking slowly and planning an open-house afternoon later this fall.',
      },
      {
        eyebrow: 'Questions, answered',
        title: 'Is there a guest room?',
        body: 'Almost. It currently contains 43 boxes and one optimistic air mattress.',
        items: [
          'Open house details coming soon',
          'New address shared privately',
          'Updates appear here',
        ],
      },
    ],
    timeline: [
      { year: 'August 1', title: 'The offer', body: 'Submitted with crossed fingers.' },
      { year: 'August 21', title: 'The keys', body: 'One tiny key ring, one enormous feeling.' },
      { year: 'October', title: 'Open house', body: 'Date to be announced.' },
    ],
    messages: [
      {
        name: 'Lena Cho',
        relationship: 'Friend',
        message: 'I volunteer for paint duty and pizza.',
        status: 'Approved',
      },
      {
        name: 'Omar Bell',
        relationship: 'Cousin',
        message: 'Saving a housewarming fern for you.',
        status: 'Pending',
      },
    ],
    resources: [
      { label: 'Announcement style', value: 'New home', kind: 'Type' },
      {
        label: 'Private address card',
        value: 'Hidden in this public demonstration',
        kind: 'Privacy',
      },
    ],
    portalModules: [
      'Reveal',
      'Announcement type',
      'Countdown',
      'Message',
      'Media',
      'Key details',
      'FAQ',
      'Updates',
      'Sharing',
    ],
  },
  {
    slug: 'baby-showers',
    category: 'Baby Shower',
    sampleName: 'A Little Cloud for the Parkers',
    title: 'Meet us under the soft blue sky.',
    shortDescription:
      'A refined baby-shower invitation with thoughtful hosting details, registry guidance, games, and RSVP tools.',
    introduction:
      'Alex and Morgan are expecting a new little weather system this winter. Join us for brunch, stories, and a room full of good wishes.',
    dateLabel: 'Shower date',
    dateValue: 'November 14, 2026 · 11:00 AM',
    theme: 'sky-oat',
    layout: 'storybook',
    mood: 'Soft · refined · welcoming',
    heroImage: '/media/baby-showers-hero.webp',
    detailImage: '/media/baby-showers-detail.webp',
    heroAlt: 'Soft blue baby decorations arranged for a shower',
    detailAlt: 'Small gifts and handwritten wishes beside a brunch table',
    details: [
      { label: 'Venue', value: 'The Sunroom at Willow House' },
      { label: 'Theme', value: 'Clouds, stories, and soft blues' },
      { label: 'Hosts', value: 'Jules Parker & Mina West' },
    ],
    sections: [
      {
        eyebrow: 'A small hello',
        title: 'Baby Parker arrives in January',
        body: 'We are celebrating the parents-to-be with a bright late-morning gathering designed for easy conversation.',
      },
      {
        eyebrow: 'The day',
        title: 'Brunch, books, and good wishes',
        body: 'Come as you are in something soft blue, cream, or whatever makes you comfortable.',
        items: [
          '11:00 · Welcome brunch',
          '12:00 · Storybook wishes',
          '1:00 · Cake and photographs',
        ],
      },
      {
        eyebrow: 'Gifts',
        title: 'A practical, gentle registry',
        body: 'The family welcomes favorite children’s books, meal-train help, and a short list of practical essentials.',
      },
    ],
    timeline: [
      { year: '11:00', title: 'Brunch begins', body: 'Coffee, pastries, and unhurried arrivals.' },
      { year: '12:00', title: 'Activities', body: 'Storybook notes and a name-game.' },
      { year: '1:00', title: 'Cake and gallery', body: 'Photographs and a quiet thank-you.' },
    ],
    messages: [
      {
        name: 'Jules Parker',
        relationship: 'Host',
        message: 'We cannot wait to gather around this growing family.',
        status: 'Approved',
      },
      {
        name: 'Mina West',
        relationship: 'Host',
        message: 'Bring a favorite picture book if you would like.',
        status: 'Pending',
      },
    ],
    resources: [
      { label: 'Registry', value: 'https://example.com/baby-parker', kind: 'Registry' },
      { label: 'Directions', value: 'Accessible entrance on Willow Lane', kind: 'Travel' },
    ],
    portalModules: [
      'Parent & baby intro',
      'Shower details',
      'RSVPs',
      'Registry',
      'Gift preferences',
      'Hosts',
      'Games',
      'Gallery',
      'Directions & FAQ',
    ],
  },
];

export function getOccasion(slug: string): Occasion | undefined {
  return occasions.find((occasion) => occasion.slug === slug);
}
