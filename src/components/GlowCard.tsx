"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  tiltActive?: boolean;
  hoverScale?: boolean;
}

export default function GlowCard({
  children,
  className = "",
  delay = 0,
  tiltActive = true,
  hoverScale = true,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    if (tiltActive) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      setRotateX(-((y - centerY) / centerY) * 2.5);
      setRotateY(((x - centerX) / centerX) * 2.5);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={hoverScale ? { y: -5 } : undefined}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className={`premium-panel premium-border relative h-full overflow-hidden rounded-lg p-6 ${className}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(360px circle at ${coords.x}px ${coords.y}px, rgba(25, 230, 255, 0.12), transparent 48%)`,
          }}
        />
        <div className="relative z-10" style={{ transform: "translateZ(18px)" }}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
