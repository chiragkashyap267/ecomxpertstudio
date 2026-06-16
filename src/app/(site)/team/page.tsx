"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  Crown,
  Github,
  Linkedin,
  Palette,
  Rocket,
  Sparkles,
  Video,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { contact } from "@/data/site";

/* ─── Team Data ──────────────────────────────────────────── */
const team = [
  {
    id: "chirag",
    name: "Chirag Kashyap",
    role: "Founder & CEO",
    badge: "Leadership",
    badgeIcon: Crown,
    bio: "Chirag founded EcomXpertStudio with a single mission — make every digital touchpoint feel premium, sharp, and commercially powerful. With deep expertise across web engineering, brand strategy, and creative direction, he leads the studio end-to-end from vision to launch.",
    skills: ["Growth Strategy", "Web Architecture", "Brand Direction", "Client Consulting", "Project Delivery"],
    stats: [
      { value: "150+", label: "Projects Led" },
      { value: "2+", label: "Years Studio" },
      { value: "99.8%", label: "Satisfaction" },
    ],
    gradient: "from-sky-500 via-blue-600 to-indigo-700",
    glow: "rgba(14,165,233,0.35)",
    ring: "rgba(14,165,233,0.5)",
    avatarBg: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)",
    initials: "CK",
    linkedin: contact.linkedinUrl,
    github: contact.githubUrl,
    isFounder: true,
  },
  {
    id: "ankur",
    name: "Ankur Saini",
    role: "Graphic & Media Head",
    badge: "Design",
    badgeIcon: Palette,
    bio: "Ankur leads all visual production at EcomXpertStudio — from product mockups and packaging systems to A+ content, social creatives, and motion brand assets. His work gives every product the premium edge it needs to stand out in crowded marketplaces.",
    skills: ["Product Mockups", "Packaging Design", "A+ Content", "Social Creatives", "Brand Systems"],
    stats: [
      { value: "100+", label: "Assets Delivered" },
      { value: "30+", label: "Brand Projects" },
      { value: "45%+", label: "Avg. Conv. Lift" },
    ],
    gradient: "from-purple-500 via-violet-600 to-pink-600",
    glow: "rgba(139,92,246,0.35)",
    ring: "rgba(139,92,246,0.5)",
    avatarBg: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
    initials: "AS",
    linkedin: null,
    github: null,
    isFounder: false,
  },
  {
    id: "jayant",
    name: "Jayant Kumar",
    role: "Web Dev & Media",
    badge: "Engineering",
    badgeIcon: Code2,
    bio: "Jayant powers the engineering and media side of EcomXpertStudio — building modern Next.js applications, custom dashboards, and workflow automations while also contributing to video editing and motion content. He brings technical precision to every creative deliverable.",
    skills: ["Next.js Development", "React Apps", "Video Editing", "Motion Graphics", "API Integrations"],
    stats: [
      { value: "50+", label: "Apps Built" },
      { value: "20+", label: "Videos Edited" },
      { value: "60fps", label: "Motion Standard" },
    ],
    gradient: "from-emerald-500 via-teal-600 to-cyan-700",
    glow: "rgba(16,185,129,0.35)",
    ring: "rgba(16,185,129,0.5)",
    avatarBg: "linear-gradient(135deg, #10b981 0%, #0ea5e9 100%)",
    initials: "JK",
    linkedin: null,
    github: null,
    isFounder: false,
  },
];

const values = [
  {
    icon: Zap,
    title: "Speed with precision",
    desc: "We move fast without compromising on quality — tight delivery loops, weekly milestones, and always production-ready output.",
  },
  {
    icon: Sparkles,
    title: "Taste-led execution",
    desc: "Every asset is crafted with a strong design eye — modern, minimal, and purposefully premium.",
  },
  {
    icon: Rocket,
    title: "Growth-first mindset",
    desc: "We don't just design or build — we think about conversions, brand authority, and measurable business outcomes.",
  },
];

