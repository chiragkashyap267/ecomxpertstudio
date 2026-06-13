"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Calendar,
  Check,
  CheckCircle,
  Copy,
  Mail,
  MessageCircle,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import GlowCard from "@/components/GlowCard";
import GSAPReveal from "@/components/GSAPReveal";
import { buildMailtoUrl, buildWhatsAppUrl, contact, socialLinks } from "@/data/site";

const projectTypes = [
  { value: "web", label: "Web Development" },
  { value: "app", label: "App Development" },
  { value: "design", label: "Graphic Design" },
  { value: "video", label: "Video Editing" },
];

const timeSlots = ["09:00", "11:30", "14:00", "16:30"];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", projectType: "web", message: "" });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");

  const handleCopyEmail = () => {
    void navigator.clipboard.writeText(contact.email);
    setCopiedEmail(true);
    window.setTimeout(() => setCopiedEmail(false), 1800);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const projectType = projectTypes.find((type) => type.value === formData.projectType)?.label ?? formData.projectType;
    const brief = [
      `New project brief for ${contact.brand}`,
      "",
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Project type: ${projectType}`,
      "",
      "Project details:",
      formData.message,
    ].join("\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, projectType }),
      });

      if (!response.ok) {
        throw new Error("Contact API did not accept the brief.");
      }

      window.open(buildWhatsAppUrl(brief), "_blank", "noopener,noreferrer");
      window.location.href = buildMailtoUrl(`New ${projectType} inquiry from ${formData.name}`, brief);
      setIsSubmitting(false);
      setFormStatus("success");
      setFormData({ name: "", email: "", projectType: "web", message: "" });
    } catch {
      window.open(buildWhatsAppUrl(brief), "_blank", "noopener,noreferrer");
      window.location.href = buildMailtoUrl(`New ${projectType} inquiry from ${formData.name}`, brief);
      setIsSubmitting(false);
      setFormStatus("error");
    }
  };

  /* Shared input class — adapts in both modes */
  const inputCls =
    "h-12 rounded-lg border border-blue-200 dark:border-white/10 bg-white dark:bg-white/[0.06] px-4 text-sm font-medium text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-white/30 focus:border-blue-500 dark:focus:border-cyber-cyan/55 focus:ring-0 shadow-sm dark:shadow-none";

  return (
    <div className="relative z-10">
      <section className="section-shell hero-y text-center">
        <GSAPReveal direction="fade">
          <span className="text-sm font-bold text-blue-600 dark:text-cyber-cyan">Contact</span>
        </GSAPReveal>
        <GSAPReveal direction="up" delay={0.12}>
          <h1 className="mx-auto mt-4 max-w-4xl font-display text-5xl font-black leading-tight text-slate-900 dark:text-white sm:text-6xl">
            Start your premium digital upgrade.
          </h1>
        </GSAPReveal>
        <GSAPReveal direction="up" delay={0.22}>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 dark:text-white/70 sm:text-lg">
            Tell us what you are building. We will respond with the cleanest next step for your website, app, brand visuals, packaging, or campaign assets.
          </p>
        </GSAPReveal>
      </section>

      <section className="section-shell pb-20">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <GlowCard hoverScale={false} className="p-6 sm:p-8">
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-blue-200 dark:border-cyber-cyan/25 bg-blue-50 dark:bg-cyber-cyan/10 text-blue-600 dark:text-cyber-cyan">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">Project Brief</h2>
                <p className="text-sm text-slate-500 dark:text-white/50">Share the essentials. We will take it from there.</p>
              </div>
            </div>

            {formStatus !== "idle" ? (
              <div className="rounded-lg border border-blue-200 dark:border-cyber-cyan/25 bg-blue-50 dark:bg-cyber-cyan/10 p-8 text-center">
                <CheckCircle className="mx-auto h-10 w-10 text-blue-500 dark:text-cyber-cyan" />
                <h3 className="mt-5 text-2xl font-black text-slate-900 dark:text-white">
                  {formStatus === "success" ? "Message ready to send" : "Message prepared"}
                </h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-600 dark:text-white/70">
                  Your brief has been prepared for {contact.email} and WhatsApp. Confirm the opened draft/chat to send it directly.
                </p>
                <button
                  type="button"
                  onClick={() => setFormStatus("idle")}
                  className="mt-6 rounded-lg border border-blue-300 dark:border-cyber-cyan/35 bg-white dark:bg-cyber-cyan/10 px-5 py-3 text-sm font-bold text-blue-700 dark:text-cyber-cyan transition-colors hover:bg-blue-50 dark:hover:bg-cyber-cyan/20"
                >
                  Send another brief
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-bold text-slate-900 dark:text-white">
                    Full Name
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                      placeholder="Your name"
                      className={inputCls}
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-bold text-slate-900 dark:text-white">
                    Email Address
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                      placeholder="you@brand.com"
                      className={inputCls}
                    />
                  </label>
                </div>

                <label className="grid gap-2 text-sm font-bold text-slate-900 dark:text-white">
                  Project Type
                  <select
                    value={formData.projectType}
                    onChange={(event) => setFormData({ ...formData, projectType: event.target.value })}
                    className={inputCls}
                  >
                    {projectTypes.map((type) => (
                      <option key={type.value} value={type.value} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                        {type.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2 text-sm font-bold text-slate-900 dark:text-white">
                  Project Details
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                    placeholder="Timeline, goals, current website, brand assets, or the visual style you want..."
                    className="resize-none rounded-lg border border-blue-200 dark:border-white/10 bg-white dark:bg-white/[0.06] px-4 py-4 text-sm font-medium leading-7 text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-white/30 focus:border-blue-500 dark:focus:border-cyber-cyan/55 shadow-sm dark:shadow-none"
                  />
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-700 to-blue-500 dark:from-cyber-blue dark:to-cyber-cyan px-6 text-sm font-bold text-white shadow-[0_4px_20px_rgba(11,86,166,0.3)] dark:shadow-[0_0_30px_rgba(25,230,255,0.22)] transition-all hover:brightness-110 disabled:opacity-60"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <Send className="h-4 w-4" />}
                </button>
              </form>
            )}
          </GlowCard>

          <div className="grid gap-5">
            <GlowCard hoverScale={false} tiltActive={false} className="p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-blue-200 dark:border-cyber-cyan/25 bg-blue-50 dark:bg-cyber-cyan/10 text-blue-600 dark:text-cyber-cyan">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">Book 30-Min Session</h2>
                  <p className="text-sm text-slate-500 dark:text-white/50">Direct Calendly consultation window</p>
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-blue-100 dark:border-white/10 bg-white dark:bg-white/[0.04] p-4 shadow-sm dark:shadow-none">
                <div className="flex items-center justify-between border-b border-blue-100 dark:border-white/10 pb-4 text-sm">
                  <span className="font-semibold text-slate-600 dark:text-white/60">Google Meet</span>
                  <span className="font-bold text-blue-600 dark:text-cyber-cyan">Live slots</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={slot}
                      type="button"
                      className={`rounded-lg border px-4 py-3 text-sm font-bold transition-colors ${
                        index === 1
                          ? "border-blue-400 dark:border-cyber-cyan/45 bg-blue-500 dark:bg-cyber-cyan/10 text-white dark:text-cyber-cyan"
                          : "border-blue-100 dark:border-white/10 bg-white dark:bg-white/[0.03] text-slate-600 dark:text-white/60 hover:border-blue-300 dark:hover:border-cyber-cyan/35 hover:text-blue-600 dark:hover:text-cyber-cyan"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                <a
                  href={contact.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex h-11 items-center justify-center gap-2 rounded-lg border border-blue-300 dark:border-cyber-cyan/35 bg-blue-50 dark:bg-cyber-cyan/10 text-sm font-bold text-blue-700 dark:text-cyber-cyan transition-colors hover:bg-blue-100 dark:hover:bg-cyber-cyan/20"
                >
                  Open Calendly
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </GlowCard>

            <GlowCard hoverScale={false} tiltActive={false} className="p-6">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Direct Contact</h3>
              <div className="mt-5 grid gap-3">
                <div className="flex items-center justify-between gap-3 rounded-lg border border-blue-100 dark:border-white/10 bg-white dark:bg-white/[0.03] p-4 shadow-sm dark:shadow-none">
                  <div className="flex min-w-0 items-center gap-3">
                    <Mail className="h-4 w-4 shrink-0 text-blue-500 dark:text-cyber-cyan" />
                    <span className="truncate text-sm font-semibold text-slate-700 dark:text-white/70">{contact.email}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-100 dark:border-white/10 text-slate-500 dark:text-white/60 transition-colors hover:border-blue-300 dark:hover:border-cyber-cyan/35 hover:text-blue-600 dark:hover:text-cyber-cyan"
                    aria-label="Copy email"
                  >
                    {copiedEmail ? <Check className="h-4 w-4 text-blue-500 dark:text-cyber-cyan" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                <a href={`tel:+91${contact.phone}`} className="flex items-center gap-3 rounded-lg border border-blue-100 dark:border-white/10 bg-white dark:bg-white/[0.03] p-4 text-sm font-semibold text-slate-700 dark:text-white/70 shadow-sm dark:shadow-none transition-colors hover:border-blue-300 dark:hover:border-cyber-cyan/35 hover:text-blue-600 dark:hover:text-cyber-cyan">
                  <Phone className="h-4 w-4 text-blue-500 dark:text-cyber-cyan" />
                  {contact.phoneDisplay}
                </a>
                <a href={buildWhatsAppUrl("Hi EcomXpertStudio, I want to discuss a project.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-lg border border-blue-100 dark:border-white/10 bg-white dark:bg-white/[0.03] p-4 text-sm font-semibold text-slate-700 dark:text-white/70 shadow-sm dark:shadow-none transition-colors hover:border-blue-300 dark:hover:border-cyber-cyan/35 hover:text-blue-600 dark:hover:text-cyber-cyan">
                  <MessageCircle className="h-4 w-4 text-blue-500 dark:text-cyber-cyan" />
                  WhatsApp {contact.phoneDisplay}
                </a>
              </div>

              <div className="mt-5 flex gap-2">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-100 dark:border-white/10 bg-white dark:bg-white/[0.03] text-slate-600 dark:text-white/60 shadow-sm dark:shadow-none transition-colors hover:border-blue-300 dark:hover:border-cyber-cyan/35 hover:text-blue-600 dark:hover:text-cyber-cyan"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </GlowCard>
          </div>
        </div>
      </section>

      <section className="border-y border-blue-100 dark:border-white/10 bg-blue-50 dark:bg-cyber-darker/60">
        <div className="section-shell section-y">
          <div className="relative overflow-hidden rounded-lg border border-blue-100 dark:border-white/10 bg-white dark:bg-white/[0.025] p-6 sm:p-8 shadow-sm dark:shadow-none">
            <div className="cyber-grid absolute inset-0 opacity-60" />
            <div className="noise-overlay absolute inset-0 opacity-20" />
            <div className="relative z-10 grid gap-6 md:grid-cols-[0.8fr_1fr] md:items-center">
              <div>
                <MapPin className="h-7 w-7 text-blue-600 dark:text-cyber-cyan" />
                <h2 className="mt-5 text-3xl font-black text-slate-900 dark:text-white">Roorkee-based studio, global delivery.</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-white/60">
                  {contact.address}. We collaborate across time zones with clean review loops, clear milestones, and launch-ready deliverables.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {["Discovery", "Design", "Launch"].map((item, index) => (
                  <div key={item} className="rounded-lg border border-blue-100 dark:border-white/10 bg-white dark:bg-white/[0.05] p-4 shadow-sm dark:shadow-none">
                    <div className="text-xs font-bold text-blue-600 dark:text-cyber-cyan">0{index + 1}</div>
                    <div className="mt-2 text-lg font-black text-slate-900 dark:text-white">{item}</div>
                    <div className="mt-2 h-1.5 rounded-full bg-slate-200 dark:bg-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-blue-700 to-blue-400 dark:from-cyber-blue dark:to-cyber-cyan" style={{ width: `${55 + index * 18}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
