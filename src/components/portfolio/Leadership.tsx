"use client";
import { motion } from "framer-motion";
import { Users, Music } from "lucide-react";
import type { Leadership } from "@/lib/types";

const ICONS = [Users, Music, Users, Music];
const COLORS = [
  { bg: "rgba(139,92,246,0.15)", border: "rgba(139,92,246,0.28)", icon: "#c4b5fd" },
  { bg: "rgba(236,72,153,0.15)", border: "rgba(236,72,153,0.28)", icon: "#f9a8d4" },
];

export default function LeadershipSection({ leadership }: { leadership: Leadership[] }) {
  return (
    <section id="leadership" style={{ background: "var(--bg-alt)" }} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 50% 50% at 50% 100%, rgba(139,92,246,0.07) 0%, transparent 70%)"
      }} />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-center mb-12">
          <span className="section-label">Activities</span>
          <h2 className="section-title">Leadership & <span className="gradient-text">Activities</span></h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {leadership.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            const c = COLORS[i % COLORS.length];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="card text-center"
                style={{ padding: "32px 24px" }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 14, margin: "0 auto 16px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: c.bg, border: `1px solid ${c.border}`
                }}>
                  <Icon size={24} color={c.icon} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>{item.role}</h3>
                <p style={{ fontSize: 13, color: "var(--muted)" }}>{item.organization}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
