"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Plus, ShieldCheck, Mic, Target, BarChart3, Handshake, CreditCard } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Navbar from "../navbar";
import Footer from "../Footer";
import CurrencySwitcher from "../shop/CurrencySwitcher";
import { useCurrency } from "../../context/CurrencyContext";
import PlanCard, { useBuyNow } from "./PlanCard";
import { PLANS, COMPARE_ROWS, planWhatsApp } from "../../data/plans";

const WHATSAPP_GENERAL = `https://wa.me/916299043460?text=${encodeURIComponent(
  "Hi A&M Productions, I'd like to know more about your done-for-you YouTube channel plans."
)}`;
const WHATSAPP_PARTNER = `https://wa.me/916299043460?text=${encodeURIComponent(
  "Hi A&M Productions, I run an agency and I'm interested in your white-label YouTube channel partnership."
)}`;

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6 },
};

function Eyebrow({ children }) {
  return <p className="text-xs font-bold tracking-[0.35em] text-[#e50914]">{children}</p>;
}

const WHY = [
  {
    icon: Target,
    title: "Results you can track",
    text: "Every video carries tracked links, so you see the views, leads and sales it drives. Brand-registered Amazon sellers can also earn an Amazon Brand Referral Bonus (around 10% on average, varies by category) through Attribution links.",
  },
  {
    icon: BarChart3,
    title: "People search before they buy",
    text: "Buyers look up 'best X', tutorials and reviews on YouTube before they decide. Demos, comparisons, explainers and expert content meet them right there.",
  },
  {
    icon: ShieldCheck,
    title: "An asset you own",
    text: "The channel is yours. It keeps compounding and can earn from ads, sponsors and affiliate links once it qualifies for the YouTube Partner Program.",
  },
];

const CHANNEL_TYPES = [
  {
    tag: "TYPE A",
    title: "Brand channel",
    who: "For product brands, online sellers (Amazon included) and local or online businesses",
    points: [
      "Product demos, comparisons, buyer FAQs and use-case tutorials",
      "Sales and leads tracked through links (Amazon Attribution and Brand Referral Bonus for brand-registered Amazon sellers)",
      "AdSense and sponsors later on",
    ],
  },
  {
    tag: "TYPE B",
    title: "Authority channel",
    who: "For creators, coaches, experts and agencies who want audience and leads",
    points: [
      "Expert breakdowns, tutorials, case studies, teardowns and weekly news in your niche",
      "The face of the channel records the voice or on-camera segments",
      "AdSense, sponsors, affiliate income and leads for your own business",
    ],
  },
];

const SETUP = [
  "Niche and competitor research (10 comparable channels, gap analysis)",
  "Channel strategy document and 90-day content calendar",
  "Channel name, banner, logo and brand kit, trailer and About page",
  "Channel set up with you as owner and us as manager",
  "Tracking links and a performance sheet (Amazon Attribution tags for brand-registered Amazon sellers)",
  "First 3-4 videos produced before launch day",
  "Analytics access set up for transparent reporting",
];

const MONTHLY = [
  "Scripted long videos and Shorts, with real human voice or on-camera footage",
  "Editing, subtitles, thumbnails, titles, descriptions, tags and scheduling",
  "Community posts and comment moderation guidance",
  "Performance report: views, watch time, CTR, subscribers and tracked traffic, leads or sales",
  "Ongoing strategy adjustments",
];

const CLIENT_PROVIDES = [
  "Product access or samples, if you sell a product",
  "Brand assets",
  "About 1 hour per week of review time",
  "Brand Registry access, only for Amazon Attribution",
];

const TIMELINE = [
  { day: "Day 0", title: "Kick-off", text: "Call, plan chosen, contract and invoice." },
  { day: "Day 1-3", title: "Intake and research", text: "Client intake form, niche and competitor research, asset collection." },
  { day: "Day 4-5", title: "Strategy approved", text: "Strategy and 90-day content calendar signed off." },
  { day: "Day 5-7", title: "Channel built", text: "Channel set up, branding and trailer ready." },
  { day: "Day 7-14", title: "First videos", text: "The first 3-4 videos produced, approved and scheduled." },
  { day: "Day 14", title: "Launch", text: "Launch day, with your first report scheduled." },
];

