"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  Terminal, 
  Sparkles, 
  Laptop, 
  Layers, 
  Video, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Calendar,
  CheckCircle,
  Cpu
} from "lucide-react";
import GlassCard from "@/components/GlassCard";

// Tech stack items for scrolling ticker
const TECH_STACK = [
  "Next.js 15", "React.js", "Tailwind CSS", "GSAP", "Lenis Scroll", 
  "Framer Motion", "TypeScript", "UI/UX Design", "Figma", 
  "Node.js", "3D Blender", "GraphQL", "SaaS Systems"
];

// Home page testimonials
const TESTIMONIALS = [
  {
    quote: "EcomXpertStudio completely transformed our digital identity. Their Next.js implementation is incredibly fast, and our conversion rate jumped by 48% within the first month. The cyber aesthetic is exactly what we wanted.",
    author: "Alex Rivers",
    role: "Founder, Zenith AI",
    rating: 5,
    tag: "Web Development"
  },
  {
    quote: "The 3D mockups and packaging designs they delivered for our luxury cosmetics brand look absolutely premium. The level of detail and typography matches Apple's design standards. Highly recommended!",
    author: "Elena Rostova",
    role: "Creative Director, Aura Skincare",
    rating: 5,
    tag: "Graphic Designing"
  },
  {
    quote: "The custom video promotional reels and short-form motion graphics created by EcomXpertStudio got us over 10M organic views. Their visual timing and edits are world-class.",
    author: "Marcus Vance",
    role: "Head of Marketing, Volt Charging",
    rating: 5,
    tag: "Video Editing"
  }
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [particles, setParticles] = useState<{ id: number; left: number; top: number; size: number; delay: number }[]>([]);

  // Generate random glowing particles on the client side for visual WOW factor
  useEffect(() => {
    const generated = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
    }));
    setParticles(generated);
  }, []);

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div className="relative z-10 w-full overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center pt-10 pb-20 text-center">
        
        {/* Floating cyber particles */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ opacity: 0.1, y: 0 }}
              animate={{ 
                opacity: [0.1, 0.6, 0.1],
                y: [-20, -120],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: particle.delay,
                ease: "linear"
              }}
              className="absolute rounded-full bg-cyber-cyan shadow-[0_0_8px_#00f0ff]"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top + 40}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
            />
          ))}
        </div>

        {/* Studio opening tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 inline-flex items-center space-x-2 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/5 px-4 py-1.5 font-display text-[10px] font-bold tracking-widest text-cyber-cyan uppercase shadow-[0_0_15px_rgba(0,240,255,0.08)]"
        >
          <Sparkles className="h-3.5 w-3.5 text-cyber-cyan" />
          <span>Futuristic Digital Agency</span>
          <span className="h-1 w-1 rounded-full bg-cyber-cyan" />
          <span className="text-white/60">Open for Bookings</span>
        </motion.div>

        {/* Huge Animated Headings */}
        <div className="mx-auto max-w-5xl px-4">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Building Modern <br />
            <span className="bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-purple bg-clip-text text-transparent neon-glow-cyan">
              Digital Experiences
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base md:text-lg"
          >
            We create high-converting websites, modern web apps, premium graphics, A+ content, mockups, packaging designs, and creative digital solutions for brands.
          </motion.p>
        </div>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-center justify-center space-y-4 px-4 sm:flex-row sm:space-x-6 sm:space-y-0"
        >
          <Link href="/contact" className="focus:outline-none">
            <button className="group flex items-center space-x-2 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan px-7 py-4 font-display text-sm font-black tracking-widest text-white uppercase shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:brightness-110 active:scale-[0.98] transition-all">
              <span>Book a Meeting</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Link>

          <Link href="/portfolio" className="focus:outline-none">
            <button className="flex items-center space-x-2 rounded-xl border border-white/10 bg-white/3 px-7 py-4 font-display text-sm font-black tracking-widest text-white uppercase backdrop-blur-md hover:border-cyber-cyan/50 hover:bg-white/7 transition-all active:scale-[0.98]">
              <span>View Portfolio</span>
            </button>
          </Link>
        </motion.div>

        {/* 3D Dashboard Mockup Card in Hero */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-20 w-[90%] max-w-4xl px-4"
        >
          <div className="glass-panel relative rounded-2xl border border-cyber-cyan/20 bg-cyber-darker/65 p-1 shadow-[0_0_40px_rgba(0,240,255,0.06)] backdrop-blur-xl">
            {/* Ambient neon backdrop light */}
            <div className="absolute -top-12 left-1/4 -z-10 h-32 w-1/2 rounded-full bg-cyber-cyan/15 blur-[50px]" />
            
            {/* Card inner headers */}
            <div className="flex items-center justify-between border-b border-white/5 px-5 py-3 text-xs text-white/40">
              <div className="flex items-center space-x-1.5">
                <Terminal className="h-4 w-4 text-cyber-cyan" />
                <span className="font-mono tracking-wider">ECOMXPERT_SYSTEMS_MONITOR</span>
              </div>
              <div className="flex items-center space-x-1.5 font-mono">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>ONLINE // SECURE</span>
              </div>
            </div>

            {/* Glowing inner container */}
            <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-3 bg-black/40 rounded-b-xl">
              <div className="space-y-2 text-left">
                <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Interactive Node</span>
                <div className="h-28 rounded-lg border border-white/5 bg-white/2 p-4 flex flex-col justify-between hover:border-cyber-cyan/35 transition-all">
                  <div className="flex justify-between items-start">
                    <Laptop className="h-5 w-5 text-cyber-cyan" />
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">Active</span>
                  </div>
                  <div>
                    <h3 className="font-display font-black text-sm text-white">Digital Growth</h3>
                    <p className="text-[9px] text-white/50">High-converting systems</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-left">
                <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Visual Vectors</span>
                <div className="h-28 rounded-lg border border-white/5 bg-white/2 p-4 flex flex-col justify-between hover:border-cyber-cyan/35 transition-all">
                  <div className="flex justify-between items-start">
                    <Layers className="h-5 w-5 text-cyber-cyan" />
                    <span className="text-[10px] font-mono text-cyber-cyan bg-cyber-cyan/10 px-1.5 py-0.5 rounded">3D ready</span>
                  </div>
                  <div>
                    <h3 className="font-display font-black text-sm text-white">Luxury Packaging</h3>
                    <p className="text-[9px] text-white/50">Premium mockups</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-left">
                <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Creative Motion</span>
                <div className="h-28 rounded-lg border border-white/5 bg-white/2 p-4 flex flex-col justify-between hover:border-cyber-cyan/35 transition-all">
                  <div className="flex justify-between items-start">
                    <Video className="h-5 w-5 text-cyber-cyan" />
                    <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">Rendered</span>
                  </div>
                  <div>
                    <h3 className="font-display font-black text-sm text-white">Promo Video Reels</h3>
                    <p className="text-[9px] text-white/50">10M+ views potential</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="relative py-20 bg-gradient-to-b from-transparent to-[#040713]">
        <div className="mx-auto w-[90%] max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { number: "150+", label: "Projects Delivered", desc: "For global tech brands" },
              { number: "45%+", label: "Conversion Uplift", desc: "Average system boost" },
              { number: "12+", label: "Creative Geeks", desc: "Experts under one node" },
              { number: "99.8%", label: "Satisfaction Rating", desc: "Consistently world-class" },
            ].map((stat, idx) => (
              <GlassCard key={idx} delay={idx * 0.1} className="text-center group border border-white/5">
                <div className="font-display text-3xl font-black tracking-tight text-white group-hover:text-cyber-cyan transition-colors sm:text-4xl md:text-5xl">
                  {stat.number}
                </div>
                <div className="mt-3 font-display text-xs font-bold tracking-wider text-white/80 uppercase">
                  {stat.label}
                </div>
                <div className="mt-1 text-[10px] text-white/40">
                  {stat.desc}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SERVICES PREVIEW SECTION */}
      <section className="py-24">
        <div className="mx-auto w-[90%] max-w-7xl px-4">
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-cyber-cyan uppercase">What We Build</span>
              <h2 className="mt-2 font-display text-3xl font-black text-white sm:text-4xl md:text-5xl">
                Specialized Digital Pillars
              </h2>
            </div>
            <p className="mt-4 max-w-md text-sm text-white/50 md:mt-0">
              We operate at the intersection of beautiful modern graphics and high-performance framework development.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Laptop className="h-6 w-6" />,
                title: "Web Development",
                desc: "High-performance Next.js websites, dynamic React applications, full-stack portals, and responsive landing pages built for speed and conversions.",
                features: ["Next.js & React.js", "Full-stack SaaS Nodes", "Sleek Admin Dashboards"]
              },
              {
                icon: <Cpu className="h-6 w-6" />,
                title: "App Development",
                desc: "Custom web applications, conversational AI chatbot systems, custom backend automation nodes, and highly efficient third-party API integrations.",
                features: ["AI Chatbot Nodes", "Automation Systems", "Custom APIs & Integrations"]
              },
              {
                icon: <Layers className="h-6 w-6" />,
                title: "Graphic Designing",
                desc: "World-class 3D product mockups, comprehensive brand identities, luxury packaging templates, and conversion-optimized Amazon A+ graphics.",
                features: ["3D Product Mockups", "Luxury Package Templates", "Amazon A+ content"]
              },
              {
                icon: <Video className="h-6 w-6" />,
                title: "Video Editing",
                desc: "High-impact short-form video formats, cinematic product reels, high-end promo visual templates, and custom cyber motion elements.",
                features: ["Short-form Edits", "Cinematic Product Reels", "Cyber Motion Graphics"]
              }
            ].map((service, idx) => (
              <GlassCard key={idx} delay={idx * 0.1} className="flex flex-col justify-between hover:border-cyber-cyan">
                <div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyber-cyan/5 text-cyber-cyan border border-cyber-cyan/15 mb-6 shadow-[0_0_12px_rgba(0,240,255,0.06)]">
                    {service.icon}
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed mb-6">{service.desc}</p>
                </div>
                <ul className="space-y-2 border-t border-white/5 pt-4 text-[10px] text-white/70 font-mono">
                  {service.features.map((feat) => (
                    <li key={feat} className="flex items-center space-x-1.5">
                      <span className="h-1 w-1 rounded-full bg-cyber-cyan" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/services" className="focus:outline-none">
              <button className="group inline-flex items-center space-x-2 text-sm font-bold tracking-widest text-cyber-cyan uppercase hover:text-white transition-colors">
                <span>View Full Service Menu</span>
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. TECH STACK SHOWCASE (TICKER) */}
      <section className="py-16 bg-[#02040b] border-y border-white/5">
        <div className="w-full relative overflow-hidden flex flex-col justify-center">
          <div className="absolute left-0 top-0 bottom-0 w-36 bg-gradient-to-r from-[#02040b] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-36 bg-gradient-to-l from-[#02040b] to-transparent z-10 pointer-events-none" />

          {/* Scrolling Marquee Container */}
          <div className="flex space-x-8 animate-cyber-grid py-2" style={{ animation: "spin-slow 40s linear infinite", animationDirection: "reverse", display: "none" }} />
          
          {/* We build a clean horizontal CSS scrolling banner */}
          <div className="relative flex overflow-x-hidden group">
            <div className="animate-marquee whitespace-nowrap flex space-x-10">
              {TECH_STACK.map((tech, idx) => (
                <div key={idx} className="inline-flex items-center space-x-2.5 rounded-xl border border-white/5 bg-[#080d1a] px-5 py-2.5 font-mono text-xs font-bold tracking-wider text-white/70 shadow-sm hover:border-cyber-cyan transition-colors">
                  <span className="h-2 w-2 rounded-full bg-cyber-cyan shadow-[0_0_8px_#00f0ff]" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
            
            <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex space-x-10 ml-[2px]">
              {TECH_STACK.map((tech, idx) => (
                <div key={idx + 100} className="inline-flex items-center space-x-2.5 rounded-xl border border-white/5 bg-[#080d1a] px-5 py-2.5 font-mono text-xs font-bold tracking-wider text-white/70 shadow-sm hover:border-cyber-cyan transition-colors">
                  <span className="h-2 w-2 rounded-full bg-cyber-cyan shadow-[0_0_8px_#00f0ff]" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Embedded Marquee Styling */}
        <style jsx global>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }
          @keyframes marquee2 {
            0% { transform: translateX(100%); }
            100% { transform: translateX(0%); }
          }
          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
          .animate-marquee2 {
            animation: marquee2 25s linear infinite;
          }
        `}</style>
      </section>

      {/* 5. PORTFOLIO PREVIEW SECTION */}
      <section className="py-24 bg-gradient-to-b from-transparent to-[#03050c]">
        <div className="mx-auto w-[90%] max-w-7xl px-4">
          
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-cyber-cyan uppercase">Selected Work</span>
              <h2 className="mt-2 font-display text-3xl font-black text-white sm:text-4xl md:text-5xl">
                Recent Masterpieces
              </h2>
            </div>
            <Link href="/portfolio" className="focus:outline-none">
              <button className="group mt-4 inline-flex items-center space-x-2 rounded-xl border border-white/10 bg-white/2 px-5 py-3 font-display text-xs font-bold tracking-widest text-white uppercase hover:border-cyber-cyan/40 hover:bg-white/5 transition-all">
                <span>Explore Showcase</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Link>
          </div>

          {/* Grid Layout of Featured Projects */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Aura Premium Package System",
                category: "Packaging Design",
                img: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
                color: "from-cyber-cyan to-cyber-blue"
              },
              {
                title: "Vertex SaaS Console Hub",
                category: "Web Apps",
                img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
                color: "from-cyber-blue to-cyber-purple"
              },
              {
                title: "Amazon A+ Premium Listing Layouts",
                category: "A+ Content",
                img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
                color: "from-cyber-purple to-cyber-cyan"
              }
            ].map((project, idx) => (
              <GlassCard key={idx} delay={idx * 0.15} className="p-0 overflow-hidden group">
                <div className="relative h-64 w-full overflow-hidden bg-cyber-dark text-left">
                  {/* Subtle hover gradient wash */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                  {/* Backdrop glowing gradient bar */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${project.color}`} />
                  
                  {/* Simulated High-Res Project Graphic */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={project.img} 
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108 opacity-85 group-hover:opacity-100" 
                  />

                  {/* Category Pill Tag */}
                  <span className="absolute top-4 left-4 z-20 rounded-md bg-black/60 px-3 py-1 font-mono text-[9px] font-bold tracking-widest text-cyber-cyan border border-cyber-cyan/15 uppercase">
                    {project.category}
                  </span>
                </div>
                <div className="p-6 text-left">
                  <h3 className="font-display text-base font-bold text-white mb-2 group-hover:text-cyber-cyan transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center space-x-1 text-xs text-white/50 hover:text-white transition-colors cursor-pointer">
                    <span>Inspect Case Study</span>
                    <ExternalLink className="h-3 w-3" />
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section className="py-24 bg-gradient-to-b from-[#03050c] to-transparent">
        <div className="mx-auto w-[90%] max-w-4xl px-4">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold tracking-widest text-cyber-cyan uppercase">Kind Words</span>
            <h2 className="mt-2 font-display text-3xl font-black text-white sm:text-4xl md:text-5xl">
              Trusted by Founders
            </h2>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <GlassCard className="p-8 sm:p-12 text-center border border-white/5 relative" hoverScale={false}>
                  {/* Decorative glowing quote tag */}
                  <div className="absolute top-4 left-6 text-7xl font-serif text-cyber-cyan/10 pointer-events-none select-none">“</div>
                  
                  {/* Category Tag */}
                  <span className="inline-flex rounded-md bg-cyber-cyan/5 px-2.5 py-0.5 font-mono text-[9px] font-bold tracking-widest text-cyber-cyan border border-cyber-cyan/15 uppercase mb-6">
                    {TESTIMONIALS[activeTestimonial].tag}
                  </span>

                  <p className="font-display text-base sm:text-lg md:text-xl font-medium leading-relaxed text-white/80 italic">
                    &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
                  </p>

                  <div className="mt-8">
                    <h4 className="font-display font-bold text-white text-base">
                      {TESTIMONIALS[activeTestimonial].author}
                    </h4>
                    <p className="text-xs text-cyber-cyan/60 font-medium mt-1">
                      {TESTIMONIALS[activeTestimonial].role}
                    </p>
                  </div>

                  {/* Stars indicators */}
                  <div className="flex justify-center space-x-1 mt-4">
                    {Array.from({ length: TESTIMONIALS[activeTestimonial].rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xs">&#9733;</span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>

            {/* Testimonials controls */}
            <div className="flex justify-center items-center space-x-4 mt-8">
              <button 
                onClick={handlePrevTestimonial}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/3 text-white/70 hover:text-cyber-cyan hover:border-cyber-cyan/45 transition-colors focus:outline-none"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="font-mono text-xs text-white/40">
                {activeTestimonial + 1} / {TESTIMONIALS.length}
              </span>
              <button 
                onClick={handleNextTestimonial}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/3 text-white/70 hover:text-cyber-cyan hover:border-cyber-cyan/45 transition-colors focus:outline-none"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CALENDLY BOOKING CTA SECTION */}
      <section className="py-24 bg-[#03050c]">
        <div className="mx-auto w-[90%] max-w-5xl px-4">
          <GlassCard className="p-8 sm:p-12 relative overflow-hidden text-left hover:border-cyber-cyan" hoverScale={false}>
            {/* Mesh background grid overlay */}
            <div className="cyber-grid absolute inset-0 opacity-25 rounded-2xl" />
            
            <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-2">
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-cyber-cyan uppercase">Schedule Consult</span>
                  <h2 className="mt-2 font-display text-3xl font-black text-white sm:text-4xl">
                    Ready to Scale Your Brand?
                  </h2>
                  <p className="mt-4 text-sm text-white/50 leading-relaxed max-w-md">
                    Lock in a complimentary 30-minute growth assessment meeting. We will analyze your system architecture, UX layout, packaging files, and brand designs to reveal active conversion channels.
                  </p>
                </div>

                <div className="mt-8 space-y-3 text-xs text-white/60">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-cyber-cyan" />
                    <span>Comprehensive UI/UX UI audit</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-cyber-cyan" />
                    <span>Conversion metrics mapping</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-cyber-cyan" />
                    <span>Full-stack architecture timeline</span>
                  </div>
                </div>
              </div>

              {/* Calendly Interactive Grid Mockup */}
              <div className="flex flex-col justify-center">
                <div className="rounded-xl border border-white/5 bg-black/45 p-6 shadow-inner relative">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="h-10 w-10 rounded-full bg-cyber-cyan/5 border border-cyber-cyan/15 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-cyber-cyan" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">Session Node</h4>
                      <p className="text-[10px] text-white/40">30 Min Consultation Call</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono mb-6">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
                      <div key={day} className={`p-2 rounded-lg border border-white/5 ${idx === 1 ? "bg-cyber-cyan/10 border-cyber-cyan/45 text-cyber-cyan" : "bg-white/2 text-white/60"}`}>
                        <div className="text-[9px] text-white/30 uppercase">{day}</div>
                        <div className="font-bold mt-1">26</div>
                      </div>
                    ))}
                  </div>

                  <Link href="/contact" className="focus:outline-none">
                    <button className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan py-3.5 font-display text-xs font-black tracking-widest text-white uppercase shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:brightness-110 active:scale-[0.98] transition-all">
                      <span>Reserve Your Slot</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </Link>

                  <p className="mt-3 text-center text-[9px] text-white/30 font-mono uppercase tracking-wider">
                    Secured by EcomXpert Systems Node
                  </p>
                </div>
              </div>

            </div>
          </GlassCard>
        </div>
      </section>

    </div>
  );
}
