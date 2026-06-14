"use client";

import { useEffect, useState } from "react";
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
import GlowCard from "@/components/GlowCard";
import GSAPReveal from "@/components/GSAPReveal";
import Magnetic from "@/components/Magnetic";
import HeroCarousel from "@/components/HeroCarousel";
import DomeGallery from "@/components/DomeGallery";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
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
  const [activeHero, setActiveHero] = useState(0);
  const [activePortfolio, setActivePortfolio] = useState(0);
  const [workItems, setWorkItems] = useState<any[]>([]);
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
    const portfolioTimer = window.setInterval(() => {
      setActivePortfolio((current) => (current + 1) % 5);
    }, 4000);
    return () => {
      window.clearInterval(heroTimer);
      window.clearInterval(portfolioTimer);
    };
  }, []);



  return (
    <div className="relative z-10 overflow-hidden">

      {/* ── HERO ──────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden w-full"
        style={{ background: "linear-gradient(160deg, #020b18 0%, #060e23 35%, #080d22 65%, #030a17 100%)" }}
      >
        {/* Ambient glow orbs */}
        <div style={{ position: "absolute", top: "-15%", left: "20%", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-20%", right: "15%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "40%", left: "5%", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />
        <HeroCarousel />
      </div>

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

        {/* DomeGallery Integration */}
        <div className="w-full h-[600px] mt-8 rounded-3xl overflow-hidden relative shadow-2xl premium-border border-blue-200/20 dark:border-white/10">
          <DomeGallery 
            images={workItems.map(i => ({ src: i.img, alt: i.category }))}
            grayscale={false}
            overlayBlurColor="#020b18" 
          />
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────── */}
      <section className="section-shell pb-20 relative overflow-hidden">
        <div className="z-10 mx-auto">
          <GSAPReveal direction="up">
            <div className="flex flex-col items-center justify-center max-w-[540px] mx-auto text-center">
              <span className="text-sm font-bold text-blue-600 dark:text-cyber-cyan">Testimonials</span>
              <h2 className="mt-3 font-display text-4xl font-black leading-tight text-slate-900 dark:text-white sm:text-5xl">
                What our users say
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-white/60">
                See what our customers have to say about our premium digital services and operational solutions.
              </p>
            </div>
          </GSAPReveal>

          <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[740px] overflow-hidden">
            <TestimonialsColumn 
              testimonials={[
                {
                  text: "This ERP revolutionized our operations, streamlining finance and inventory. The cloud-based platform keeps us productive, even remotely.",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
                  name: "Briana Patton",
                  role: "Operations Manager",
                },
                {
                  text: "Implementing this ERP was smooth and quick. The customizable, user-friendly interface made team training effortless.",
                  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80",
                  name: "Bilal Ahmed",
                  role: "IT Manager",
                },
                {
                  text: "The support team is exceptional, guiding us through setup and providing ongoing assistance, ensuring our satisfaction.",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
                  name: "Saman Malik",
                  role: "Customer Support Lead",
                }
              ]} 
              duration={15} 
            />
            <TestimonialsColumn 
              testimonials={[
                {
                  text: "This ERP's seamless integration enhanced our business operations and efficiency. Highly recommend for its intuitive interface.",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
                  name: "Omar Raza",
                  role: "CEO",
                },
                {
                  text: "Its robust features and quick support have transformed our workflow, making us significantly more efficient.",
                  image: "https://images.unsplash.com/photo-1598550874175-4d0ef43ce418?auto=format&fit=crop&w=150&q=80",
                  name: "Zainab Hussain",
                  role: "Project Manager",
                },
                {
                  text: "The smooth implementation exceeded expectations. It streamlined processes, improving overall business performance.",
                  image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
                  name: "Aliza Khan",
                  role: "Business Analyst",
                }
              ]} 
              className="hidden md:block" 
              duration={19} 
            />
            <TestimonialsColumn 
              testimonials={[
                {
                  text: "Our business functions improved with a user-friendly design and positive customer feedback.",
                  image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
                  name: "Farhan Siddiqui",
                  role: "Marketing Director",
                },
                {
                  text: "They delivered a solution that exceeded expectations, understanding our needs and enhancing our operations.",
                  image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&q=80",
                  name: "Sana Sheikh",
                  role: "Sales Manager",
                },
                {
                  text: "Using this ERP, our online presence and conversions significantly improved, boosting business performance.",
                  image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
                  name: "Hassan Ali",
                  role: "E-commerce Manager",
                }
              ]} 
              className="hidden lg:block" 
              duration={17} 
            />
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
