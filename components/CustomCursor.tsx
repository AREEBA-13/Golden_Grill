"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  // Mouse Coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring settings for ultra-smooth movement inertia
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      // Only unhide if we are not hovering over an input field
      const target = e.target as HTMLElement | null;
      const isOverInput = target && ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName);
      if (hidden && !isOverInput) setHidden(false);
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Dynamic listeners to handle links and inputs
    const addHoverListeners = () => {
      // 1. Elements that scale up the cursor (Links, buttons)
      const hoverTargets = document.querySelectorAll(
        'a, button, [role="button"], [data-cursor="hover"]'
      );
      
      hoverTargets.forEach((target) => {
        target.addEventListener("mouseenter", () => setHovered(true));
        target.addEventListener("mouseleave", () => setHovered(false));
      });

      // 2. Elements that hide the custom cursor (inputs, selects, textareas to use standard I-beam)
      const inputTargets = document.querySelectorAll("input, select, textarea");
      inputTargets.forEach((target) => {
        target.addEventListener("mouseenter", () => setHidden(true));
        target.addEventListener("mouseleave", () => setHidden(false));
      });
    };

    addHoverListeners();

    // Create an observer to bind listeners to dynamically loaded or modified DOM structures (e.g. step wizard toggles)
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [cursorX, cursorY, hidden]);

  if (!mounted || typeof window === "undefined") return null;

  // We only run custom cursor on desktop screens (>=1024px) to avoid touch delay on mobile
  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-brand-orange rounded-full pointer-events-none z-[999999] hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hovered ? 1.6 : 1,
          backgroundColor: hovered ? "rgba(234, 88, 12, 0.15)" : "rgba(234, 88, 12, 0)",
          borderColor: hovered ? "#EAB308" : "#EA580C", // Changes from orange to gold on hover
          opacity: hidden ? 0 : 1,
        }}
        transition={{ type: "tween", duration: 0.15 }}
      />
      {/* Core Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-brand-gold rounded-full pointer-events-none z-[1000000] mix-blend-screen hidden lg:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hovered ? 0.5 : 1,
          backgroundColor: hovered ? "#EA580C" : "#EAB308",
          opacity: hidden ? 0 : 1,
        }}
        transition={{ type: "tween", duration: 0.1 }}
      />
    </>
  );
}
