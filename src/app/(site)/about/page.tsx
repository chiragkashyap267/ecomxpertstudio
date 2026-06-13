"use client";

import { motion } from "framer-motion";
import { CheckCircle, Code2, Compass, Rocket, Sparkles, Target } from "lucide-react";
import GlowCard from "@/components/GlowCard";
import GSAPReveal from "@/components/GSAPReveal";

const counters = [
  { value: "150+", label: "Delivered assets" },
  { value: "4", label: "Core service pillars" },
  { value: "12+", label: "Specialist collaborators" },
  { value: "24/7", label: "Launch mindset" },
];

const skills = [
  { name: "Next.js and React engineering", level: 96 },
  { name: "Premium UI/UX art direction", level: 94 },
  { name: "Product mockups and packaging", level: 91 },
  { name: "Motion content and campaign edits", level: 88 },
];

const milestones = [
  {
    year: "2024",
    title: "Studio Foundation",
    desc: "Started as a focused ecommerce creative studio building web pages, product visuals, and brand collateral for growing sellers.",
  },
  {
    year: "2025",
    title: "Full-Stack Shift",
    desc: "Expanded into React applications, dashboards, automations, and conversion-focused web experiences for modern startups.",
  },
  {
    year: "2026",
    title: "Premium Creative-Tech Studio",
    desc: "Unified development, graphic systems, packaging, A+ content, and motion production into one high-end digital growth offering.",
  },
];

const tech = ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion", "Figma", "Blender", "Adobe Creative Suite", "Vercel"];

