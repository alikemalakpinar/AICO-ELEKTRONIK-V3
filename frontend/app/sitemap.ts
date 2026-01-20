import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aico-elektronik.com';
const LOCALES = ['tr', 'en'] as const;

// Static pages that exist for all locales
const STATIC_PAGES = [
  '',
  '/about',
  '/services',
  '/projects',
  '/contact',
  '/careers',
  '/blog',
  '/privacy',
  '/terms',
  '/dashboard',
];

// Solution pages
const SOLUTION_PAGES = [
  '/solutions/fire-safety',
  '/solutions/mining-iot',
  '/solutions/cold-chain',
  '/solutions/smart-villa',
  '/solutions/smart-apartment',
  '/solutions/smart-residence',
];

// Product pages
const PRODUCT_PAGES = [
  '/products/coffee',
];

// Fetch dynamic project slugs from backend
async function getProjectSlugs(): Promise<string[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';
    const response = await fetch(`${apiUrl}/api/projects`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      console.error('Failed to fetch projects for sitemap');
      return [];
    }

    const projects = await response.json();
    return projects.map((project: { slug: string }) => project.slug);
  } catch (error) {
    console.error('Error fetching projects for sitemap:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectSlugs = await getProjectSlugs();

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add static pages for each locale
  for (const locale of LOCALES) {
    // Homepage with highest priority
    sitemapEntries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: {
          tr: `${BASE_URL}/tr`,
          en: `${BASE_URL}/en`,
        },
      },
    });

    // Static pages
    for (const page of STATIC_PAGES) {
      if (page === '') continue; // Skip homepage, already added

      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: {
            tr: `${BASE_URL}/tr${page}`,
            en: `${BASE_URL}/en${page}`,
          },
        },
      });
    }

    // Solution pages - high priority for product visibility
    for (const page of SOLUTION_PAGES) {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
        alternates: {
          languages: {
            tr: `${BASE_URL}/tr${page}`,
            en: `${BASE_URL}/en${page}`,
          },
        },
      });
    }

    // Product pages
    for (const page of PRODUCT_PAGES) {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
        alternates: {
          languages: {
            tr: `${BASE_URL}/tr${page}`,
            en: `${BASE_URL}/en${page}`,
          },
        },
      });
    }

    // Dynamic project pages
    for (const slug of projectSlugs) {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}/projects/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            tr: `${BASE_URL}/tr/projects/${slug}`,
            en: `${BASE_URL}/en/projects/${slug}`,
          },
        },
      });
    }
  }

  return sitemapEntries;
}
