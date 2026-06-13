"use client";

import { ArrowUpRight, Bot, CheckCircle, Code2, Layers3, MonitorSmartphone, PlaySquare, Settings2 } from "lucide-react";
import GlowCard from "@/components/GlowCard";
import GSAPReveal from "@/components/GSAPReveal";
import { contact } from "@/data/site";

const services = [
  {
    icon: MonitorSmartphone,
    label: "Web Development",
    headline: "Fast, elegant websites built to convert.",
    desc: "Premium Next.js and React builds for founders, product teams, ecommerce brands, and studios that need a polished digital presence.",
    features: [
      "Next.js websites",
      "React applications",
      "Full-stack development",
      "Modern UI/UX",
      "SaaS platforms",
      "Dashboards",
      "Landing pages",
    ],
  },
  {
    icon: Bot,
    label: "App Development",
    headline: "Custom tools that make operations feel effortless.",
    desc: "We build practical web applications with clean interfaces, secure integrations, and automation paths that reduce manual work.",
    features: [
      "Custom web applications",
      "AI chatbot apps",
      "Admin panels",
      "Automation systems",
      "API integrations",
      "Analytics workflows",
      "Internal portals",
    ],
  },
  {
    icon: Layers3,
    label: "Graphic Designing",
    headline: "Visual systems that make products feel premium.",
    desc: "From product mockups to Amazon A+ content, we craft digital assets that improve trust, clarity, and perceived brand value.",
    features: [
      "Product mockups",
      "Infographics",
      "A+ content",
      "Packaging design",
      "Brand identity",
      "Social media creatives",
      "Amazon listing graphics",
    ],
  },
  {
    icon: PlaySquare,
    label: "Video Editing",
    headline: "Sharp motion assets for launches and campaigns.",
    desc: "Short-form edits, reels, product promos, and motion graphics designed for attention without losing a luxury brand feel.",
    features: [
      "Short-form edits",
      "Product reels",
      "Promo videos",
      "Motion graphics",
      "Sound polish",
      "Launch cutdowns",
      "Ad creatives",
    ],
  },
];

const process = [
  { icon: Settings2, title: "Diagnose", desc: "We review the current product, brand assets, funnel, and technical constraints." },
  { icon: Code2, title: "Build", desc: "Design, engineering, and content production move in tight weekly delivery loops." },
  { icon: ArrowUpRight, title: "Launch", desc: "We ship a refined experience with SEO, responsiveness, and conversion flow checked." },
];

export default function ServicesPage() {
  return (
    <div className="relative z-10">
      <section className="section-shell hero-y text-center">
        <GSAPReveal direction="fade">
          <span className="text-sm font-bold text-blue-600 dark:text-cyber-cyan">Services</span>
        </GSAPReveal>
        <GSAPReveal direction="up" delay={0.12}>
          <h1 className="mx-auto mt-4 max-w-4xl font-display text-5xl font-black leading-tight text-slate-900 dark:text-white sm:text-6xl">
            Creative production and engineering under one premium studio.
          </h1>
        </GSAPReveal>
        <GSAPReveal direction="up" delay={0.22}>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 dark:text-white/70 sm:text-lg">
            We combine web development, custom applications, graphic design, and video editing into one cohesive digital growth system.
          </p>
        </GSAPReveal>
      </section>

      <section className="section-shell pb-20">
        <div className="grid gap-5">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <GlowCard key={service.label} delay={index * 0.08} hoverScale={false} className="p-6 sm:p-8">
                <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-blue-200 dark:border-cyber-cyan/25 bg-blue-50 dark:bg-cyber-cyan/10 text-blue-600 dark:text-cyber-cyan">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="mt-6 text-sm font-bold text-blue-600 dark:text-cyber-cyan">{service.label}</div>
                    <h2 className="mt-3 max-w-lg text-3xl font-black leading-tight text-slate-900 dark:text-white">{service.headline}</h2>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-white/60">{service.desc}</p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {service.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex min-h-14 items-center gap-3 rounded-lg border border-blue-100 dark:border-white/10 bg-white dark:bg-white/[0.03] px-4 py-3 text-sm font-semibold text-slate-700 dark:text-white/70 shadow-sm dark:shadow-none"
                      >
                        <CheckCircle className="h-4 w-4 shrink-0 text-blue-500 dark:text-cyber-cyan" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </GlowCard>
            );
          })}
        </div>
      </section>

      <section className="border-y border-blue-100 dark:border-white/10 bg-blue-50 dark:bg-cyber-darker/60">
        <div className="section-shell section-y">
          <div className="mb-10 text-center">
            <span className="text-sm font-bold text-blue-600 dark:text-cyber-cyan">Delivery Model</span>
            <h2 className="mx-auto mt-3 max-w-2xl text-4xl font-black text-slate-900 dark:text-white">A focused studio process from audit to launch.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {process.map((step, index) => {
              const Icon = step.icon;
              return (
                <GlowCard key={step.title} delay={index * 0.08} tiltActive={false}>
                  <Icon className="h-6 w-6 text-blue-600 dark:text-cyber-cyan" />
                  <h3 className="mt-5 text-xl font-black text-slate-900 dark:text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/60">{step.desc}</p>
                </GlowCard>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <a
              href={contact.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-700 to-blue-500 dark:from-cyber-blue dark:to-cyber-cyan px-6 text-sm font-bold text-white shadow-[0_4px_20px_rgba(11,86,166,0.3)] dark:shadow-[0_0_30px_rgba(25,230,255,0.22)]"
            >
              Start a Project
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
