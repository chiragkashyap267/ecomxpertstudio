import React from "react";
import { Sparkles, Hexagon, Triangle, Circle, Square, Star, Box } from "lucide-react";

const placeholderLogos = [
  { name: "Apex Global", icon: Triangle },
  { name: "Nexus Systems", icon: Hexagon },
  { name: "Vanguard", icon: Star },
  { name: "Quantum", icon: Box },
  { name: "Horizon", icon: Circle },
  { name: "Acme Corp", icon: Square },
  { name: "Aura Tech", icon: Sparkles },
];

export function LogoMarquee() {
  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden py-16 border-b border-blue-100 dark:border-white/5 bg-white dark:bg-slate-950/30">
      <p className="mb-10 text-center text-xs font-bold uppercase tracking-[0.25em] text-slate-400 dark:text-white/40">
        Trusted by ambitious brands worldwide
      </p>

      {/* Marquee container with fade edges */}
      <div className="relative flex w-full max-w-[100vw] overflow-hidden bg-transparent">
        {/* Left Fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-1/4 bg-gradient-to-r from-white dark:from-[#020617] to-transparent"></div>
        {/* Right Fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-1/4 bg-gradient-to-l from-white dark:from-[#020617] to-transparent"></div>

        {/* Marquee Track */}
        <div className="flex animate-[marquee_30s_linear_infinite] items-center whitespace-nowrap">
          {/* Repeat the array a few times for seamless infinite scroll */}
          {[...placeholderLogos, ...placeholderLogos, ...placeholderLogos, ...placeholderLogos].map(
            (logo, idx) => (
              <div
                key={idx}
                className="mx-8 sm:mx-14 flex items-center gap-3 text-slate-400 dark:text-white/30 transition-colors duration-300 hover:text-blue-600 dark:hover:text-white/70"
              >
                <logo.icon className="h-7 w-7" strokeWidth={1.5} />
                <span className="font-display text-2xl font-black tracking-tight">
                  {logo.name}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
