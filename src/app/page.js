"use client";

import { SpeedInsights } from "@vercel/speed-insights/next";
import dynamic from "next/dynamic";

import Navbar from "../components/navbar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";

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

const lazy = (loader) => dynamic(loader, { loading: () => <LoadingPlaceholder /> });

const ShowreelSection = lazy(() => import("../components/ShowreelSection"));
const TopTenChart = lazy(() => import("../components/TopTenChart"));
const NichesSection = lazy(() => import("../components/NichesSection"));
const HowItWorks = lazy(() => import("../components/HowItWorks"));
const PlansTeaser = lazy(() => import("../components/PlansTeaser"));
const ClientResultsSection = lazy(() => import("../components/ClientResultsSection"));
const OurStorySection = lazy(() => import("../components/OurStorySection"));
const TeamSection = lazy(() => import("../components/TeamSection"));
const FaqSection = lazy(() => import("../components/FaqSection"));
const CtaSection = lazy(() => import("../components/CtaSection"));

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <Navbar />
      <HeroSection />
      <ShowreelSection />
      <TopTenChart />
      <NichesSection />
      <HowItWorks />
      <PlansTeaser />
      <ClientResultsSection />
      <OurStorySection />
      <TeamSection />
      <FaqSection />
      <CtaSection />
      <Footer />
      <SpeedInsights />
    </main>
  );
}
