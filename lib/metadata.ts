import { Metadata } from 'next';

export const metadataBase = new URL('https://example.com');

export const siteMetadata: Metadata = {
  metadataBase,
  title: 'Lunora Atelier | Premium Graphic Design Studio',
  description: 'Luxury graphic design studio for branding, social media, print, packaging, and digital growth campaigns.',
  openGraph: {
    title: 'Lunora Atelier',
    description: 'Creative design studio for premium branding and content systems.',
    type: 'website',
  },
};
