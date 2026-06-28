"use client";
import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import type { Certification } from "@/lib/types";

const CERT_COLORS = [
  { bg: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.3)", text: "#fcd34d", icon: "#f59e0b" },
  { bg: "rgba(99,102,241,0.15)", border: "rgba(99,102,241,0.3)", text: "#a5b4fc", icon: "#6366f1" },
  { bg: "rgba(34,197,94,0.15)",  border: "rgba(34,197,94,0.3)",  text: "#86efac", icon: "#22c55e" },
];

export default function Certifications({ certifications }: { certifications: Certification[] }) {
  return (
    <section id="certifications" style={{ background: "var(--bg)" }} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 50% at 100% 50%, rgba(245,158,11,0.05) 0%, transparent 70%)"
      }} />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-center mb-12">
          <span className="section-label">Credentials</span>
          <h2 className="section-title"><span className="gradient-text">Certifications</span></h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, i) => {
            const c = CERT_COLORS[i % CERT_COLORS.length];
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="card text-center"
                style={{ padding: "32px 24px" }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: 14, margin: "0 auto 16px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: c.bg, border: `1px solid ${c.border}`
                }}>
                  <Award size={26} color={c.icon} />
                </div>

                <h3 style={{ fontSize: 14.5, fontWeight: 700, color: "var(--text)", lineHeight: 1.4, marginBottom: 8 }}>
                  {cert.name}
                </h3>
                <div style={{ fontSize: 13, color: c.text, fontWeight: 600, marginBottom: 4 }}>{cert.issuer}</div>
                {cert.year && <div style={{ fontSize: 12, color: "var(--dim)" }}>{cert.year}</div>}

                {cert.url && (
                  <a href={cert.url} target="_blank" rel="noopener noreferrer"
                     style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: 14, fontSize: 12.5, color: c.text, textDecoration: "none", fontWeight: 500 }}
                     onMouseOver={e => (e.currentTarget.style.opacity = "0.75")}
                     onMouseOut={e => (e.currentTarget.style.opacity = "1")}>
                    <ExternalLink size={13} /> View Certificate
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
