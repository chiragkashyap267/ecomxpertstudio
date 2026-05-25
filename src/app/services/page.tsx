"use client";

import { motion } from "framer-motion";
import { 
  Laptop, 
  Cpu, 
  Layers, 
  Video, 
  ArrowUpRight, 
  CheckCircle, 
  Code, 
  Compass, 
  TrendingUp, 
  Terminal 
} from "lucide-react";
import GlassCard from "@/components/GlassCard";
import Link from "next/link";

const SERVICES = [
  {
    id: "web-dev",
    category: "Development",
    title: "Web Development",
    icon: <Laptop className="h-6 w-6" />,
    tagline: "Next-generation high-performance web systems.",
    desc: "We construct blisteringly fast Next.js websites and comprehensive React applications that deliver exceptional speed, solid SEO, and optimized conversion pathways. Every line of code is written with performance and extensibility in mind.",
    features: [
      "Next.js 15 App Router websites",
      "Dynamic React.js single-page applications",
      "Full-stack robust database integrations",
      "Apple & Stripe-inspired modern UI/UX design",
      "High-converting SaaS frameworks",
      "Interactive data dashboard systems",
      "Optimized landing pages & marketing nodes"
    ],
    tech: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    glow: "border-cyber-cyan/30"
  },
  {
    id: "app-dev",
    category: "Engineering",
    title: "App Development",
    icon: <Cpu className="h-6 w-6" />,
    tagline: "Custom web systems and automated software panels.",
    desc: "We engineer customized software applications that streamline business workflows, automate database synchronizations, and deploy sophisticated AI systems designed to scale with your user demand.",
    features: [
      "Custom responsive web applications",
      "Conversational AI chatbot integrations",
      "Comprehensive administration control panels",
      "Robust backend workflow automation systems",
      "Secure RESTful & GraphQL API integrations",
      "Cloud backend nodes (AWS/Vercel)",
      "Cron automation & microservices"
    ],
    tech: ["Node.js", "Python", "OpenAI API", "GraphQL", "FastAPI", "Docker"],
    glow: "border-cyber-blue/30"
  },
  {
    id: "graphic-design",
    category: "Creative",
    title: "Graphic Designing",
    icon: <Layers className="h-6 w-6" />,
    tagline: "Ultra-premium brand assets and 3D visual assets.",
    desc: "We build gorgeous, pixel-perfect visual brand materials that elevate your brand value. From Apple-style clean product mockups to premium luxury packaging files, we give your business a state-of-the-art graphical presence.",
    features: [
      "High-fidelity 3D product mockups",
      "High-converting visual infographics",
      "Amazon A+ premium listing content layouts",
      "Luxury custom packaging template designs",
      "Cohesive high-end brand identity packages",
      "High-impact social media creative designs",
      "Stellar Amazon listing visual guides"
    ],
    tech: ["Figma", "Adobe Illustrator", "Photoshop", "Blender 3D", "Keyshot"],
    glow: "border-cyber-purple/30"
  },
  {
    id: "video-editing",
    category: "Motion",
    title: "Video Editing",
    icon: <Video className="h-6 w-6" />,
    tagline: "Cinematic marketing clips and custom cyber motion.",
    desc: "We produce attention-grabbing video files that hook viewers in the first seconds. We specialize in high-tempo product promotional files, short-form reels, and premium custom vector overlays that generate viral engagement.",
    features: [
      "High-impact short-form video files (Reels/TikToks)",
      "Cinematic high-resolution product reels",
      "High-impact corporate promo video assets",
      "Custom animated typography overlays",
      "Sleek motion graphic templates",
      "Advanced color grading & sound engineering",
      "Engaging text narrative systems"
    ],
    tech: ["Premiere Pro", "After Effects", "Davinci Resolve", "Blender"],
    glow: "border-cyan-400/30"
  }
];