const ROADMAP = [
  {
    m: "Month 1",
    t: "Foundation",
    d: "Channel trailer and brand story, product demo and unboxing, the problem it solves, comparison against the top competitor, buyer FAQ, use-case tutorial and customer-review breakdown.",
  },
  {
    m: "Month 2",
    t: "Expand",
    d: "More use cases, search-intent videos like 'best X for Y', behind-the-scenes sourcing and quality, plus your first series (for example '7 mistakes buying X').",
  },
  {
    m: "Month 3",
    t: "Double down",
    d: "Lean into the 2-3 videos that outperform on retention and CTR, and add tracked links to every description.",
  },
];

const SCENARIOS = [
  { name: "Conservative", note: "Small niche, about 8 long videos a month", m3: "2-8k views/mo, 100-400 subs", m6: "15-40k views/mo, about 1k subs", m12: "50-100k views/mo" },
  { name: "Base", note: "12 long videos a month, good packaging", m3: "10-30k views/mo, 400-1k subs", m6: "50-120k views/mo, 2-4k subs", m12: "150-350k views/mo" },
  { name: "Strong", note: "One or more winner videos", m3: "40-100k views/mo", m6: "200-500k views/mo", m12: "500k-1M+ views/mo" },
];

const FAQS = [
  {
    q: "Who owns the channel?",
    a: "You do. The channel is created under your account and we work as a manager with access you can remove at any time.",
  },
  {
    q: "What does 'profit share' mean?",
    a: "Net channel profit is channel revenue (AdSense, sponsors, affiliate, and attributed Amazon Brand Referral Bonus where relevant) minus direct costs such as tools and paid promotion. Our own fees are not deducted from it. The share is paid monthly with Analytics access as proof.",
  },
  {
    q: "Is it faceless or AI-generated?",
    a: "No. YouTube demonetises mass-produced, repetitive or template-based content, with or without AI. Every plan uses a real human voice or face, or real product footage, with original scripts and varied formats.",
  },
  {
    q: "Is this only for Amazon sellers?",
    a: "No. It is for anyone who wants a complete done-for-you channel: creators, brands, businesses, coaches, agencies and sellers. Amazon Attribution tracking is an extra for brand-registered Amazon sellers.",
  },
  {
    q: "Which channel type should I choose?",
    a: "Type A (Brand channel) suits product brands and online sellers. Type B (Authority channel) suits creators, coaches, experts and agencies who want to grow an audience and generate leads. We help you decide on the first call.",
  },
  {
    q: "How soon will the channel earn from ads?",
    a: "Ads need 1,000 subscribers and 4,000 public watch hours (or 3 million Shorts views in 90 days). New channels take time, and profit share usually only starts after month 4-6. Your reliable cost is the setup and monthly fee, so choose a plan with that in mind.",
  },
  {
    q: "Do you guarantee income?",
    a: "No. We report views, subscribers, watch time and tracked traffic, and we never promise income.",
  },
];

