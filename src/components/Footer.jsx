import Link from "next/link";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Showreel", href: "/#showreel" },
      { label: "Browse Niches", href: "/#niches" },
      { label: "Shop", href: "/shop" },
      { label: "My List", href: "/my-list" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/#faq" },
      { label: "Delivery Policy", href: "/delivery-policy" },
      { label: "Cart", href: "/cart" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Refund & Cancellation", href: "/refund-policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 pb-10 pt-14 text-gray-400 md:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-[1.4fr_repeat(3,1fr)] md:gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="A&M Productions" className="h-14 w-14 object-contain" />
              <span className="text-sm font-bold tracking-[0.3em] text-white">A&amp;M PRODUCTIONS</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Cinematic YouTube editing, scripts, thumbnails and channels. Crafted frame by frame since 2021.
            </p>
            <a
              href="https://wa.me/916299043460"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-white underline decoration-[#e50914] underline-offset-4 hover:text-[#e50914]"
            >
              Chat on WhatsApp
            </a>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xl tracking-wide text-white">{col.title}</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="transition hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs md:flex-row">
          <p>© {new Date().getFullYear()} A&amp;M Productions. All rights reserved.</p>
          <p>Secure payments by Cashfree · Pay in USD or INR</p>
        </div>
      </div>
    </footer>
  );
}
