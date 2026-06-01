"use client";

import Link from "next/link";
import { Flame, ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Welcome to the Grill Club! Special recipe drops coming to your inbox.");
  };

  return (
    <footer className="relative bg-charcoal-darker border-t border-cream/5 pt-20 pb-16 overflow-hidden">
      {/* Decorative Golden Grill Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-brand-orange/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-brand-orange rounded-lg flex items-center justify-center shadow-md shadow-brand-orange/10">
                <Flame className="w-5.5 h-5.5 text-cream-lighter" />
              </div>
              <span className="font-serif font-black text-xl tracking-tight text-cream-lighter">
                GOLDEN <span className="text-brand-orange">GRILL</span>
              </span>
            </Link>
            <p className="text-sm text-cream-lighter/60 max-w-sm leading-relaxed">
              We smash, flame, and sear premium butcher cuts &quot;Beyond the Grid.&quot; Handcrafted quality you can taste, wood-fired daily.
            </p>
            <div className="flex items-center gap-4 text-cream-lighter/50">
              <Link href="#" className="hover:text-brand-gold transition-colors duration-200" aria-label="Instagram">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              <Link href="#" className="hover:text-brand-gold transition-colors duration-200" aria-label="Facebook">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link href="#" className="hover:text-brand-gold transition-colors duration-200" aria-label="Twitter">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-serif font-bold text-base text-cream-lighter">Explore</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-cream-lighter/60">
              <li>
                <Link href="/" className="hover:text-brand-orange transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-brand-orange transition-colors duration-200">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-brand-orange transition-colors duration-200">
                  Locations
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-brand-orange transition-colors duration-200">
                  Special Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours & Contact */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-serif font-bold text-base text-cream-lighter">Grill Hours</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-cream-lighter/60">
              <li className="flex justify-between">
                <span>Mon – Thu:</span>
                <span className="text-brand-gold">11:00 AM – 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Fri – Sat:</span>
                <span className="text-brand-gold">11:00 AM – 12:00 AM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-brand-gold">12:00 PM – 9:00 PM</span>
              </li>
              <li className="pt-2 text-xs border-t border-cream/5 mt-2">
                Hotline: <span className="text-cream-lighter font-semibold">1-800-SMASH-IT</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-serif font-bold text-base text-cream-lighter">Join the Grill Club</h4>
            <p className="text-xs text-cream-lighter/50">
              Unlock secret recipes, event drop notifications, and 15% off your first online order.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2.5">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-charcoal border border-cream/10 rounded-xl text-sm text-cream-lighter placeholder-cream-lighter/35 focus:outline-none focus:border-brand-orange/60 transition-colors duration-200"
                />
                <button
                  type="submit"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-cream-lighter hover:text-brand-orange transition-colors duration-200"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-cream/5 text-xs text-cream-lighter/40">
          <p>© {currentYear} Golden Grill. All rights reserved by NUVIX.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-cream-lighter transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-cream-lighter transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>

      {/* Massive Premium Backdrop Typography (Absolute behind content) */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none select-none overflow-hidden z-0">
        <h2 className="font-serif font-black text-center text-[12vw] leading-none text-stroke-gold select-none tracking-tighter opacity-10 translate-y-[20%]">
          GOLDEN GRILL
        </h2>
      </div>
    </footer>
  );
}
