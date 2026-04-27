import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://selleros-lite.vercel.app';

const routes = [
  '/',
  '/generator',
  '/pay',
  '/pricing',
  '/faq',
  '/download',
  '/oferta',
  '/privacy',
  '/contact',
  '/generator-nazvaniya-tovara',
  '/generator-opisaniya-tovara',
  '/otvet-na-negativnyy-otzyv',
  '/seo-kartochki-tovara'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route === '/generator' ? 0.9 : 0.7
  }));
}
