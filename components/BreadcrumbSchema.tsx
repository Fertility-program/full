/**
 * JSON-LD Breadcrumb structured data for SEO.
 * Helps Google show breadcrumb navigation in search results.
 *
 * Usage:
 *   <BreadcrumbSchema items={[
 *     { name: "Home", url: "/" },
 *     { name: "Blog", url: "/blog" },
 *     { name: "Article Title" },
 *   ]} />
 */
export default function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url?: string }[];
}) {
  const base = "https://veronica-bloom.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url && { item: `${base}${item.url}` }),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
