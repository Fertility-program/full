/**
 * JSON-LD structured data for blog articles.
 * Helps Google show rich results (author, date, image).
 */
export default function BlogJsonLd({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  image,
}: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  const base = "https://veronica-bloom.vercel.app";
  const url = `${base}/blog/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: "Veronica Bloom",
      url: base,
    },
    publisher: {
      "@type": "Organization",
      name: "Veronica Bloom",
      logo: {
        "@type": "ImageObject",
        url: `${base}/icon-512.png`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image.startsWith("http") ? image : `${base}${image}`,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
