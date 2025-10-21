"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TOP_EDITS } from "../data/topEdits";
import EditModal from "./EditModal";
import { FaWhatsapp } from "react-icons/fa";

export default function TopEditsSection() {
  const railRef = useRef(null);
  const rafRef = useRef(null);
  const hoverRef = useRef(false);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  // --- WHATSAPP LINK SETUP ---
  const whatsappNumber = "916299043460"; // Your number without '+'
  const defaultMessage =
    "Hello A&M Productions, I'm ready to order! I saw your website and want to get my viral edit made.";
  
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    defaultMessage
  )}`;
  // --- END SETUP ---

  const duplicatedEdits = [...TOP_EDITS, ...TOP_EDITS];

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let halfwayPoint = rail.scrollWidth / 2;

    const tick = () => {
      if (halfwayPoint > 0 && !hoverRef.current) {
        rail.scrollLeft += 0.8;
        if (rail.scrollLeft >= halfwayPoint) {
          rail.scrollLeft = 0;
        }
      } else {
        // Recalculate if it was 0 initially
        halfwayPoint = rail.scrollWidth / 2;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    // We use a React Fragment to return two separate sections
    <>
      <section className="relative w-full bg-black py-20 text-white overflow-hidden">
        {/* Header */}
        <div className="mx-auto mb-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold md:text-6xl"
          >
            Top 10 Edits 🎞️
          </motion.h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-400">
            A&M’s most cinematic, high-impact edits of the week — ranked by magic.
          </p>
        </div>

        {/* Slider */}
        <div
          ref={railRef}
          onMouseEnter={() => (hoverRef.current = true)}
          onMouseLeave={() => (hoverRef.current = false)}
          className="flex gap-12 px-20 overflow-x-auto no-scrollbar"
        >
          {duplicatedEdits.map((edit, index) => (
            <motion.div
              key={`${edit.rank}-${index}`}
              initial={{ boxShadow: "0px 0px 0px rgba(255,0,0,0)" }}
              whileHover={{
                scale: 0.8,
                boxShadow: "0px 0px 40px rgba(255,0,0,0.7)",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={() => {
                setSelected(edit);
                setOpen(true);
              }}
              className="relative flex-shrink-0 cursor-pointer overflow-visible mx-10 rounded-xl"
              style={{ width: "260px", aspectRatio: "3 / 4" }}
            >
              <span
                className={`absolute top-1/2 left-0 -translate-y-1/2 text-[11rem] font-extrabold leading-none text-transparent bg-clip-text z-40 select-none pointer-events-none opacity-40 ${
                  edit.rank === 1
                    ? "bg-gradient-to-b from-yellow-300 to-red-600"
                    : edit.rank === 2
                    ? "bg-gradient-to-b from-gray-300 to-gray-600"
                    : edit.rank === 3
                    ? "bg-gradient-to-b from-orange-300 to-orange-600"
                    : "bg-gradient-to-b from-gray-400 to-gray-600"
                }`}
                style={{
                  transform: "translateX(-70%) translateY(-50%)",
                }}
              >
                {edit.rank}
              </span>
              <div className="relative z-20 h-full w-full overflow-hidden rounded-xl transition-all duration-300">
                <img
                  src={edit.cover}
                  alt={edit.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <EditModal edit={selected} open={open} onClose={() => setOpen(false)} />
      </section>

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
