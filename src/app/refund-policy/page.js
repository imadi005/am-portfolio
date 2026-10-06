import PolicyPage from "../../components/PolicyPage";

export const metadata = {
  title: "Refund & Cancellation Policy",
  description: "When you can cancel an order or get a refund from A&M Productions.",
};

const sections = [
  {
    h: "Cancelling an order",
    list: [
      "You can cancel for a full refund any time before we have started work on your order.",
      "Work is considered started once we have received your brief and begun editing, writing or designing.",
    ],
  },
  {
    h: "After work has started",
    p: [
      "Because our services are custom digital work, payments are not refundable once work has started. Instead, every plan includes revisions so we can get the result right, and we will work with you through them.",
      "If the delivered work clearly does not match the brief you gave us and revisions cannot resolve it, contact us and we will review your case. Where appropriate we may offer a full or partial refund.",
    ],
  },
  {
    h: "Monetized channels",
    p: [
      "If a monetized channel is not as described on the product page (monetization status, subscriber count or watch hours) at the time of handover, we will refund you in full.",
    ],
  },
  {
    h: "YouTube channel plans (PLAN 50, 30, 10 and 0)",
    list: [
      "Setup fee: refundable if your channel is not launched within 21 days because of A&M.",
      "Monthly fees: if we miss the agreed number of delivered videos for a month, we refund the last 2 months of fees.",
      "Profit guarantee (PLAN 50 and PLAN 30 only): no profit share is charged until the channel makes a net profit.",
      "Because channel profit usually takes several months to appear, these plans are not covered by the general rule above that payments are non-refundable once work has started. The terms in this section apply to them instead.",
    ],
  },
  {
    h: "Failed or duplicate payments",
    p: [
      "If your payment fails but money was deducted, or you were charged twice for the same order, the amount is returned to the original payment method. Banks usually take 5-7 working days to show it.",
    ],
  },
  {
    h: "How to ask for a refund",
    list: [
      "Message us on WhatsApp with your order ID (shown on the confirmation page) within 7 days of payment.",
      "Tell us briefly what went wrong.",
      "We reply with a decision and, if a refund is approved, process it to your original payment method. Refunds in INR or USD are returned in the currency you paid in.",
    ],
  },
];

export default function Page() {
  return (
    <PolicyPage
      title="Refund & Cancellation"
      intro="Fair and simple: cancel before we start for a full refund, and we stand behind the result after."
      sections={sections}
    />
  );
}
