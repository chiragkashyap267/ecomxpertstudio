"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  Target, 
  Terminal, 
  CheckCircle2, 
  Compass, 
  Zap, 
  Code 
} from "lucide-react";
import GlassCard from "@/components/GlassCard";

// Skill nodes with progress levels
const SKILL_NODES = [
  { name: "Next.js 15 & React Development", level: 98, desc: "High-performance dynamic systems." },
  { name: "UI/UX Apple-Stripe Interface Design", level: 95, desc: "Ultra-premium glassmorphism templates." },
  { name: "3D Product Mockups & Rendering", level: 90, desc: "Blender matrices and textured shadows." },
  { name: "Cinematic Video Editing & Motion", level: 88, desc: "High-tempo Reels and vector elements." }
];

// Structural timeline milestones
const MILESTONES = [
  {
    year: "2024",
    title: "Project Genesis",
    desc: "EcomXpertStudio is founded as a specialized freelance digital hub, serving early e-commerce startups with responsive Shopify nodes and visual layouts."
  },
  {
    year: "2025",
    title: "Framework Shift",
    desc: "Migrated our entire web stack to Next.js App Router and Tailwind CSS, scaling load speeds and enabling full-stack custom SaaS node architectures."
  },
  {
    year: "2026",
    title: "Futuristic Studio Launch",
    desc: "Expanded into a dedicated high-end digital agency. Deploying luxury 3D mockups, cinematic video reels, and complex AI bot nodes for global startups."
  }
];

export default function AboutPage() {
  return (
    <div className="relative z-10 mx-auto w-[90%] max-w-5xl px-4 py-12">
      
      {/* Header */}
      <div className="text-center mb-20">
        <span className="text-[10px] font-bold tracking-widest text-cyber-cyan uppercase border border-cyber-cyan/30 bg-cyber-cyan/5 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(0,240,255,0.05)]">
          Node Identity
        </span>
        <h1 className="mt-6 font-display text-4xl font-black text-white sm:text-6xl md:text-7xl">
          We Design & Code
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/50">
          EcomXpertStudio operates at the boundary where high-performance engineering meets world-class design aesthetics. We construct premium interfaces for digital brands.
        </p>
      </div>

      {/* Founder & Studio Statement grid */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 mb-20 text-left">
        <GlassCard className="p-8 border border-white/5 bg-cyber-dark/45" hoverScale={false}>
          <div className="flex items-center space-x-2 font-mono text-xs text-cyber-cyan mb-4">
            <Target className="h-4.5 w-4.5" />
            <span>STUDIO_MISSION_STMT</span>
          </div>
          <h2 className="font-display text-xl font-black text-white mb-4">
            High-Performance Aesthetics
          </h2>
          <p className="text-xs text-white/50 leading-relaxed space-y-3">
            Our goal is simple: to make your digital product feel premium, interactive, and beautifully responsive. We believe average design is a liability. 
            <br /><br />
            By using Next.js 15 App Router structures, complex vector transitions, and beautiful custom 3D details, we deliver products that command user attention.
          </p>
        </GlassCard>

        <GlassCard className="p-8 border border-white/5 bg-cyber-dark/45" hoverScale={false}>
          <div className="flex items-center space-x-2 font-mono text-xs text-cyber-cyan mb-4">
            <Users className="h-4.5 w-4.5" />
            <span>FOUNDER_LOGS</span>
          </div>
          <h2 className="font-display text-xl font-black text-white mb-4">
            The Creative Nodes
          </h2>
          <p className="text-xs text-white/50 leading-relaxed">
            Founded by a collective of visual experts and senior developers, EcomXpertStudio functions as a unified node. We bypass slow corporate meetings to code premium interfaces directly.
          </p>
          <div className="mt-6 border-t border-white/5 pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-white/60">
              <span className="font-semibold">Lead Developer Node:</span>
              <span>Chirag Kashyap</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span className="font-semibold">Studio Location:</span>
              <span>San Francisco Node</span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Skills Node progress markers */}
      <div className="mb-24 text-left">
        <div className="mb-10 text-center">
          <span className="text-[9px] font-mono font-bold tracking-widest text-cyber-cyan uppercase block mb-2">
            CORE PROFICIENCIES
          </span>
          <h2 className="font-display text-2xl font-black text-white sm:text-3xl">
            Technical & Artistic Matrix
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {SKILL_NODES.map((skill, index) => (
            <GlassCard key={skill.name} delay={index * 0.1} className="p-6 border border-white/5" hoverScale={false}>
              <div className="flex justify-between items-center mb-2 font-display text-sm font-bold text-white">
                <span>{skill.name}</span>
                <span className="text-cyber-cyan font-mono text-xs">{skill.level}%</span>
              </div>
              <p className="text-[10px] text-white/40 mb-4">{skill.desc}</p>
              
              {/* Glow progress bar */}
              <div className="relative h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-cyber-blue to-cyber-cyan shadow-[0_0_8px_#00f0ff]"
                />
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="text-left">
        <div className="mb-16 text-center">
          <span className="text-[9px] font-mono font-bold tracking-widest text-cyber-cyan uppercase block mb-2">
            CHRONOLOGICAL MILESTONES
          </span>
          <h2 className="font-display text-2xl font-black text-white sm:text-3xl">
            Our Journey Node
          </h2>
        </div>

        <div className="relative border-l border-white/10 pl-6 sm:pl-10 space-y-12 ml-4">
          {MILESTONES.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              key={item.year}
              className="relative"
            >
              {/* Cyber target dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-cyber-dark border-2 border-cyber-cyan shadow-[0_0_8px_#00f0ff]">
                <div className="h-1 w-1 rounded-full bg-cyber-cyan" />
              </div>

              <GlassCard className="p-6 border border-white/5 bg-cyber-dark/30 hover:border-cyber-cyan" hoverScale={false}>
                <span className="font-mono text-xs font-bold text-cyber-cyan">
                  {item.year} Milestone
                </span>
                <h3 className="font-display text-lg font-black text-white mt-1 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed">
                  {item.desc}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
