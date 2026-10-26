import { Project, ProjectCategory, Service, Testimonial } from './types';

export const services: Service[] = [
  {
    id: 'logo-design',
    name: 'Logo Design',
    slug: 'logo-design',
    description: 'Distinctive logo systems for startups, personal brands, and established businesses.',
    priceFrom: 180,
    deliveryDays: 5,
    revisions: 3,
    badge: 'Brand Identity',
    featured: true,
  },
  {
    id: 'brand-identity',
    name: 'Brand Identity',
    slug: 'brand-identity',
    description: 'Comprehensive brand kits including color palettes, typography, and design direction.',
    priceFrom: 420,
    deliveryDays: 10,
    revisions: 4,
    badge: 'Strategy + Design',
    featured: true,
  },
  {
    id: 'social-media',
    name: 'Social Media Content',
    slug: 'social-media-content',
    description: 'Scroll-stopping post design packages for Instagram, Facebook, and LinkedIn.',
    priceFrom: 150,
    deliveryDays: 3,
    revisions: 2,
    badge: 'Content Design',
  },
  {
    id: 'youtube-thumbnails',
    name: 'YouTube Thumbnails',
    slug: 'youtube-thumbnails',
    description: 'High-converting thumbnails designed to increase click-through and retention.',
    priceFrom: 75,
    deliveryDays: 2,
    revisions: 2,
    badge: 'Growth Design',
  },
  {
    id: 'flyers-posters',
    name: 'Flyers & Posters',
    slug: 'flyers-posters',
    description: 'Campaign-ready print and digital marketing collateral for launches and events.',
    priceFrom: 200,
    deliveryDays: 4,
    revisions: 3,
    badge: 'Marketing Collateral',
  },
  {
    id: 'business-cards',
    name: 'Business Cards & Print',
    slug: 'business-cards-print',
    description: 'Elegant print-ready business cards, stationery, and premium branded essentials.',
    priceFrom: 120,
    deliveryDays: 4,
    revisions: 3,
    badge: 'Print Design',
  },
];

export const projectCategories: ProjectCategory[] = [
  'All',
  'Logo Design',
  'Brand Identity',
  'Social Media',
  'YouTube Thumbnails',
  'Flyers & Posters',
  'Business Cards',
  'Banners & Ads',
  'Other',
];

export const projects: Project[] = [
  {
    id: 'solace',
    title: 'Solace Studio',
    slug: 'solace-studio',
    category: 'Brand Identity',
    description: 'Full premium brand identity for a wellness studio targeting motivated millennial entrepreneurs.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    ],
    client: 'Solace Studio',
    results: 'Repositioned the brand for premium bookings and improved engagement across channels.',
    featured: true,
  },
  {
    id: 'oaklane',
    title: 'Oak & Lane',
    slug: 'oak-lane',
    category: 'Logo Design',
    description: 'Elegant logo and packaging system for a boutique furniture and lifestyle store.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
    ],
    client: 'Oak & Lane',
    results: 'Created a memorable premium identity that translated across packaging and digital touchpoints.',
  },
  {
    id: 'luma',
    title: 'Luma Campaign',
    slug: 'luma-campaign',
    category: 'Social Media',
    description: 'Fifteen-day social content system designed to launch a wellness product successfully.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    ],
    client: 'Luma Beauty',
    results: 'Boosted social engagement by 42% within a month of launch.',
  },
  {
    id: 'pulse',
    title: 'Pulse Podcast',
    slug: 'pulse-podcast',
    category: 'YouTube Thumbnails',
    description: 'Eye-catching thumbnail refresh for a business podcast channel looking to increase CTR.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    ],
    client: 'Pulse Podcast',
    results: 'Lifted click-through rate significantly by simplifying the visual hierarchy.',
  },
  {
    id: 'summit',
    title: 'Summit Launch',
    slug: 'summit-launch',
    category: 'Flyers & Posters',
    description: 'Poster set and event collateral created for an international startup conference.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
    ],
    client: 'Summit Labs',
    results: 'Event registrations increased after the new visual campaign launch.',
  },
  {
    id: 'nesta',
    title: 'Nesta Cards',
    slug: 'nesta-cards',
    category: 'Business Cards',
    description: 'Premium business card and stationery suite for a boutique consultancy practice.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    ],
    client: 'Nesta Advisory',
    results: 'The card system elevated the firm’s in-person impression and consistency.',
  },
  {
    id: 'atlas',
    title: 'Atlas Campaign',
    slug: 'atlas-campaign',
    category: 'Banners & Ads',
    description: 'A digital advertising set for a software launch across web and social placements.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    ],
    client: 'Atlas Cloud',
    results: 'Creative refresh helped clarify the product promise across placements.',
  },
  {
    id: 'harbor',
    title: 'Harbor Motion Kit',
    slug: 'harbor-motion-kit',
    category: 'Other',
    description: 'Visual system and promo assets for a content creator brand entering a new market.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
    ],
    client: 'Harbor Media',
    results: 'Created a flexible visual system that scaled across content types.',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Mila Parker',
    role: 'Marketing Lead',
    company: 'Northline Co.',
    quote: 'The brand refresh completely elevated how our company presents itself. Every design decision clearly supported our growth goals.',
  },
  {
    id: 't2',
    name: 'Jason Morgan',
    role: 'Founder',
    company: 'Echo Creative',
    quote: 'Professional, strategic, and beautifully executed. We got a polished toolkit that made our business feel premium from day one.',
  },
  {
    id: 't3',
    name: 'Rina Ali',
    role: 'Business Owner',
    company: 'Solace Studio',
    quote: 'Very responsive and thoughtful. The final work looked elevated and performed better than our previous marketing assets.',
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const getProjectBySlug = (slug: string) => projects.find((project) => project.slug === slug);

export const getServiceBySlug = (slug: string) => services.find((service) => service.slug === slug);

export const getProjectsByCategory = (category: ProjectCategory) =>
  category === 'All' ? projects : projects.filter((project) => project.category === category);
