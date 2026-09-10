"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart } from "lucide-react"; // We'll use icons for the menu button
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body from scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileMenuOpen]);

  const handleScroll = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false); // Close menu on link click
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const whatsappNumber = "916299043460";
  const defaultMessage =
    "Hello A&M Productions, I'm interested in your services and would like to know more.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    defaultMessage
  )}`;

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Results", href: "#results" },
    { name: "Watch Our Videos", href: "#niches" },
    { name: "Shop", href: "/shop", isPage: true },
    { name: "Contact", href: whatsappLink, isExternal: true },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-10 py-4 transition-all duration-500 ${
          scrolled
            ? "bg-black/80 backdrop-blur-md"
            : "bg-gradient-to-b from-black/80 to-transparent"
        }`}
      >
        <a href="#home" onClick={(e) => handleScroll(e, "#home")} className="cursor-pointer">
          <h1 className="text-3xl font-bold text-[#e50914] tracking-wider">A&M</h1>
        </a>

        {/* Desktop Menu (hidden on mobile) */}
        <ul className="hidden md:flex space-x-8 text-sm font-semibold text-white">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                onClick={!item.isExternal && !item.isPage ? (e) => handleScroll(e, item.href) : () => setMobileMenuOpen(false)}
                target={item.isExternal ? "_blank" : "_self"}
                rel={item.isExternal ? "noopener noreferrer" : ""}
                className="hover:text-[#e50914] cursor-pointer transition-colors"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative">
            <ShoppingCart className="text-white h-6 w-6 hover:text-[#e50914] transition-colors" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#e50914] text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Hamburger Icon (visible on mobile) */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(true)}>
              <Menu className="text-white h-7 w-7" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6"
            >
              <X className="text-white h-8 w-8" />
            </button>
            <ul className="flex flex-col space-y-10 text-center">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={!item.isExternal && !item.isPage ? (e) => handleScroll(e, item.href) : () => setMobileMenuOpen(false)}
                    target={item.isExternal ? "_blank" : "_self"}
                    rel={item.isExternal ? "noopener noreferrer" : ""}
                    className="text-3xl font-semibold text-white hover:text-[#e50914] transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

