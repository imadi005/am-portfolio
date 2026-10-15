"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertTriangle, Check, CheckCircle2, Clock, Copy, Printer, XCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/Footer";
import { useCart } from "../../../context/CartContext";

const WHATSAPP_NUMBER = "916299043460";

const STEPS = [
  { t: "Message us", d: "Tap the WhatsApp button. Your order details are already filled in." },
  { t: "Share your brief", d: "Send your channel, topic and references. One message is enough." },
  { t: "We roll camera", d: "We confirm a clear timeline, then start on your video." },
];

function money(amount, currency) {
  const n = Number(amount);
  if (!Number.isFinite(n)) return `${amount} ${currency || ""}`.trim();
  return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
    style: "currency",
    currency: currency || "USD",
    maximumFractionDigits: currency === "INR" ? 0 : 2,
  }).format(n);
}

function Shell({ children }) {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="relative overflow-hidden px-6 pb-16 pt-32 md:px-16">{children}</div>
      <Footer />
    </main>
  );
}

function StatusCard({ icon: Icon, tone, eyebrow, title, text, children }) {
  const tones = {
    amber: "text-amber-400 bg-amber-400/10 ring-amber-400/30",
    red: "text-[#e50914] bg-[#e50914]/10 ring-[#e50914]/30",
  };
  return (
    <Shell>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(229,9,20,0.2),transparent_70%)]" />
      <div className="relative mx-auto max-w-xl text-center">
        <span className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ring-1 ${tones[tone]}`}>
          <Icon size={38} />
        </span>
        <p className="mt-6 text-xs font-bold tracking-[0.35em] text-gray-400">{eyebrow}</p>
        <h1 className="mt-2 text-5xl md:text-6xl">{title}</h1>
        <p className="mt-3 text-gray-300">{text}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">{children}</div>
      </div>
    </Shell>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const { clearCart } = useCart();

  const [status, setStatus] = useState("checking");
  const [details, setDetails] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem("last-order") || "null");
      if (saved?.orderId === orderId) setLastOrder(saved);
    } catch {}
  }, [orderId]);

  const verify = useCallback(() => {
    if (!orderId) {
      setStatus("missing");
      return;
    }
    setStatus("checking");
    fetch(`/api/verify-order?order_id=${encodeURIComponent(orderId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setStatus("error");
          return;
        }
        setDetails(data);
        if (data.orderStatus === "PAID") {
          setStatus("paid");
          clearCart();
        } else {
          setStatus((data.orderStatus || "pending").toLowerCase());
        }
      })
      .catch(() => setStatus("error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  useEffect(() => {
    verify();
  }, [verify]);

  const items = lastOrder?.items || [];
  const isPlan = items.some((i) => i.startsWith("Channel Plan"));
  const firstName = lastOrder?.name?.trim().split(" ")[0];

  const briefBody = isPlan
    ? "Here are my details so we can plan the kick-off call:\n\nName:\nChannel / business / niche:\nChannel link (if any):\nBest time for a call (with time zone):"
    : "Here is my project brief:\n\nYouTube channel link:\nVideo topic / script:\nReference videos:\nDeadline:";
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi A&M Productions, I just paid for order ${orderId}${items.length ? ` (${items.join(", ")})` : ""}. ${briefBody}`
  )}`;
  const helpLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi A&M Productions, I need help with order ${orderId || "(no order id)"}.`
  )}`;

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  if (status === "checking") {
    return (
      <Shell>
        <div className="mx-auto max-w-xl text-center">
          <span className="mx-auto block h-14 w-14 animate-spin rounded-full border-2 border-white/15 border-t-[#e50914]" />
          <h1 className="mt-6 text-4xl">Confirming your payment</h1>
          <p className="mt-2 text-gray-400">This takes a few seconds. Please do not close this page.</p>
        </div>
      </Shell>
    );
  }

  if (status === "active" || status === "pending") {
    return (
      <StatusCard
        icon={Clock}
        tone="amber"
        eyebrow="PAYMENT PENDING"
        title="Still waiting on your bank"
        text={`Order ${orderId} has not been confirmed yet. If you completed the payment, it usually updates within a minute.`}
      >
        <button onClick={verify} className="rounded-md bg-white px-7 py-3 font-bold text-black transition hover:bg-white/80">
          Check again
        </button>
        <a
          href={helpLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-md bg-white/10 px-7 py-3 font-bold transition hover:bg-white/20"
        >
          <FaWhatsapp /> Need help?
        </a>
      </StatusCard>
    );
  }

  if (status === "expired" || status === "terminated" || status === "terminate_requested") {
    return (
      <StatusCard
        icon={XCircle}
        tone="red"
        eyebrow="PAYMENT NOT COMPLETED"
        title="That payment did not go through"
        text="No worries, nothing was charged for this order. Your cart is still saved, so you can try again."
      >
        <Link href="/cart" className="rounded-md bg-[#e50914] px-7 py-3 font-bold transition hover:bg-[#b20710]">
          Back to cart
        </Link>
        <a
          href={helpLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-md bg-white/10 px-7 py-3 font-bold transition hover:bg-white/20"
        >
          <FaWhatsapp /> Talk to us
        </a>
      </StatusCard>
    );
  }

  if (status !== "paid") {
    return (
      <StatusCard
        icon={AlertTriangle}
        tone="red"
        eyebrow="SOMETHING WENT WRONG"
        title="We could not verify your order"
        text="If money was deducted, do not worry. Message us with your order ID and we will sort it out right away."
      >
        <a
          href={helpLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-md bg-[#e50914] px-7 py-3 font-bold transition hover:bg-[#b20710]"
        >
          <FaWhatsapp /> Contact us
        </a>
        <button onClick={verify} className="rounded-md bg-white/10 px-7 py-3 font-bold transition hover:bg-white/20">
          Try again
        </button>
      </StatusCard>
    );
  }

  const paidAmount = money(details?.orderAmount, details?.orderCurrency);

  return (
    <Shell>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(16,185,129,0.18),transparent_70%)]" />
      <div className="film-grain" />
      <div className="relative mx-auto max-w-4xl">
        <div className="text-center">
          <motion.span
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 shadow-[0_0_60px_rgba(16,185,129,0.4)] ring-1 ring-emerald-400/40"
          >
            <CheckCircle2 size={52} />
          </motion.span>
          <p className="mt-6 text-xs font-bold tracking-[0.35em] text-emerald-400">PAYMENT CONFIRMED</p>
          <h1 className="mt-2 text-5xl uppercase md:text-8xl">{isPlan ? "The deal is on" : "Your ticket is booked"}</h1>
          <p className="mx-auto mt-3 max-w-xl text-gray-300">
            {firstName ? `Thank you, ${firstName}. ` : "Thank you. "}
            We have received your payment. One more step and we start.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mt-12 grid overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#2a0004] via-[#150002] to-[#0a0a0a] shadow-[0_0_60px_rgba(229,9,20,0.2)] md:grid-cols-[1fr_220px]"
        >
          <div className="relative p-6 md:p-8">
            <p className="text-[10px] font-bold tracking-[0.35em] text-[#e50914]">ORDER CONFIRMATION</p>

            {items.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {items.map((it) => (
                  <li key={it} className="flex gap-2 text-lg font-semibold">
                    <Check size={18} className="mt-1 flex-shrink-0 text-[#e50914]" />
                    {it.replace(/ x(\d+)$/, " × $1")}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-lg font-semibold">Your A&amp;M order</p>
            )}

            <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-[10px] font-bold tracking-widest text-gray-500">ORDER ID</dt>
                <dd className="mt-1 flex items-center gap-2">
                  <span className="break-all font-mono text-xs text-gray-200">{orderId}</span>
                  <button
                    onClick={copyId}
                    aria-label="Copy order ID"
                    className="flex-shrink-0 rounded-md bg-white/10 p-1.5 text-gray-300 transition hover:bg-white/20 hover:text-white"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold tracking-widest text-gray-500">DATE</dt>
                <dd className="mt-1 text-gray-200">
                  {(() => {
                    const d = details?.createdAt ? new Date(details.createdAt) : new Date();
                    return (Number.isNaN(d.getTime()) ? new Date() : d).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    });
                  })()}
                </dd>
              </div>
            </dl>
          </div>

          <div className="relative flex flex-col items-center justify-center gap-2 border-t border-dashed border-white/25 p-6 text-center md:border-l md:border-t-0">
            <span className="absolute -top-3 left-[-12px] h-6 w-6 rounded-full bg-black md:left-[-12px] md:top-[-12px]" />
            <span className="absolute -top-3 right-[-12px] h-6 w-6 rounded-full bg-black md:bottom-[-12px] md:left-[-12px] md:right-auto md:top-auto" />
            <p className="text-[10px] font-bold tracking-[0.4em] text-gray-500">AMOUNT PAID</p>
            <p className="text-5xl font-bold text-white">{paidAmount}</p>
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[10px] font-bold tracking-widest text-emerald-400">PAID</span>
            <p className="mt-2 text-[10px] font-bold tracking-[0.4em] text-gray-600">ADMIT ONE</p>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
            >
              <p className="text-5xl leading-none text-white/15 font-[family-name:var(--font-bebas)]">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1 text-2xl">{s.t}</h3>
              <p className="mt-1 text-sm text-gray-400">{s.d}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full max-w-md items-center justify-center gap-3 rounded-md bg-[#e50914] px-8 py-4 text-lg font-bold shadow-[0_0_35px_rgba(229,9,20,0.55)] transition hover:scale-[1.02] hover:bg-[#b20710]"
          >
            <FaWhatsapp size={24} /> Message us on WhatsApp
          </a>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
            <Link href="/" className="underline underline-offset-4 transition hover:text-white">
              Back to home
            </Link>
            <Link href="/shop" className="underline underline-offset-4 transition hover:text-white">
              Browse more services
            </Link>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 underline underline-offset-4 transition hover:text-white"
            >
              <Printer size={14} /> Save receipt
            </button>
          </div>
          <p className="text-xs text-gray-600">Keep your order ID handy. Questions? Reply on WhatsApp and we will help.</p>
        </div>
      </div>
    </Shell>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}
