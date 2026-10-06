"use client";

import { SpeedInsights } from "@vercel/speed-insights/next"
import dynamic from 'next/dynamic';


// --- Eagerly Loaded Components (Visible on initial load) ---
// These load instantly because they are "above the fold".
import Navbar from "../components/navbar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";

// --- Lazy Loaded Components (Loaded only when needed) ---
// We use next/dynamic to load these components only when they are about to be scrolled into view.
// This makes the initial page load much faster.

const LoadingPlaceholder = () => (
  <div className="w-full bg-black px-6 py-10 md:px-16">
    <div className="skeleton h-8 w-56 rounded" />
    <div className="mt-6 flex gap-4 overflow-hidden">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="skeleton h-[293px] w-[220px] flex-shrink-0 rounded-lg" />
      ))}
    </div>
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

const OurStorySection = dynamic(() => import("../components/OurStorySection"), {
  loading: () => <LoadingPlaceholder />,
});

const TeamSection = dynamic(() => import("../components/TeamSection"), {
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


      <TopEditsSection />

      <NichesSection />

      <ShowreelSection />

      <ClientResultsSection />

      <OurStorySection />

      <TeamSection />

      <Footer />

      {/* 🩸 Footer Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </main>
  );
}