"use client";
import { motion } from "framer-motion";
import { MapPin, Calendar, CheckCircle2 } from "lucide-react";
import type { Experience } from "@/lib/types";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

export default function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <section id="experience" style={{ background: "var(--bg-alt)" }} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 50% 50% at 100% 0%, rgba(99,102,241,0.09) 0%, transparent 70%)"
      }} />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ staggerChildren: 0.15 }}>

          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="section-label">Work History</span>
            <h2 className="section-title">
              Professional <span className="gradient-text">Experience</span>
            </h2>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="card text-center"
                style={{ padding: "32px 36px" }}
              >
                {/* current badge */}
                {exp.is_current && (
                  <div style={{ marginBottom: 14, display: "flex", justifyContent: "center" }}>
                    <span style={{
                      padding: "4px 14px", borderRadius: 99, fontSize: 11, fontWeight: 700,
                      background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.35)",
                      color: "#4ade80"
                    }}>● Currently Here</span>
                  </div>
                )}

                {/* title + company */}
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--text)", marginBottom: 6 }}>
                  {exp.title}
                </h3>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#818cf8", marginBottom: 14 }}>
                  {exp.company}
                </div>

                {/* meta: date + location */}
                <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--muted)" }}>
                    <Calendar size={13} color="#818cf8" />
                    {exp.start_date} – {exp.is_current ? "Present" : exp.end_date}
                  </div>
                  {exp.location && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--muted)" }}>
                      <MapPin size={13} color="#818cf8" />
                      {exp.location}
                    </div>
                  )}
                </div>

                {/* tech badges */}
                {exp.tech && (
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 22 }}>
                    {exp.tech.split(",").map(t => (
                      <span key={t} style={{
                        padding: "4px 12px", borderRadius: 7, fontSize: 12.5, fontWeight: 500,
                        background: "rgba(99,102,241,0.14)", border: "1px solid rgba(99,102,241,0.28)", color: "#a5b4fc"
                      }}>{t.trim()}</span>
                    ))}
                  </div>
                )}

                {/* bullets */}
                {exp.bullets.length > 0 && (
                  <ul style={{ display: "flex", flexDirection: "column", gap: 10, textAlign: "left", maxWidth: 520, margin: "0 auto" }}>
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <CheckCircle2 size={15} color="#818cf8" style={{ flexShrink: 0, marginTop: 3 }} />
                        <span style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.65 }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
