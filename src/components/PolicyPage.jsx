import Link from "next/link";
import Navbar from "./navbar";
import Footer from "./Footer";

export default function PolicyPage({ eyebrow = "LEGAL", title, updated = "October 2026", intro, sections }) {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="relative overflow-hidden px-6 pb-10 pt-32 md:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(229,9,20,0.25),transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl">
          <p className="text-xs font-bold tracking-[0.35em] text-[#e50914]">{eyebrow}</p>
          <h1 className="mt-2 text-5xl md:text-7xl">{title}</h1>
          <p className="mt-3 text-sm text-gray-500">Last updated: {updated}</p>
          {intro && <p className="mt-6 text-lg leading-relaxed text-gray-300">{intro}</p>}
        </div>
      </div>

      <div className="px-6 pb-24 md:px-16">
        <div className="mx-auto max-w-3xl space-y-10">
          {sections.map((s, i) => (
            <section key={s.h}>
              <h2 className="text-3xl md:text-4xl">
                <span className="mr-3 text-[#e50914]">{String(i + 1).padStart(2, "0")}</span>
                {s.h}
              </h2>
              {s.p?.map((para) => (
                <p key={para.slice(0, 30)} className="mt-3 leading-relaxed text-gray-300">
                  {para}
                </p>
              ))}
              {s.list && (
                <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-300 marker:text-[#e50914]">
                  {s.list.map((li) => (
                    <li key={li.slice(0, 30)} className="leading-relaxed">
                      {li}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <p className="border-t border-white/10 pt-8 text-sm text-gray-500">
            Questions about this page? Reach us on{" "}
            <a
              href="https://wa.me/916299043460"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#e50914] underline"
            >
              WhatsApp
            </a>{" "}
            or visit our{" "}
            <Link href="/contact" className="text-[#e50914] underline">
              contact page
            </Link>
            .
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
