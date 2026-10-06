export default function robots() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://www.amgproductions.studio";
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/cart", "/checkout"] },
    sitemap: `${base}/sitemap.xml`,
  };
}
