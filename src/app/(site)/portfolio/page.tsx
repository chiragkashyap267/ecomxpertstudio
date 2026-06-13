"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle, Filter, X } from "lucide-react";
import GlowCard from "@/components/GlowCard";
import GSAPReveal from "@/components/GSAPReveal";

type WorkItem = {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  scope: string;
  img: string;
  liveUrl: string;
  desc: string;
  outcome: string;
};

export default function PortfolioPage() {
  const [projects, setProjects] = useState<WorkItem[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<WorkItem | null>(null);

  useEffect(() => {
    fetch("/api/work")
      .then((r) => r.json())
      .then((data: WorkItem[]) => setProjects(data))
      .catch(() => setProjects([]));
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(projects.map((p) => p.category)));
    return ["All", ...cats];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter, projects]);

  return (
    <div className="relative z-10">
      <section className="section-shell hero-y text-center">
        <GSAPReveal direction="fade">
          <span className="text-sm font-bold text-blue-600 dark:text-cyber-cyan">Portfolio</span>
        </GSAPReveal>
        <GSAPReveal direction="up" delay={0.12}>
          <h1 className="mx-auto mt-4 max-w-4xl font-display text-5xl font-black leading-tight text-slate-900 dark:text-white sm:text-6xl">
            Premium case studies across web, content, and brand design.
          </h1>
        </GSAPReveal>
        <GSAPReveal direction="up" delay={0.22}>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 dark:text-white/70 sm:text-lg">
            Browse selected projects built for sharper presentation, clearer
            conversion paths, and stronger brand authority.
          </p>
        </GSAPReveal>
      </section>

      <section className="section-shell pb-20">
        {/* Category filters */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          <Filter className="mr-2 hidden h-4 w-4 text-blue-500 dark:text-cyber-cyan sm:block" />
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveFilter(category)}
              className={`rounded-lg px-4 py-2 text-sm font-bold transition-all shadow-sm dark:shadow-none ${
                activeFilter === category
                  ? "border border-blue-400 dark:border-cyber-cyan/45 bg-blue-500 dark:bg-cyber-cyan/[0.12] text-white dark:text-cyber-cyan shadow-[0_4px_14px_rgba(59,130,246,0.3)] dark:shadow-[0_0_22px_rgba(25,230,255,0.16)]"
                  : "border border-blue-100 dark:border-white/10 bg-white dark:bg-white/[0.03] text-slate-700 dark:text-white/60 hover:border-blue-300 dark:hover:border-cyber-cyan/35 hover:text-blue-600 dark:hover:text-cyber-cyan"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="flex h-48 items-center justify-center text-slate-400 dark:text-white/30 text-sm">
            Loading portfolio…
          </div>
        )}

        <motion.div layout className="columns-2 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 sm:gap-5 space-y-3 sm:space-y-5">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.button
                layout
                key={project.id}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.28 }}
                onClick={() => setSelectedProject(project)}
                className="block w-full text-left break-inside-avoid"
              >
                <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 premium-panel premium-border shadow-md">
                  <img
                    src={project.img || "/placeholder.jpg"}
                    alt={project.title}
                    className="w-full h-auto object-cover opacity-90 transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="grid-wave-effect absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                  <span className="absolute left-4 top-4 rounded-full border border-blue-200 dark:border-cyber-cyan/25 bg-white/90 px-3 py-1 text-[11px] font-bold text-blue-700 dark:text-cyber-blue backdrop-blur uppercase tracking-wider shadow-sm opacity-0 transition-all duration-500 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0">
                    {project.category}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-5 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-xs font-bold text-white/70">
                      {project.client}
                    </p>
                    <h2 className="mt-2 text-xl font-black text-white">
                      {project.title}
                    </h2>
                    <div className="mt-3 flex items-center gap-2 text-sm font-bold text-blue-400 dark:text-cyber-cyan">
                      Open Preview
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-blue-900/10 dark:bg-black/60 px-4 py-6 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="premium-panel premium-border custom-scrollbar relative max-h-[88vh] w-full max-w-5xl overflow-y-auto rounded-lg p-5 sm:p-7"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-lg border border-blue-100 dark:border-white/10 bg-white dark:bg-white/[0.06] text-slate-700 dark:text-white/70 shadow-sm dark:shadow-none transition-colors hover:border-blue-300 dark:hover:border-cyber-cyan/45 hover:text-blue-600 dark:hover:text-cyber-cyan"
                aria-label="Close preview"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid gap-7 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="overflow-hidden rounded-lg border border-blue-100 dark:border-white/10 bg-blue-50 dark:bg-slate-900 flex items-start justify-center">
                  <img
                    src={selectedProject.img}
                    alt={selectedProject.title}
                    className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                  />
                </div>
                <div className="pr-0 lg:pr-4">
                  <span className="inline-flex rounded-md border border-blue-200 dark:border-cyber-cyan/25 bg-blue-50 dark:bg-cyber-cyan/10 px-3 py-1 text-xs font-bold text-blue-600 dark:text-cyber-cyan">
                    {selectedProject.category} / {selectedProject.year}
                  </span>
                  <h2 className="mt-5 text-3xl font-black leading-tight text-slate-900 dark:text-white">
                    {selectedProject.title}
                  </h2>
                  <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-white/50">
                    {selectedProject.client}
                  </p>
                  <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-white/70">
                    {selectedProject.desc}
                  </p>

                  <div className="mt-7 grid gap-5 border-t border-blue-100 dark:border-white/10 pt-6">
                    <div>
                      <p className="text-xs font-bold text-blue-600 dark:text-cyber-cyan">Scope</p>
                      <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-white/70">
                        {selectedProject.scope}
                      </p>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg border border-blue-100 dark:border-white/10 bg-blue-50 dark:bg-white/[0.04] p-4 shadow-sm dark:shadow-none">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-500 dark:text-cyber-cyan" />
                      <p className="text-sm leading-7 text-slate-600 dark:text-white/70">
                        {selectedProject.outcome}
                      </p>
                    </div>
                    <a
                      href={selectedProject.liveUrl}
                      target={
                        selectedProject.liveUrl.startsWith("http")
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        selectedProject.liveUrl.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-700 to-blue-500 dark:from-cyber-blue dark:to-cyber-cyan px-5 text-sm font-bold text-white shadow-[0_4px_20px_rgba(11,86,166,0.3)] dark:shadow-[0_0_24px_rgba(25,230,255,0.2)] transition-all hover:brightness-110"
                    >
                      View Live Link
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
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
