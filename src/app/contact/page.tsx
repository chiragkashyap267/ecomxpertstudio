"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Terminal, 
  Send, 
  Calendar,
  CheckCircle,
  Copy,
  Check
} from "lucide-react";
import GlassCard from "@/components/GlassCard";

const STUDIO_NODES = [
  { city: "San Francisco Node", coords: "37.7749° N, 122.4194° W", role: "HQ / Engineering Node" },
  { city: "Mumbai Node", coords: "19.0760° N, 72.8777° E", role: "Design / Creative Node" },
  { city: "Tokyo Node", coords: "35.6762° N, 139.6503° E", role: "Motion / Video Node" }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", node: "web-dev", message: "" });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@ecomxpertstudio.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate premium secure form delivery
    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus("success");
      setFormData({ name: "", email: "", node: "web-dev", message: "" });
    }, 1200);
  };

  return (
    <div className="relative z-10 mx-auto w-[90%] max-w-6xl px-4 py-12">
      
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-[10px] font-bold tracking-widest text-cyber-cyan uppercase border border-cyber-cyan/30 bg-cyber-cyan/5 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(0,240,255,0.05)]">
          Secure Uplink
        </span>
        <h1 className="mt-6 font-display text-4xl font-black text-white sm:text-6xl">
          Connect Your Node
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/50">
          Ready to scale your digital presence? Send us a secure message or book an immediate consultation with our technical coordinators.
        </p>
      </div>

      {/* Main Grid: Form + Calendly Mockup */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 mb-20 text-left">
        
        {/* Form Column */}
        <GlassCard className="p-8 border border-white/5" hoverScale={false}>
          <div className="flex items-center space-x-2 font-mono text-xs text-cyber-cyan mb-6">
            <Terminal className="h-4.5 w-4.5" />
            <span>CONNECT_COMMUNICATIONS_MODULE</span>
          </div>

          {formStatus === "success" ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-4"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyber-cyan/10 border border-cyber-cyan/45 text-cyber-cyan shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="font-display font-black text-lg text-white">Secure Uplink Established</h3>
              <p className="text-xs text-white/50 max-w-xs mx-auto leading-relaxed">
                Your message has been delivered to EcomXpertStudio core logs. Our lead coordinator will respond within 4 hours.
              </p>
              <button 
                onClick={() => setFormStatus("idle")}
                className="mt-6 font-mono text-[10px] font-bold text-cyber-cyan uppercase border border-cyber-cyan/20 bg-cyber-cyan/5 px-4 py-2 rounded-lg hover:bg-cyber-cyan/15 transition-all"
              >
                Send New Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name */}
              <div className="space-y-2">
                <label className="font-mono text-[10px] font-bold tracking-wider text-white/40 uppercase">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name" 
                  className="w-full rounded-xl border border-white/5 bg-[#050711] px-4.5 py-3.5 text-xs text-white placeholder-white/20 shadow-inner outline-none transition-colors focus:border-cyber-cyan/45 focus:shadow-[0_0_10px_rgba(0,240,255,0.05)]"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="font-mono text-[10px] font-bold tracking-wider text-white/40 uppercase">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email" 
                  className="w-full rounded-xl border border-white/5 bg-[#050711] px-4.5 py-3.5 text-xs text-white placeholder-white/20 shadow-inner outline-none transition-colors focus:border-cyber-cyan/45 focus:shadow-[0_0_10px_rgba(0,240,255,0.05)]"
                />
              </div>

              {/* Project Node */}
              <div className="space-y-2">
                <label className="font-mono text-[10px] font-bold tracking-wider text-white/40 uppercase">Required Pillar Node</label>
                <select 
                  value={formData.node}
                  onChange={(e) => setFormData({ ...formData, node: e.target.value })}
                  className="w-full rounded-xl border border-white/5 bg-[#050711] px-4.5 py-3.5 text-xs text-white/60 shadow-inner outline-none transition-colors focus:border-cyber-cyan/45"
                >
                  <option value="web-dev">Web Development Pillar (Next.js/React)</option>
                  <option value="app-dev">App Development Pillar (Custom AI Apps)</option>
                  <option value="graphic-design">Graphic Design Pillar (3D/Packaging)</option>
                  <option value="video-editing">Video Editing Pillar (Reels/Cinematics)</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="font-mono text-[10px] font-bold tracking-wider text-white/40 uppercase">Project Specifications</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline your timeline, goals, and visual specs..." 
                  className="w-full rounded-xl border border-white/5 bg-[#050711] px-4.5 py-3.5 text-xs text-white placeholder-white/20 shadow-inner outline-none transition-colors focus:border-cyber-cyan/45 focus:shadow-[0_0_10px_rgba(0,240,255,0.05)]"
                />
              </div>

              {/* Submit */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-cyan py-3.5 font-display text-xs font-black tracking-widest text-white uppercase shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Securing Transmission...</span>
                ) : (
                  <>
                    <span>Transmit Secure Message</span>
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>

            </form>
          )}

        </GlassCard>

        {/* Calendly Column */}
        <GlassCard className="p-8 border border-white/5 flex flex-col justify-between" hoverScale={false}>
          <div>
            <div className="flex items-center space-x-2 font-mono text-xs text-cyber-cyan mb-6">
              <Calendar className="h-4.5 w-4.5" />
              <span>CALENDLY_LIVE_CALENDAR</span>
            </div>
            <h3 className="font-display font-black text-xl text-white mb-2">Book 30-Min Growth Node</h3>
            <p className="text-xs text-white/50 leading-relaxed mb-6">
              Coordinate directly with EcomXpertStudio's lead engineering node. Lock in a live screen session to map out project grids, timelines, and mockup designs.
            </p>

            {/* Simulated Booking Panel */}
            <div className="rounded-xl border border-white/5 bg-black/40 p-5 shadow-inner">
              <div className="flex items-center justify-between text-xs text-white/60 font-mono mb-4 pb-3 border-b border-white/5">
                <span>Select Location: Google Meet</span>
                <span className="text-cyber-cyan">GMT -7:00</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono mb-4">
                {["09:00", "11:30", "14:00", "16:30"].map((time, idx) => (
                  <div key={time} className={`p-2 rounded-lg border border-white/5 cursor-pointer hover:border-cyber-cyan hover:text-cyber-cyan transition-colors ${idx === 1 ? "bg-cyber-cyan/15 border-cyber-cyan/50 text-cyber-cyan shadow-[0_0_8px_rgba(0,240,255,0.15)]" : "bg-white/2 text-white/60"}`}>
                    {time}
                  </div>
                ))}
              </div>
              <div className="text-[10px] text-white/40 text-center font-mono uppercase tracking-wider">
                Availability updated 2 minutes ago
              </div>
            </div>
          </div>

          {/* Quick Copy Coordinates */}
          <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
            <h4 className="font-mono text-[9px] font-bold tracking-widest text-white/30 uppercase">Alternative Communications</h4>
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-white/2 hover:border-white/10 transition-colors">
              <div className="flex items-center space-x-3 text-xs">
                <Mail className="h-4.5 w-4.5 text-cyber-cyan" />
                <span className="text-white/80">hello@ecomxpertstudio.com</span>
              </div>
              <button 
                onClick={handleCopyEmail}
                className="text-white/40 hover:text-cyber-cyan transition-colors focus:outline-none"
                aria-label="Copy Email"
              >
                {copiedEmail ? <Check className="h-4 w-4 text-cyber-cyan" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>

        </GlassCard>

      </div>

      {/* Global Coordinates Section */}
      <div className="text-left">
        <div className="mb-10 text-center">
          <span className="text-[9px] font-mono font-bold tracking-widest text-cyber-cyan uppercase block mb-2">
            GLOBAL NETWORK MAPPING
          </span>
          <h2 className="font-display text-2xl font-black text-white sm:text-3xl">
            International Agency Coordinates
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {STUDIO_NODES.map((node) => (
            <GlassCard key={node.city} className="border border-white/5 p-6" hoverScale={false}>
              <div className="flex items-center space-x-2 font-mono text-[9.5px] font-bold text-cyber-cyan uppercase mb-2">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>{node.city}</span>
              </div>
              <div className="font-mono text-[10px] text-white/70 mb-2">
                {node.coords}
              </div>
              <p className="text-[10px] text-white/40 uppercase">
                {node.role}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>

    </div>
  );
}