function CompareTable() {
  const { format } = useCurrency();
  const buyNow = useBuyNow();
  return (
    <div className="mt-10 overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-white/[0.04]">
            <th className="sticky left-0 z-10 bg-[#0d0d0d] px-4 py-3 text-xs font-semibold tracking-widest text-gray-400">WHAT YOU GET</th>
            {PLANS.map((p) => (
              <th key={p.id} className="px-4 py-3">
                <span className="block text-xs tracking-widest text-gray-400">PLAN {p.code}</span>
                <span className="text-xl font-[family-name:var(--font-bebas)]">{p.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARE_ROWS.map((row) => (
            <tr key={row.key} className="border-t border-white/10 hover:bg-white/[0.03]">
              <td className="sticky left-0 z-10 bg-[#0d0d0d] px-4 py-3 font-medium text-gray-300">{row.label}</td>
              {PLANS.map((p) => {
                const v = p[row.key];
                return (
                  <td key={p.id} className="px-4 py-3 text-gray-200">
                    {row.money ? format(v) : row.suffix ? `${v}${row.suffix}` : v}
                  </td>
                );
              })}
            </tr>
          ))}
          <tr className="border-t border-white/10 bg-white/[0.03]">
            <td className="sticky left-0 z-10 bg-[#0d0d0d] px-4 py-4 font-medium text-gray-300">Get started</td>
            {PLANS.map((p) => (
              <td key={p.id} className="px-4 py-4">
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => buyNow(p)}
                    className="rounded-md bg-[#e50914] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#b20710]"
                  >
                    Buy now
                  </button>
                  <a
                    href={planWhatsApp(p)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md bg-white px-4 py-2 text-center text-sm font-bold text-black transition hover:bg-white/80"
                  >
                    Book a call
                  </a>
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {FAQS.map((f, i) => {
        const on = open === i;
        return (
          <div key={f.q}>
            <button
              onClick={() => setOpen(on ? -1 : i)}
              aria-expanded={on}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className={`text-lg font-semibold ${on ? "text-white" : "text-gray-300"}`}>{f.q}</span>
              <motion.span animate={{ rotate: on ? 45 : 0 }} className="flex-shrink-0 text-[#e50914]">
                <Plus />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pr-8 leading-relaxed text-gray-400">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function PlansPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-20 pt-36 md:px-16 md:pt-44">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,rgba(229,9,20,0.35),transparent_65%)]" />
        <div className="film-grain" />
        <div className="relative mx-auto max-w-6xl">
          <Eyebrow>THE COMPLETE DONE-FOR-YOU DEAL</Eyebrow>
          <h1 className="mt-3 max-w-4xl text-6xl uppercase md:text-8xl">
            Your complete <span className="text-[#e50914]">YouTube channel</span>, built and run for you
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-300 md:text-xl">
            For creators, brands, businesses, coaches, agencies and sellers who want it all handled: strategy, scripts, editing,
            thumbnails, upload and growth. Run by us, owned by you. Four plans: the more profit share we take, the less you pay.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#plans" className="rounded-md bg-white px-8 py-3 text-lg font-bold text-black transition hover:bg-white/80">
              Compare plans
            </a>
            <a
              href={WHATSAPP_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md bg-white/10 px-8 py-3 text-lg font-bold backdrop-blur transition hover:bg-white/20"
            >
              <FaWhatsapp /> Talk to us
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-400">
            {["You own the channel", "Human voice or face, never faceless templates", "Tracked links and reporting", "Plans from $1,200 setup"].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <Check size={16} className="text-[#e50914]" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="px-6 py-16 md:px-16">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>WHY YOUTUBE</Eyebrow>
          <h2 className="mt-1 text-5xl md:text-7xl">Why a YouTube channel pays off</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {WHY.map((w, i) => (
              <motion.div
                key={w.title}
                {...fade}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-6"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e50914] shadow-[0_0_25px_rgba(229,9,20,0.5)]">
                  <w.icon size={22} />
                </span>
                <h3 className="mt-4 text-2xl">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{w.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Channel types */}
      <section className="px-6 py-16 md:px-16">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>TWO CHANNEL TYPES</Eyebrow>
          <h2 className="mt-1 text-5xl md:text-7xl">Built for how you sell</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {CHANNEL_TYPES.map((c, i) => (
              <motion.div
                key={c.tag}
                {...fade}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a0003] to-black p-7"
              >
                <span className="rounded bg-[#e50914] px-3 py-1 text-xs font-bold tracking-widest">{c.tag}</span>
                <h3 className="mt-4 text-4xl">{c.title}</h3>
                <p className="mt-1 text-sm text-gray-400">{c.who}</p>
                <ul className="mt-5 space-y-2 text-gray-300">
                  {c.points.map((p) => (
                    <li key={p} className="flex gap-2 text-sm">
                      <Check size={16} className="mt-0.5 flex-shrink-0 text-[#e50914]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Our recommendation: Type A for product brands and sellers, Type B for creators, coaches and agency owners.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="scroll-mt-20 px-6 py-16 md:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>THE FOUR PLANS</Eyebrow>
              <h2 className="mt-1 text-5xl md:text-7xl">Choose your split</h2>
              <p className="mt-2 max-w-2xl text-gray-400">
                PLAN 50 costs the least upfront and we keep half the upside. PLAN 0 costs the most and you keep everything.
              </p>
            </div>
            <CurrencySwitcher />
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PLANS.map((p, i) => (
              <PlanCard key={p.id} plan={p} index={i} />
            ))}
          </div>

          <p className="mt-4 text-xs text-gray-500">
            Prices are set in USD. INR is an approximate live conversion for reference. Profit share is calculated on net channel profit: channel revenue
            (AdSense, sponsors, affiliate, and attributed Amazon Brand Referral Bonus where relevant) minus direct costs such as tools and paid promotion. Our fees are not
            deducted from it. You own the channel and we have manager access. The share is paid monthly with Analytics access as proof.
          </p>

          <h3 className="mt-14 text-4xl">Full comparison</h3>
          <CompareTable />
          <p className="mt-3 text-xs text-gray-500 md:hidden">Swipe the table sideways to see every plan.</p>
        </div>
      </section>

      {/* What's included */}
      <section className="px-6 py-16 md:px-16">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>EVERY PLAN INCLUDES</Eyebrow>
          <h2 className="mt-1 text-5xl md:text-7xl">The full workflow</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { t: "One-time setup", sub: "Weeks 1-2", items: SETUP },
              { t: "Every month", sub: "Counts depend on plan", items: MONTHLY },
              { t: "What we need from you", sub: "To keep things moving", items: CLIENT_PROVIDES },
            ].map((b) => (
              <div key={b.t} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-xs tracking-widest text-gray-500">{b.sub.toUpperCase()}</p>
                <h3 className="mt-1 text-3xl">{b.t}</h3>
                <ul className="mt-4 space-y-3 text-sm text-gray-300">
                  {b.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <Check size={16} className="mt-0.5 flex-shrink-0 text-[#e50914]" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 py-16 md:px-16">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>ONBOARDING</Eyebrow>
          <h2 className="mt-1 text-5xl md:text-7xl">Live in 14 days</h2>
          <ol className="relative mt-10 space-y-6 border-l border-[#e50914]/40 pl-8">
            {TIMELINE.map((t, i) => (
              <motion.li key={t.day} {...fade} transition={{ duration: 0.5, delay: i * 0.06 }} className="relative">
                <span className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#e50914] shadow-[0_0_15px_rgba(229,9,20,0.7)]" />
                <p className="text-xs font-bold tracking-widest text-[#e50914]">{t.day.toUpperCase()}</p>
                <h3 className="text-2xl">{t.title}</h3>
                <p className="text-sm text-gray-400">{t.text}</p>
              </motion.li>
            ))}
          </ol>
          <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.03] p-6 text-sm text-gray-300">
            <p className="font-semibold text-white">Payment terms</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-[#e50914]">
              <li>Setup fee: 50% to start and 50% at launch.</li>
              <li>Monthly fee: in advance, on the 1st of each month.</li>
              <li>Profit share: paid by the 10th of the month, with an Analytics screenshot.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="px-6 py-16 md:px-16">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>THE FIRST 90 DAYS</Eyebrow>
          <h2 className="mt-1 text-5xl md:text-7xl">What we publish</h2>
          <p className="mt-2 text-gray-400">An example roadmap for a Brand channel. The Authority channel runs on weekly formats such as expert breakdowns, case studies, teardowns and news.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {ROADMAP.map((r, i) => (
              <motion.div key={r.m} {...fade} transition={{ duration: 0.6, delay: i * 0.1 }} className="rounded-xl border border-white/10 bg-gradient-to-b from-[#1a0003] to-black p-6">
                <p className="text-5xl text-white/15 font-[family-name:var(--font-bebas)]">{String(i + 1).padStart(2, "0")}</p>
                <p className="text-xs font-bold tracking-widest text-[#e50914]">{r.m.toUpperCase()}</p>
                <h3 className="text-3xl">{r.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{r.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Policy-safe promise */}
      <section className="px-6 py-16 md:px-16">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-[#e50914]/30 bg-gradient-to-r from-[#1a0003] via-black to-black p-8 md:p-12">
          <div className="flex items-start gap-5">
            <span className="hidden h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#e50914] md:flex">
              <Mic />
            </span>
            <div>
              <Eyebrow>BUILT AROUND YOUTUBE&apos;S RULES</Eyebrow>
              <h2 className="mt-1 text-4xl md:text-6xl">No faceless content factories</h2>
              <p className="mt-3 max-w-3xl leading-relaxed text-gray-300">
                YouTube demonetises mass-produced, repetitive or template-based content, with or without AI. So every plan uses a real human voice or
                face, or real product footage, with original scripts and varied formats. It protects your channel&apos;s monetisation, and it is simply
                better content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expectations */}
      <section className="px-6 py-16 md:px-16">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>HONEST EXPECTATIONS</Eyebrow>
          <h2 className="mt-1 text-5xl md:text-7xl">What growth can look like</h2>
          <p className="mt-2 max-w-3xl text-gray-400">
            New channels take time. These are planning estimates, not guarantees, and they are not income promises. We report views, subscribers,
            watch time and tracked traffic.
          </p>
          <div className="mt-8 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-white/[0.04] text-xs tracking-widest text-gray-400">
                  <th className="px-4 py-3">SCENARIO</th>
                  <th className="px-4 py-3">MONTH 3</th>
                  <th className="px-4 py-3">MONTH 6</th>
                  <th className="px-4 py-3">MONTH 12</th>
                </tr>
              </thead>
              <tbody>
                {SCENARIOS.map((s) => (
                  <tr key={s.name} className="border-t border-white/10">
                    <td className="px-4 py-3">
                      <span className="block text-xl font-[family-name:var(--font-bebas)]">{s.name}</span>
                      <span className="text-xs text-gray-500">{s.note}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{s.m3}</td>
                    <td className="px-4 py-3 text-gray-300">{s.m6}</td>
                    <td className="px-4 py-3 text-gray-300">{s.m12}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            YouTube ads need 1,000 subscribers and 4,000 public watch hours (or 3 million Shorts views in 90 days). For brands and businesses, the bigger value is
            usually tracked traffic, leads and sales and the trust a channel builds, measured in the tracking sheet rather than AdSense.
          </p>
        </div>
      </section>

      {/* Guarantee */}
      <section className="px-6 py-16 md:px-16">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>OUR GUARANTEE</Eyebrow>
          <h2 className="mt-1 text-5xl md:text-7xl">Fair, and in writing</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              { t: "Setup fee", d: "Refundable if your channel is not launched within 21 days because of A&M." },
              { t: "Monthly fees", d: "If we miss the agreed number of videos, you get the last 2 months of fees back." },
              { t: "Profit share (Plans 50 and 30)", d: "No profit share is charged until the channel makes a net profit." },
            ].map((g) => (
              <div key={g.t} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <ShieldCheck className="text-[#e50914]" />
                <h3 className="mt-3 text-2xl">{g.t}</h3>
                <p className="mt-1 text-sm text-gray-400">{g.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-500">See the full terms in our Refund &amp; Cancellation Policy and Terms of Service.</p>
        </div>
      </section>

      {/* Partners */}
      <section className="px-6 py-16 md:px-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 rounded-2xl border border-white/10 bg-gradient-to-br from-[#220004] via-black to-black p-8 md:grid-cols-[1fr_auto] md:p-12">
          <div>
            <Eyebrow>FOR AGENCIES &amp; PARTNERS</Eyebrow>
            <h2 className="mt-1 flex items-center gap-3 text-4xl md:text-6xl">
              <Handshake className="hidden text-[#e50914] md:block" size={44} /> Bring us your clients
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-gray-300">
              Your clients can add a done-for-you YouTube channel in four price and profit-share options. You bring the client and we handle research,
              scripts, editing, upload and growth, as your white-label partner. Partners earn a referral share for every client they introduce.
            </p>
          </div>
          <a
            href={WHATSAPP_PARTNER}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-md bg-[#e50914] px-8 py-4 text-lg font-bold shadow-[0_0_30px_rgba(229,9,20,0.5)] transition hover:bg-[#b20710]"
          >
            <FaWhatsapp size={22} /> Become a partner
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16 md:px-16">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.4fr]">
          <div>
            <Eyebrow>GOOD TO KNOW</Eyebrow>
            <h2 className="mt-1 text-5xl md:text-7xl">Questions, Answered</h2>
          </div>
          <Faq />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-6 py-24 text-center">
        <div className="absolute inset-0 bg-gradient-to-t from-[#e50914]/40 via-black to-black" />
        <div className="relative mx-auto max-w-3xl">
          <h2 className="text-5xl uppercase md:text-8xl">Ready to launch your channel?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-300">Book a call and we will help you pick the plan that fits your brand and budget.</p>
          <a
            href={WHATSAPP_GENERAL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 rounded-md bg-[#e50914] px-9 py-4 text-lg font-bold shadow-[0_0_30px_rgba(229,9,20,0.6)] transition hover:scale-105 hover:bg-[#b20710]"
          >
            <FaWhatsapp size={24} /> Book a call on WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
