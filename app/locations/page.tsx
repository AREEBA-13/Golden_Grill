"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Flame, Navigation, ExternalLink, Sparkles } from "lucide-react";
import Magnetic from "@/components/Magnetic";

interface Location {
  id: number;
  name: string;
  address: string;
  phone: string;
  hours: string;
  openHour: number;  // 24h format opening
  closeHour: number; // 24h format closing
  atmosphere: string;
  image: string;
  mapLink: string;
  isFlagship?: boolean;
}

const LOCATIONS_DATA: Location[] = [
  {
    id: 1,
    name: "The Foundry (Flagship)",
    address: "742 Sizzler Blvd, Downtown Core",
    phone: "(555) 489-0112",
    hours: "11:00 AM – 11:00 PM",
    openHour: 11,
    closeHour: 23,
    atmosphere: "Raw copper-plated seared bars, central wood fire smoke dome, warm ambient steel press decor.",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=600&auto=format&fit=crop",
    mapLink: "https://maps.google.com",
    isFlagship: true,
  },
  {
    id: 2,
    name: "The Coal Yards",
    address: "109 Brickstone Ave, Industrial District",
    phone: "(555) 302-8819",
    hours: "11:00 AM – 10:00 PM",
    openHour: 11,
    closeHour: 22,
    atmosphere: "Restored concrete locomotive workshop frame, massive overhead gridiron lights, community beer pairings.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop",
    mapLink: "https://maps.google.com",
  },
  {
    id: 3,
    name: "The Neon Arch",
    address: "88 Waterfront Pkwy, East Harbors",
    phone: "(555) 914-7220",
    hours: "12:00 PM – 12:00 AM",
    openHour: 12,
    closeHour: 24,
    atmosphere: "Sweeping waterfront boardwalk deck, custom golden neon facade trims, outdoor fire pits.",
    image: "https://images.unsplash.com/photo-1485686531765-ba63b07845a7?q=80&w=600&auto=format&fit=crop",
    mapLink: "https://maps.google.com",
  },
];

