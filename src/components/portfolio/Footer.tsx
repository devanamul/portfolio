"use client";
import { motion } from "framer-motion";
import { Mail, Code2, Heart, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import type { Profile } from "@/lib/types";

export default function Footer({ profile }: { profile: Profile | null }) {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer style={{ borderTop: "1px solid rgba(99,102,241,0.15)", background: "#060911" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>

          {/* brand */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ display: "flex", alignItems: "center", gap: 12 }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 14px rgba(99,102,241,0.35)"
            }}>
              <Code2 size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "var(--text)" }}>
                {profile?.name ?? "Anamul Hasan"}
              </div>
              <div style={{ fontSize: 12, color: "var(--dim)" }}>Full-Stack Software Engineer</div>
            </div>
          </motion.div>

          {/* social links */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {profile?.github && (
              <motion.a href={profile.github} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -3 }}
                style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                         background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                         color: "var(--muted)", textDecoration: "none", transition: "all 0.2s" }}
                onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
                onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}>
                <GithubIcon size={18} />
              </motion.a>
            )}
            {profile?.linkedin && (
              <motion.a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -3 }}
                style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                         background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.25)",
                         color: "#93c5fd", textDecoration: "none", transition: "all 0.2s" }}
                onMouseOver={e => (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.22)"}
                onMouseOut={e => (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.12)"}>
                <LinkedinIcon size={18} />
              </motion.a>
            )}
            {profile?.email && (
              <motion.a href={`mailto:${profile.email}`}
                whileHover={{ scale: 1.15, y: -3 }}
                style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                         background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)",
                         color: "#818cf8", textDecoration: "none", transition: "all 0.2s" }}
                onMouseOver={e => (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.22)"}
                onMouseOut={e => (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.12)"}>
                <Mail size={18} />
              </motion.a>
            )}
          </div>

          {/* copyright + scroll top */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <p style={{ fontSize: 13, color: "var(--dim)", display: "flex", alignItems: "center", gap: 5 }}>
              © 2025 {profile?.name ?? "Anamul Hasan"}. Built with
              <Heart size={12} color="#f87171" fill="#f87171" /> & Next.js
            </p>
            <motion.button
              onClick={scrollTop}
              whileHover={{ y: -3, scale: 1.1 }}
              style={{
                width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)",
                color: "#818cf8", cursor: "pointer", transition: "all 0.2s"
              }}
              onMouseOver={e => (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.25)"}
              onMouseOut={e => (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.15)"}>
              <ArrowUp size={16} />
            </motion.button>
          </div>

        </div>
      </div>
    </footer>
  );
}
