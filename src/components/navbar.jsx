"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useMyList } from "../context/ListContext";
import { useProfile } from "../context/ProfileContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { ids } = useMyList();
  const { profile, setProfile } = useProfile();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
  }, [mobileMenuOpen]);

  const handleScroll = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = pathname === "/" ? document.querySelector(id) : null;
    if (element) element.scrollIntoView({ behavior: "smooth" });
    else router.push(`/${id}`);
  };

  const whatsappNumber = "916299043460";
  const defaultMessage = "Hello A&M Productions, I'm interested in your services and would like to know more.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Top 10", href: "#top10" },
    { name: "Browse", href: "#niches" },
    { name: "Results", href: "#results" },
    { name: "Our Story", href: "#story" },
    { name: "Team", href: "#team" },
    { name: "Shop", href: "/shop", isPage: true },
    { name: `My List${ids.length ? ` (${ids.length})` : ""}`, href: "/my-list", isPage: true },
    { name: "Contact", href: whatsappLink, isExternal: true },
  ];

  const renderLink = (item, className) => (
    <a
      href={item.href}
      onClick={
        !item.isExternal && !item.isPage
          ? (e) => handleScroll(e, item.href)
          : () => setMobileMenuOpen(false)
      }
      target={item.isExternal ? "_blank" : "_self"}
      rel={item.isExternal ? "noopener noreferrer" : ""}
      className={className}
    >
      {item.name}
    </a>
  );

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-10 py-3 transition-all duration-500 ${
          scrolled ? "bg-black/90 backdrop-blur-md" : "bg-gradient-to-b from-black/80 to-transparent"
        }`}
      >
        <div className="flex items-center gap-8">
          <Link href="/" aria-label="A&M Productions home" className="cursor-pointer">
            <img src="/logo.png" alt="A&M Productions" className="h-12 w-12 object-contain" />
          </Link>
          <ul className="hidden lg:flex space-x-6 text-sm font-semibold text-white">
            {navItems.map((item) => (
              <li key={item.name}>
                {renderLink(item, "text-gray-200 hover:text-gray-400 cursor-pointer transition-colors")}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={() => window.dispatchEvent(new Event("open-search"))}
            aria-label="Search"
            className="text-white"
          >
            <Search className="h-6 w-6 hover:text-[#e50914] transition-colors" />
          </button>

          <Link href="/cart" aria-label="Cart" className="relative">
            <ShoppingCart className="text-white h-6 w-6 hover:text-[#e50914] transition-colors" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#e50914] text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>

          {profile && (
            <button
              onClick={() => setProfile(null)}
              title="Switch profile"
              aria-label="Switch profile"
              className={`hidden sm:flex h-8 w-8 items-center justify-center rounded ${profile.color} text-sm font-bold text-white`}
            >
              {profile.name[0]}
            </button>
          )}

          <div className="lg:hidden">
            <button onClick={() => setMobileMenuOpen(true)} aria-label="Menu">
              <Menu className="text-white h-7 w-7" />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center"
          >
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6" aria-label="Close menu">
              <X className="text-white h-8 w-8" />
            </button>
            <img src="/logo.png" alt="" className="mb-8 h-16 w-16 object-contain" />
            <ul className="flex flex-col space-y-6 text-center">
              {navItems.map((item) => (
                <li key={item.name}>
                  {renderLink(item, "text-4xl text-white hover:text-[#e50914] transition-colors font-[family-name:var(--font-bebas)]")}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
