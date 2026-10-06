"use client";

import { AnimatePresence, motion } from "framer-motion";
import { User, Briefcase, Building2 } from "lucide-react";
import { PROFILES, useProfile } from "../context/ProfileContext";
import { playIntroSound } from "../context/sound";

const ICONS = { creator: User, agency: Briefcase, brand: Building2 };

export default function ProfileGate() {
  const { profile, setProfile, ready } = useProfile();
  const show = ready && !profile;

  const choose = (id) => {
    playIntroSound();
    setProfile(id);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black px-6"
        >
          <img src="/logo.png" alt="A&M Productions" className="mb-8 h-20 w-20 object-contain" />
          <h1 className="text-4xl text-white md:text-6xl">Who&apos;s watching?</h1>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {Object.values(PROFILES).map((p) => {
              const Icon = ICONS[p.id];
              return (
                <button key={p.id} onClick={() => choose(p.id)} className="group flex flex-col items-center gap-3">
                  <span
                    className={`flex h-28 w-28 items-center justify-center rounded-md ${p.color} border-2 border-transparent transition group-hover:scale-110 group-hover:border-white md:h-36 md:w-36`}
                  >
                    <Icon className="h-12 w-12 text-white md:h-16 md:w-16" />
                  </span>
                  <span className="text-lg text-gray-400 group-hover:text-white">{p.name}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
