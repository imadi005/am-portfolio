import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "../context/CurrencyContext";
import { CartProvider } from "../context/CartContext";
import { ListProvider } from "../context/ListContext";
import { ProfileProvider } from "../context/ProfileContext";
import AppChrome from "../components/AppChrome";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://www.amgproductions.studio"),
  title: { default: "A&M Productions | Cinematic YouTube Edits", template: "%s | A&M Productions" },
  openGraph: {
    type: "website",
    siteName: "A&M Productions",
    title: "A&M Productions | Cinematic YouTube Edits",
    images: [{ url: "/logo.png", width: 500, height: 500 }],
  },
  twitter: { card: "summary", title: "A&M Productions", images: ["/logo.png"] },
  description: "A&M Productions specializes in producing high-impact, viral video edits that dominate the algorithm. Turn your content into cinematic magic.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebas.variable} antialiased pb-14 md:pb-0`}
      >
        <CurrencyProvider>
          <CartProvider>
            <ListProvider>
              <ProfileProvider>
                {children}
                <AppChrome />
              </ProfileProvider>
            </ListProvider>
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
