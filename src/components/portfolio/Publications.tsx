"use client";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink } from "lucide-react";
import type { Publication } from "@/lib/types";

export default function Publications({ publications }: { publications: Publication[] }) {
  if (!publications.length) return null;

  return (
    <section id="publications" style={{ background: "var(--bg)" }} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 50% 50% at 0% 100%, rgba(34,197,94,0.06) 0%, transparent 70%)"
      }} />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-center mb-12">
          <span className="section-label">Research</span>
          <h2 className="section-title"><span className="gradient-text">Publications</span></h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {publications.map((pub, i) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="card text-center"
              style={{ padding: "32px 36px" }}
            >
              <div style={{
                width: 56, height: 56, borderRadius: 14, margin: "0 auto 18px",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)"
              }}>
                <BookOpen size={26} color="#4ade80" />
              </div>

              <div style={{ fontSize: 11, color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
                Research Paper
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", lineHeight: 1.4, marginBottom: 16 }}>
                {pub.title}
              </h3>

              {pub.url && (
                <a href={pub.url} target="_blank" rel="noopener noreferrer"
                   style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#4ade80", textDecoration: "none", fontWeight: 600 }}
                   onMouseOver={e => (e.currentTarget.style.opacity = "0.75")}
                   onMouseOut={e => (e.currentTarget.style.opacity = "1")}>
                  <ExternalLink size={14} /> Read Publication
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
