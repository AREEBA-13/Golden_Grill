"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { MapPin, Phone, Mail, User, CreditCard, ShieldCheck, ArrowRight, ArrowLeft, ShoppingBag, Flame, Sparkles, Check } from "lucide-react";
import Magnetic from "@/components/Magnetic";

export default function Checkout() {
  const { cart, cartSubtotal, clearCart } = useCart();
  
  // Checkout Form State
  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">("pickup");
  const [pickupSpot, setPickupSpot] = useState("The Foundry (Flagship)");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  
  // Card Inputs
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Order Placement State
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Computations
  const deliveryFee = deliveryMethod === "delivery" ? 5.00 : 0.00;
  const taxFee = cartSubtotal * 0.08; // 8% Sales Tax
  const grandTotal = cartSubtotal + deliveryFee + taxFee;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      // Simulate gourmet seared checkout delay
      setIsPlacingOrder(true);
      setTimeout(() => {
        setIsPlacingOrder(false);
        setOrderId(`GG-${Math.floor(10000 + Math.random() * 90000)}`);
        setOrderPlaced(true);
        clearCart();
      }, 1500);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="bg-[#0C0C0C] min-h-[80vh] flex flex-col items-center justify-center text-center p-6">
        <div className="w-16 h-16 rounded-full border border-cream/10 flex items-center justify-center bg-charcoal-lighter/10 text-cream/45 shadow mb-6">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif font-black text-3xl text-cream tracking-tight">Your Cart is Cold</h2>
        <p className="text-sm text-cream-lighter/50 mt-2 max-w-[280px] leading-relaxed">
          Please add gourmet smash cuts to your grid before proceeding to checkout.
        </p>
        <Magnetic>
          <Link
            href="/menu"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-orange text-cream-lighter font-sans text-xs uppercase tracking-widest font-black rounded-full overflow-hidden shadow-lg shadow-brand-orange/15 mt-8"
          >
            Go to Menu
          </Link>
        </Magnetic>
      </div>
    );
  }

  return (
    <div className="bg-[#0C0C0C] min-h-screen py-16 px-6 md:px-12 relative overflow-hidden bg-noise">
      {/* Decorative Ornaments */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-brand-gold/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-12">
          <Link href="/menu" className="inline-flex items-center gap-1.5 text-xs text-cream-lighter/55 hover:text-brand-orange transition-colors duration-200 uppercase tracking-widest font-bold">
            <ArrowLeft className="w-4 h-4" /> Back to Grid Menu
          </Link>
          <h1 className="font-serif font-black text-4xl sm:text-6xl text-cream mt-4 tracking-tight leading-none">
            SECURE <span className="text-brand-orange">CHECKOUT</span>
          </h1>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form steps (7 Columns) */}
          <div className="lg:col-span-7">
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between bg-charcoal-lighter/10 border border-cream/5 rounded-2xl p-4 sm:p-5 mb-8 backdrop-blur">
              {[
                { number: 1, label: "Contact" },
                { number: 2, label: "Method" },
                { number: 3, label: "Payment" },
              ].map((s) => (
                <div key={s.number} className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-sans text-xs font-black transition-all duration-300 ${
                      step >= s.number
                        ? "bg-brand-orange text-cream-lighter shadow shadow-brand-orange/25"
                        : "bg-charcoal text-cream-lighter/40 border border-cream/5"
                    }`}
                  >
                    {step > s.number ? <Check className="w-3.5 h-3.5" /> : s.number}
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs uppercase tracking-widest font-bold transition-colors ${
                      step >= s.number ? "text-cream" : "text-cream-lighter/45"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Steps Form */}
            <form onSubmit={handleNextStep} className="glassmorphism rounded-3xl p-6 sm:p-8 border border-cream/5 shadow-xl flex flex-col gap-6">
              
              <AnimatePresence mode="wait">
                {step === 1 && (
                  /* Step 1: Contact Details */
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-5"
                  >
                    <div>
                      <h3 className="font-serif font-bold text-lg text-cream">Contact Information</h3>
                      <p className="text-[10px] text-cream-lighter/45 uppercase tracking-wider mt-0.5">
                        Tell us where to send receipts and drop warnings
                      </p>
                    </div>

                    <div className="flex flex-col gap-4 mt-2">
                      <div className="relative">
                        <label className="absolute left-4 top-3 text-[9px] uppercase tracking-wider text-cream-lighter/45 font-black">Name</label>
                        <User className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-lighter/35" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Mason Reed"
                          className="w-full pt-6 pb-2 px-4 bg-charcoal border border-cream/10 rounded-xl text-sm text-cream-lighter placeholder-cream-lighter/25 focus:outline-none focus:border-brand-orange/60 transition-colors"
                        />
                      </div>

                      <div className="relative">
                        <label className="absolute left-4 top-3 text-[9px] uppercase tracking-wider text-cream-lighter/45 font-black">Phone Number</label>
                        <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-lighter/35" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(555) SMASH-IT"
                          className="w-full pt-6 pb-2 px-4 bg-charcoal border border-cream/10 rounded-xl text-sm text-cream-lighter placeholder-cream-lighter/25 focus:outline-none focus:border-brand-orange/60 transition-colors"
                        />
                      </div>

                      <div className="relative">
                        <label className="absolute left-4 top-3 text-[9px] uppercase tracking-wider text-cream-lighter/45 font-black">Email Address</label>
                        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-lighter/35" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="mason@nuvix.com"
                          className="w-full pt-6 pb-2 px-4 bg-charcoal border border-cream/10 rounded-xl text-sm text-cream-lighter placeholder-cream-lighter/25 focus:outline-none focus:border-brand-orange/60 transition-colors"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  /* Step 2: Delivery Method */
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-5"
                  >
                    <div>
                      <h3 className="font-serif font-bold text-lg text-cream">Searing Handover</h3>
                      <p className="text-[10px] text-cream-lighter/45 uppercase tracking-wider mt-0.5">
                        Choose your handcrafted pickup spot or home delivery drop
                      </p>
                    </div>

                    {/* Toggle pill buttons */}
                    <div className="flex bg-[#0C0C0C] border border-cream/5 rounded-full overflow-hidden p-1 shadow-inner mt-2">
                      <button
                        type="button"
                        onClick={() => setDeliveryMethod("pickup")}
                        className={`flex-1 text-center py-3 rounded-full font-sans text-xs uppercase tracking-widest font-black transition-colors ${
                          deliveryMethod === "pickup"
                            ? "bg-brand-orange text-cream-lighter shadow"
                            : "text-cream-lighter/55 hover:text-cream"
                        }`}
                      >
                        Store Pick-up
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeliveryMethod("delivery")}
                        className={`flex-1 text-center py-3 rounded-full font-sans text-xs uppercase tracking-widest font-black transition-colors ${
                          deliveryMethod === "delivery"
                            ? "bg-brand-orange text-cream-lighter shadow"
                            : "text-cream-lighter/55 hover:text-cream"
                        }`}
                      >
                        Home Delivery (+$5)
                      </button>
                    </div>

                    <div className="flex flex-col gap-4 mt-4">
                      {deliveryMethod === "pickup" ? (
                        <div className="relative">
                          <label className="absolute left-4 top-3 text-[9px] uppercase tracking-wider text-cream-lighter/45 font-black">Select Pickup Flagship</label>
                          <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold animate-bounce" />
                          <select
                            value={pickupSpot}
                            onChange={(e) => setPickupSpot(e.target.value)}
                            className="w-full pt-6 pb-2 px-4 bg-charcoal border border-cream/10 rounded-xl text-sm text-cream-lighter focus:outline-none focus:border-brand-orange/60 transition-colors appearance-none"
                          >
                            <option value="The Foundry (Flagship)">The Foundry (Flagship) - Downtown Core</option>
                            <option value="The Coal Yards">The Coal Yards - Industrial District</option>
                            <option value="The Neon Arch">The Neon Arch - East Harbors</option>
                          </select>
                        </div>
                      ) : (
                        <>
                          <div className="relative">
                            <label className="absolute left-4 top-3 text-[9px] uppercase tracking-wider text-cream-lighter/45 font-black">Delivery Street Address</label>
                            <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-lighter/35" />
                            <input
                              type="text"
                              required
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              placeholder="742 Evergreen Terrace, Springfield"
                              className="w-full pt-6 pb-2 px-4 bg-charcoal border border-cream/10 rounded-xl text-sm text-cream-lighter placeholder-cream-lighter/25 focus:outline-none focus:border-brand-orange/60 transition-colors"
                            />
                          </div>

                          <div className="relative">
                            <label className="absolute left-4 top-3 text-[9px] uppercase tracking-wider text-cream-lighter/45 font-black">Culinary Drop Notes (Optional)</label>
                            <input
                              type="text"
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              placeholder="Leave on porch table, dial 104 at gate"
                              className="w-full pt-6 pb-2 px-4 bg-charcoal border border-cream/10 rounded-xl text-sm text-cream-lighter placeholder-cream-lighter/25 focus:outline-none focus:border-brand-orange/60 transition-colors"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  /* Step 3: Payment Mock */
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-5"
                  >
                    <div>
                      <h3 className="font-serif font-bold text-lg text-cream">Billing Mock</h3>
                      <p className="text-[10px] text-cream-lighter/45 uppercase tracking-wider mt-0.5">
                        Simulating secure checkout. Do not enter actual credentials.
                      </p>
                    </div>

                    {/* Highly premium interactive credit card mockup */}
                    <div className="relative w-full aspect-[1.58] max-w-sm mx-auto rounded-2xl bg-gradient-to-tr from-brand-orange via-brand-gold to-brand-orange p-6 text-cream-lighter shadow-xl flex flex-col justify-between select-none overflow-hidden group">
                      {/* Decorative seared grid overlay in card */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(12,12,12,0.15)_1px,transparent_1px)] bg-[size:100%_8px] pointer-events-none" />
                      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />

                      <div className="flex justify-between items-start">
                        <Flame className="w-8 h-8 text-cream-lighter" />
                        <span className="font-sans font-black text-xs uppercase tracking-widest border border-cream/35 px-2 py-0.5 rounded">
                          GOLD GRID
                        </span>
                      </div>

                      <div className="mt-8">
                        <span className="font-mono text-lg sm:text-2xl tracking-[0.1em] block truncate">
                          {cardNumber ? cardNumber.replace(/(\d{4})/g, "$1 ").trim() : "•••• •••• •••• ••••"}
                        </span>
                      </div>

                      <div className="flex justify-between items-end mt-4">
                        <div>
                          <span className="text-[7px] uppercase tracking-wider text-cream/60 block">Grill Master Name</span>
                          <span className="font-serif font-bold text-sm tracking-wide block truncate max-w-[180px]">
                            {name ? name.toUpperCase() : "MASON REED"}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[7px] uppercase tracking-wider text-cream/60 block">VALID THRU</span>
                          <span className="font-mono text-sm block">
                            {cardExpiry ? cardExpiry : "12/29"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                      <div className="relative sm:col-span-2">
                        <label className="absolute left-4 top-3 text-[9px] uppercase tracking-wider text-cream-lighter/45 font-black">Card Number</label>
                        <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-lighter/35" />
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          maxLength={16}
                          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
                          placeholder="4111222233334444"
                          className="w-full pt-6 pb-2 px-4 bg-charcoal border border-cream/10 rounded-xl text-sm text-cream-lighter placeholder-cream-lighter/25 focus:outline-none focus:border-brand-orange/60 transition-colors"
                        />
                      </div>

                      <div className="relative">
                        <label className="absolute left-4 top-3 text-[9px] uppercase tracking-wider text-cream-lighter/45 font-black">Expiry Date</label>
                        <input
                          type="text"
                          required
                          value={cardExpiry}
                          maxLength={5}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full pt-6 pb-2 px-4 bg-charcoal border border-cream/10 rounded-xl text-sm text-cream-lighter placeholder-cream-lighter/25 focus:outline-none focus:border-brand-orange/60 transition-colors"
                        />
                      </div>

                      <div className="relative">
                        <label className="absolute left-4 top-3 text-[9px] uppercase tracking-wider text-cream-lighter/45 font-black">CVV Code</label>
                        <input
                          type="password"
                          required
                          value={cardCvv}
                          maxLength={3}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                          placeholder="•••"
                          className="w-full pt-6 pb-2 px-4 bg-charcoal border border-cream/10 rounded-xl text-sm text-cream-lighter placeholder-cream-lighter/25 focus:outline-none focus:border-brand-orange/60 transition-colors"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Wizard Steps Control Buttons */}
              <div className="flex items-center justify-between border-t border-cream/5 pt-6 mt-4">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-cream/10 hover:border-cream/35 text-xs text-cream uppercase tracking-widest font-bold transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                ) : (
                  <div />
                )}

                <Magnetic range={35}>
                  <button
                    type="submit"
                    disabled={isPlacingOrder}
                    className="inline-flex items-center gap-2 py-3 px-8 bg-brand-orange text-cream-lighter font-sans text-xs uppercase tracking-widest font-black rounded-xl overflow-hidden shadow-lg shadow-brand-orange/15 hover:shadow-brand-orange/25 group transition-all duration-300"
                  >
                    {isPlacingOrder ? (
                      <span>Placing Order...</span>
                    ) : (
                      <>
                        <span>{step === 3 ? "Place Order" : "Continue"}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </Magnetic>
              </div>

            </form>
          </div>

          {/* Right Column: Sticky Order Summary Sidebar (5 Columns) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="glassmorphism rounded-3xl p-6 sm:p-8 border border-cream/5 shadow-xl flex flex-col gap-6 select-none relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 blur-xl pointer-events-none" />

              <div>
                <h3 className="font-serif font-black text-xl text-cream tracking-tight uppercase">Order Summary</h3>
                <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold block mt-0.5">
                  Dry-Aged cuts in your current grid
                </span>
              </div>

              {/* Scrollable list inside sidebar */}
              <div className="flex flex-col gap-4 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3.5 bg-charcoal-lighter/10 border border-cream/5 p-3 rounded-xl">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-cream/5">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover pointer-events-none"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="font-serif font-bold text-xs text-cream truncate">{item.name}</h4>
                      <span className="text-[9px] text-cream-lighter/45 uppercase tracking-wider block mt-0.5">
                        Qty: {item.quantity}
                      </span>
                    </div>
                    <span className="font-sans font-bold text-xs text-brand-gold shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculations */}
              <div className="flex flex-col gap-3 pt-5 border-t border-cream/5 text-xs text-cream-lighter/60">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-cream font-bold">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Surcharge:</span>
                  <span className="text-cream font-bold">
                    {deliveryMethod === "delivery" ? `$${deliveryFee.toFixed(2)}` : "FREE"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Sales Tax (8%):</span>
                  <span className="text-cream font-bold">${taxFee.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center pt-5 border-t border-cream/5 text-cream mt-2">
                  <span className="font-serif font-bold text-sm">Grand Total:</span>
                  <span className="font-serif font-black text-2xl text-brand-gold">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Secure checkout assurance banner */}
              <div className="flex items-center gap-3 bg-[#0C0C0C] border border-cream/5 rounded-xl p-3.5 mt-2">
                <ShieldCheck className="w-5 h-5 text-green-500 shrink-0" />
                <span className="text-[10px] text-cream-lighter/55 leading-relaxed">
                  Every order drop runs on grid seared woodfire algorithms. Encrypted seared checkout.
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* FULL-SCREEN PLACED SUCCESS CONFETTI OVERLAY */}
      <AnimatePresence>
        {orderPlaced && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0C0C0C]/95 backdrop-blur z-[10005] flex flex-col items-center justify-center text-center p-6 lg:cursor-none select-none overflow-hidden"
          >
            {/* Ambient decorative glowing spots */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-orange/5 blur-3xl pointer-events-none rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-gold/5 blur-3xl pointer-events-none rounded-full" />

            <div className="max-w-md w-full relative z-10 flex flex-col items-center gap-6">
              
              {/* Checkmark drawing victory vector SVG */}
              <div className="relative w-24 h-24 bg-brand-orange/10 border border-brand-orange/30 rounded-full flex items-center justify-center shadow-lg shadow-brand-orange/10">
                <motion.svg
                  className="w-12 h-12"
                  viewBox="0 0 52 52"
                  initial="hidden"
                  animate="visible"
                >
                  <motion.circle
                    cx="26"
                    cy="26"
                    r="23"
                    stroke="#EAB308"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M16 27l7.5 7.5 16-16"
                    stroke="#EA580C"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.6, ease: "easeInOut" }}
                  />
                </motion.svg>
              </div>

              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-gold text-[9px] uppercase tracking-widest font-black mb-3"
                >
                  <Sparkles className="w-3.5 h-3.5 animate-bounce" />
                  <span>Grill Searing Placed</span>
                </motion.div>
                
                <h2 className="font-serif font-black text-4xl sm:text-5xl text-cream tracking-tight leading-none uppercase">
                  ORDER PLACED!
                </h2>
                
                <p className="text-xs text-cream-lighter/60 mt-3 max-w-sm mx-auto leading-relaxed">
                  Your dry-aged smash drops have been seared to the grid! Our cooks have already launched your woodfire prep.
                </p>
              </div>

              {/* Order specifications card */}
              <div className="w-full bg-charcoal border border-cream/5 rounded-2xl p-5 shadow flex flex-col gap-4 text-xs text-cream-lighter/75 mt-4">
                <div className="flex justify-between items-center border-b border-cream/5 pb-3">
                  <span>Order Reference ID:</span>
                  <span className="font-sans font-black text-brand-gold uppercase tracking-wider">{orderId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Estimated Handover Time:</span>
                  <span className="font-sans font-black text-brand-orange">
                    {deliveryMethod === "delivery" ? "30 - 40 Mins" : "15 - 20 Mins"}
                  </span>
                </div>
                <div className="text-[10px] text-cream-lighter/45 mt-1 border-t border-cream/5 pt-3 leading-relaxed text-center">
                  Receipt and tracking updates seared directly to <span className="text-cream-lighter font-semibold">{email ? email : "your inbox"}</span>.
                </div>
              </div>

              {/* Return CTA */}
              <div className="mt-6 w-full">
                <Magnetic range={35}>
                  <Link
                    href="/"
                    className="w-full flex items-center justify-center gap-2 py-4 px-8 bg-brand-orange text-cream-lighter font-sans text-xs uppercase tracking-widest font-black rounded-xl overflow-hidden shadow-lg shadow-brand-orange/15 group"
                  >
                    <span>Return to Home Grid</span>
                  </Link>
                </Magnetic>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