export default function Locations() {
  const [currentHour, setCurrentHour] = useState<number>(12);

  useEffect(() => {
    // Dynamic local time hour check
    const hour = new Date().getHours();
    setCurrentHour(hour);
  }, []);

  const checkIsOpen = (open: number, close: number) => {
    if (close === 24) {
      return currentHour >= open && currentHour < 24;
    }
    return currentHour >= open && currentHour < close;
  };

  return (
    <div className="bg-[#0C0C0C] min-h-screen py-16 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative Oranges & Neons */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-gold/5 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 1. LOCATIONS MAP PIN HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Column: Minimal Sticky text card */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-[10px] uppercase tracking-widest font-black w-max mb-4"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Night Grill Atmosphere</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-serif font-black text-5xl sm:text-7xl text-cream tracking-tight leading-none uppercase"
            >
              SEARING <span className="text-brand-orange">GRIDS</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xs sm:text-sm text-cream-darker/60 font-light mt-4 leading-relaxed max-w-sm"
            >
              Our premium woodfire grids are seared live across three flagship spots. Hover on map coordinates to track seating.
            </motion.p>
          </div>

          {/* Right Column: Stylized Minimalist Night Map Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="relative aspect-[1.8] w-full bg-[#0C0C0C] border border-cream/5 rounded-[32px] overflow-hidden shadow-2xl p-4 flex items-center justify-center bg-noise">
              {/* Map grid lines overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(254,243,199,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(254,243,199,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

              {/* Glowing decorative radar rings */}
              <div className="absolute w-[80%] aspect-square rounded-full border border-brand-orange/5 animate-pulse pointer-events-none" />
              <div className="absolute w-[50%] aspect-square rounded-full border border-brand-gold/5 pointer-events-none" />

              {/* Pulsating Pin 1: The Foundry (Flagship) */}
              <motion.div 
                whileHover={{ scale: 1.15 }}
                className="absolute top-[28%] left-[25%] group cursor-pointer z-25"
                onClick={() => {
                  window.scrollTo({ top: 400, behavior: "smooth" });
                }}
              >
                {/* Ping rings */}
                <span className="absolute -top-1.5 -left-1.5 w-6 h-6 bg-brand-gold/30 rounded-full animate-ping pointer-events-none" />
                <span className="relative flex h-3 w-3 bg-brand-gold rounded-full shadow shadow-brand-gold/50" />
                
                {/* Tooltip */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-charcoal border border-brand-gold/30 px-3 py-2 rounded-xl text-center shadow-2xl w-40 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 pointer-events-none select-none">
                  <h4 className="font-serif font-bold text-[10px] text-cream leading-tight">The Foundry</h4>
                  <span className="text-[7px] text-brand-gold uppercase font-black block mt-0.5">Flagship • Open Live</span>
                </div>
              </motion.div>

              {/* Pulsating Pin 2: The Coal Yards */}
              <motion.div 
                whileHover={{ scale: 1.15 }}
                className="absolute top-[52%] left-[62%] group cursor-pointer z-20"
                onClick={() => {
                  window.scrollTo({ top: 1200, behavior: "smooth" });
                }}
              >
                <span className="absolute -top-1.5 -left-1.5 w-6 h-6 bg-brand-orange/30 rounded-full animate-ping pointer-events-none" />
                <span className="relative flex h-3 w-3 bg-brand-orange rounded-full shadow shadow-brand-orange/50" />
                
                {/* Tooltip */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-charcoal border border-brand-orange/30 px-3 py-2 rounded-xl text-center shadow-2xl w-40 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 pointer-events-none select-none">
                  <h4 className="font-serif font-bold text-[10px] text-cream leading-tight">The Coal Yards</h4>
                  <span className="text-[7px] text-brand-orange uppercase font-black block mt-0.5">Searing Open</span>
                </div>
              </motion.div>

              {/* Pulsating Pin 3: The Neon Arch */}
              <motion.div 
                whileHover={{ scale: 1.15 }}
                className="absolute top-[18%] left-[78%] group cursor-pointer z-20"
                onClick={() => {
                  window.scrollTo({ top: 1600, behavior: "smooth" });
                }}
              >
                <span className="absolute -top-1.5 -left-1.5 w-6 h-6 bg-brand-gold/30 rounded-full animate-ping pointer-events-none" />
                <span className="relative flex h-3 w-3 bg-brand-gold rounded-full shadow shadow-brand-gold/50" />
                
                {/* Tooltip */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-charcoal border border-brand-gold/30 px-3 py-2 rounded-xl text-center shadow-2xl w-40 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 pointer-events-none select-none">
                  <h4 className="font-serif font-bold text-[10px] text-cream leading-tight">The Neon Arch</h4>
                  <span className="text-[7px] text-brand-gold uppercase font-black block mt-0.5">Open until Midnight</span>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>

        {/* Asymmetric Bento Box Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT BENTO BLOCK: Flagship Highlight (Large 7 Columns) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {LOCATIONS_DATA.filter((l) => l.isFlagship).map((flagship) => {
              const isOpen = checkIsOpen(flagship.openHour, flagship.closeHour);
              return (
                <motion.div
                  key={flagship.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="glassmorphism rounded-[32px] p-6 sm:p-8 border border-brand-orange/20 relative overflow-hidden group shadow-xl shadow-black/20"
                >
                  {/* Glowing Trim */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-orange to-brand-gold" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
                    
                    {/* Flagship Image Frame */}
                    <div className="md:col-span-5 relative aspect-[1] md:aspect-[3/4] rounded-2xl overflow-hidden shadow-inner border border-cream/5">
                      <Image
                        src={flagship.image}
                        alt={flagship.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                        sizes="(max-w-768px) 100vw, 30vw"
                      />
                      <span className="absolute top-3 left-3 bg-brand-orange text-cream-lighter font-sans text-[8px] uppercase tracking-widest font-black px-2.5 py-1 rounded">
                        Flagship
                      </span>
                    </div>

                    {/* Flagship Content */}
                    <div className="md:col-span-7 flex flex-col justify-between">
                      <div>
                        {/* Live Seared Badge */}
                        <div className="flex items-center gap-2 mb-3.5">
                          <span className={`w-2.5 h-2.5 rounded-full ${isOpen ? "bg-green-500 animate-ping" : "bg-red-500"}`} />
                          <span className={`text-[10px] uppercase tracking-wider font-extrabold ${isOpen ? "text-green-500" : "text-red-400"}`}>
                            {isOpen ? "Searing Live" : "Grills Cold (Closed)"}
                          </span>
                        </div>

                        <h3 className="font-serif font-black text-3xl sm:text-4xl text-cream tracking-tight leading-tight group-hover:text-brand-gold transition-colors duration-200">
                          {flagship.name}
                        </h3>

                        <p className="text-xs sm:text-sm text-cream-lighter/60 mt-4 leading-relaxed font-light">
                          {flagship.atmosphere}
                        </p>
                      </div>

                      {/* Contact / Info Columns */}
                      <div className="mt-8 pt-6 border-t border-cream/5 flex flex-col gap-3.5 text-xs text-cream-lighter/75">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-brand-orange shrink-0" />
                          <span>{flagship.address}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                          <span>{flagship.phone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-brand-gold shrink-0" />
                          <span className="font-sans font-semibold text-brand-gold">{flagship.hours}</span>
                        </div>
                      </div>

                      {/* Map CTA Link */}
                      <div className="mt-8">
                        <Magnetic>
                          <a
                            href={flagship.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange text-cream-lighter font-sans text-[10px] uppercase tracking-widest font-black rounded-xl hover:bg-brand-gold hover:text-charcoal-darker transition-colors duration-300"
                          >
                            <span>Open In Maps</span>
                            <Navigation className="w-3.5 h-3.5" />
                          </a>
                        </Magnetic>
                      </div>

                    </div>

                  </div>
                </motion.div>
              );
            })}

            {/* Custom Neon Bento Stats Sub-Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-charcoal-lighter/15 border border-cream/5 rounded-3xl flex flex-col justify-between">
                <Flame className="w-6 h-6 text-brand-orange mb-3" />
                <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Total Grids</span>
                <span className="font-serif font-black text-4xl text-cream mt-1">18,500+</span>
                <p className="text-[11px] text-cream-lighter/45 mt-2 leading-relaxed">
                  Smash burgers seared over real wood and charcoal across our three flagships this month alone.
                </p>
              </div>

              <div className="p-6 bg-charcoal-lighter/15 border border-cream/5 rounded-3xl flex flex-col justify-between">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse mb-3" />
                <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Grill Live Prep</span>
                <span className="font-serif font-black text-2xl text-cream mt-1">Hickory Wood</span>
                <p className="text-[11px] text-cream-lighter/45 mt-2 leading-relaxed">
                  Every morning at 5:00 AM, our pitmasters fire the coals to achieve optimized cooking temperatures.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT BENTO BLOCK: Secondary Locations (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {LOCATIONS_DATA.filter((l) => !l.isFlagship).map((loc, idx) => {
              const isOpen = checkIsOpen(loc.openHour, loc.closeHour);
              return (
                <motion.div
                  key={loc.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (idx + 1), duration: 0.5 }}
                  className="glassmorphism rounded-3xl p-6 border border-cream/5 relative overflow-hidden group hover:border-brand-gold/30 transition-all duration-300 shadow-md shadow-black/10"
                >
                  <div className="relative w-full h-[150px] rounded-xl overflow-hidden mb-5 border border-cream/5">
                    <Image
                      src={loc.image}
                      alt={loc.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                      sizes="(max-w-768px) 100vw, 25vw"
                    />
                    
                    <div className="absolute top-3 right-3 bg-charcoal-darker/80 backdrop-blur px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow border border-cream/5">
                      <span className={`w-2 h-2 rounded-full ${isOpen ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                      <span className={`text-[8px] uppercase tracking-wider font-extrabold ${isOpen ? "text-green-500" : "text-red-400"}`}>
                        {isOpen ? "Searing" : "Cold"}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif font-black text-2xl text-cream tracking-tight group-hover:text-brand-orange transition-colors duration-200">
                    {loc.name}
                  </h3>

                  <p className="text-xs text-cream-lighter/60 mt-2.5 leading-relaxed font-light">
                    {loc.atmosphere}
                  </p>

                  <div className="mt-6 pt-5 border-t border-cream/5 flex flex-col gap-2.5 text-xs text-cream-lighter/70">
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                      <span>{loc.address}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                      <span>{loc.phone}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                      <span className="font-sans font-semibold text-brand-gold">{loc.hours}</span>
                    </div>
                  </div>

                  {/* Open Map Trigger */}
                  <div className="mt-6 flex justify-end">
                    <a
                      href={loc.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-black text-cream hover:text-brand-orange transition-colors duration-200"
                    >
                      <span>Get Directions</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}
