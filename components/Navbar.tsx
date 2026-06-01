"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Magnetic from "./Magnetic";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cart, setCartOpen } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Locations", href: "/locations" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "glassmorphism py-4 shadow-lg shadow-black/20"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-10 h-10 bg-brand-orange rounded-xl shadow-md shadow-brand-orange/20 overflow-hidden">
              <Flame className="w-6 h-6 text-cream-lighter group-hover:scale-110 transition-transform duration-300" />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-brand-gold/0 via-brand-gold/40 to-brand-gold/0"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
              />
            </div>
            <div>
              <span className="font-serif font-black text-2xl tracking-tight text-cream-lighter group-hover:text-brand-gold transition-colors duration-300">
                GOLDEN <span className="text-brand-orange">GRILL</span>
              </span>
              <p className="text-[9px] uppercase tracking-[0.2em] font-semibold text-brand-gold/70 -mt-1 hidden sm:block">
                Beyond the Grid
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative py-2 font-medium text-sm uppercase tracking-wider text-cream-lighter/80 hover:text-brand-gold transition-colors duration-300"
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-orange"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Actions */}
          <div className="hidden md:flex items-center gap-6">
            {/* Dynamic Cart / Shopping Bag Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative group p-2 text-cream-lighter/80 hover:text-brand-gold transition-colors duration-300"
              aria-label="Open shopping cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand-orange text-cream-lighter font-sans font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <Magnetic>
              <Link
                href="/menu"
                className="relative inline-flex items-center justify-center px-6 py-2.5 bg-brand-orange text-cream-lighter font-sans text-xs uppercase tracking-wider font-bold rounded-full overflow-hidden group shadow-lg shadow-brand-orange/15 hover:shadow-brand-orange/25 transition-all duration-300"
              >
                <span className="relative z-10">Order Now</span>
                <span className="absolute inset-0 bg-brand-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
              </Link>
            </Magnetic>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-cream-lighter/85"
              aria-label="Open shopping cart"
            >
              <ShoppingBag className="w-5.5 h-5.5" />
              {totalItems > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-brand-orange text-cream-lighter font-sans font-bold text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-cream-lighter hover:text-brand-orange transition-colors duration-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[72px] z-40 bg-charcoal-darker/95 backdrop-blur-xl md:hidden px-6 pt-12 flex flex-col justify-between pb-12"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-2xl uppercase tracking-widest font-serif font-bold ${
                        isActive ? "text-brand-orange" : "text-cream-lighter/80"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-4"
            >
              <Link
                href="/menu"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-4 bg-brand-orange text-cream-lighter uppercase font-bold text-sm tracking-widest rounded-xl shadow-lg shadow-brand-orange/20"
              >
                Order Now
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
