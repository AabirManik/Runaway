/**
 * Landing-page content.
 * Kept separate from presentation so copy can be revised without touching
 * component code, and so it is obvious what is sample/illustrative content.
 */

/* Order matches the sections as they are actually rendered on the page
   (see routes/LandingPage.jsx): Hero, How it works, Features, Integrations,
   Calendar & Media, FAQ. */
export const navLinks = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'Calendar & Media', href: '#calendar-media' },
  { label: 'FAQ', href: '#faq' },
]

/* ------------------------------------------------------------------
   Hero carousel cards — two rows of four, two visible per row.
   Each row is its own horizontal advance (see HeroCarousel.jsx).
------------------------------------------------------------------- */
export const heroRows = [
  {
    id: 'top',
    cards: [
      {
        id: 'draft',
        icon: 'doc',
        tone: 'accent',
        title: 'Draft',
        type: 'lines',
        lines: ['Preparing your caption…', '3 channels selected'],
        thumb: 3,
      },
      {
        id: 'scheduled',
        icon: 'clock',
        tone: 'coral',
        title: 'Scheduled',
        type: 'meta',
        meta: 'May 24, 2024 · 10:00 AM',
        thumb: 5,
      },
      {
        id: 'week',
        icon: 'calendar',
        tone: 'accent',
        title: 'This week',
        type: 'meta',
        meta: '4 posts planned · 2 drafts',
        thumb: 1,
      },
      {
        id: 'accounts',
        icon: 'user',
        tone: 'sky',
        title: 'Example accounts',
        type: 'rows',
        meta: 'Sample data only',
      },
    ],
  },
  {
    id: 'bottom',
    cards: [
      {
        id: 'media',
        icon: 'image',
        tone: 'line',
        title: 'Media',
        type: 'thumbs',
        thumbs: [0, 2, 6],
      },
      {
        id: 'channel',
        icon: 'sliders',
        tone: 'accent',
        title: 'Channel edit',
        type: 'glyphs',
        meta: 'Caption tailored per channel',
      },
      {
        id: 'caption',
        icon: 'text',
        tone: 'lilac',
        title: 'Saved caption',
        type: 'lines',
        lines: ['Reusable intro for', 'your weekly posts'],
      },
      {
        id: 'status',
        icon: 'check',
        tone: 'sky',
        title: 'Status',
        type: 'meta',
        meta: 'Local sample · nothing published',
      },
    ],
  },
]

/* ------------------------------------------------------------------
   How it works
------------------------------------------------------------------- */
export const steps = [
  {
    n: '01',
    title: 'Draft your post',
    body: 'Capture your idea, add a few details, and start a draft.',
  },
  {
    n: '02',
    title: 'Shape it for each channel',
    body: 'Adapt the content, visuals, and caption for each platform.',
  },
  {
    n: '03',
    title: 'Choose when it goes out',
    body: 'Pick a date and time, then schedule it in your calendar.',
  },
]

/** Demo panels shown in the "how the software actually works" card. */
export const demoPanels = [
  {
    id: 'draft',
    label: 'Draft',
    heading: 'Write once, in one editor',
    body: 'A single post editor keeps the body copy, media, and channel selection together.',
  },
  {
    id: 'channels',
    label: 'Channels',
    heading: 'Shape each channel side by side',
    body: 'Every selected channel gets its own copy, so nothing is cut off mid-sentence.',
  },
  {
    id: 'schedule',
    label: 'Schedule',
    heading: 'Pick a date, then save',
    body: 'Choose a date and time, or leave it as a draft — both stay in your calendar.',
  },
]

/* ------------------------------------------------------------------
   Features
------------------------------------------------------------------- */
export const features = [
  {
    icon: 'doc',
    title: 'Channel-specific drafts',
    body: 'Create and adapt your post for each channel, all in one place.',
    visual: 'drafts',
  },
  {
    icon: 'calendar',
    title: 'Visual calendar',
    body: 'See all your drafts and scheduled posts in a clear calendar view.',
    visual: 'calendar',
  },
  {
    icon: 'image',
    title: 'Reusable media library',
    body: 'Keep your photos and assets organized and ready to use.',
    visual: 'media',
  },
  {
    icon: 'user',
    title: 'Account overview',
    body: 'Manage your connected channels and keep everything in sync.',
    visual: 'accounts',
  },
]

/* ------------------------------------------------------------------
   Integrations — generic tiles, no platform branding
------------------------------------------------------------------- */
export const integrationTiles = [
  { id: 'social', icon: 'social', title: 'Social channel', status: 'Planned', tone: 'accent' },
  { id: 'video', icon: 'video', title: 'Video channel', status: 'API access varies', tone: 'neutral' },
  { id: 'text', icon: 'text', title: 'Text channel', status: 'Planned', tone: 'accent' },
  { id: 'more', icon: 'more', title: 'More channels', status: 'API access varies', tone: 'neutral' },
]

export const integrationCards = [
  {
    icon: 'shield',
    title: 'Official account access',
    body: 'Connect each platform through its supported authorization, with security and permissions managed by the provider.',
  },
  {
    icon: 'grid',
    title: 'One workspace',
    body: 'See drafts, media, and schedules together in a single, organized workspace.',
  },
  {
    icon: 'sliders',
    title: 'Channel-aware planning',
    body: 'Adapt your post for each selected channel with tailored content, visuals, and captions.',
  },
]

/* ------------------------------------------------------------------
   FAQ — the product speaking in its own voice
------------------------------------------------------------------- */
export const faqItems = [
  {
    id: 'channels',
    q: 'Which channels will Runway support?',
    a: 'Supported channels depend on each platform’s official API access, permissions, and media rules. Runway will add providers one at a time through their official APIs — nothing is scraped, and no platform is announced before that research is done.',
  },
  {
    id: 'versions',
    q: 'Can I prepare different versions of a post?',
    a: 'Yes. Runway is designed so you can tailor the copy, caption, and visuals for each selected channel before scheduling.',
  },
  {
    id: 'schedule',
    q: 'Can I schedule posts ahead?',
    a: 'Yes. Pick a date and time for each post and it lands in your calendar, where you can move it, edit it, or pull it back to drafts at any point before it goes out.',
  },
  {
    id: 'open-source',
    q: 'Is Runway open source?',
    a: 'Runway is being built in the open. The license is still being chosen — MIT, Apache-2.0, or AGPL-3.0 — and will be confirmed deliberately before any public release.',
  },
]

/* ------------------------------------------------------------------
   Footer — only real destinations; no dead links
------------------------------------------------------------------- */
export const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Calendar & Media', href: '#calendar-media' },
      { label: 'Integrations', href: '#integrations' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Workspace',
    links: [
      { label: 'Open workspace', href: '/app' },
      { label: 'Dashboard demo', href: '/app' },
      { label: 'Back to top', href: '#top' },
    ],
  },
]
