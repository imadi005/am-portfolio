import PolicyPage from "../../components/PolicyPage";

export const metadata = {
  title: "Delivery Policy",
  description: "How and when A&M Productions delivers your digital work.",
};

const sections = [
  {
    h: "Everything is digital",
    p: [
      "All of our services are digital. Nothing is shipped physically, so there are no shipping charges or delivery addresses.",
    ],
  },
  {
    h: "How we deliver",
    list: [
      "Finished videos, scripts and thumbnails are delivered as a download link or file shared with you on WhatsApp.",
      "Revisions are delivered the same way.",
      "Monetized channels are handed over directly with you after payment, with the steps explained on WhatsApp.",
    ],
  },
  {
    h: "When to expect it",
    p: [
      "Delivery time depends on the plan and the length of the video. We confirm a clear timeline with you on WhatsApp once we have your brief, and we tell you straight away if anything affects it.",
      "The clock starts when we have everything we need from you: the brief, footage, scripts and references.",
    ],
  },
  {
    h: "If something is delayed or missing",
    p: [
      "If you have paid and not heard from us, or a delivery link does not work, message us on WhatsApp with your order ID and we will fix it promptly.",
    ],
  },
];

export default function Page() {
  return (
    <PolicyPage
      title="Delivery Policy"
      intro="Digital work, delivered by link. Here is how it reaches you."
      sections={sections}
    />
  );
}
