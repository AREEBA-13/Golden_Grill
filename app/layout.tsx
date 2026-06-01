import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";

// Premium Typography setup
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// Premium SEO Meta Tags
export const metadata: Metadata = {
  title: "Golden Grill | Beyond the Grid Gourmet Smash Burgers",
  description:
    "Quality you can taste. Golden Grill serves premium, high-energy wood-fired burgers, crispy sides, and legendary drinks. Experience the night-grill flavor today.",
  keywords: ["Golden Grill", "Gourmet Burgers", "Smash Burgers", "Premium Food", "Wood fired", "Appetizing eats"],
  authors: [{ name: "Golden Grill Team" }],
  openGraph: {
    title: "Golden Grill | Quality You Can Taste",
    description: "Handcrafted gourmet wood-fired smash burgers & crispy sides seared to absolute perfection.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${jakarta.variable} font-sans bg-charcoal-darker text-cream-lighter antialiased min-h-screen flex flex-col justify-between`}
      >
        {/* Global state syncer for Cart, Checkout, and Drawer actions */}
        <CartProvider>
          {/* Glowing Tactile Cursor */}
          <CustomCursor />

          {/* Slide-out Cart Drawer Overlay */}
          <CartDrawer />

          {/* Global Transparent Navbar */}
          <Navbar />

          {/* Dynamic Pages */}
          <main className="flex-grow pt-[72px] md:pt-[88px]">{children}</main>

          {/* Premium Typographic Footer */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
