"use client";

import { motion } from "framer-motion";
import { SparklesCore } from "./Sparkles";

const GitHubIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const JuejinIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="m12 14.316 7.454-5.88-2.022-1.625L12 11.1l-.004.003-5.432-4.288-2.02 1.624 7.452 5.88Zm0-7.247 2.89-2.298L12 2.453l-.004-.005-2.884 2.318 2.884 2.3Zm0 11.266-.005.002-9.975-7.87L0 12.088l.194.156 11.803 9.308 7.463-5.885L24 12.085l-2.023-1.624Z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

interface ContactProps {
  profile: {
    social: Record<string, string>;
  };
}

export function Contact({ profile }: ContactProps) {
  const socialLinks = [
    { name: "GitHub", icon: GitHubIcon, href: profile.social.github, color: "hover:text-stone-800" },
    { name: "掘金", icon: JuejinIcon, href: profile.social.juejin, color: "hover:text-sky-500" },
    { name: "Email", icon: EmailIcon, href: `mailto:${profile.social.email}`, color: "hover:text-emerald-500" },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#FFFBF5] overflow-hidden">
      <SparklesCore
        background="transparent"
        minSize={0.3}
        maxSize={1}
        particleDensity={40}
        className="absolute inset-0"
      />

      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-50 rounded-full blur-[200px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-stone-800 mb-4">
            联系我
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto mb-4">
            期待与你交流技术、合作或任何有趣的想法
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto rounded-full mb-12" />
        </motion.div>

        {/* Email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <a
            href={`mailto:${profile.social.email}`}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 hover:border-amber-300 hover:from-amber-100 hover:to-orange-100 transition-all duration-300"
          >
            <span className="text-amber-500"><EmailIcon /></span>
            <span className="text-lg text-stone-800 font-medium">{profile.social.email}</span>
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center gap-6"
        >
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              whileHover={{ y: -3 }}
              className={`flex flex-col items-center gap-2 text-stone-400 ${link.color} transition-colors`}
            >
              <div className="w-14 h-14 rounded-2xl border border-stone-200 bg-white flex items-center justify-center hover:bg-stone-100 transition-colors">
                <link.icon />
              </div>
              <span className="text-xs">{link.name}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface FooterProps {
  socialLinks: Record<string, string>;
}

export function Footer({ socialLinks }: FooterProps) {
  const links = [
    { name: "GitHub", icon: GitHubIcon, href: socialLinks.github },
    { name: "掘金", icon: JuejinIcon, href: socialLinks.juejin },
    { name: "Email", icon: EmailIcon, href: `mailto:${socialLinks.email}` },
  ];

  return (
    <footer className="relative bg-[#FFFBF5] border-t border-stone-200/50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent font-bold">
              嘟嘟嘟
            </span>
            <span className="text-stone-400 text-sm">
              &copy; {new Date().getFullYear()}
            </span>
          </div>

          <p className="text-stone-400 text-sm text-center">
            Built with Next.js, TypeScript & Tailwind CSS
          </p>

          <div className="flex gap-4">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-stone-800 transition-colors"
                aria-label={link.name}
              >
                <link.icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
