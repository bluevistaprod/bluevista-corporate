/**
 * SEO utilities for metadata and schema generation
 */

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "business.business";
}

/**
 * Generate meta tags for a page
 */
export function generateMetaTags(meta: SEOMetadata): Record<string, string> {
  return {
    "og:title": meta.title,
    "og:description": meta.description,
    "og:type": meta.type || "website",
    ...(meta.image && { "og:image": meta.image }),
    ...(meta.url && { "og:url": meta.url }),
    "twitter:title": meta.title,
    "twitter:description": meta.description,
    ...(meta.image && { "twitter:image": meta.image }),
  };
}

/**
 * Generate Organization schema.org markup
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Blue Vista Productions",
    url: "https://www.bluevistaprod.com",
    logo: "https://www.bluevistaprod.com/logo.png",
    description:
      "Agence de communication, événementiel et immersion depuis plus de 20 ans",
    sameAs: [
      "https://www.facebook.com/bluevista",
      "https://www.linkedin.com/company/bluevista",
      "https://www.instagram.com/bluevista",
      "https://www.youtube.com/@bluevista",
    ],
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "8 rue Jean Élysée Dupuy",
        addressLocality: "Champagne-au-Mont-d'Or",
        postalCode: "69410",
        addressCountry: "FR",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "92 Avenue Victor Hugo",
        addressLocality: "Boulogne-Billancourt",
        postalCode: "92100",
        addressCountry: "FR",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Bd Georges-Favon 43",
        addressLocality: "Genève",
        postalCode: "1204",
        addressCountry: "CH",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "contact@bluevistaprod.com",
    },
  };
}

/**
 * Generate LocalBusiness schema.org markup
 */
export function generateLocalBusinessSchema(city: string, phone: string, address: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Blue Vista Productions - ${city}`,
    image: "https://www.bluevistaprod.com/logo.png",
    description: "Agence de communication, événementiel et immersion",
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: city,
      addressCountry: city === "Genève" ? "CH" : "FR",
    },
    telephone: phone,
    url: "https://www.bluevistaprod.com",
  };
}

/**
 * Generate Service schema.org markup
 */
export function generateServiceSchema(
  name: string,
  description: string,
  provider: string = "Blue Vista Productions"
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: provider,
      url: "https://www.bluevistaprod.com",
    },
  };
}

/**
 * Generate BreadcrumbList schema.org markup
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
