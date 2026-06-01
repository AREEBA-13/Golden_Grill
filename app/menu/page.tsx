"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, AlertCircle, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Magnetic from "@/components/Magnetic";

// Full Typed Menu Data
interface MenuItem {
  id: number;
  name: string;
  category: "Burgers" | "Sides" | "Drinks";
  price: number;
  image: string;
  desc: string;
  badge?: string;
  calories: number;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: "The Gold Standard Smash",
    category: "Burgers",
    price: 18.50,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop",
    desc: "Aged Wagyu beef smashed on extreme fire, double sharp cheddar melt, house grid glaze, artisan brioche.",
    badge: "Grill Master Hits",
    calories: 820,
  },
  {
    id: 2,
    name: "Oak-Wood Smoked Bandit",
    category: "Burgers",
    price: 19.25,
    image: "https://images.unsplash.com/photo-1521305916504-4a1121188589?q=80&w=600&auto=format&fit=crop",
    desc: "Oak-smoked dry beef cut, crisp maple slab bacon, caramelized shallots, house hickory glaze, sweet bun.",
    badge: "Smokey Series",
    calories: 890,
  },
  {
    id: 3,
    name: "Volcano Hot Crisp Bird",
    category: "Burgers",
    price: 16.00,
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=600&auto=format&fit=crop",
    desc: "Crispy buttermilk bird dipped in fiery fat glaze, signature crunch pepper slaw, pickles, organic bun.",
    calories: 740,
  },
  {
    id: 4,
    name: "Charcoal Grid Truffle",
    category: "Burgers",
    price: 20.50,
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=600&auto=format&fit=crop",
    desc: "Premium wood-pressed patty, black truffle marrow spread, direct seared shiitake caps, Swiss melt.",
    badge: "Royal Special",
    calories: 790,
  },
  {
    id: 5,
    name: "Truffle Grid Wedges",
    category: "Sides",
    price: 8.50,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=600&auto=format&fit=crop",
    desc: "Thick skin-on Russet wedges seared in gourmet white truffle oil, finished with aged Parmigiano shavings.",
    badge: "Trending",
    calories: 380,
  },
  {
    id: 6,
    name: "Blazed Sweet Fries",
    category: "Sides",
    price: 7.75,
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=600&auto=format&fit=crop",
    desc: "Crisp hand-cut sweet potato strips tossed in warm cayenne dust and organic honey powder spray.",
    calories: 340,
  },
  {
    id: 7,
    name: "Crispy Onion Grids",
    category: "Sides",
    price: 6.50,
    image: "https://images.unsplash.com/photo-1531749668029-2db88e4b76ce?q=80&w=600&auto=format&fit=crop",
    desc: "Massive sweet red onion rings soaked in craft amber IPA lager batter, grid seared for extreme crisp finish.",
    calories: 290,
  },
  {
    id: 8,
    name: "Artisanal Smoked Cola",
    category: "Drinks",
    price: 5.50,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=600&auto=format&fit=crop",
    desc: "House brewed double sugar soda infused with Madagascar vanilla bean extract and hickory smoke vapors.",
    calories: 140,
  },
  {
    id: 9,
    name: "Blood Orange Elixir",
    category: "Drinks",
    price: 6.25,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop",
    desc: "Fresh cold-squeezed Sicilian blood orange juice combined with sparkling volcanic mineral water, charred rosemary.",
    badge: "Seasonal",
    calories: 90,
  },
  {
    id: 10,
    name: "Citrus Hops Fusion",
    category: "Drinks",
    price: 6.00,
    image: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?q=80&w=600&auto=format&fit=crop",
    desc: "Non-alcoholic pale IPA hop oil infusion steep, cold blended with key lime nectar juice.",
    calories: 110,
  },
];

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeItemAdding, setActiveItemAdding] = useState<number | null>(null);
  const { addToCart, cart } = useCart();

  const categories = ["All", "Burgers", "Sides", "Drinks"];

  const filteredItems = MENU_ITEMS.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  const handleAddToCart = (item: MenuItem) => {
    setActiveItemAdding(item.id);
    
    // Add real item to Cart Context
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      desc: item.desc,
      category: item.category,
    });

    // Simulate seared delay for checkmark micro-interaction
    setTimeout(() => {
      setActiveItemAdding(null);
    }, 850);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-[#070707] bg-noise min-h-screen py-16 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative Ornaments */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-brand-orange/5 blur-3xl rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-gold/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block (LED Matrix Restaurant Menu Board style) */}
        <div className="w-full max-w-5xl mx-auto rounded-3xl border-4 border-brand-orange/40 bg-[#0C0C0C] p-6 sm:p-8 shadow-[0_0_60px_rgba(234,88,12,0.18)] relative overflow-hidden flex flex-col justify-center items-center mb-16 select-none">
          
          {/* Top Scrolling Row: Fresh / Hot / Now Serving Ticker */}
          <div className="w-full overflow-hidden border-y border-brand-orange/20 py-3 relative select-none">
            <div className="animate-marquee whitespace-nowrap flex items-center text-brand-gold font-serif font-black text-xl sm:text-2xl tracking-[0.15em] uppercase">
              <span>FRESH • HOT • NOW SERVING • WOOD-FIRED GRIDS • SMASHED LIVE • QUALITY YOU CAN TASTE • BEYOND THE GRID •&nbsp;</span>
              <span>FRESH • HOT • NOW SERVING • WOOD-FIRED GRIDS • SMASHED LIVE • QUALITY YOU CAN TASTE • BEYOND THE GRID •&nbsp;</span>
            </div>
          </div>

          {/* Overlaid center header title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="font-serif font-black text-4xl sm:text-6xl text-cream tracking-tight mt-6 text-center z-10 uppercase"
          >
            THE CRAFT <span className="text-brand-orange">MENU BOARD</span>
          </motion.h1>
          
          {/* Bottom Scrolling Row: Specialties ticker in opposite direction */}
          <div className="w-full overflow-hidden border-b border-brand-orange/20 py-3 relative select-none mt-4">
            <div className="animate-marquee-reverse whitespace-nowrap flex items-center text-cream-lighter font-serif font-black text-xs sm:text-sm tracking-[0.15em] uppercase opacity-70">
              <span>CRAFT CUT WAGYU • TRUFFLE GRID WEDGES • HICKORY SMOKE COLA • FLAME SEERED DAILY •&nbsp;</span>
              <span>CRAFT CUT WAGYU • TRUFFLE GRID WEDGES • HICKORY SMOKE COLA • FLAME SEERED DAILY •&nbsp;</span>
            </div>
          </div>

        </div>

        {/* Categories Tab Pill Filter */}
        <div className="flex flex-wrap justify-center gap-3.5 sm:gap-5 mb-16">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-6 py-2.5 rounded-full font-sans text-xs uppercase tracking-widest font-bold border transition-colors duration-300 ${
                  isActive
                    ? "bg-brand-orange text-cream-lighter border-transparent shadow-lg shadow-brand-orange/15"
                    : "bg-charcoal-lighter/30 text-cream-lighter/75 border-cream/10 hover:border-brand-gold/40"
                }`}
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {category}
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryIndicator"
                    className="absolute inset-0 rounded-full border border-brand-gold z-[-1] pointer-events-none"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Grid Container */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className="group glassmorphism rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between border border-cream/5 hover:border-brand-orange/30 transition-all duration-300 shadow-md shadow-black/10"
              >
                {/* Micro highlights */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 blur-xl pointer-events-none" />
                
                <div>
                  {/* Aspect Ratio Image Wrapper */}
                  <div className="relative w-full aspect-[1.35] rounded-2xl overflow-hidden mb-5">
                    {item.badge && (
                      <span className="absolute top-3.5 left-3.5 bg-brand-gold text-charcoal-darker font-sans font-extrabold text-[8px] uppercase tracking-widest px-2.5 py-1 rounded-md z-10 shadow">
                        {item.badge}
                      </span>
                    )}
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                      sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 33vw"
                    />
                    
                    {/* Hover Price Overlay (Glass tag) */}
                    <div className="absolute bottom-3 right-3 bg-charcoal-darker/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-cream/15">
                      <span className="font-serif font-black text-brand-gold text-sm sm:text-base">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Header Title */}
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif font-black text-xl sm:text-2xl text-cream group-hover:text-brand-gold transition-colors duration-200">
                      {item.name}
                    </h3>
                  </div>

                  {/* Detail Info */}
                  <p className="text-cream-lighter/60 text-xs sm:text-sm mt-3.5 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                {/* Footer Section */}
                <div className="flex items-center justify-between border-t border-cream/5 pt-5 mt-6">
                  <span className="text-[10px] text-cream-lighter/40 uppercase tracking-widest">
                    {item.calories} KCAL
                  </span>

                  <Magnetic range={45}>
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={activeItemAdding === item.id}
                      className={`relative flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full overflow-hidden text-[10px] uppercase tracking-widest font-black shadow transition-all duration-300 ${
                        activeItemAdding === item.id
                          ? "bg-brand-gold text-charcoal-darker"
                          : "bg-brand-orange text-cream-lighter hover:shadow-brand-orange/15"
                      }`}
                    >
                      {activeItemAdding === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 animate-bounce" />
                          <span>Searing...</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Grid</span>
                        </>
                      )}
                    </button>
                  </Magnetic>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Nutritional Advice Alert banner */}
        <div className="mt-20 glassmorphism rounded-2xl p-5 border border-cream/5 flex items-start gap-4 max-w-4xl mx-auto">
          <AlertCircle className="w-6 h-6 text-brand-gold shrink-0 mt-0.5" />
          <div>
            <h4 className="font-serif font-bold text-sm text-cream">Nutritional & Sourcing Disclosure</h4>
            <p className="text-xs text-cream-lighter/55 mt-1 leading-relaxed">
              We work directly with domestic premium ranchers. Our ground cuts contain zero artificial binders or coloring elements. If you suffer from standard allergens, please inform our culinary cooks before placing your online grids.
            </p>
          </div>
        </div>

        {/* Floating Shopping Cart Status Pill (Resolves unused state, adds awesome UX) */}
        <div className="fixed bottom-6 right-6 z-40 bg-brand-orange text-cream-lighter px-5 py-3 rounded-full flex items-center gap-3 shadow-2xl shadow-brand-orange/40 border border-brand-gold/30 hover:scale-105 active:scale-95 transition-transform duration-200">
          <span className="text-[10px] uppercase tracking-widest font-black">Grill Cart</span>
          <span className="bg-[#0C0C0C] text-brand-gold px-2.5 py-0.5 rounded-full text-xs font-bold font-sans">
            {cartCount}
          </span>
        </div>

      </div>
    </div>
  );
}
