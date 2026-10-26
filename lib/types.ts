export type Service = {
  id: string;
  name: string;
  slug: string;
  description: string;
  priceFrom: number;
  deliveryDays: number;
  revisions: string;
  badge: string;
  featured?: boolean;
};

export type ProjectCategory =
  | 'All'
  | 'Logo Design'
  | 'Brand Identity'
  | 'Social Media'
  | 'YouTube Thumbnails'
  | 'Flyers & Posters'
  | 'Business Cards'
  | 'Banners & Ads'
  | 'Other';

export type Project = {
  id: string;
  title: string;
  slug: string;
  category: Exclude<ProjectCategory, 'All'>;
  description: string;
  image: string;
  gallery: string[];
  client: string;
  results: string;
  featured?: boolean;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
};

export type OrderStatus = 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';

export type Order = {
  id: string;
  customerName: string;
  email: string;
  whatsapp: string;
  service: string;
  projectDescription: string;
  budget: string;
  deadline: string;
  additionalRequirements?: string;
  status: OrderStatus;
};
