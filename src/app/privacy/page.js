import PolicyPage from "../../components/PolicyPage";

export const metadata = {
  title: "Privacy Policy",
  description: "What information A&M Productions collects, why, and how we protect it.",
};

const sections = [
  {
    h: "What we collect",
    list: [
      "Order details: your name, email address and phone number, which you enter at checkout, and what you ordered.",
      "Messages you send us, for example your project brief on WhatsApp.",
      "Basic site usage and performance data, collected through Vercel Speed Insights.",
      "Information stored on your own device: your cart, chosen currency and My List are saved in your browser's local storage and never leave your device.",
    ],
  },
  {
    h: "What we do not collect",
    p: [
      "We do not see or store your card, UPI or bank details. Payments are handled entirely by Cashfree on its own secure pages.",
    ],
  },
  {
    h: "How we use your information",
    list: [
      "To process your order, confirm payment and deliver your work.",
      "To contact you about your order or answer your questions.",
      "To keep the website working and improve its speed.",
    ],
  },
  {
    h: "Who we share it with",
    list: [
      "Cashfree, our payment processor, receives the details needed to complete your payment and is responsible for them under its own privacy policy.",
      "Our hosting and performance providers (such as Vercel) process technical data needed to run the site.",
      "We do not sell your personal information.",
    ],
  },
  {
    h: "Third-party content",
    p: [
      "Videos on this site are played from YouTube. When you play a video, YouTube (Google) may set cookies and collect data under its own privacy policy.",
    ],
  },
  {
    h: "How long we keep it",
    p: [
      "We keep order information for as long as needed to deliver your work, handle revisions and support, and meet legal and accounting requirements.",
    ],
  },
  {
    h: "Your choices",
    list: [
      "You can ask us to correct or delete your personal information by messaging us on WhatsApp. We will do so unless we are required to keep it by law.",
      "You can clear your cart, currency and My List at any time by clearing your browser data.",
    ],
  },
  {
    h: "Children",
    p: ["Our services are not directed at children under 13 and we do not knowingly collect their information."],
  },
  {
    h: "Changes",
    p: ["We may update this policy. The date at the top shows when it was last changed."],
  },
];

export default function Page() {
  return (
    <PolicyPage
      title="Privacy Policy"
      intro="We collect only what we need to take your order and do your work. Here is exactly what that is."
      sections={sections}
    />
  );
}
