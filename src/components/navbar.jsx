"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // We'll use icons for the menu button

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                onClick={!item.isExternal ? (e) => handleScroll(e, item.href) : undefined}
                target={item.isExternal ? "_blank" : "_self"}
                rel={item.isExternal ? "noopener noreferrer" : ""}
                className="hover:text-[#e50914] cursor-pointer transition-colors"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        
        {/* Hamburger Icon (visible on mobile) */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(true)}>
            <Menu className="text-white h-7 w-7" />
          </button>
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
                    onClick={!item.isExternal ? (e) => handleScroll(e, item.href) : undefined}
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

