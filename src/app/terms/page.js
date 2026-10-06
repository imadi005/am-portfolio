import PolicyPage from "../../components/PolicyPage";

export const metadata = {
  title: "Terms of Service",
  description: "The terms that apply when you order video editing, scripts, thumbnails or channels from A&M Productions.",
};

const sections = [
  {
    h: "About us",
    p: [
      "A&M Productions (also trading as A&M Graphical Productions, \"A&M\", \"we\", \"us\") provides YouTube video editing, script writing, thumbnail design and related digital services, and offers monetized YouTube channels for sale, through amgproductions.studio.",
      "By placing an order or using this website you agree to these terms.",
    ],
  },
  {
    h: "Orders and how work starts",
    list: [
      "You place an order from our shop and pay through our payment partner, Cashfree.",
      "An order is confirmed once payment is successfully received.",
      "After payment, you send us your project brief (channel link, topic or script, references and deadline), normally on WhatsApp. Work begins once we have what we need from you.",
    ],
  },
  {
    h: "Your responsibilities",
    list: [
      "Give us accurate information and the materials we need, such as footage, scripts and references.",
      "Make sure you own or have the right to use everything you send us.",
      "Make sure your content follows the law and the policies of the platform you publish on. We may decline or stop work on content that is unlawful, hateful or abusive.",
    ],
  },
  {
    h: "Prices and payment",
    list: [
      "Prices in the shop are set in US dollars (USD).",
      "If you choose Indian rupees (INR), the amount is converted from USD at a live exchange rate when you check out. The exact amount you will be charged is shown before you pay.",
      "Payments are processed securely by Cashfree. We never see or store your card or bank details.",
      "Your bank or card issuer may apply its own fees or currency charges.",
    ],
  },
  {
    h: "Revisions",
    p: [
      "Each package includes the number of revisions listed on its page. Basic Burst includes 1 revision, Standard Storyboard and Advanced Artistry include 3, Premier Production includes 4, thumbnails include 2. Further revisions, or changes that go beyond the original brief, may be charged.",
    ],
  },
  {
    h: "Ownership and portfolio use",
    list: [
      "Once your order is paid in full, you own the final deliverables we create for you.",
      "We may show the finished work in our portfolio and marketing. Tell us in writing before delivery if you want a project kept private.",
      "Stock footage, music, fonts and templates used in your project remain subject to their own licences.",
    ],
  },
  {
    h: "YouTube channel plans (PLAN 50, 30, 10 and 0)",
    list: [
      "These are done-for-you channel management plans for creators, brands, businesses, agencies and sellers. The plan, setup fee, monthly fee, minimum term and deliverables you choose are set out on the Channel Plans page and confirmed in your contract and invoice.",
      "You own the channel. We act as manager with access you can remove at any time, and we work with analytics access so results can be reported transparently.",
      "Setup fee: 50% to start and 50% at launch. Monthly fee: paid in advance on the 1st of each month. Profit share: paid by the 10th of the month with an Analytics screenshot.",
      "Net channel profit means channel revenue (AdSense, sponsors, affiliate and, where relevant, attributed Amazon Brand Referral Bonus) minus direct costs such as tools and paid promotion. Our own fees are not deducted from it.",
      "Each plan has a minimum term (PLAN 50 and 30: 6 months, PLAN 10: 4 months, PLAN 0: 3 months). Monthly fees continue through the minimum term.",
      "You agree to provide the product access (if relevant), brand assets, review time and, for Amazon Attribution, Brand Registry access that the plan requires.",
      "We do not guarantee views, subscribers, YouTube Partner Program approval, sales or income. Amazon and YouTube programs and policies can change and apply to you as the channel owner.",
    ],
  },
  {
    h: "Monetized channels",
    p: [
      "Monetized channels are sold as described on the product page (monetization enabled, 1K subscribers, 4K watch hours, niche as stated). The handover is arranged with you directly after payment.",
      "We do not guarantee future views, income or that a platform will keep a channel monetized after handover. Platform rules apply to you as the new owner.",
    ],
  },
  {
    h: "No guarantee of results",
    p: [
      "Views, watch time, subscribers and revenue depend on many factors outside our control. The results shown on this site are examples from past work and individual results vary.",
    ],
  },
  {
    h: "Limitation of liability",
    p: [
      "To the fullest extent permitted by law, our total liability for any claim relating to an order is limited to the amount you paid for that order. We are not liable for indirect or consequential losses, such as lost profit or lost channel growth.",
    ],
  },
  {
    h: "Changes to these terms",
    p: [
      "We may update these terms from time to time. The date at the top of this page shows when they were last changed. Orders are governed by the terms in force when the order was placed.",
    ],
  },
  {
    h: "Governing law",
    p: ["These terms are governed by the laws of India."],
  },
];

export default function Page() {
  return (
    <PolicyPage
      title="Terms of Service"
      intro="Plain terms for working with us. Please read them before placing an order."
      sections={sections}
    />
  );
}
