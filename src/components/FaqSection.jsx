"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "What do I get with each package?",
    a: "Every Cashcow package includes the edit, a high quality thumbnail, multiple voice options and a set number of revisions: Basic Burst has 1, Standard Storyboard and Advanced Artistry have 3, and Premier Production has 4. Packages cover videos of 4-5 or 8-10 minutes.",
  },
  {
    q: "What is the difference between Standard and Advanced editing?",
    a: "Standard editing uses stock and advanced transitions, template texts and a single background track. Advanced editing adds advanced After Effects work, sound effects and dynamic music across the full video.",
  },
  {
    q: "Can I buy just one thing, like a thumbnail or a script?",
    a: "Yes. Thumbnails, scripts (up to 1600 words, AI free and plagiarism free), and video edits are all sold individually in the shop.",
  },
  {
    q: "How do I pay, and which currencies do you accept?",
    a: "You can pay in USD or INR. The INR price is converted from USD at the live exchange rate when you check out, and payment is processed securely by Cashfree.",
  },
  {
    q: "What happens after I pay?",
    a: "You land on a confirmation page with a button that opens WhatsApp with your order details already filled in. Send us your channel link, topic and references and we start from there.",
  },
  {
    q: "How long does delivery take?",
    a: "It depends on the plan and the length of the video. Message us on WhatsApp with what you need and we will give you a clear timeline before you order.",
  },
  {
    q: "What is a monetized channel?",
    a: "A channel that has already met YouTube's requirements (1K subscribers and 4K watch hours) with monetization enabled, in a random niche, ready for you to take over.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative w-full bg-black px-6 py-20 text-white md:px-16 scroll-mt-16">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-xs font-bold tracking-[0.35em] text-[#e50914]">GOOD TO KNOW</p>
          <h2 className="mt-1 text-5xl md:text-7xl">Questions, Answered</h2>
          <p className="mt-3 max-w-sm text-gray-400">
            Still unsure? Message us on WhatsApp and we will reply with a clear answer.
          </p>
        </div>

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
                  <span className={`text-lg font-semibold transition ${on ? "text-white" : "text-gray-300"}`}>{f.q}</span>
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
      </div>
    </section>
  );
}
