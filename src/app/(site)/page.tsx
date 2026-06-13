"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Code2,
  Layers3,
  MonitorSmartphone,
  PlaySquare,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import CanvasParticles from "@/components/CanvasParticles";
import GlowCard from "@/components/GlowCard";
import GSAPReveal from "@/components/GSAPReveal";
import Magnetic from "@/components/Magnetic";
import HeroShowcase from "@/components/HeroShowcase";
import DynamicGridCell from "@/components/DynamicGridCell";
import { contact, serviceSlides, testimonials } from "@/data/site";

const metrics = [
  { value: "150+", label: "Projects delivered", detail: "Web, brand, content, and motion systems" },
  { value: "45%+", label: "Conversion uplift", detail: "Average lift across optimized launches" },
  { value: "12+", label: "Creative specialists", detail: "Designers, developers, and motion editors" },
  { value: "99.8%", label: "Client satisfaction", detail: "Measured across delivery reviews" },
];

const services = [
  {
    icon: MonitorSmartphone,
    title: "Web Development",
    desc: "High-performance websites, landing pages, dashboards, and full-stack experiences built with modern React architecture.",
    features: ["Next.js App Router", "SaaS dashboards", "Conversion landing pages"],
  },
  {
    icon: Code2,
    title: "App Development",
    desc: "Custom applications, admin panels, AI chatbot interfaces, workflow automations, and API integrations.",
    features: ["AI workflows", "Admin portals", "API integrations"],
  },
  {
    icon: Layers3,
    title: "Graphic Designing",
    desc: "Premium mockups, product infographics, Amazon A+ content, packaging design, and cohesive brand systems.",
    features: ["3D mockups", "Packaging systems", "A+ content"],
  },
  {
    icon: PlaySquare,
    title: "Video Editing",
    desc: "Short-form edits, product reels, promo videos, motion graphics, sound polish, and cinematic brand assets.",
    features: ["Product reels", "Promo films", "Motion graphics"],
  },
];

