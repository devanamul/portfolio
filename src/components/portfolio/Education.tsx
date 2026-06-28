"use client";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, CalendarDays } from "lucide-react";
import type { Education } from "@/lib/types";

export default function EducationSection({ education }: { education: Education[] }) {
  return (
    <section id="education" style={{ background: "var(--bg-alt)" }} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 50% at 0% 50%, rgba(99,102,241,0.07) 0%, transparent 70%)"
      }} />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-center mb-12">
          <span className="section-label">Background</span>
          <h2 className="section-title"><span className="gradient-text">Education</span></h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="card text-center"
              style={{ padding: "36px 40px" }}
            >
              <div style={{
                width: 60, height: 60, borderRadius: 16, margin: "0 auto 20px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))",
                border: "1px solid rgba(99,102,241,0.3)"
              }}>
                <GraduationCap size={28} color="#818cf8" />
              </div>

              <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 8, lineHeight: 1.3 }}>
                {edu.degree}
              </h3>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#818cf8", marginBottom: 14 }}>
                {edu.institution}
              </div>
              <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 16 }}>
                {edu.location && (
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--muted)" }}>
                    <MapPin size={13} color="#818cf8" /> {edu.location}
                  </div>
                )}
                {(edu.start_year || edu.end_year) && (
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--muted)" }}>
                    <CalendarDays size={13} color="#818cf8" />
                    {edu.start_year && edu.end_year ? `${edu.start_year} – ${edu.end_year}` : edu.start_year || edu.end_year}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
