"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import type { Profile } from "@/lib/types";

export default function Contact({ profile }: { profile: Profile | null }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "", subject: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <section id="contact" style={{ background: "var(--bg-alt)" }} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 60% at 100% 100%, rgba(139,92,246,0.09) 0%, transparent 65%)"
      }} />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* heading */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-center mb-12">
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">Let&apos;s <span className="gradient-text">Connect</span></h2>
          <p style={{ color: "var(--muted)", fontSize: 15, marginTop: 12 }}>
            Have a project in mind or want to discuss opportunities?
          </p>
        </motion.div>

        {/* contact info pills — centered row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginBottom: 32 }}
        >
          {[
            { Icon: Mail,   value: profile?.email,    href: `mailto:${profile?.email}`,  color: "#818cf8" },
            { Icon: Phone,  value: profile?.phone,    href: `tel:${profile?.phone}`,     color: "#4ade80" },
            { Icon: MapPin, value: profile?.location, href: null,                        color: "#f9a8d4" },
          ].filter(d => d.value).map(d => (
            <div key={d.value} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "10px 18px", borderRadius: 99,
              background: "var(--card)", border: "1px solid var(--card-border)"
            }}>
              <d.Icon size={15} color={d.color} />
              {d.href
                ? <a href={d.href} style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", textDecoration: "none" }}
                     onMouseOver={e => (e.currentTarget.style.color = d.color)}
                     onMouseOut={e => (e.currentTarget.style.color = "var(--text)")}>{d.value}</a>
                : <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>{d.value}</span>
              }
            </div>
          ))}
        </motion.div>

        {/* social icons — centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 40 }}
        >
          {profile?.github && (
            <motion.a href={profile.github} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.12, y: -3 }}
              style={{
                width: 48, height: 48, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
                color: "var(--muted)", textDecoration: "none"
              }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.14)"; (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}>
              <GithubIcon size={20} />
            </motion.a>
          )}
          {profile?.linkedin && (
            <motion.a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.12, y: -3 }}
              style={{
                width: 48, height: 48, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)",
                color: "#93c5fd", textDecoration: "none"
              }}
              onMouseOver={e => (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.25)"}
              onMouseOut={e => (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.15)"}>
              <LinkedinIcon size={20} />
            </motion.a>
          )}
        </motion.div>

        {/* contact form — full width, centered */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="card"
          style={{ padding: "40px" }}
        >
          <h3 className="text-center" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 28 }}>
            Send a Message
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.07em", textAlign: "center" }}>Name *</label>
              <input type="text" required value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="form-input" placeholder="Your name" style={{ textAlign: "center" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.07em", textAlign: "center" }}>Email *</label>
              <input type="email" required value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="form-input" placeholder="your@email.com" style={{ textAlign: "center" }} />
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.07em", textAlign: "center" }}>Subject</label>
            <input type="text" value={form.subject}
              onChange={e => setForm({ ...form, subject: e.target.value })}
              className="form-input" placeholder="What's this about?" style={{ textAlign: "center" }} />
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.07em", textAlign: "center" }}>Message *</label>
            <textarea required rows={5} value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              className="form-input" placeholder="Your message..." style={{ resize: "none", textAlign: "center" }} />
          </div>

          <motion.button
            type="submit"
            disabled={status === "loading" || status === "success"}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              padding: "14px 24px", borderRadius: 12, fontWeight: 700, fontSize: 15,
              border: "none", cursor: status === "loading" ? "wait" : "pointer", fontFamily: "inherit",
              background: status === "success" ? "rgba(74,222,128,0.15)" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: status === "success" ? "#4ade80" : "#fff",
              boxShadow: status === "success" ? "0 0 0 1px rgba(74,222,128,0.3)" : "0 4px 20px rgba(99,102,241,0.4)"
            }}
          >
            {status === "success" ? (
              <><CheckCircle size={18} /> Message Sent!</>
            ) : status === "loading" ? (
              <>
                <div style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", animation: "spin 0.7s linear infinite" }} />
                Sending...
              </>
            ) : (
              <><Send size={17} /> Send Message</>
            )}
          </motion.button>

          {status === "error" && (
            <p className="text-center" style={{ fontSize: 13, color: "#f87171", marginTop: 12 }}>
              Failed to send. Please try again.
            </p>
          )}
        </motion.form>

      </div>
    </section>
  );
}
