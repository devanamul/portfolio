"use client";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import Image from "next/image";
import type { Profile } from "@/lib/types";

const DEFAULT_TITLES = ["Full-Stack Software Engineer", "Laravel Expert", "React Developer", "Next.js Engineer"];

export default function Hero({ profile }: { profile: Profile | null }) {
  const titles = useMemo(() => {
    try { const t = JSON.parse(profile?.titles ?? "[]"); return Array.isArray(t) && t.length > 0 ? t : DEFAULT_TITLES; }
    catch { return DEFAULT_TITLES; }
  }, [profile?.titles]);

  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const current = titles[titleIndex];
    if (typing) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
        return () => clearTimeout(t);
      } else {
        setTitleIndex((i) => (i + 1) % titles.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, titleIndex, titles]);

  const p = profile;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px]"
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for opportunities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4"
            >
              <span className="text-white">{p?.name?.split(" ")[0] ?? "Anamul"}</span>{" "}
              <span className="gradient-text">{p?.name?.split(" ").slice(1).join(" ") ?? "Hasan"}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="h-12 flex items-center justify-center lg:justify-start mb-6"
            >
              <span className="text-xl sm:text-2xl text-slate-300 font-medium">
                {displayed}
                <span className="animate-pulse text-indigo-400">|</span>
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mb-8"
            >
              {p?.summary ?? "Full-stack software engineer building production systems."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8"
            >
              {p?.location && (
                <span className="flex items-center gap-1.5 text-slate-400 text-sm">
                  <MapPin size={14} className="text-indigo-400" />
                  {p.location}
                </span>
              )}
              {p?.email && (
                <span className="flex items-center gap-1.5 text-slate-400 text-sm">
                  <Mail size={14} className="text-indigo-400" />
                  {p.email}
                </span>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              {p?.github && (
                <motion.a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all"
                >
                  <GithubIcon size={18} />
                  GitHub
                </motion.a>
              )}
              {p?.linkedin && (
                <motion.a
                  href={p.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 border border-white/20 rounded-xl font-semibold text-white hover:bg-white/5 transition-all"
                >
                  <LinkedinIcon size={18} />
                  LinkedIn
                </motion.a>
              )}
              {p?.cv_url && (
                <motion.a
                  href={p.cv_url}
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 border border-indigo-500/30 rounded-xl font-semibold text-indigo-400 hover:bg-indigo-500/10 transition-all"
                >
                  <Download size={18} />
                  Download CV
                </motion.a>
              )}
            </motion.div>
          </motion.div>

          {/* Right: Photo */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="flex-shrink-0"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 opacity-70 blur-sm"
              />
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-[#080b14]">
                <Image
                  src={p?.photo_url ?? "/uploads/default-avatar.png"}
                  alt={p?.name ?? "Profile"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Floating badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-bold shadow-xl"
              >
                2+ yrs exp
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-slate-500 text-xs">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-0.5 h-8 bg-gradient-to-b from-indigo-500/50 to-transparent rounded-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