const techStack = [
  { name: "Next.js", icon: "Layout" },
  { name: "React", icon: "Code2" },
  { name: "TypeScript", icon: "MonitorSmartphone" },
  { name: "Tailwind CSS", icon: "Sparkles" },
  { name: "GSAP", icon: "Layers3" },
  { name: "Lenis", icon: "Zap" },
  { name: "Framer Motion", icon: "PlaySquare" },
  { name: "Figma", icon: "CheckCircle" },
  { name: "Blender", icon: "Star" },
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeHero, setActiveHero] = useState(0);
  const [activePortfolio, setActivePortfolio] = useState(0);
  const [workItems, setWorkItems] = useState<any[]>([]);
  const testimonial = testimonials[activeTestimonial];
  const hero = serviceSlides[activeHero];

  useEffect(() => {
    fetch("/api/work")
      .then((r) => r.json())
      .then((data) => setWorkItems(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const heroTimer = window.setInterval(() => {
      setActiveHero((current) => (current + 1) % serviceSlides.length);
    }, 3600);
    const testimonialTimer = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 5200);
    const portfolioTimer = window.setInterval(() => {
      setActivePortfolio((current) => (current + 1) % 5);
    }, 4000);
    return () => {
      window.clearInterval(heroTimer);
      window.clearInterval(testimonialTimer);
      window.clearInterval(portfolioTimer);
    };
  }, []);

  const showPrevious = () =>
    setActiveTestimonial((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const showNext = () =>
    setActiveTestimonial((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <div className="relative z-10 overflow-hidden">
      <CanvasParticles />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="section-shell hero-y relative flex min-h-[88svh] items-center">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="text-left">
            <GSAPReveal direction="fade" delay={0.08}>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] backdrop-blur-md px-4 py-2 text-xs font-bold text-blue-700 dark:text-cyber-cyan shadow-[0_4px_24px_rgba(11,86,166,0.12)] dark:shadow-[0_4px_24px_rgba(25,230,255,0.1)]">
                <Sparkles className="h-4 w-4" />
                EcomXpertStudio
                <span className="h-1 w-1 rounded-full bg-blue-500 dark:bg-cyber-cyan" />
                Premium Digital Partner
              </div>
            </GSAPReveal>

            <GSAPReveal direction="up" delay={0.18}>
              <div className="mt-7 min-h-[15rem] sm:min-h-[17rem] lg:min-h-[18rem]">
                <motion.div
                  key={hero.eyebrow}
                  initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="text-sm font-black uppercase tracking-[0.24em] text-blue-600 dark:text-cyber-cyan">{hero.eyebrow}</div>
                  <h1 className="mt-4 font-display text-[2.75rem] font-black leading-[1.05] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 dark:from-white dark:via-blue-100 dark:to-slate-400 sm:text-6xl lg:text-[4.5rem] drop-shadow-sm dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.12)]">
                    {hero.title}
                  </h1>
                  <p className="mt-6 max-w-[21rem] text-base font-medium leading-8 text-slate-600 dark:text-white/70 sm:max-w-2xl sm:text-lg">
                    {hero.copy}
                  </p>
                </motion.div>
              </div>
            </GSAPReveal>

            <div className="mt-4 flex max-w-xl justify-start gap-2">
              {serviceSlides.map((slide, index) => (
                <button
                  key={slide.eyebrow}
                  type="button"
                  onClick={() => setActiveHero(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    activeHero === index
                      ? "w-10 bg-blue-500 dark:bg-cyber-cyan shadow-[0_0_16px_rgba(11,86,166,0.5)] dark:shadow-[0_0_16px_rgba(25,230,255,0.7)]"
                      : "w-2.5 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/35"
                  }`}
                  aria-label={`Show ${slide.eyebrow}`}
                />
              ))}
            </div>

            <GSAPReveal direction="up" delay={0.42}>
              <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row">
                <Magnetic>
                  <a
                    href={contact.calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-700 to-blue-500 dark:from-cyber-blue dark:to-cyber-cyan px-6 text-sm font-bold text-white shadow-[0_4px_20px_rgba(11,86,166,0.35)] dark:shadow-[0_0_34px_rgba(25,230,255,0.26)] transition-all hover:brightness-110"
                  >
                    Book a Meeting
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Magnetic>
                <Magnetic>
                  <Link
                    href="/portfolio"
                    className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-blue-200 dark:border-white/10 bg-white dark:bg-white/[0.045] px-6 text-sm font-bold text-slate-700 dark:text-white/80 shadow-sm dark:shadow-none transition-all hover:border-blue-400 dark:hover:border-cyber-cyan/45 hover:text-blue-700 dark:hover:text-white"
                  >
                    View Portfolio
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </Magnetic>
              </div>
            </GSAPReveal>
          </div>

          <div className="hidden lg:block relative z-10 w-full h-full min-h-[400px]">
            <HeroShowcase activeIndex={activeHero} />
          </div>
        </div>
      </section>

      {/* ── METRICS ─────────────────────────────────────── */}
      <section className="border-y border-blue-100 dark:border-white/10 bg-white dark:bg-cyber-darker/35">
        <div className="section-shell py-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, index) => (
              <GlowCard key={metric.label} delay={index * 0.06} hoverScale={false} tiltActive={false} className="min-h-[11rem] p-5">
                <div className="text-4xl font-black text-slate-900 dark:text-white">{metric.value}</div>
                <div className="mt-2 text-sm font-bold text-blue-600 dark:text-cyber-cyan">{metric.label}</div>
                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-white/50">{metric.detail}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────── */}
      <section className="section-shell section-y">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.85fr_1fr] lg:items-end">
          <GSAPReveal direction="up">
            <div>
              <span className="text-sm font-bold text-blue-600 dark:text-cyber-cyan">Agency Capabilities</span>
              <h2 className="mt-3 max-w-xl font-display text-4xl font-black leading-tight text-slate-900 dark:text-white sm:text-5xl">
                Specialized digital pillars for modern brands.
              </h2>
            </div>
          </GSAPReveal>
          <GSAPReveal direction="up" delay={0.12}>
            <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-white/60">
              Strategy, interface design, engineering, and visual production come together in one focused studio workflow.
            </p>
          </GSAPReveal>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <GlowCard key={service.title} delay={index * 0.08} className="h-full">
                <div className="flex h-full flex-col">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-blue-200 dark:border-cyber-cyan/25 bg-blue-50 dark:bg-cyber-cyan/10 text-blue-600 dark:text-cyber-cyan">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-xl font-black text-slate-900 dark:text-white">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/60">{service.desc}</p>
                  <ul className="mt-6 grid gap-2 border-t border-blue-100 dark:border-white/10 pt-5">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs text-slate-500 dark:text-white/55">
                        <CheckCircle className="h-4 w-4 shrink-0 text-blue-500 dark:text-cyber-cyan" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlowCard>
            );
          })}
        </div>
      </section>

      {/* ── TECH MARQUEE ────────────────────────────────── */}
      <section className="overflow-hidden border-y border-blue-100 dark:border-white/10 bg-blue-50 dark:bg-cyber-darker/55 py-6">
        <div className="flex w-max animate-marquee gap-3 px-3">
          {[...techStack, ...techStack, ...techStack].map((tech, index) => {
            const IconMap: any = {
              Layout: Code2, Code2, MonitorSmartphone, Sparkles,
              Layers3, Zap, PlaySquare, CheckCircle, Star,
            };
            const Icon = IconMap[tech.icon] || Code2;
            return (
              <div
                key={`${tech.name}-${index}`}
                className="flex h-11 items-center gap-2 rounded-lg border border-blue-200 dark:border-white/10 bg-white dark:bg-white/[0.035] px-4 text-sm font-semibold text-slate-700 dark:text-white/70 shadow-sm dark:shadow-none"
              >
                <Icon className="h-4 w-4 text-blue-500 dark:text-cyber-cyan animate-pulse-slow" />
                {tech.name}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── SELECTED WORK ───────────────────────────────── */}
      <section className="section-shell section-y">
        <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <GSAPReveal direction="up">
            <div>
              <span className="text-sm font-bold text-blue-600 dark:text-cyber-cyan">Selected Work</span>
              <h2 className="mt-3 font-display text-4xl font-black text-slate-900 dark:text-white sm:text-5xl">Recent premium builds.</h2>
            </div>
          </GSAPReveal>
          <Link
            href="/portfolio"
            className="group inline-flex h-11 w-fit items-center gap-2 rounded-lg border border-blue-200 dark:border-white/10 bg-white dark:bg-white/[0.04] px-5 text-sm font-bold text-slate-700 dark:text-white/80 shadow-sm dark:shadow-none transition-all hover:border-blue-400 dark:hover:border-cyber-cyan/45 hover:text-blue-700 dark:hover:text-white"
          >
            Explore Showcase
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Bento Portfolio Grid */}
        {workItems.length > 0 && (
          <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 auto-rows-[250px] lg:auto-rows-[280px]">
            {/* 1. Large Feature */}
            <Link href="/portfolio" className="md:col-span-2 lg:col-span-2 lg:row-span-2 group relative overflow-hidden rounded-3xl premium-panel premium-border shadow-xl block">
              <DynamicGridCell 
                images={workItems.filter(i => i.category === 'Mockups').map(i => i.img).slice(0, 10)} 
                intervalMs={4000} 
                delayOffsetMs={0} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="rounded-full border border-blue-400/30 bg-white/10 px-3 py-1 text-[10px] font-bold text-white backdrop-blur uppercase tracking-wider">Premium Mockups</span>
                <h3 className="mt-3 text-3xl font-black text-white">Visual Systems</h3>
                <div className="mt-4 flex items-center gap-2 text-sm font-bold text-blue-300">View Showcase <ArrowUpRight className="h-4 w-4" /></div>
              </div>
            </Link>

            {/* 2. Wide Top Right */}
            <Link href="/portfolio" className="md:col-span-2 lg:col-span-2 lg:row-span-1 group relative overflow-hidden rounded-3xl premium-panel premium-border shadow-md block">
              <DynamicGridCell 
                images={workItems.filter(i => i.category === 'Packaging Design').map(i => i.img).slice(0, 10)} 
                intervalMs={4500} 
                delayOffsetMs={1000} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
              <div className="absolute inset-x-0 bottom-0 p-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="rounded-full border border-blue-400/30 bg-white/10 px-3 py-1 text-[10px] font-bold text-white backdrop-blur uppercase tracking-wider">Packaging</span>
                <h3 className="mt-2 text-xl font-black text-white">Physical Brand Assets</h3>
              </div>
            </Link>

            {/* 3. Small Bottom Right 1 */}
            <Link href="/portfolio" className="group relative overflow-hidden rounded-3xl premium-panel premium-border shadow-md block">
              <DynamicGridCell 
                images={workItems.filter(i => i.category === 'Social Media').map(i => i.img).slice(0, 10)} 
                intervalMs={3800} 
                delayOffsetMs={2000} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
              <div className="absolute inset-x-0 bottom-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="rounded-full border border-blue-400/30 bg-white/10 px-3 py-1 text-[10px] font-bold text-white backdrop-blur uppercase tracking-wider">Social</span>
                <h3 className="mt-2 text-lg font-black text-white">Campaign Motion</h3>
              </div>
            </Link>

            {/* 4. Small Bottom Right 2 */}
            <Link href="/portfolio" className="group relative overflow-hidden rounded-3xl premium-panel premium-border shadow-md block">
              <DynamicGridCell 
                images={workItems.filter(i => i.category === 'Flyers & Brochures').map(i => i.img).slice(0, 10)} 
                intervalMs={4200} 
                delayOffsetMs={3000} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
              <div className="absolute inset-x-0 bottom-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="rounded-full border border-blue-400/30 bg-white/10 px-3 py-1 text-[10px] font-bold text-white backdrop-blur uppercase tracking-wider">Print</span>
                <h3 className="mt-2 text-lg font-black text-white">Editorial Systems</h3>
              </div>
            </Link>
          </div>
        )}
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────── */}
      <section className="section-shell pb-20">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <GSAPReveal direction="left">
            <div>
              <span className="text-sm font-bold text-blue-600 dark:text-cyber-cyan">Trusted by Founders</span>
              <h2 className="mt-3 max-w-md font-display text-4xl font-black leading-tight text-slate-900 dark:text-white sm:text-5xl">
                Modern proof that keeps moving.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-slate-600 dark:text-white/60">
                More voices, cleaner motion, and a featured review that rotates while visitors scan the page.
              </p>
            </div>
          </GSAPReveal>

          <div className="grid gap-4">
            <GlowCard hoverScale={false} tiltActive={false} className="p-7 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div className="flex gap-1 text-amber-400 dark:text-cyber-cyan">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="rounded-md border border-blue-200 dark:border-cyber-cyan/25 bg-blue-50 dark:bg-cyber-cyan/10 px-3 py-1 text-xs font-bold text-blue-700 dark:text-cyber-cyan">
                  {activeTestimonial + 1} / {testimonials.length}
                </span>
              </div>
              <motion.blockquote
                key={testimonial.quote}
                initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                className="mt-6 text-xl font-semibold leading-9 text-slate-900 dark:text-white sm:text-2xl"
              >
                &ldquo;{testimonial.quote}&rdquo;
              </motion.blockquote>
              <div className="mt-7 flex flex-col gap-5 border-t border-blue-100 dark:border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{testimonial.name}</div>
                  <div className="mt-1 text-sm text-blue-500 dark:text-cyber-cyan/75">{testimonial.role}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={showPrevious}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-200 dark:border-white/10 bg-blue-50 dark:bg-white/[0.035] text-slate-600 dark:text-white/60 transition-colors hover:border-blue-400 dark:hover:border-cyber-cyan/40 hover:text-blue-600 dark:hover:text-cyber-cyan"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-200 dark:border-white/10 bg-blue-50 dark:bg-white/[0.035] text-slate-600 dark:text-white/60 transition-colors hover:border-blue-400 dark:hover:border-cyber-cyan/40 hover:text-blue-600 dark:hover:text-cyber-cyan"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </GlowCard>

            {/* Mini testimonial marquee */}
            <div className="overflow-hidden rounded-lg border border-blue-100 dark:border-white/10 bg-blue-50 dark:bg-white/[0.025] py-4">
              <div className="flex w-max animate-marquee gap-3 px-3">
                {[...testimonials, ...testimonials].map((item, index) => (
                  <div key={`${item.name}-${index}`} className="w-[18rem] rounded-lg border border-blue-100 dark:border-white/10 bg-white dark:bg-white/[0.06] p-4 shadow-sm dark:shadow-none">
                    <div className="flex gap-1 text-amber-400 dark:text-cyber-cyan">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-white/65">&ldquo;{item.quote}&rdquo;</p>
                    <div className="mt-4 text-sm font-bold text-slate-900 dark:text-white">{item.name}</div>
                    <div className="mt-1 text-xs text-blue-500 dark:text-cyber-cyan/70">{item.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA / BOOKING ───────────────────────────────── */}
      <section className="border-y border-blue-100 dark:border-white/10 bg-blue-50 dark:bg-cyber-darker/70">
        <div className="section-shell section-y">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <GSAPReveal direction="left">
              <div>
                <span className="text-sm font-bold text-blue-600 dark:text-cyber-cyan">Schedule Consult</span>
                <h2 className="mt-3 max-w-xl font-display text-4xl font-black leading-tight text-slate-900 dark:text-white sm:text-5xl">
                  Ready to scale your brand?
                </h2>
                <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 dark:text-white/60">
                  Lock in a complimentary 30-minute growth assessment. We will review your site, product visuals, and conversion path, then map the fastest premium upgrade.
                </p>
                <div className="mt-7 grid gap-3 text-sm text-slate-700 dark:text-white/70">
                  {["Comprehensive UI/UX audit", "Conversion pathway mapping", "Web and brand launch roadmap"].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-500 dark:text-cyber-cyan" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </GSAPReveal>

            <GSAPReveal direction="right" delay={0.1}>
              <div className="premium-panel premium-border rounded-lg p-5 sm:p-7">
                <div className="flex items-center gap-4 border-b border-blue-100 dark:border-white/10 pb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-blue-200 dark:border-cyber-cyan/25 bg-blue-50 dark:bg-cyber-cyan/10 text-blue-600 dark:text-cyber-cyan">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Growth Assessment</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-white/45">30 minutes / Google Meet</p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                    <div
                      key={day}
                      className={`rounded-lg border px-3 py-3 ${
                        index === 1
                          ? "border-blue-400 dark:border-cyber-cyan/45 bg-blue-500 dark:bg-cyber-cyan/[0.12] text-white dark:text-cyber-cyan"
                          : "border-blue-100 dark:border-white/10 bg-white dark:bg-white/[0.03] text-slate-600 dark:text-white/60"
                      }`}
                    >
                      <div className="text-xs font-semibold">{day}</div>
                      <div className="mt-1 text-lg font-black">26</div>
                    </div>
                  ))}
                </div>

                <a
                  href={contact.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-700 to-blue-500 dark:from-cyber-blue dark:to-cyber-cyan px-5 text-sm font-bold text-white shadow-[0_4px_20px_rgba(11,86,166,0.3)] dark:shadow-[0_0_28px_rgba(25,230,255,0.22)] transition-all hover:brightness-110"
                >
                  Reserve Consultation
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </GSAPReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
