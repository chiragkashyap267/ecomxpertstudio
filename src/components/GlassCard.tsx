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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hoverScale ? { y: -4 } : undefined}
      className={`premium-panel premium-border rounded-lg p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}
