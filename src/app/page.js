"use client";

import { SpeedInsights } from "@vercel/speed-insights/next"
import dynamic from 'next/dynamic';


// --- Eagerly Loaded Components (Visible on initial load) ---
// These load instantly because they are "above the fold".
import Navbar from "../components/navbar";
import HeroSection from "../components/HeroSection";
import CinematicBridge from "../components/CinematicBridge";

// --- Lazy Loaded Components (Loaded only when needed) ---
// We use next/dynamic to load these components only when they are about to be scrolled into view.
// This makes the initial page load much faster.

const LoadingPlaceholder = () => (
  <div className="w-full h-screen flex items-center justify-center bg-black">
    <p className="text-gray-500">Loading Section...</p>
  </div>
);

const ShowreelSection = dynamic(() => import("../components/ShowreelSection"), {
  loading: () => <LoadingPlaceholder />,
});

const ClientResultsSection = dynamic(() => import("../components/ClientResultsSection"), {
  loading: () => <LoadingPlaceholder />,
});

const NichesSection = dynamic(() => import("../components/NichesSection"), {
  loading: () => <LoadingPlaceholder />,
});

const TopEditsSection = dynamic(() => import("../components/TopEditsSection"), {
  loading: () => <LoadingPlaceholder />,
});


export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      {/* 🧭 Navbar (Eager) */}
      <Navbar />

      {/* 🎥 Hero Section (Eager) */}
      <HeroSection />

      {/* 🌌 Cinematic Bridge (Eager) */}
      <CinematicBridge />

      {/* --- The rest of the sections are now lazy-loaded --- */}

      {/* 🔴 Showreel Section (Lazy) */}
      <ShowreelSection />

      {/* 🚀 Client Results Section (Lazy) */}
      <ClientResultsSection />
      
      {/* 🎨 Niches Section (Lazy) */}
      <NichesSection />
      
      {/* ✨ Top Edits Section (Lazy) */}
      <TopEditsSection />

      {/* 🩸 Footer Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </main>
  );
}