import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aicoelektronik.com';
const LOCALES = ['tr', 'en'] as const;

// Revalidate sitemap every hour
export const revalidate = 3600;

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

/**
 * Fetch with retry and exponential backoff
 * Ensures build doesn't fail if backend is temporarily unavailable
 */
async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  maxRetries = 3,
  baseDelay = 1000
): Promise<Response | null> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        return response;
      }

      // Log non-ok responses but don't retry client errors (4xx)
      if (response.status >= 400 && response.status < 500) {
        console.warn(`[Sitemap] Backend returned ${response.status} for ${url}`);
        return null;
      }
    } catch (error) {
      const isLastAttempt = attempt === maxRetries - 1;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      if (isLastAttempt) {
        console.warn(`[Sitemap] Failed to fetch ${url} after ${maxRetries} attempts: ${errorMessage}`);
        return null;
      }

      // Exponential backoff: 1s, 2s, 4s
      const delay = baseDelay * Math.pow(2, attempt);
      // Retry with exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  return null;
}

/**
 * Fetch dynamic project slugs from backend with resilience
 * Returns empty array on failure to ensure build succeeds
 */
async function getProjectSlugs(): Promise<string[]> {
  // Use internal API URL for server-side fetching
  const apiUrl = process.env.INTERNAL_API_URL || 'http://localhost:8001';

  const response = await fetchWithRetry(
    `${apiUrl}/api/projects`,
    { next: { revalidate: 3600 } }
  );

  if (!response) {
    console.warn('[Sitemap] Backend unavailable, using static routes only');
    return [];
  }

  try {
    const projects = await response.json();
    return projects.map((project: { slug: string }) => project.slug);
  } catch (error) {
    console.warn('[Sitemap] Failed to parse projects response:', error);
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
