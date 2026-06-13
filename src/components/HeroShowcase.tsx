"use client";

import { motion } from "framer-motion";
import DynamicGridCell from "./DynamicGridCell";

const cell1Images = [
  "https://res.cloudinary.com/ds6xwzglf/image/upload/v1763814816/portfolio/mockups/buespofuusbrkpxzh2uj.jpg",
  "https://res.cloudinary.com/ds6xwzglf/image/upload/v1763814430/portfolio/mockups/buzdocutvne0jsumjqiu.jpg",
  "https://res.cloudinary.com/ds6xwzglf/image/upload/v1763814414/portfolio/mockups/ksz5rb71hdyrdzw2dawt.jpg"
];

const cell2Images = [
  "https://res.cloudinary.com/ds6xwzglf/image/upload/v1763814477/portfolio/mockups/mvdvvmiz2m2skpuhmyav.jpg",
  "https://res.cloudinary.com/ds6xwzglf/image/upload/v1763814510/portfolio/mockups/waydneutob2nrbrg4hwt.jpg",
  "https://res.cloudinary.com/ds6xwzglf/image/upload/v1763814804/portfolio/mockups/qyclwzwu2igjrrq6qs7o.jpg"
];

const cell3Images = [
  "https://res.cloudinary.com/ds6xwzglf/image/upload/v1763994137/portfolio/packaging/ycjo5rjjp73b02lbyglp.jpg",
  "https://res.cloudinary.com/ds6xwzglf/image/upload/v1763994140/portfolio/packaging/tothmcxuoeortk1sozoy.jpg",
  "https://res.cloudinary.com/ds6xwzglf/image/upload/v1763994142/portfolio/packaging/f88tsiklcgxztfa13hg2.jpg"
];

const cell4Images = [
  "https://res.cloudinary.com/ds6xwzglf/image/upload/v1763883539/portfolio/social/wrpohsm3xi7iefki3sri.jpg",
  "https://res.cloudinary.com/ds6xwzglf/image/upload/v1763883545/portfolio/social/irjfdmntzsqclmvl75g2.jpg",
  "https://res.cloudinary.com/ds6xwzglf/image/upload/v1763883550/portfolio/social/yxdm1bc45atuyztdalk1.jpg"
];

export default function HeroShowcase({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="relative w-full aspect-square md:aspect-[4/3] max-w-xl mx-auto grid grid-cols-2 grid-rows-2 gap-3 p-3">
      {/* Decorative background grid */}
      <div className="absolute inset-0 cyber-grid opacity-20 rounded-[2rem] -z-10" />
      
      {/* Cell 1: Large primary, spans 2 rows */}
      <motion.div 
        className="row-span-2 rounded-3xl overflow-hidden premium-panel premium-border shadow-2xl relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <DynamicGridCell 
          images={cell1Images} 
          intervalMs={4500} 
          delayOffsetMs={0} 
          className="w-full h-full"
        />
        <div className={`absolute inset-0 border-2 rounded-3xl transition-colors duration-500 pointer-events-none ${activeIndex === 0 ? "border-blue-500/50 dark:border-cyber-cyan/50" : "border-transparent"}`} />
      </motion.div>

      {/* Cell 2: Top right quadrant */}
      <motion.div 
        className="rounded-3xl overflow-hidden premium-panel premium-border shadow-xl relative"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <DynamicGridCell 
          images={cell2Images} 
          intervalMs={4200} 
          delayOffsetMs={1000} 
          className="w-full h-full"
        />
        <div className={`absolute inset-0 border-2 rounded-3xl transition-colors duration-500 pointer-events-none ${activeIndex === 1 ? "border-blue-500/50 dark:border-cyber-cyan/50" : "border-transparent"}`} />
      </motion.div>

      {/* Cells 3 & 4: Split bottom right quadrant */}
      <motion.div 
        className="grid grid-cols-2 gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="rounded-2xl overflow-hidden premium-panel premium-border shadow-lg relative">
          <DynamicGridCell 
            images={cell3Images} 
            intervalMs={3800} 
            delayOffsetMs={2000} 
            className="w-full h-full"
          />
          <div className={`absolute inset-0 border-2 rounded-2xl transition-colors duration-500 pointer-events-none ${activeIndex === 2 ? "border-purple-500/50 dark:border-cyber-cyan/50" : "border-transparent"}`} />
        </div>
        <div className="rounded-2xl overflow-hidden premium-panel premium-border shadow-lg relative">
          <DynamicGridCell 
            images={cell4Images} 
            intervalMs={4000} 
            delayOffsetMs={3000} 
            className="w-full h-full"
          />
          <div className={`absolute inset-0 border-2 rounded-2xl transition-colors duration-500 pointer-events-none ${activeIndex === 3 ? "border-rose-500/50 dark:border-cyber-cyan/50" : "border-transparent"}`} />
        </div>
      </motion.div>
    </div>
  );
}
