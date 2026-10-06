"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP = `https://wa.me/916299043460?text=${encodeURIComponent(
  "Hello A&M Productions, I'm ready to order! I saw your website and want to get my edit made."
)}`;

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 text-center text-white">
      <div className="absolute inset-0 bg-gradient-to-t from-[#e50914]/40 via-black to-black" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(229,9,20,0.4),transparent)]" />
      <div className="film-grain" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <img src="/logo.png" alt="" className="mx-auto h-16 w-16 object-contain" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mt-6 text-5xl uppercase md:text-8xl"
        >
          Your next video starts here
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-4 max-w-xl text-lg text-gray-300 md:text-xl"
        >
          Tell us about your channel and we will take it from there.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-md bg-[#e50914] px-9 py-4 text-lg font-bold text-white shadow-[0_0_30px_rgba(229,9,20,0.6)] transition hover:scale-105 hover:bg-[#b20710]"
          >
            <FaWhatsapp size={24} /> Start on WhatsApp
          </a>
          <Link
            href="/shop"
            className="rounded-md bg-white/10 px-9 py-4 text-lg font-bold text-white backdrop-blur transition hover:bg-white/20"
          >
            Browse Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