/* ─── Floating Orb ───────────────────────────────────────── */
function Orb({ color, style }: { color: string; style: React.CSSProperties }) {
  return (
    <div
      style={{
        position: "absolute",
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
        filter: "blur(55px)",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

/* ─── Team Card ──────────────────────────────────────────── */
function TeamCard({ member, index }: { member: (typeof team)[0]; index: number }) {
  const BadgeIcon = member.badgeIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col"
    >
      {/* Founder special highlight ring */}
      {member.isFounder && (
        <div
          className="absolute -inset-px rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${member.ring}, transparent 60%, ${member.ring})`,
            borderRadius: "18px",
            padding: "1px",
            zIndex: 0,
          }}
        />
      )}

      <div
        className="relative flex flex-col h-full rounded-2xl overflow-hidden"
        style={{
          background: "rgba(10,16,38,0.7)",
          border: member.isFounder
            ? `1px solid ${member.ring}`
            : "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          boxShadow: member.isFounder
            ? `0 0 0 1px ${member.ring}, 0 24px 80px rgba(0,0,0,0.5), 0 0 60px ${member.glow}`
            : `0 12px 50px rgba(0,0,0,0.4)`,
        }}
      >
        {/* Card header gradient strip */}
        <div
          className={`h-28 w-full bg-gradient-to-br ${member.gradient} relative overflow-hidden flex-shrink-0`}
        >
          {/* Pattern overlay */}
          <div
            style={{
              position: "absolute", inset: 0,
              backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          {/* Glow blob */}
          <div style={{
            position: "absolute", bottom: "-20px", left: "50%", transform: "translateX(-50%)",
            width: "120px", height: "60px", borderRadius: "50%",
            background: `rgba(255,255,255,0.15)`, filter: "blur(20px)",
          }} />

          {/* Founder crown badge */}
          {member.isFounder && (
            <div
              className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full px-3 py-1"
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              <Crown className="w-3 h-3 text-amber-300" />
              <span style={{ fontSize: "9px", fontWeight: 800, color: "#fef3c7", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Founder & CEO
              </span>
            </div>
          )}
        </div>

        {/* Avatar — overlapping the header */}
        <div className="px-6 relative" style={{ marginTop: "-36px" }}>
          <div
            className="relative inline-flex"
            style={{
              width: "72px", height: "72px", borderRadius: "50%",
              background: member.avatarBg,
              border: "3px solid rgba(10,16,38,0.9)",
              boxShadow: `0 0 0 2px ${member.ring}, 0 8px 24px rgba(0,0,0,0.4)`,
              alignItems: "center", justifyContent: "center", display: "flex",
            }}
          >
            <span style={{ fontSize: "22px", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>
              {member.initials}
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="flex flex-col flex-1 px-6 pb-6 pt-4 gap-4">
          {/* Name + role */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 style={{ fontSize: "20px", fontWeight: 900, color: "#fff", lineHeight: 1.2 }}>
                {member.name}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <BadgeIcon className="w-3.5 h-3.5" style={{ color: member.ring }} />
              <span style={{ fontSize: "12px", fontWeight: 700, color: member.ring }}>
                {member.role}
              </span>
            </div>
          </div>

          {/* Bio */}
          <p style={{ fontSize: "13px", lineHeight: "1.75", color: "rgba(148,163,184,0.85)" }}>
            {member.bio}
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2">
            {member.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center rounded-xl py-3 px-1"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <span style={{ fontSize: "17px", fontWeight: 900, color: "#fff", lineHeight: 1 }}>
                  {stat.value}
                </span>
                <span style={{ fontSize: "9px", fontWeight: 600, color: "rgba(148,163,184,0.65)", marginTop: "4px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5">
            {member.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(203,213,225,0.85)",
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Social links (if available) */}
          {(member.linkedin || member.github) && (
            <div className="flex items-center gap-2 pt-1 border-t border-white/[0.06]">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all"
                  style={{
                    background: "rgba(14,165,233,0.08)",
                    border: "1px solid rgba(14,165,233,0.2)",
                    color: "#7dd3fc",
                  }}
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
              )}
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(203,213,225,0.8)",
                  }}
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function TeamPage() {
  return (
    <div
      className="relative z-10 min-h-screen overflow-hidden"
      style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(14,165,233,0.07) 0%, transparent 60%)" }}
    >
      {/* Ambient orbs */}
      <Orb color="rgba(14,165,233,0.12)" style={{ top: "-10%", left: "10%", width: "500px", height: "500px" }} />
      <Orb color="rgba(99,102,241,0.1)" style={{ bottom: "5%", right: "5%", width: "600px", height: "600px" }} />
      <Orb color="rgba(139,92,246,0.08)" style={{ top: "40%", left: "-5%", width: "400px", height: "400px" }} />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="section-shell hero-y text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Pill */}
          <div
            className="inline-flex items-center gap-2 rounded-full mb-6 px-4 py-2"
            style={{
              background: "rgba(14,165,233,0.1)",
              border: "1px solid rgba(14,165,233,0.25)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#7dd3fc", letterSpacing: "0.06em" }}>
              THE TEAM BEHIND THE STUDIO
            </span>
          </div>

          <h1
            className="mx-auto max-w-4xl font-display font-black leading-tight"
            style={{
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              letterSpacing: "-0.025em",
              background: "linear-gradient(135deg, #e0f2fe 0%, #7dd3fc 30%, #38bdf8 50%, #ffffff 65%, #93c5fd 80%, #818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Built by people who care about quality.
          </h1>

          <p
            className="mx-auto mt-6 max-w-2xl leading-8"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.1rem)", color: "rgba(148,163,184,0.85)" }}
          >
            A small, focused team of specialists — no layers, no middlemen. Just sharp skills,
            fast delivery, and a shared obsession with premium digital craft.
          </p>
        </motion.div>
      </section>

      {/* ── Team Cards ───────────────────────────────────── */}
      <section className="section-shell pb-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </section>

      {/* ── Values / Culture strip ───────────────────────── */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(14,165,233,0.04) 0%, rgba(99,102,241,0.04) 100%)",
          }}
        />
        <div className="section-shell relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center mb-12"
          >
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#0ea5e9", textTransform: "uppercase", letterSpacing: "0.15em" }}>
              Studio Culture
            </span>
            <h2
              className="mt-3 font-display font-black"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#fff", letterSpacing: "-0.02em" }}
            >
              How we work together.
            </h2>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-3">
            {values.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  className="rounded-2xl p-6"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl mb-5"
                    style={{
                      background: "rgba(14,165,233,0.12)",
                      border: "1px solid rgba(14,165,233,0.25)",
                    }}
                  >
                    <Icon className="h-5 w-5 text-sky-400" />
                  </div>
                  <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#fff", marginBottom: "10px" }}>
                    {val.title}
                  </h3>
                  <p style={{ fontSize: "13px", lineHeight: "1.7", color: "rgba(148,163,184,0.8)" }}>
                    {val.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="section-shell py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="font-display font-black"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#fff", marginBottom: "16px" }}
          >
            Want to work with us?
          </h2>
          <p style={{ color: "rgba(148,163,184,0.8)", fontSize: "15px", marginBottom: "32px" }}>
            Book a free 30-minute growth call and let's see how we can level up your brand.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={contact.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm text-white transition-all"
              style={{
                background: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)",
                boxShadow: "0 0 32px rgba(14,165,233,0.4)",
              }}
            >
              Book a Free Call
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-bold text-sm transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              See Our Work
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
