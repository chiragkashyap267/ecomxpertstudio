"use client";
import React from "react";
import { motion } from "motion/react";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: { text: string; image: string; name: string; role: string }[];
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
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-8 sm:p-10 rounded-3xl border border-blue-400/20 dark:border-white/10 bg-white/5 dark:bg-white/[0.03] shadow-lg shadow-sky-500/10 max-w-xs w-full transition-transform hover:scale-[1.02]" key={i}>
                  <div className="text-sm sm:text-base leading-6 text-slate-300 dark:text-white/80">{text}</div>
                  <div className="flex items-center gap-3 mt-6">
                    <img
                      width={48}
                      height={48}
                      src={image}
                      alt={name}
                      className="h-12 w-12 rounded-full border-2 border-sky-400/30 object-cover"
                    />
                    <div className="flex flex-col">
                      <div className="font-bold tracking-tight text-white">{name}</div>
                      <div className="text-xs text-sky-400/80 dark:text-cyber-cyan/80 tracking-tight">{role}</div>
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
