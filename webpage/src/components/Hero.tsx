"use client";

import { motion } from "framer-motion";
import { BackgroundBeams } from "./BackgroundBeams";
import { TextGenerateEffect } from "./TextGenerateEffect";

interface HeroProps {
  profile: {
    name: string;
    title: string;
    bio: string;
  };
}

export function Hero({ profile }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FFFBF5]"
    >
      <BackgroundBeams />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-orange-500/20 rounded-full blur-[128px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-400/10 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-orange-400 rounded-full blur opacity-75 animate-pulse" />
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-4xl sm:text-5xl border-2 border-stone-200">
              👨‍💻
            </div>
          </div>
        </motion.div>

        {/* Title badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-3 rounded-full border border-amber-300 bg-gradient-to-r from-amber-50 via-orange-50 to-orange-50 px-5 py-2.5 text-sm font-medium text-stone-700 backdrop-blur-sm transition-all duration-300 hover:border-amber-400/50 hover:shadow-lg hover:shadow-amber-500/10 sm:px-6 sm:py-3">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-sm shadow-emerald-400/50" />
            </span>
            {profile.title}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6"
        >
          <span className="bg-gradient-to-b from-stone-800 via-stone-800 to-stone-500 bg-clip-text text-transparent">
            {profile.name}
          </span>
        </motion.h1>

        {/* Bio with text generate effect */}
        <div className="max-w-2xl mx-auto mb-10">
          <TextGenerateEffect
            words={profile.bio}
            className="text-lg sm:text-xl text-stone-600 leading-relaxed"
          />
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-2"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative inline-flex h-12 sm:min-w-[196px] items-center justify-center gap-2 rounded-full px-8 text-sm sm:text-base text-white font-semibold shadow-lg shadow-amber-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-500/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-[0.98]"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 via-orange-400 to-orange-500 transition-opacity duration-300 group-hover:opacity-90" />
            <span className="absolute -inset-px rounded-full bg-gradient-to-r from-amber-400/50 via-orange-400/30 to-orange-400/50 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
            <svg className="relative z-10 w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <span className="relative z-10">查看项目作品</span>
            <svg className="relative z-10 w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative inline-flex h-12 sm:min-w-[196px] items-center justify-center gap-2 rounded-full px-8 text-sm sm:text-base text-stone-700 font-medium backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-[0.98]"
          >
            <span className="absolute inset-0 rounded-full bg-white border border-stone-300 transition-all duration-300 group-hover:bg-stone-50 group-hover:border-amber-300 group-hover:shadow-lg group-hover:shadow-amber-500/10" />
            <svg className="relative z-10 w-4 h-4 shrink-0 text-stone-500 transition-colors duration-300 group-hover:text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="relative z-10">联系我</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
