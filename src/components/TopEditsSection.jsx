"use client";

import { motion } from "framer-motion";
import TopTenChart from "./TopTenChart";
import { FaWhatsapp } from "react-icons/fa";

export default function TopEditsSection() {
  // --- WHATSAPP LINK SETUP ---
  const whatsappNumber = "916299043460"; // Your number without '+'
  const defaultMessage =
    "Hello A&M Productions, I'm ready to order! I saw your website and want to get my viral edit made.";
  
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    defaultMessage
  )}`;
  // --- END SETUP ---

  return (
    // We use a React Fragment to return two separate sections
    <>
      <TopTenChart />

      {/* --- NEW CLICKBAIT CTA SECTION --- */}
      <section className="relative bg-black text-white py-24 px-8 text-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#e50914]/40 via-black to-black z-0"></div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(229,9,20,0.4),transparent)]"></div>
        
        <div className="relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold tracking-wide"
          >
            Ready To Go Viral?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-300"
          >
            You're just <span className="text-[#e50914] font-bold">one click away</span> from dominating the algorithm. Stop scrolling and start scaling.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.4, type: 'spring', stiffness: 100 }}
          >
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 inline-flex items-center gap-4 px-10 py-5 rounded-full bg-[#e50914] text-white text-xl font-bold btn-glow hover:bg-[#b20710] hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(229,9,20,0.6)]"
            >
              <FaWhatsapp size={28} />
              Click Now To Get Started
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
