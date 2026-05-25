"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LOGS = [
  "SYSTEM: INITIALIZING CORE SHADERS...",
  "SYSTEM: CONNECTING TO ECOMXPERTSTUDIO SECURE PORTAL...",
  "RENDERER: SPINNING UP GSAP ACCELERATION ENGINES...",
  "SCROLL: ENGAGING LENIS SMOOTH 60FPS WRAPPERS...",
  "PORTFOLIO: CACHING ULTRA-MODERN GLASS MOCKUPS...",
  "BRAND: DEPLOYING CREATIVE GROWTH STRATEGIES...",
  "STATUS: CONNECTION ESTABLISHED. ALL SYSTEMS OPTIMAL.",
];

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [currentLogIdx, setCurrentLogIdx] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Check if the user has already loaded the page in this session
    // (Optional: can be disabled to show loader every refresh for maximum WOW factor)
    const hasLoaded = sessionStorage.getItem("ecomxpert-loaded");
    if (hasLoaded) {
      setProgress(100);
      setIsDone(true);
      return;
    }

    // Increment progress counter
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          sessionStorage.setItem("ecomxpert-loaded", "true");
          setTimeout(() => setIsDone(true), 600); // Small pause at 100% for aesthetic balance
          return 100;
        }
        // Speed up near the end
        const increment = prev > 80 ? 4 : prev > 50 ? 3 : 2;
        return Math.min(prev + increment, 100);
      });
    }, 40);

    // Rotate log messages based on progress thresholds
    const logInterval = setInterval(() => {
      setCurrentLogIdx((prev) => {
        if (prev < BOOT_LOGS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 300);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, []);

  if (isDone) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0, 
          y: -100,
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
        }}
        className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#02040a] px-6 font-mono select-none"
      >
        {/* Subtle decorative futuristic corner borders */}
        <div className="absolute top-8 left-8 h-4 w-4 border-t-2 border-l-2 border-cyber-cyan/30" />
        <div className="absolute top-8 right-8 h-4 w-4 border-t-2 border-r-2 border-cyber-cyan/30" />
        <div className="absolute bottom-8 left-8 h-4 w-4 border-b-2 border-l-2 border-cyber-cyan/30" />
        <div className="absolute bottom-8 right-8 h-4 w-4 border-b-2 border-r-2 border-cyber-cyan/30" />

        {/* Global glowing green orb in background */}
        <div className="absolute h-96 w-96 rounded-full bg-cyber-cyan/3 blur-[120px] pointer-events-none" />

        <div className="w-full max-w-xl">
          {/* Studio Header Brand */}
          <div className="mb-10 text-center">
            <h1 className="font-display text-2xl font-bold tracking-wider text-white">
              ECOM<span className="text-cyber-cyan">XPERT</span>STUDIO
            </h1>
            <p className="mt-1 text-xs tracking-widest text-cyber-cyan/50 uppercase">
              Digital Growth Experts // System Boot v1.5.0
            </p>
          </div>

          {/* Terminal Box */}
          <div className="mb-6 rounded-lg border border-cyber-cyan/15 bg-black/60 p-5 shadow-[0_0_20px_rgba(0,240,255,0.03)] backdrop-blur-md">
            <div className="flex items-center space-x-2 border-b border-cyber-cyan/10 pb-3 text-xs text-cyber-cyan/40">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-cyber-cyan/60" />
              <span className="ml-2">console@ecomxpert: ~/boot</span>
            </div>

            {/* Simulated Live Logs */}
            <div className="mt-4 h-28 overflow-hidden text-[10px] sm:text-xs text-cyber-cyan/80 leading-relaxed">
              {BOOT_LOGS.slice(0, currentLogIdx + 1).map((log, index) => (
                <div key={index} className="flex items-start space-x-2 truncate">
                  <span className="text-cyber-cyan/40">&gt;&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
              {currentLogIdx < BOOT_LOGS.length - 1 && (
                <div className="flex items-center space-x-1 mt-1 text-cyber-cyan animate-pulse">
                  <span>_</span>
                </div>
              )}
            </div>
          </div>

          {/* Glowing Neon Cyber Progress Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-white tracking-widest">
              <span className="text-cyber-cyan/70 uppercase">BOOTING INTERFACE</span>
              <span className="text-cyber-cyan font-mono">{String(progress).padStart(3, "0")}%</span>
            </div>
            
            {/* Outermost container */}
            <div className="relative h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
              {/* Actual Loading Bar */}
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyber-blue to-cyber-cyan shadow-[0_0_12px_#00f0ff]"
                style={{ width: `${progress}%` }}
                layoutId="loader-bar"
              />
            </div>
          </div>
        </div>

        {/* Studio bottom metadata */}
        <div className="absolute bottom-8 text-center text-[9px] tracking-widest text-white/30 uppercase">
          &copy; 2026 EcomXpertStudio. All rights reserved. SECURE CYBER SYSTEM.
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
