export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://www.amgproductions.studio";
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/shop`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/refund-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/delivery-policy`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
