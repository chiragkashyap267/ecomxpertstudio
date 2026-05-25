"use client";

import { motion } from "framer-motion";
import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverScale?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  delay = 0,
  hoverScale = true,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hoverScale ? { y: -6, scale: 1.02 } : {}}
      className={`glass-panel rounded-2xl p-6 border border-white/5 bg-cyber-dark/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-cyber-cyan/35 hover:shadow-[0_8px_32px_rgba(0,240,255,0.06)] ${className}`}
    >
      {children}
    </motion.div>
  );
}
