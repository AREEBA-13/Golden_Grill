"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, Flame, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Magnetic from "./Magnetic";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
  } = useCart();
  
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer on hitting escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCartOpen(false);
    };
    if (isCartOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isCartOpen, setCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-[#0C0C0C]/80 backdrop-blur-sm z-[9998] lg:cursor-none"
          />

          {/* Slide-out Drawer Panel */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
            className="fixed top-0 right-0 h-full w-full max-w-[480px] bg-charcoal-darker border-l border-cream/5 shadow-2xl z-[9999] flex flex-col justify-between select-none overflow-hidden"
          >
            {/* Header Block */}
            <div className="p-6 sm:p-8 border-b border-cream/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center">
                  <Flame className="w-5 h-5 text-cream-lighter" />
                </div>
                <div>
                  <h3 className="font-serif font-black text-xl text-cream tracking-tight">GRILL GRID CART</h3>
                  <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)} Items Added
                  </span>
                </div>
              </div>

              <button
                onClick={() => setCartOpen(false)}
                className="p-2 rounded-full hover:bg-cream/5 text-cream-lighter/70 hover:text-brand-orange transition-colors duration-200"
                aria-label="Close cart drawer"
              >
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            {/* Scrollable Cart Items Container */}
            <div className="flex-grow overflow-y-auto p-6 sm:p-8 custom-scrollbar">
              <AnimatePresence initial={false}>
                {cart.length === 0 ? (
                  /* Empty state */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center gap-5 py-20"
                  >
                    <div className="w-16 h-16 rounded-full border border-cream/10 flex items-center justify-center bg-charcoal-lighter/10 text-cream/45 shadow">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-lg text-cream">Grill is Cold!</h4>
                      <p className="text-xs text-cream-lighter/50 mt-1 max-w-[240px] mx-auto leading-relaxed">
                        Head over to our craft seared menu drops to add some woodfire steaks.
                      </p>
                    </div>
                    <Magnetic>
                      <Link
                        href="/menu"
                        onClick={() => setCartOpen(false)}
                        className="px-5 py-2.5 bg-brand-orange text-cream-lighter uppercase text-[10px] tracking-widest font-black rounded-full shadow"
                      >
                        Explore Menu
                      </Link>
                    </Magnetic>
                  </motion.div>
                ) : (
                  /* List state */
                  <div className="flex flex-col gap-5">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 80 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-center gap-4 bg-charcoal-lighter/15 border border-cream/5 p-4 rounded-2xl relative overflow-hidden group shadow-sm"
                      >
                        {/* Thumbnail Image */}
                        <div className="relative w-16 sm:w-20 h-16 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-cream/5">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover pointer-events-none"
                            sizes="80px"
                          />
                        </div>

                        {/* Middle info column */}
                        <div className="flex-grow min-w-0">
                          <span className="text-[8px] uppercase tracking-widest text-brand-gold font-bold">
                            {item.category}
                          </span>
                          <h4 className="font-serif font-bold text-sm sm:text-base text-cream truncate -mt-0.5">
                            {item.name}
                          </h4>
                          <span className="font-sans font-bold text-xs text-brand-orange block mt-1">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        {/* Side adjusters & remove trash actions */}
                        <div className="flex flex-col items-end gap-3.5 shrink-0">
                          {/* +/- Counter buttons */}
                          <div className="flex items-center bg-[#0C0C0C] border border-cream/5 rounded-lg overflow-hidden p-1 shadow-inner">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 hover:bg-cream/5 rounded text-cream-lighter/75 hover:text-brand-orange transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2 text-xs font-bold text-cream font-sans min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 hover:bg-cream/5 rounded text-cream-lighter/75 hover:text-brand-orange transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Trash button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1.5 rounded hover:bg-red-500/10 text-cream-lighter/45 hover:text-red-400 transition-colors"
                            aria-label="Remove item from cart"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Calculation Section */}
            {cart.length > 0 && (
              <div className="p-6 sm:p-8 bg-[#0C0C0C] border-t border-cream/5 flex flex-col gap-5">
                <div className="flex items-center justify-between text-cream">
                  <div>
                    <h5 className="font-serif font-bold text-sm">Estimated Subtotal</h5>
                    <span className="text-[9px] uppercase tracking-widest text-cream-lighter/40 block mt-0.5">
                      Taxes calculated at billing
                    </span>
                  </div>
                  <span className="font-serif font-black text-2xl text-brand-gold">
                    ${cartSubtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex gap-4">
                  <Magnetic range={35} strength={0.2}>
                    <Link
                      href="/checkout"
                      onClick={() => setCartOpen(false)}
                      className="w-full flex items-center justify-center gap-2 py-4 px-8 bg-brand-orange text-cream-lighter font-sans text-xs uppercase tracking-widest font-black rounded-xl overflow-hidden shadow-lg shadow-brand-orange/15 hover:shadow-brand-orange/25 group transition-all duration-300"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Proceed to Checkout <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </Magnetic>
                </div>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
