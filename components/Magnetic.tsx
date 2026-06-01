"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticProps {
  children: React.ReactElement;
  range?: number; // How far the effect reaches
  strength?: number; // Pull intensity factor
}

export default function Magnetic({ children, range = 60, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Core center of the component
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Distance from cursor to center
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Calculate if cursor is inside interactive range
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < range) {
      // Attract the element slightly towards the cursor
      setPosition({ x: distanceX * strength, y: distanceY * strength });
    } else {
      // Return to baseline position
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.div
        animate={{ x, y }}
        transition={{ type: "spring", damping: 15, stiffness: 150, mass: 0.1 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
