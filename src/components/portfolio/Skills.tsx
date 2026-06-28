"use client";
import { motion } from "framer-motion";
import type { Skill } from "@/lib/types";

const fadeUp = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } };

type ColorSet = { bg: string; border: string; text: string; accent: string };

const CATEGORY_COLORS: Record<string, ColorSet> = {
  "Languages":             { bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.28)",  text: "#93c5fd", accent: "#3b82f6" },
  "Frameworks & Libraries":{ bg: "rgba(139,92,246,0.12)",  border: "rgba(139,92,246,0.28)",  text: "#c4b5fd", accent: "#8b5cf6" },
  "Frontend":              { bg: "rgba(236,72,153,0.12)",  border: "rgba(236,72,153,0.28)",  text: "#f9a8d4", accent: "#ec4899" },
  "Databases":             { bg: "rgba(34,197,94,0.12)",   border: "rgba(34,197,94,0.28)",   text: "#86efac", accent: "#22c55e" },
  "Foundations":           { bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.28)",  text: "#fcd34d", accent: "#f59e0b" },
  "Tools":                 { bg: "rgba(99,102,241,0.12)",  border: "rgba(99,102,241,0.28)",  text: "#a5b4fc", accent: "#6366f1" },
};
const DEFAULT_COLOR: ColorSet = { bg: "rgba(100,116,139,0.12)", border: "rgba(100,116,139,0.28)", text: "#cbd5e1", accent: "#64748b" };

export default function Skills({ skills }: { skills: Skill[] }) {
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" style={{ background: "var(--bg)" }} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(99,102,241,0.07) 0%, transparent 70%)"
      }} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ staggerChildren: 0.1 }}>

          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="section-label">Technical Skills</span>
            <h2 className="section-title">My <span className="gradient-text">Tech Stack</span></h2>
            <p style={{ color: "var(--muted)", fontSize: 15, marginTop: 12 }}>
              Tools and technologies I use to build reliable software
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Object.entries(grouped).map(([category, catSkills], i) => {
              const c = CATEGORY_COLORS[category] ?? DEFAULT_COLOR;
              return (
                <motion.div
                  key={category}
                  variants={fadeUp}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -5 }}
                  className="card text-center"
                  style={{ padding: "28px 24px" }}
                >
                  {/* accent dot + category name */}
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    marginBottom: 18, padding: "5px 14px", borderRadius: 99,
                    background: c.bg, border: `1px solid ${c.border}`
                  }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.accent, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: c.text }}>
                      {category}
                    </span>
                  </div>

                  {/* skill tags — centered */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                    {catSkills.map(skill => (
                      <motion.span
                        key={skill.id}
                        whileHover={{ scale: 1.06, y: -2 }}
                        style={{
                          padding: "5px 14px", borderRadius: 8,
                          fontSize: 13, fontWeight: 500,
                          background: c.bg, border: `1px solid ${c.border}`, color: c.text,
                          cursor: "default"
                        }}
                      >
                        {skill.name}
                      </motion.span>
                    ))}
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
