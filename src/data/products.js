// Product catalog for A&M Productions store.
// Prices are in USD (source of truth). INR is derived at runtime via live FX rate.
export const CATEGORIES = {
  CASHCOW: "Cashcow Packages",
  INDIVIDUAL: "Individual Services",
};

export const products = [
  {
    id: "basic-burst",
    category: CATEGORIES.CASHCOW,
    name: "Basic Burst",
    priceUSD: 29.99,
    duration: "4 - 5 mins",
    features: [
      "Standard Editing (Stock Transitions, Basic Texts, Single BGM)",
      "Multiple Voice Options",
      "High Quality Thumbnail",
      "1 Revision",
    ],
  },
  {
    id: "standard-storyboard",
    category: CATEGORIES.CASHCOW,
    name: "Standard Storyboard",
    priceUSD: 44.99,
    duration: "4 - 5 mins",
    features: [
      "Advanced Editing (Advanced AE Effects + SFX + Dynamic Music)",
      "Multiple Voice Options",
      "High Quality Thumbnail",
      "3 Revisions",
    ],
  },
  {
    id: "advanced-artistry",
    category: CATEGORIES.CASHCOW,
    name: "Advanced Artistry",
    priceUSD: 59.99,
    duration: "8 - 10 mins",
    features: [
      "Standard Editing (Stock + Adv. Transitions, Template Texts, Single BGM)",
      "Multiple Voice Options",
      "High Quality Thumbnail",
      "3 Revisions",
    ],
  },
  {
    id: "premier-production",
    category: CATEGORIES.CASHCOW,
    name: "Premier Production",
    priceUSD: 96.99,
    duration: "8 - 10 mins",
    features: [
      "Advanced Editing (Advanced AE Effects + SFX + Dynamic Music)",
      "Multiple Voice Options",
      "High Quality Thumbnail",
      "4 Revisions",
    ],
  },
  {
    id: "script-writing",
    category: CATEGORIES.INDIVIDUAL,
    name: "Script Writing",
    priceUSD: 10.0,
    duration: null,
    features: ["Up to 1600 Words", "AI Free", "Plagiarism Free", "Any Niche"],
  },
  {
    id: "video-edit-4-5-standard",
    category: CATEGORIES.INDIVIDUAL,
    name: "Video Editing - 4-5 Min (Standard)",
    priceUSD: 10.0,
    duration: "4 - 5 mins",
    features: ["Standard Editing (Stock + Adv. Transitions, Template Texts, Single BGM)"],
  },
  {
    id: "video-edit-4-5-advanced",
    category: CATEGORIES.INDIVIDUAL,
    name: "Video Editing - 4-5 Min (Advanced)",
    priceUSD: 25.0,
    duration: "4 - 5 mins",
    features: ["Advanced Editing (Advanced AE Effects + SFX + Dynamic Music)"],
  },
  {
    id: "video-edit-8-10-standard",
    category: CATEGORIES.INDIVIDUAL,
    name: "Video Editing - 8-10 Min (Standard)",
    priceUSD: 30.0,
    duration: "8 - 10 mins",
    features: ["Standard Editing (Stock + Adv. Transitions, Template Texts, Single BGM)"],
  },
  {
    id: "video-edit-8-10-advanced",
    category: CATEGORIES.INDIVIDUAL,
    name: "Video Editing - 8-10 Min (Advanced)",
    priceUSD: 60.0,
    duration: "8 - 10 mins",
    features: ["Advanced Editing (Advanced AE Effects + SFX + Dynamic Music)"],
  },
  {
    id: "thumbnails",
    category: CATEGORIES.INDIVIDUAL,
    name: "Thumbnails",
    priceUSD: 5.0,
    duration: null,
    features: ["High Quality", "Photoshop Made", "2 Revisions", "Any Niche"],
  },
  {
    id: "monetized-channel",
    category: CATEGORIES.INDIVIDUAL,
    name: "Monetized Channel",
    priceUSD: 250.0,
    duration: null,
    features: [
      "Monetization Enabled",
      "1K Subscribers",
      "4K Watch Hours",
      "Random Niche",
    ],
  },
];

export function getProductById(id) {
  return products.find((p) => p.id === id);
}