export default function ServicesPage() {
  return (
    <div className="relative z-10 mx-auto w-[90%] max-w-7xl px-4 py-12">
      
      {/* Header Badge & Title */}
      <div className="text-center mb-20">
        <span className="text-[10px] font-bold tracking-widest text-cyber-cyan uppercase border border-cyber-cyan/30 bg-cyber-cyan/5 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(0,240,255,0.05)]">
          Pillars of Excellence
        </span>
        <h1 className="mt-6 font-display text-4xl font-black text-white sm:text-6xl md:text-7xl">
          What We <span className="bg-gradient-to-r from-cyber-cyan to-cyber-blue bg-clip-text text-transparent">Engineer & Design</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/50 sm:text-base">
          Explore our complete service menu. We combine highly optimized code structures with state-of-the-art graphic identities to scale digital startups.
        </p>
      </div>

      {/* Services Grid Layout */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {SERVICES.map((service, index) => (
          <GlassCard 
            key={service.id} 
            delay={index * 0.15} 
            className={`border ${service.glow} hover:shadow-[0_8px_32px_rgba(0,240,255,0.04)] flex flex-col justify-between`}
            hoverScale={false}
          >
            {/* Inner Header Row */}
            <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-6">
              <div className="flex items-center space-x-3.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyber-cyan/5 text-cyber-cyan border border-cyber-cyan/15 shadow-[0_0_10px_rgba(0,240,255,0.06)]">
                  {service.icon}
                </div>
                <div>
                  <span className="text-[8.5px] font-mono font-bold tracking-widest text-cyber-cyan uppercase">
                    {service.category} Node
                  </span>
                  <h2 className="font-display text-xl font-black text-white">
                    {service.title}
                  </h2>
                </div>
              </div>
              <span className="font-mono text-xs text-white/30 tracking-wider">
                NODE_0{index + 1}
              </span>
            </div>

            {/* Description */}
            <div className="text-left space-y-4">
              <p className="font-display text-sm font-semibold text-white/95 tracking-wide">
                {service.tagline}
              </p>
              <p className="text-xs text-white/50 leading-relaxed">
                {service.desc}
              </p>

              {/* Grid bullet columns */}
              <div className="mt-8 space-y-3 pt-6 border-t border-white/5">
                <span className="text-[10px] font-mono font-bold tracking-widest text-white/30 uppercase block">
                  CAPABILITY CHECKLIST:
                </span>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-white/80">
                      <CheckCircle className="h-4 w-4 text-cyber-cyan shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tech chips footer row */}
            <div className="mt-10 border-t border-white/5 pt-6 flex flex-wrap gap-2 text-left justify-start">
              {service.tech.map((chip) => (
                <span 
                  key={chip} 
                  className="rounded-lg border border-white/5 bg-white/2 px-2.5 py-1 font-mono text-[9px] font-bold tracking-widest text-white/50 uppercase"
                >
                  {chip}
                </span>
              ))}
            </div>

          </GlassCard>
        ))}
      </div>

      {/* Booking Integration Box */}
      <div className="mt-20">
        <GlassCard className="p-8 sm:p-12 relative overflow-hidden border border-cyber-cyan/20 bg-cyber-darker/65 hover:border-cyber-cyan" hoverScale={false}>
          <div className="cyber-grid absolute inset-0 opacity-15 rounded-2xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between text-left gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-1.5 font-mono text-xs text-cyber-cyan">
                <Terminal className="h-4 w-4" />
                <span>ECOMXPERT_SYSTEMS_INITIATED</span>
              </div>
              <h2 className="font-display text-2xl font-black text-white sm:text-3xl">
                Ready to Deploy Your Digital Infrastructure?
              </h2>
              <p className="text-xs text-white/50 leading-relaxed max-w-xl">
                Book a consultation today. Our development and visual engineering nodes will align your creative framework directly with your key conversion targets.
              </p>
            </div>
            
            <Link href="/contact" className="focus:outline-none shrink-0 w-full md:w-auto">
              <button className="w-full group flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan px-7 py-4 font-display text-xs font-black tracking-widest text-white uppercase shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:brightness-110 active:scale-[0.98] transition-all">
                <span>Lock In Consultation</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Link>
          </div>
        </GlassCard>
      </div>

    </div>
  );
}
