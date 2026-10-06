import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-12 text-gray-400 md:px-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="A&M Productions" className="h-12 w-12 object-contain" />
          <span className="text-sm font-bold tracking-[0.3em] text-white">A&amp;M PRODUCTIONS</span>
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/shop" className="hover:text-white">Shop</Link>
          <Link href="/cart" className="hover:text-white">Cart</Link>
          <a href="https://wa.me/916299043460" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            Contact
          </a>
        </nav>
        <p className="text-xs">© {new Date().getFullYear()} A&amp;M Productions. All rights reserved.</p>
      </div>
    </footer>
  );
}