export default function AboutPage() {
  return (
    <div className="relative z-10">
      <section className="section-shell hero-y text-center">
        <GSAPReveal direction="fade">
          <span className="text-sm font-bold text-blue-600 dark:text-cyber-cyan">About EcomXpertStudio</span>
        </GSAPReveal>
        <GSAPReveal direction="up" delay={0.12}>
          <h1 className="mx-auto mt-4 max-w-4xl font-display text-5xl font-black leading-tight text-slate-900 dark:text-white sm:text-6xl">
            A creative-tech studio built for brands that want sharper digital growth.
          </h1>
        </GSAPReveal>
        <GSAPReveal direction="up" delay={0.22}>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 dark:text-white/70 sm:text-lg">
            We connect design taste, conversion thinking, and modern engineering into premium websites, apps, visual systems, and campaign assets.
          </p>
        </GSAPReveal>
      </section>

      <section className="section-shell pb-20">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
          <GlowCard hoverScale={false} className="p-7 sm:p-8">
            <Sparkles className="h-6 w-6 text-blue-600 dark:text-cyber-cyan" />
            <h2 className="mt-5 text-3xl font-black text-slate-900 dark:text-white">Founder Introduction</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-white/70">
              EcomXpertStudio is led by Chirag Kashyap as a remote-first digital studio focused on websites, web apps, ecommerce visuals, premium mockups, packaging, and motion content. The studio model is deliberately lean: fewer layers, tighter taste, faster production.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {["Premium interface direction", "Conversion-focused execution", "Design and code in one workflow", "Scalable brand asset systems"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg border border-blue-100 dark:border-white/10 bg-white dark:bg-white/[0.03] px-4 py-3 text-sm text-slate-700 dark:text-white/70 shadow-sm dark:shadow-none">
                  <CheckCircle className="h-4 w-4 shrink-0 text-blue-500 dark:text-cyber-cyan" />
                  {item}
                </div>
              ))}
            </div>
          </GlowCard>

          <GlowCard hoverScale={false} tiltActive={false} className="p-7 sm:p-8">
            <Target className="h-6 w-6 text-blue-600 dark:text-cyber-cyan" />
            <h2 className="mt-5 text-3xl font-black text-slate-900 dark:text-white">Mission</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-white/70">
              Make every digital touchpoint feel premium, clear, and commercially useful. No generic agency clutter. Just focused creative direction, strong interaction design, and reliable delivery.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3">
              {counters.map((item) => (
                <div key={item.label} className="rounded-lg border border-blue-100 dark:border-white/10 bg-white dark:bg-white/[0.03] p-4 shadow-sm dark:shadow-none">
                  <div className="text-3xl font-black text-slate-900 dark:text-white">{item.value}</div>
                  <div className="mt-1 text-xs font-semibold text-blue-600 dark:text-cyber-cyan">{item.label}</div>
                </div>
              ))}
            </div>
          </GlowCard>
        </div>
      </section>

      <section className="border-y border-blue-100 dark:border-white/10 bg-blue-50 dark:bg-cyber-darker/60">
        <div className="section-shell section-y">
          <div className="mb-10 grid gap-5 lg:grid-cols-[0.8fr_1fr] lg:items-end">
            <div>
              <span className="text-sm font-bold text-blue-600 dark:text-cyber-cyan">Expertise</span>
              <h2 className="mt-3 text-4xl font-black text-slate-900 dark:text-white">Technical and creative matrix.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-white/60">
              Our work sits between polished product design, production-ready code, and marketplace-ready brand assets.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {skills.map((skill, index) => (
              <GlowCard key={skill.name} delay={index * 0.08} hoverScale={false} tiltActive={false}>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-bold text-slate-900 dark:text-white">{skill.name}</h3>
                  <span className="text-sm font-bold text-blue-600 dark:text-cyber-cyan">{skill.level}%</span>
                </div>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-blue-100 dark:bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.08, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-700 to-blue-400 dark:from-cyber-blue dark:to-cyber-cyan"
                  />
                </div>
              </GlowCard>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {tech.map((item) => (
              <span key={item} className="rounded-lg border border-blue-100 dark:border-white/10 bg-white dark:bg-white/[0.03] px-3 py-2 text-sm font-semibold text-slate-700 dark:text-white/70 shadow-sm dark:shadow-none">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-y">
        <div className="mb-12 text-center">
          <span className="text-sm font-bold text-blue-600 dark:text-cyber-cyan">Timeline</span>
          <h2 className="mx-auto mt-3 max-w-2xl text-4xl font-black text-slate-900 dark:text-white">From ecommerce visuals to full creative-tech delivery.</h2>
        </div>

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-4 top-0 h-full w-px bg-blue-200 dark:bg-white/10 sm:left-1/2" />
          <div className="grid gap-6">
            {milestones.map((item, index) => (
              <div key={item.year} className={`relative grid gap-4 sm:grid-cols-2 ${index % 2 === 0 ? "" : "sm:[&>div]:col-start-2"}`}>
                <div className="absolute left-[9px] top-6 z-10 h-3 w-3 rounded-full border border-blue-500 dark:border-cyber-cyan bg-white dark:bg-cyber-bg shadow-[0_0_12px_rgba(59,130,246,0.55)] dark:shadow-[0_0_12px_rgba(25,230,255,0.55)] sm:left-[calc(50%-6px)]" />
                <GlowCard hoverScale={false} tiltActive={false} className="ml-9 p-6 sm:ml-0">
                  <div className="text-sm font-bold text-blue-600 dark:text-cyber-cyan">{item.year}</div>
                  <h3 className="mt-2 text-xl font-black text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/60">{item.desc}</p>
                </GlowCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pb-20">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Compass, title: "Taste-led direction", desc: "Modern, minimal, polished visual systems." },
            { icon: Code2, title: "Production-ready code", desc: "Responsive builds with clean architecture." },
            { icon: Rocket, title: "Launch-focused output", desc: "Assets built for campaigns, funnels, and growth." },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <GlowCard key={item.title} tiltActive={false}>
                <Icon className="h-6 w-6 text-blue-600 dark:text-cyber-cyan" />
                <h3 className="mt-5 text-xl font-black text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/60">{item.desc}</p>
              </GlowCard>
            );
          })}
        </div>
      </section>
    </div>
  );
}
