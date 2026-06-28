"use client";
import { motion } from "framer-motion";
import { ExternalLink, Folder } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import type { Project } from "@/lib/types";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

const ACCENT_COLORS = [
  { accent: "#6366f1", light: "rgba(99,102,241,0.15)", border: "rgba(99,102,241,0.28)" },
  { accent: "#8b5cf6", light: "rgba(139,92,246,0.15)", border: "rgba(139,92,246,0.28)" },
  { accent: "#06b6d4", light: "rgba(6,182,212,0.15)",  border: "rgba(6,182,212,0.28)" },
  { accent: "#f59e0b", light: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.28)" },
  { accent: "#ec4899", light: "rgba(236,72,153,0.15)", border: "rgba(236,72,153,0.28)" },
  { accent: "#22c55e", light: "rgba(34,197,94,0.15)",  border: "rgba(34,197,94,0.28)" },
];

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" style={{ background: "var(--bg)" }} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 70% 40% at 50% 100%, rgba(99,102,241,0.06) 0%, transparent 70%)"
      }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ staggerChildren: 0.08 }}>

          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="section-label">Portfolio</span>
            <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
            <p style={{ color: "var(--muted)", fontSize: 15, marginTop: 12 }}>
              Things I&apos;ve built across different domains and technologies
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, i) => {
              const c = ACCENT_COLORS[i % ACCENT_COLORS.length];
              return (
                <motion.div
                  key={project.id}
                  variants={fadeUp}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -8 }}
                  className="card text-center"
                  style={{
                    padding: "28px 24px",
                    display: "flex", flexDirection: "column", alignItems: "center",
                    border: `1px solid ${c.border}`,
                    position: "relative", overflow: "hidden"
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 40px ${c.accent}28`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "var(--card-shadow)"; }}
                >
                  {/* top accent bar */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 3,
                    background: `linear-gradient(90deg, transparent, ${c.accent}, transparent)`
                  }} />

                  {/* folder icon */}
                  <div style={{
                    width: 52, height: 52, borderRadius: 14, marginBottom: 16,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: c.light, border: `1px solid ${c.border}`
                  }}>
                    <Folder size={24} color={c.accent} />
                  </div>

                  {/* name */}
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 10, lineHeight: 1.35 }}>
                    {project.name}
                  </h3>

                  {/* description */}
                  {project.description && (
                    <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7, marginBottom: 16, flex: 1 }}>
                      {project.description}
                    </p>
                  )}
                  {!project.description && <div style={{ flex: 1 }} />}

                  {/* tech badges */}
                  {project.tech && (
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginBottom: 18 }}>
                      {project.tech.split(",").map(t => (
                        <span key={t} style={{
                          padding: "3px 10px", borderRadius: 6, fontSize: 11.5, fontWeight: 500,
                          background: c.light, border: `1px solid ${c.border}`, color: c.accent
                        }}>{t.trim()}</span>
                      ))}
                    </div>
                  )}

                  {/* links */}
                  <div style={{
                    display: "flex", justifyContent: "center", gap: 20, alignItems: "center",
                    borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16, width: "100%"
                  }}>
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                         style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--muted)", textDecoration: "none", fontWeight: 500 }}
                         onMouseOver={e => (e.currentTarget.style.color = "var(--text)")}
                         onMouseOut={e => (e.currentTarget.style.color = "var(--muted)")}>
                        <GithubIcon size={15} /> Code
                      </a>
                    )}
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer"
                         style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: c.accent, textDecoration: "none", fontWeight: 600 }}
                         onMouseOver={e => (e.currentTarget.style.opacity = "0.75")}
                         onMouseOut={e => (e.currentTarget.style.opacity = "1")}>
                        <ExternalLink size={15} /> Live
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
