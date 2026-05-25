"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Filter, Cpu, CheckCircle } from "lucide-react";
import GlassCard from "@/components/GlassCard";

// Categories mapping
const CATEGORIES = [
  "All", "Mockups", "Packaging Design", "Infographics", "A+ Content", "Web Apps", "Websites", "Branding"
];

// High fidelity simulated projects
const PROJECTS = [
  {
    id: 1,
    title: "Aura Premium Package System",
    category: "Packaging Design",
    client: "Aura Skincare Co.",
    year: "2026",
    scope: "3D Rendering, Structural Box Layout, Visual Typography",
    tech: ["Blender 3D", "Illustrator", "Keyshot"],
    img: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=80",
    desc: "A sleek luxury packaging system developed for Aura's anti-aging serum line. Features glass bottles with custom physical dimensions, metallic cyan debossing detailing, and biodegradable container meshes.",
    outcome: "Boosted product shelf-appeal by 60% and secured listing in major premium retail nodes."
  },
  {
    id: 2,
    title: "Vertex SaaS Console Hub",
    category: "Web Apps",
    client: "Vertex Systems Inc.",
    year: "2026",
    scope: "Next.js Frontend, Dashboard UI/UX, Live WebSockets",
    tech: ["Next.js 15", "React.js", "Tailwind CSS", "Prisma"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    desc: "A premium admin interface built for real-time monitoring of machine-learning execution chains. Features smooth responsive graphics, custom HSL styling setups, and buttery 60fps framer animations.",
    outcome: "Reduced user telemetry dashboard load times by 75% and raised system retention stats."
  },
  {
    id: 3,
    title: "Amazon A+ Premium Brand Story",
    category: "A+ Content",
    client: "Zenith Coffee roasters",
    year: "2025",
    scope: "Visual Storyboards, Photographic Color Corrects, Listings Infographics",
    tech: ["Photoshop", "Illustrator", "Figma"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    desc: "Full-scale custom Amazon A+ content mapping for organic coffee roast blends. Creates highly engaging product comparison matrices, custom vector icons, and bold typographical banners that appeal directly to luxury shoppers.",
    outcome: "Raised listings click-through-rate (CTR) by 32% and increased product order quantities."
  },
  {
    id: 4,
    title: "Vapor Cosmetics 3D Flasks",
    category: "Mockups",
    client: "Vapor Labs Inc.",
    year: "2026",
    scope: "3D Product Renderings, Ambient Lighting setups, Material Textures",
    tech: ["Blender 3D", "Photoshop"],
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    desc: "High-end product visual design for a futuristic makeup fluid flask. Implements custom cyber neon gradient overlays, frosted plastic textures, and precise physical light-refraction simulations.",
    outcome: "Delivered highly premium promotional visuals that generated 50K pre-orders."
  },
  {
    id: 5,
    title: "EcomXpert Global Branding Core",
    category: "Branding",
    client: "EcomXpertStudio Node",
    year: "2026",
    scope: "Typography Guide, Vector Logos, Grid Layout guidelines",
    tech: ["Figma", "Illustrator"],
    img: "https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=1200&q=80",
    desc: "The complete visual asset blueprint for EcomXpertStudio. Integrates dark charcoal backgrounds with neon cyan outline boundaries, cybertech-inspired typography matrices, and dynamic responsive logo variables.",
    outcome: "Established a world-class futuristic brand presence recognized across global developer nodes."
  },
  {
    id: 6,
    title: "Apex Fitness Portal",
    category: "Websites",
    client: "Apex Athletics Ltd.",
    year: "2025",
    scope: "Responsive Web Development, GSAP animations, SEO Mapping",
    tech: ["React.js", "GSAP", "Tailwind CSS"],
    img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
    desc: "A fully custom landing page for premium personal training nodes. Features scroll-triggered path drawings, complex structural video backgrounds, and responsive mobile schedules.",
    outcome: "Boosted digital client registrations by 55% within 60 days of deployment."
  }
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  const filteredProjects = activeFilter === "All" 
    ? PROJECTS 
    : PROJECTS.filter(project => project.category === activeFilter);

  return (
    <div className="relative z-10 mx-auto w-[90%] max-w-7xl px-4 py-12">
      
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-[10px] font-bold tracking-widest text-cyber-cyan uppercase border border-cyber-cyan/30 bg-cyber-cyan/5 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(0,240,255,0.05)]">
          Creative Archives
        </span>
        <h1 className="mt-6 font-display text-4xl font-black text-white sm:text-6xl md:text-7xl">
          Our Masterpieces
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/50">
          Inspect our premium digital case studies. Every tile represents a custom combination of technical framework engineering and high-fidelity graphics.
        </p>
      </div>

      {/* Filter Category Hub */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-16">
        <Filter className="h-4.5 w-4.5 text-cyber-cyan/60 mr-2 shrink-0 hidden sm:block" />
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`rounded-xl px-4.5 py-2 font-display text-xs font-bold tracking-wider uppercase transition-all focus:outline-none ${
              activeFilter === category 
                ? "bg-gradient-to-r from-cyber-blue to-cyber-cyan text-white shadow-[0_0_12px_rgba(0,240,255,0.25)] border border-cyber-cyan/30" 
                : "border border-white/5 bg-white/2 text-white/60 hover:text-white hover:border-white/10"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Portfolio Responsive Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer"
            >
              <GlassCard className="p-0 overflow-hidden group hover:border-cyber-cyan text-left">
                <div className="relative h-64 w-full overflow-hidden bg-cyber-dark">
                  {/* Zoom overlay wash */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent z-10" />
                  
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={project.img} 
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108 opacity-85 group-hover:opacity-100" 
                  />

                  {/* Category badging */}
                  <span className="absolute top-4 left-4 z-20 rounded-md bg-black/60 px-3 py-1 font-mono text-[9px] font-bold tracking-widest text-cyber-cyan border border-cyber-cyan/15 uppercase">
                    {project.category}
                  </span>
                </div>

                <div className="p-6">
                  <span className="text-[9px] font-mono font-bold tracking-wider text-white/40 uppercase block mb-1">
                    CLIENT: {project.client}
                  </span>
                  <h3 className="font-display text-base font-bold text-white mb-3 group-hover:text-cyber-cyan transition-colors truncate">
                    {project.title}
                  </h3>
                  <div className="flex items-center space-x-1.5 text-xs text-cyber-cyan/85 font-semibold font-display uppercase tracking-wider group-hover:text-cyber-cyan">
                    <span>Inspect Details</span>
                    <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* DETAILED FULLSCREEN PREVIEW MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="glass-panel relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-cyber-cyan/35 bg-cyber-darker/95 p-6 shadow-3xl text-left font-sans custom-scrollbar"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white/60 hover:text-cyber-cyan hover:border-cyber-cyan/45 transition-colors focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Grid content */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                
                {/* Visual Image Column */}
                <div className="space-y-4">
                  <div className="relative h-64 md:h-96 w-full rounded-xl overflow-hidden border border-white/5 bg-cyber-dark shadow-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={selectedProject.img} 
                      alt={selectedProject.title} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {/* Category and Year badges */}
                  <div className="flex justify-between text-xs font-mono text-white/40 uppercase">
                    <span>LAUNCH: {selectedProject.year}</span>
                    <span>TAG: {selectedProject.category}</span>
                  </div>
                </div>

                {/* Information Column */}
                <div className="flex flex-col justify-between space-y-6">
                  <div>
                    <span className="inline-flex items-center space-x-1.5 font-mono text-[9px] font-bold tracking-widest text-cyber-cyan border border-cyber-cyan/15 bg-cyber-cyan/5 px-2.5 py-0.5 rounded uppercase">
                      <Cpu className="h-3 w-3" />
                      <span>SECURE CASE STUDY</span>
                    </span>
                    <h2 className="mt-3 font-display text-2xl font-black text-white sm:text-3xl leading-tight">
                      {selectedProject.title}
                    </h2>
                    <p className="mt-4 text-xs text-white/50 font-semibold uppercase tracking-wider">
                      CLIENT: <span className="text-white">{selectedProject.client}</span>
                    </p>
                    <p className="mt-4 text-xs text-white/60 leading-relaxed font-sans">
                      {selectedProject.desc}
                    </p>
                  </div>

                  {/* Scope details */}
                  <div className="space-y-4 pt-6 border-t border-white/5 text-xs">
                    <div>
                      <span className="font-mono font-bold text-white/40 uppercase tracking-widest block mb-1">
                        SCOPE OF WORK:
                      </span>
                      <p className="text-white/80">{selectedProject.scope}</p>
                    </div>

                    <div>
                      <span className="font-mono font-bold text-white/40 uppercase tracking-widest block mb-1">
                        IMPACT & OUTCOME:
                      </span>
                      <div className="flex items-start space-x-2 text-white/85">
                        <CheckCircle className="h-4.5 w-4.5 text-cyber-cyan shrink-0 mt-0.5" />
                        <p>{selectedProject.outcome}</p>
                      </div>
                    </div>
                  </div>

                  {/* Technology tokens */}
                  <div className="flex flex-wrap gap-2 pt-4">
                    {selectedProject.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-white/5 bg-white/2 px-2.5 py-1 font-mono text-[9px] font-bold tracking-widest text-cyber-cyan uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
