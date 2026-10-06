export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://www.amgproductions.studio";
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/shop`, changeFrequency: "weekly", priority: 0.8 },
  ];
}
