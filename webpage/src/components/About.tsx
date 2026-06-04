"use client";

import { motion } from "framer-motion";

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const BusinessIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
    <path d="M9 22v-4h6v4"/>
    <path d="M8 6h.01"/><path d="M16 6h.01"/>
    <path d="M12 6h.01"/><path d="M12 10h.01"/>
    <path d="M12 14h.01"/><path d="M16 10h.01"/>
    <path d="M16 14h.01"/><path d="M8 10h.01"/>
    <path d="M8 14h.01"/>
  </svg>
);

interface AboutProps {
  profile: {
    name: string;
    social: Record<string, string>;
    location: string;
    company: string;
    about: string[];
  };
}

export function About({ profile }: AboutProps) {
  const githubLabel = profile.social.github
    ? `@${profile.social.github.replace(/\/$/, "").split("/").pop()}`
    : "未填写";

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#FFFBF5]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-stone-800 mb-4">
            关于我
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Info cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="rounded-2xl border border-stone-200 bg-white shadow-sm p-6">
              <h3 className="text-xl font-semibold text-stone-800 mb-4">基本信息</h3>
              <div className="space-y-4 text-stone-600">
                <div className="flex items-center gap-3">
                  <span className="text-amber-500"><GitHubIcon /></span>
                  <span>GitHub: <a href={profile.social.github} className="text-amber-500 hover:underline" target="_blank" rel="noopener noreferrer">{githubLabel}</a></span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-orange-500"><EmailIcon /></span>
                  <span>{profile.social.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-500"><LocationIcon /></span>
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-amber-500"><BusinessIcon /></span>
                  <span>{profile.company}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "年经验", value: "8+" },
                { label: "技术文章", value: "2" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="rounded-xl border border-stone-200 bg-white shadow-sm p-4 text-center"
                >
                  <div className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xs text-stone-500 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {profile.about.map((paragraph, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500 mt-2.5" />
                <p className="text-stone-600 leading-relaxed">{paragraph}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
