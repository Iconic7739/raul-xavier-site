/**
 * Raul Xavier — Personal Digital Identity Content Configuration
 * 
 * To update any text, social handles, projects, or availability status on the website,
 * simply edit the values in this file. Changes will immediately reflect across the application.
 */

export interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  category: string;
  status: string;
  highlights: string[];
  link?: string;
  linkText?: string;
}

export interface ActivityItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  currentFocus: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

export const siteContent = {
  // Identity & Hero
  identity: {
    name: 'RAUL XAVIER',
    avatar: '/IMG_20260829_212811.jpg',
    positioning: 'early nfts · alpha · web3 · ai · experiments',
    supportingMessage:
      'i find early opportunities on the internet and share the ones i’m actually getting into',
    bulletPoints: [
      'opportunities that can make money',
      'early projects worth watching',
      'web3 & ai experiments i’m building',
      'things i’m personally exploring',
    ],
    availability: {
      status: 'open for mod / collab work',
      isAvailable: true,
    },
  },

  // Social Channels & Handles
  socials: {
    x: {
      label: 'X',
      handle: '@0xRaulXavier',
      url: 'https://x.com/0xRaulXavier',
      description: 'alpha, curation, onchain thoughts',
    },
    telegram: {
      label: 'Telegram',
      handle: '@ICONICX69',
      url: 'https://t.me/ICONICX69',
      description: 'direct line for quick chats & collab inquiries',
    },
    discord: {
      label: 'Discord',
      handle: 'rahulxx1',
      description: 'community conversations & team coordination',
    },
  },

  // What I Do (5 minimal focus areas)
  whatIDo: [
    {
      number: '01',
      title: 'ALPHA',
      description: 'finding interesting projects before they get crowded',
    },
    {
      number: '02',
      title: 'EARLY NFTS',
      description: 'discovering collections, ecosystems and opportunities while they’re still early',
    },
    {
      number: '03',
      title: 'WEB3',
      description: 'exploring new protocols, communities and onchain ideas',
    },
    {
      number: '04',
      title: 'AI',
      description: 'experimenting with agents, automation and new AI tools',
    },
    {
      number: '05',
      title: 'EXPERIMENTS',
      description: 'building small things just to see what happens',
    },
  ] as ServiceItem[],

  // Currently Exploring (Interactive Tags)
  currently: [
    {
      id: 'web3',
      tag: 'web3',
      title: 'Web3 & Layer 2 Protocols',
      description: 'Tracking emerging EVM & SVM developments, liquidity incentives, and early network incentives.',
      currentFocus: 'Decentralized physical infra, new fee mechanisms, and cross-chain primitives.',
    },
    {
      id: 'ai',
      tag: 'ai',
      title: 'Autonomous Agents & Automation',
      description: 'Prototyping multi-agent reasoning, self-directing scrapers, and task execution workflows.',
      currentFocus: 'Agent memory architectures, automated trigger loops, and local LLM tool calling.',
    },
    {
      id: 'nfts',
      tag: 'nfts',
      title: 'Digital Provenance & Culture',
      description: 'Observing tight-knit digital subcultures, mint mechanics, and grassroots community growth.',
      currentFocus: 'Generative art protocols, dynamic onchain metadata, and curated micro-drops.',
    },
    {
      id: 'onchain',
      tag: 'onchain',
      title: 'Onchain Activity & Data',
      description: 'Deciphering smart contract events, wallet footprints, and mempool patterns.',
      currentFocus: 'Base ecosystem activity, transaction indexing, and visual wallet storytelling.',
    },
    {
      id: 'experiments',
      tag: 'experiments',
      title: 'Rapid Prototypes & Sandboxes',
      description: 'Turning weekend curiosities into lightweight functional applications and bots.',
      currentFocus: 'Zero-latency Telegram bots, reactive event listeners, and gamified agent sandboxes.',
    },
  ] as ActivityItem[],

  // Selected Work / Projects
  selectedWork: [
    {
      id: 'farmora',
      number: '01',
      title: 'FARMORA',
      description: 'choose your agent. build your farm. let it work.',
      category: 'web3 · ai · game',
      status: 'Active Prototype',
      highlights: [
        'Experimental game loop built around autonomous AI agents',
        'Agents make resource allocation choices based on environment conditions',
        'Lightweight onchain inventory and progression mechanics',
      ],
      linkText: 'Inquire on Telegram',
      link: 'https://t.me/ICONICX69',
    },
    {
      id: 'tweet-tracker',
      number: '02',
      title: 'TWEET TRACKER',
      description: 'A personal tool for tracking X accounts and receiving instant notifications',
      category: 'automation · ai · tools',
      status: 'Private Utility',
      highlights: [
        'Sub-second filtering of target accounts and key narrative keywords',
        'Intelligent noise reduction using lightweight AI prompt classifiers',
        'Direct push alerts dispatched straight to private Telegram channels',
      ],
      linkText: 'Inquire on Telegram',
      link: 'https://t.me/ICONICX69',
    },
    {
      id: 'base-story',
      number: '03',
      title: 'BASE STORY',
      description: 'turning wallet activity into a visual story',
      category: 'web3 · onchain · experiment',
      status: 'Experimental Demo',
      highlights: [
        'Transforms raw block explorer transactions into an editorial timeline',
        'Highlights milestones, token swaps, mint moments, and protocol interactions',
        'Generates minimal, shareable visual summaries of onchain journeys',
      ],
      linkText: 'Inquire on Telegram',
      link: 'https://t.me/ICONICX69',
    },
  ] as Project[],

  // Open For Work
  openForWork: {
    headline: 'open for mod / collab work',
    subline: 'working with interesting web3, nft and ai projects',
    availableFor: [
      'community moderation',
      'community management',
      'content',
      'collaborations',
      'web3 community work',
    ],
    ctaText: "let's work together →",
    ctaUrl: 'https://t.me/ICONICX69',
  },

  // Footer
  footer: {
    tagline: 'early nfts · alpha · web3 · ai · experiments',
    copyright: '© 2026 Raul Xavier',
  },
};
