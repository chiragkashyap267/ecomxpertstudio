"use client";
import React from "react";
import { motion } from "motion/react";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: { text: string; name: string; role: string; image?: string }[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent"
        style={{ willChange: "transform", WebkitFontSmoothing: "antialiased" }}
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, name, role }, i) => (
                <div
                  className="p-8 sm:p-10 rounded-3xl border border-blue-200 dark:border-white/10 bg-white dark:bg-white/[0.03] shadow-lg shadow-sky-500/10 max-w-xs w-full transition-transform hover:scale-[1.02]"
                  key={i}
                >
                  <div className="text-sm sm:text-base leading-6 text-slate-700 dark:text-white/80">
                    {text}
                  </div>
                  <div className="flex items-center gap-3 mt-6">
                    {/* Accent dot instead of avatar */}
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-sky-400 dark:bg-cyber-cyan shadow-[0_0_8px_rgba(14,165,233,0.7)]" />
                    <div className="flex flex-col">
                      <div className="font-bold tracking-tight text-slate-900 dark:text-white">
                        {name}
                      </div>
                      <div className="text-xs text-sky-500 dark:text-cyber-cyan/80 tracking-tight">
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
