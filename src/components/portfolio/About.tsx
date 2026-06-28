"use client";
import { motion } from "framer-motion";
import { Briefcase, FolderGit2, Code2, Building2, Mail, MapPin, Phone } from "lucide-react";
import type { Profile } from "@/lib/types";

const fadeUp = { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0 } };

const STATS = [
  { icon: Briefcase,  value: "2+",  label: "Years Experience" },
  { icon: FolderGit2, value: "10+", label: "Projects Delivered" },
  { icon: Code2,      value: "15+", label: "Technologies" },
  { icon: Building2,  value: "4",   label: "Companies" },
];

const SKILL_BARS = [
  { label: "Laravel / PHP",        pct: 90 },
  { label: "React / Next.js",      pct: 85 },
  { label: "Backend API Design",   pct: 88 },
  { label: "System Architecture",  pct: 75 },
];

export default function About({ profile }: { profile: Profile | null }) {
  return (
    <section id="about" style={{ background: "var(--bg-alt)" }} className="py-24 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-96 h-96 rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle at 70% 30%, rgba(99,102,241,0.08) 0%, transparent 65%)" }} />
      <div className="absolute left-0 bottom-0 w-80 h-80 rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 65%)" }} />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ staggerChildren: 0.12 }}>

          {/* heading */}
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="section-label">About Me</span>
            <h2 className="section-title">
              Building Software That <span className="gradient-text">Matters</span>
            </h2>
          </motion.div>

          {/* stat cards */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {STATS.map((s) => (
              <motion.div
                key={s.label}
                whileHover={{ y: -6, scale: 1.03 }}
                className="card text-center"
                style={{ padding: "28px 16px" }}
              >
                <div style={{
                  width: 48, height: 48, margin: "0 auto 14px",
                  borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)"
                }}>
                  <s.icon size={22} color="#818cf8" />
                </div>
                <div className="gradient-text" style={{ fontSize: 30, fontWeight: 900, marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: 12.5, color: "var(--muted)" }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* bio */}
          <motion.div variants={fadeUp} className="card text-center" style={{ padding: "40px 48px", marginBottom: 24 }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>Who I Am</h3>
            <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.85, marginBottom: 28, maxWidth: 620, margin: "0 auto 28px" }}>
              {profile?.summary ?? "Full-stack software engineer with 2+ years building production ERP, POS, and management systems across the PHP and JavaScript ecosystems — Laravel, Vue, React, and Next.js."}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
              {([
                { Icon: MapPin, text: profile?.location, href: null },
                { Icon: Mail,   text: profile?.email,    href: `mailto:${profile?.email}` },
                { Icon: Phone,  text: profile?.phone,    href: `tel:${profile?.phone}` },
              ] as const).filter(d => d.text).map(d => (
                <div key={d.text} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "8px 16px", borderRadius: 99,
                  background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.18)"
                }}>
                  <d.Icon size={14} color="#818cf8" />
                  {d.href
                    ? <a href={d.href} style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none" }}
                         onMouseOver={e => (e.currentTarget.style.color = "#a5b4fc")}
                         onMouseOut={e => (e.currentTarget.style.color = "var(--muted)")}>{d.text}</a>
                    : <span style={{ fontSize: 13, color: "var(--muted)" }}>{d.text}</span>
                  }
                </div>
              ))}
            </div>
          </motion.div>

          {/* skill bars */}
          <motion.div variants={fadeUp} className="card" style={{ padding: "36px 48px" }}>
            <h3 className="text-center" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 28 }}>
              Current Focus
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {SKILL_BARS.map((sk, i) => (
                <div key={sk.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "var(--text)" }}>{sk.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#818cf8" }}>{sk.pct}%</span>
                  </div>
                  <div style={{ height: 7, borderRadius: 99, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${sk.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.12, ease: "easeOut" }}
                      style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg,#6366f1,#8b5cf6)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
