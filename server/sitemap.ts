import { getProjects } from "./db";
import type { Domain } from "@shared/i18n";

/**
 * Generate sitemap XML for SEO
 */
export async function generateSitemap(domain: Domain, baseUrl: string): Promise<string> {
  const projects = await getProjects(domain, 1000);

  const urls: Array<{ loc: string; lastmod: string; priority: number; changefreq: string }> = [
    {
      loc: baseUrl,
      lastmod: new Date().toISOString().split("T")[0],
      priority: 1.0,
      changefreq: "weekly",
    },
    {
      loc: `${baseUrl}/agency`,
      lastmod: new Date().toISOString().split("T")[0],
      priority: 0.8,
      changefreq: "monthly",
    },
    {
      loc: `${baseUrl}/offers/communication`,
      lastmod: new Date().toISOString().split("T")[0],
      priority: 0.8,
      changefreq: "monthly",
    },
    {
      loc: `${baseUrl}/offers/events`,
      lastmod: new Date().toISOString().split("T")[0],
      priority: 0.8,
      changefreq: "monthly",
    },
    {
      loc: `${baseUrl}/offers/immersion`,
      lastmod: new Date().toISOString().split("T")[0],
      priority: 0.8,
      changefreq: "monthly",
    },
    {
      loc: `${baseUrl}/portfolio`,
      lastmod: new Date().toISOString().split("T")[0],
      priority: 0.8,
      changefreq: "weekly",
    },
    {
      loc: `${baseUrl}/contact`,
      lastmod: new Date().toISOString().split("T")[0],
      priority: 0.7,
      changefreq: "monthly",
    },
  ];

  // Add project URLs
  projects.forEach((project) => {
    urls.push({
      loc: `${baseUrl}/portfolio/${project.id}`,
      lastmod: project.updatedAt.toISOString().split("T")[0],
      priority: 0.6,
      changefreq: "monthly",
    });
  });

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return xml;
}

/**
 * Escape XML special characters
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
