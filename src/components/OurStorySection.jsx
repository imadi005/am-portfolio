"use client";
import { motion } from "framer-motion";

const EPISODES = [
  {
    ep: "01",
    title: "The Collective",
    text: "A&M Graphical Productions began as a group of YouTube specialists obsessed with one thing: making creators' content impossible to scroll past.",
  },
  {
    ep: "02",
    title: "1,000+ Collaborations",
    text: "Since 2021, we have worked with more than a thousand creators and industry professionals across every niche. Every video we make is unique and tailored to the channel it is for.",
  },
  {
    ep: "03",
    title: "170+ Channels Managed",
    text: "From first upload to monetization, we run the edit, the thumbnail and the strategy behind channels that now reach audiences worldwide.",
  },
  {
    ep: "04",
    title: "5,000+ Videos. $1M+ Revenue.",
    text: "Every frame is crafted for retention. The result: millions of views and real revenue for the creators we partner with.",
  },
];

export default function OurStorySection() {
  return (
    <section id="story" className="relative w-full bg-black px-6 py-24 text-white md:px-16 scroll-mt-16">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-bold tracking-[0.35em] text-[#e50914]">THE A&amp;M STORY</p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-2 text-4xl font-black uppercase md:text-6xl"
        >
          A Legacy, Frame by Frame
        </motion.h2>
        <p className="mt-4 max-w-2xl text-lg text-gray-300">
          We are not a freelancer. We are a studio that treats every YouTube video like a feature
          release.
        </p>

        <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {EPISODES.map((e, i) => (
            <motion.div
              key={e.ep}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex items-start gap-6 py-6 transition-colors hover:bg-white/5 md:gap-10 md:px-4"
            >
              <span className="w-12 text-4xl font-black text-gray-600 md:w-16 md:text-5xl">{e.ep}</span>
              <div>
                <h3 className="text-xl font-bold md:text-2xl">{e.title}</h3>
                <p className="mt-1 max-w-2xl text-gray-400">{e.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
