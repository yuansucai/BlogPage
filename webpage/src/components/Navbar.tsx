"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "首页", href: "#hero" },
  { name: "关于", href: "#about" },
  { name: "技术栈", href: "#tech" },
  { name: "项目", href: "#projects" },
  { name: "动态", href: "#articles" },
  { name: "联系", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleClick = useCallback((href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-full border px-3 py-2 backdrop-blur-xl sm:px-4 sm:py-2.5 ${
          scrolled
            ? "bg-white/80 border-stone-200 shadow-2xl shadow-amber-500/10"
            : "bg-white/80 border-stone-200/60 shadow-lg shadow-stone-200"
        }`}
      >
        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleClick("#hero"); }}
            className="group hidden sm:flex items-center gap-2.5 rounded-full px-3 py-2 font-bold text-stone-800 transition-colors duration-300 hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 sm:px-4"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-300 text-xs transition-all duration-300 group-hover:border-amber-400/50 group-hover:shadow-md group-hover:shadow-amber-500/20">
              <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">J</span>
            </span>
            <span className="text-base bg-gradient-to-r from-amber-600 via-orange-400 to-orange-500 bg-clip-text text-transparent">
              加贝
            </span>
          </a>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                  className={`rounded-full px-4 py-2 text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 ${
                    isActive
                      ? "border border-amber-300 bg-gradient-to-r from-amber-500/20 via-orange-400/15 to-orange-500/20 font-medium text-stone-800 shadow-sm shadow-amber-500/10"
                      : "border border-transparent text-stone-500 hover:border-stone-200 hover:bg-stone-100 hover:text-stone-800"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>
          <button
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5 text-stone-800 rounded-full transition-colors duration-300 hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-current rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-0.5 bg-current rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 bg-current rounded-full"
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-20 px-6 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-xl font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-amber-500/15 to-orange-500/10 border border-amber-300 text-stone-800 shadow-sm shadow-amber-500/10"
                        : "border border-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-400 shadow-sm shadow-amber-400/50" />
                    )}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
