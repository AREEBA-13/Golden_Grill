"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Flame, ArrowRight, ShieldCheck, Trophy, Sparkles } from "lucide-react";
import Magnetic from "@/components/Magnetic";

// Premium Featured Grill Items
const FEATURED_ITEMS = [
  {
    id: 1,
    name: "The Gold Standard",
    tagline: "Double Smashed Wagyu",
    price: "$18.50",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop",
    badge: "Grill Master Choice",
    desc: "Aged Wagyu brisket patties seared on charcoal, sharp cheddar melt, signature grill glaze, artisan brioche.",
  },
  {
    id: 2,
    name: "Smokey Bandit",
    tagline: "Slow Wood Smoked",
    price: "$19.25",
    image: "https://images.unsplash.com/photo-1521305916504-4a1121188589?q=80&w=600&auto=format&fit=crop",
    badge: "Limited Run",
    desc: "Oak-smoked beef brisket, crispy onion rings, maple bacon, house-crafted hickory glaze, jalapeno cream.",
  },
  {
    id: 3,
    name: "Blaze & Crunch",
    tagline: "Spicy Sizzled Bird",
    price: "$16.00",
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=600&auto=format&fit=crop",
    badge: "Trending",
    desc: "Buttermilk hot fried chicken dipped in fiery fat glaze, premium crunch slaw, dill pickle chips, honey bun.",
  },
  {
    id: 4,
    name: "The Grid Fire",
    tagline: "Triple Patty Feast",
    price: "$22.00",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=600&auto=format&fit=crop",
    badge: "Sizzler Special",
    desc: "Three dry-aged chuck patties seared at 800°F, heavy cheddar layer, crisp butcher bacon, caramelized shallots.",
  },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [isHovered3D, setIsHovered3D] = useState(false);

  // Mouse coordinate values for 3D rotation tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for cursor-based interactive rotation (centered around isometric base tilt)
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [55, 25]), { damping: 25, stiffness: 180 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-25, 5]), { damping: 25, stiffness: 180 });

  const handleMouseMove3D = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Compute distance relative to center of the viewport
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave3D = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered3D(false);
  };

  // Scroll Parallax for Hero
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    if (carouselRef.current) {
      const scrollWidth = carouselRef.current.scrollWidth;
      const offsetWidth = carouselRef.current.offsetWidth;
      setWidth(scrollWidth - offsetWidth);
    }
  }, []);

  // Framer Motion staggered reveals
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const titleWordVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 12,
      },
    },
  };
  // 3D Exploded Burger Layer offsets (Staggered baseline stacked vs Exploded hovered)
  const layerOffsets = {
    topBun: isHovered3D ? -180 : -70,
    sauce: isHovered3D ? -90 : -35,
    cheese: isHovered3D ? 0 : 0,
    patty: isHovered3D ? 90 : 35,
    bottomBun: isHovered3D ? 180 : 70,
  };

  return (
    <div ref={containerRef} className="bg-charcoal-darker min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section 
        onMouseMove={handleMouseMove3D}
        onMouseLeave={handleMouseLeave3D}
        className="relative h-[95vh] lg:h-[90vh] flex items-center overflow-hidden px-6 md:px-12 py-12"
      >
        {/* Cinematic Backdrop Image & Smoky Vignette */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C0C0C]/95 via-[#0C0C0C]/80 to-[#0C0C0C]/95 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-transparent z-10" />
          <Image
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop"
            alt="Sizzling Gourmet Grill Fire"
            fill
            className="object-cover object-center scale-105 pointer-events-none brightness-[0.35]"
            priority
          />
        </motion.div>

        {/* Hero split layout */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full relative z-20">
          
          {/* Left Column: Staggered Brand Typography */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/10 text-brand-gold text-[10px] uppercase tracking-[0.2em] font-semibold mb-6 backdrop-blur-sm"
            >
              <Flame className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
              <span>Introducing Wood-Fired Wagyu Drops</span>
            </motion.div>

            <motion.div
              variants={titleContainerVariants}
              initial="hidden"
              animate="visible"
              className="overflow-hidden w-full"
            >
              <motion.h1 
                variants={titleWordVariants}
                className="font-serif font-black text-5xl sm:text-7xl md:text-8xl text-cream tracking-tight leading-[0.9] uppercase"
              >
                GOLDEN <span className="text-brand-gold">GRILL</span>
              </motion.h1>

              <motion.span 
                variants={titleWordVariants}
                className="font-serif font-black text-3xl sm:text-5xl md:text-6xl text-stroke-gold tracking-tight leading-none block uppercase mt-2.5"
              >
                Beyond The Grid
              </motion.span>
              
              <motion.p
                variants={titleWordVariants}
                className="font-serif font-black text-2xl sm:text-4xl text-cream-lighter tracking-tight leading-tight mt-6"
              >
                QUALITY YOU CAN <span className="text-brand-orange">TASTE.</span>
              </motion.p>

              <motion.p
                variants={titleWordVariants}
                className="font-sans text-sm sm:text-base text-cream-darker/60 font-light mt-4 max-w-lg tracking-wide leading-relaxed"
              >
                Artisanal chuck patties ground daily and seared at extreme heat with charcoal wood-fire. Handcrafted without compromise.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <Magnetic>
                <Link
                  href="/menu"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-orange text-cream-lighter font-sans text-xs uppercase tracking-widest font-black rounded-full overflow-hidden group shadow-xl shadow-brand-orange/20 hover:shadow-brand-orange/35 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Taste the Fire <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-brand-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
                </Link>
              </Magnetic>

              <Magnetic>
                <Link
                  href="/locations"
                  className="inline-flex items-center justify-center px-8 py-3.5 border border-cream/20 bg-charcoal-lighter/30 text-cream-lighter font-sans text-xs uppercase tracking-widest font-bold rounded-full overflow-hidden hover:bg-cream hover:text-charcoal-darker hover:border-transparent transition-all duration-300 backdrop-blur-sm"
                >
                  Find Nearest Seat
                </Link>
              </Magnetic>
            </motion.div>
          </div>

          {/* Right Column: Interactive 3D Exploding Burger Stack */}
          <div className="lg:col-span-5 flex justify-center items-center relative h-[520px] sm:h-[620px] w-full">
            
            {/* Tilted 3D Stack Container */}
            <motion.div
              onMouseEnter={() => setIsHovered3D(true)}
              className="relative w-80 sm:w-[380px] h-[440px] sm:h-[540px] flex items-center justify-center pointer-events-auto cursor-pointer flex-shrink-0"
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
                rotateX,
                rotateY,
              }}
            >
              {/* Outer decorative neon frame rings */}
              <div className="absolute inset-0 border border-brand-gold/10 rounded-full scale-105 pointer-events-none select-none animate-pulse" />
              <div className="absolute inset-6 border border-brand-orange/5 rounded-full scale-100 pointer-events-none select-none" />

              {/* Layer 5: Top Brioche Bun */}
              <motion.div
                animate={{ y: layerOffsets.topBun, rotate: isHovered3D ? -5 : 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 120 }}
                className="absolute w-44 sm:w-60 h-44 sm:h-60 z-50 pointer-events-none flex items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-brand-orange/20 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
                  <Image
                    src="https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=400&auto=format&fit=crop"
                    alt="Artisan Brioche Bun Top"
                    fill
                    className="object-cover brightness-110 pointer-events-none"
                  />
                </div>

                {/* Floating Blueprint Label (Translates exactly with Layer 5 Bun!) */}
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: isHovered3D ? 1 : 0, x: isHovered3D ? 0 : 15 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-[105%] sm:left-[110%] hidden md:flex items-center gap-3 w-44 pointer-events-none text-left"
                >
                  <div className="w-8 h-[1px] bg-brand-gold/40 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-brand-gold tracking-[0.2em] uppercase block whitespace-nowrap">Artisan Brioche</span>
                    <span className="text-[8px] text-cream/40 tracking-wider uppercase block whitespace-nowrap">Warm Seared Bun</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Layer 4: Roasted Veg & Toppings */}
              <motion.div
                animate={{ y: layerOffsets.sauce, rotate: isHovered3D ? 3 : 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 120 }}
                className="absolute w-40 sm:w-56 h-40 sm:h-56 z-40 pointer-events-none flex items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-brand-orange/15 shadow-[0_12px_30px_rgba(0,0,0,0.5)]">
                  <Image
                    src="https://images.unsplash.com/photo-1625938146369-adc83368bda7?q=80&w=400&auto=format&fit=crop"
                    alt="Fresh Coleslaw slaw toppings"
                    fill
                    className="object-cover brightness-105 pointer-events-none"
                  />
                </div>

                {/* Floating Blueprint Label (Translates exactly with Layer 4 Slaw!) */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: isHovered3D ? 1 : 0, x: isHovered3D ? 0 : -15 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-[105%] sm:right-[110%] hidden md:flex items-center gap-3 w-44 pointer-events-none text-right justify-end"
                >
                  <div>
                    <span className="text-[10px] font-bold text-cream-lighter tracking-[0.2em] uppercase block whitespace-nowrap">Crunch Slaw</span>
                    <span className="text-[8px] text-brand-orange/60 tracking-wider uppercase block whitespace-nowrap">Spiced Pickle Slaw</span>
                  </div>
                  <div className="w-8 h-[1px] bg-brand-orange/40 flex-shrink-0" />
                </motion.div>
              </motion.div>

              {/* Layer 3: Melted Cheddar Glaze */}
              <motion.div
                animate={{ y: layerOffsets.cheese, rotate: isHovered3D ? -2 : 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 120 }}
                className="absolute w-44 sm:w-60 h-44 sm:h-60 z-30 pointer-events-none flex items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-brand-gold/30 shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
                  <Image
                    src="https://images.unsplash.com/photo-1608686207856-001b95cf60ca?q=80&w=400&auto=format&fit=crop"
                    alt="Gold Melted Cheddar Melt seared"
                    fill
                    className="object-cover brightness-110 pointer-events-none"
                  />
                </div>

                {/* Floating Blueprint Label (Translates exactly with Layer 3 Cheese!) */}
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: isHovered3D ? 1 : 0, x: isHovered3D ? 0 : 15 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-[105%] sm:left-[110%] hidden md:flex items-center gap-3 w-44 pointer-events-none text-left"
                >
                  <div className="w-8 h-[1px] bg-brand-gold/40 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-brand-gold tracking-[0.2em] uppercase block whitespace-nowrap">Cheddar Glaze</span>
                    <span className="text-[8px] text-cream/40 tracking-wider uppercase block whitespace-nowrap">Double Melted Cheddar</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Layer 2: Charcoal Smashed Wagyu Patty */}
              <motion.div
                animate={{ y: layerOffsets.patty, rotate: isHovered3D ? 5 : 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 120 }}
                className="absolute w-46 sm:w-62 h-46 sm:h-62 z-20 pointer-events-none flex items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-cream/10 shadow-[0_18px_35px_rgba(0,0,0,0.6)]">
                  <Image
                    src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=400&auto=format&fit=crop"
                    alt="Woodfire Wagyu Beef Patty double seared"
                    fill
                    className="object-cover brightness-105 pointer-events-none"
                  />
                </div>

                {/* Floating Blueprint Label (Translates exactly with Layer 2 Patty!) */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: isHovered3D ? 1 : 0, x: isHovered3D ? 0 : -15 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-[105%] sm:right-[110%] hidden md:flex items-center gap-3 w-44 pointer-events-none text-right justify-end"
                >
                  <div>
                    <span className="text-[10px] font-bold text-cream-lighter tracking-[0.2em] uppercase block whitespace-nowrap">Smashed Wagyu</span>
                    <span className="text-[8px] text-brand-orange/60 tracking-wider uppercase block whitespace-nowrap">Heritage Charcoal Patty</span>
                  </div>
                  <div className="w-8 h-[1px] bg-brand-orange/40 flex-shrink-0" />
                </motion.div>
              </motion.div>

              {/* Layer 1: Bottom Bun base */}
              <motion.div
                animate={{ y: layerOffsets.bottomBun, rotate: isHovered3D ? -4 : 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 120 }}
                className="absolute w-44 sm:w-60 h-44 sm:h-60 z-10 pointer-events-none flex items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-cream/15 shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
                  <Image
                    src="https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=400&auto=format&fit=crop"
                    alt="Toasted bottom bun base seared"
                    fill
                    className="object-cover brightness-105 pointer-events-none"
                  />
                </div>

                {/* Floating Blueprint Label (Translates exactly with Layer 1 Bottom Bun!) */}
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: isHovered3D ? 1 : 0, x: isHovered3D ? 0 : 15 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-[105%] sm:left-[110%] hidden md:flex items-center gap-3 w-44 pointer-events-none text-left"
                >
                  <div className="w-8 h-[1px] bg-brand-gold/40 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-brand-gold tracking-[0.2em] uppercase block whitespace-nowrap">Toasted Base</span>
                    <span className="text-[8px] text-cream/40 tracking-wider uppercase block whitespace-nowrap">Wood-Fired Crust</span>
                  </div>
                </motion.div>
              </motion.div>

            </motion.div>
          </div>

        </div>

        {/* Dynamic scroll down badge */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-xs text-cream/40"
        >
          <span>Scroll to Discover</span>
          <div className="w-1 h-3.5 rounded-full bg-cream/20 flex justify-center">
            <motion.div className="w-0.5 h-1.5 rounded-full bg-brand-orange" />
          </div>
        </motion.div>
      </section>

      {/* 2. FEATURED CAROUSEL SECTION */}
      <section className="py-24 px-6 md:px-12 bg-charcoal-darker border-y border-cream/5 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-brand-gold/80">Signature Plates</span>
            <h2 className="font-serif font-black text-4xl sm:text-5xl md:text-6xl text-cream mt-2">
              SEERED HEAT <span className="text-stroke-gold">LINEUP</span>
            </h2>
          </div>
          <p className="text-cream-lighter/60 text-sm max-w-sm leading-relaxed mt-4 md:mt-0">
            Drag to scroll through our physical hand-pressed signature creations. Prepared on custom hickory grill grids.
          </p>
        </div>

        {/* Drag Carousel Frame */}
        <div className="max-w-7xl mx-auto relative overflow-hidden" ref={carouselRef}>
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            whileTap={{ cursor: "grabbing" }}
            className="flex gap-8 cursor-grab w-max py-4"
          >
            {FEATURED_ITEMS.map((item) => (
              <motion.div
                key={item.id}
                className="w-[300px] sm:w-[380px] glassmorphism rounded-3xl p-5 sm:p-6 flex flex-col justify-between select-none relative overflow-hidden border border-cream/5 hover:border-brand-orange/30 transition-all duration-300"
              >
                {/* Visual Glass backdrop highlights */}
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-brand-orange/5 blur-2xl rounded-full pointer-events-none" />
                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-brand-gold/5 blur-2xl rounded-full pointer-events-none" />

                <div>
                  {/* Photo container */}
                  <div className="relative w-full h-[180px] sm:h-[220px] rounded-2xl overflow-hidden mb-5">
                    <span className="absolute top-3 left-3 bg-brand-orange/95 backdrop-blur text-cream-lighter font-sans font-bold text-[9px] uppercase tracking-wider px-3 py-1 rounded-full z-10 shadow">
                      {item.badge}
                    </span>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover pointer-events-none group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-w-768px) 300px, 380px"
                    />
                  </div>

                  {/* Text Description */}
                  <span className="text-xs uppercase tracking-widest text-brand-gold font-bold">{item.tagline}</span>
                  <h3 className="font-serif font-black text-2xl text-cream mt-1">{item.name}</h3>
                  <p className="text-cream-lighter/60 text-xs sm:text-sm mt-3.5 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-cream/5 pt-5 mt-6">
                  <span className="font-serif font-extrabold text-xl text-brand-orange">{item.price}</span>
                  <Link
                    href="/menu"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-cream hover:text-brand-gold transition-colors duration-200"
                  >
                    View Recipe <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. CHEF SPLIT SCREEN TEASER SECTION */}
      <section className="py-24 px-6 md:px-12 bg-charcoal-darker">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Bento Stats (Asymmetric Grids) */}
          <div className="lg:col-span-6 order-2 lg:order-1 flex flex-col gap-6">
            <span className="text-xs uppercase tracking-[0.25em] font-black text-brand-orange">Woodfire Methods</span>
            <h2 className="font-serif font-black text-4xl sm:text-5xl text-cream leading-tight">
              UNCOMPROMISED CULINARY <span className="text-stroke-gold">TRUTHS</span>
            </h2>
            <p className="text-cream-lighter/60 text-sm leading-relaxed max-w-xl">
              We started out by scrapping the typical commercial flat-top grill plates. Instead, our team crafted customized grids to cook raw cuts under pure charcoal flame, releasing caramelized juices like no other.
            </p>

            {/* Bento Layout Panels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              
              <div className="p-6 bg-charcoal-lighter/25 border border-cream/5 rounded-2xl shadow flex flex-col gap-3 hover:border-brand-gold/20 transition-all duration-300">
                <Trophy className="w-8 h-8 text-brand-gold" />
                <div>
                  <h4 className="font-serif font-bold text-lg text-cream">Chef Curated Cuts</h4>
                  <p className="text-xs text-cream-lighter/55 mt-1 leading-relaxed">
                    100% locally sourced heritage breeds. Dry-aged and double-ground daily.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-charcoal-lighter/25 border border-cream/5 rounded-2xl shadow flex flex-col gap-3 hover:border-brand-orange/20 transition-all duration-300">
                <Flame className="w-8 h-8 text-brand-orange" />
                <div>
                  <h4 className="font-serif font-bold text-lg text-cream">800° Wood Sear</h4>
                  <p className="text-xs text-cream-lighter/55 mt-1 leading-relaxed">
                    Intense wood fire smoke that penetrates the grill grids for perfect crunch shell.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-charcoal-lighter/25 border border-cream/5 rounded-2xl shadow flex flex-col gap-3 sm:col-span-2 hover:border-cream/20 transition-all duration-300">
                <div className="flex items-center gap-2 text-brand-gold">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="font-sans text-xs uppercase tracking-wider font-semibold">Zero Additives</span>
                </div>
                <h4 className="font-serif font-bold text-lg text-cream -mt-1">Gourmet Quality Handshakes</h4>
                <p className="text-xs text-cream-lighter/55 leading-relaxed">
                  Every bun is glazed with farm butter, every pickle is cured in-house, and every bite represents our promise: Quality you can taste.
                </p>
              </div>

            </div>
          </div>

          {/* Right Side: Chef Spot (Parallax & Image Reveal) */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative aspect-[4/5] w-full max-w-lg mx-auto rounded-3xl overflow-hidden shadow-2xl border border-cream/5 group">
              {/* Outer frame trim */}
              <div className="absolute inset-4 border border-brand-gold/15 rounded-2xl z-20 pointer-events-none group-hover:border-brand-orange/30 transition-all duration-500" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-darker/80 via-transparent to-transparent z-10" />
              <Image
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop"
                alt="Grill master searing beef patty with custom equipment"
                fill
                className="object-cover scale-100 group-hover:scale-105 grayscale group-hover:grayscale-0 transition-all duration-[1200ms] ease-out pointer-events-none"
                sizes="(max-w-1024px) 100vw, 50vw"
              />

              <div className="absolute bottom-8 left-8 right-8 z-20">
                <span className="text-[10px] uppercase tracking-[0.25em] font-black text-brand-gold">Master of the Grid</span>
                <h3 className="font-serif font-black text-2xl sm:text-3xl text-cream mt-0.5">Chef Mason Reed</h3>
                <p className="text-xs text-cream-lighter/75 mt-1.5 leading-relaxed font-light max-w-sm">
                  &quot;Searing is an art. If you aren&apos;t capturing the natural fats of the cut with direct fire, you aren&apos;t serving steak. We brought steak rules to burgers.&quot;
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. DYNAMIC CALL TO ACTION BANNER */}
      <section className="relative py-28 px-6 md:px-12 bg-charcoal-darker overflow-hidden text-center">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-orange/10 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-gold/5 blur-3xl pointer-events-none rounded-full" />
        
        <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
          <Sparkles className="w-10 h-10 text-brand-gold animate-bounce mb-6" />
          <h2 className="font-serif font-black text-4xl sm:text-6xl text-cream tracking-tight leading-tight">
            CRAVING BEYOND <br />THE <span className="text-brand-orange">STANDARD GRID?</span>
          </h2>
          <p className="text-cream-lighter/60 sm:text-lg max-w-xl mx-auto mt-6 leading-relaxed font-light">
            Don&apos;t compromise. Tap directly into wood-fired taste, crafted meticulously for true burger enthusiasts.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 mt-10 justify-center items-center">
            <Magnetic>
              <Link
                href="/menu"
                className="px-8 py-4 bg-brand-orange text-cream-lighter uppercase tracking-wider text-xs font-black rounded-full shadow-lg shadow-brand-orange/15 hover:shadow-brand-orange/25 group overflow-hidden transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Order Food Delivery <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-brand-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
              </Link>
            </Magnetic>

            <Magnetic>
              <Link
                href="/locations"
                className="px-8 py-4 border border-cream/15 text-cream-lighter uppercase tracking-wider text-xs font-bold rounded-full hover:bg-cream hover:text-charcoal-darker hover:border-transparent transition-all duration-300"
              >
                Find Nearest Seating
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>

    </div>
  );
}
