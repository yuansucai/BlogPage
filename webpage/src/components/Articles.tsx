"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Article {
  id?: number;
  title: string;
  excerpt: string;
  type: "travel" | "tech";
  date: string;
  readTime?: string;
  tags: string[];
  url: string;
  thumbnail?: string;
}

interface ArticlesProps {
  articles: Article[];
}

const ArticleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <line x1="10" y1="9" x2="8" y2="9"/>
  </svg>
);

const TravelIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z"/>
    <path d="M9 3v15"/>
    <path d="M15 6v15"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

type FilterType = "all" | "travel" | "tech";

export function Articles({ articles }: ArticlesProps) {
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered = filter === "all"
    ? articles
    : articles.filter((a) => a.type === filter);

  return (
    <section id="articles" className="relative py-24 sm:py-32 bg-[#FFFBF5] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-stone-800 mb-4">
            旅行 & 技术
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            记录旅途见闻，分享技术实践
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex justify-center gap-2 mb-12"
        >
          {[
            { key: "all" as FilterType, label: "全部" },
            { key: "travel" as FilterType, label: "旅行" },
            { key: "tech" as FilterType, label: "技术" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === tab.key
                  ? "bg-amber-500 text-white"
                  : "bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-800 border border-stone-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Articles list */}
        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ArticleCard({ article, index }: { article: Article; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link
        href={`/articles/${article.id}`}
        className="group relative flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 rounded-2xl border border-stone-200 bg-white shadow-sm hover:border-amber-300 hover:bg-stone-50 transition-all duration-300"
      >
        {/* Type icon */}
        <div className="flex-shrink-0 flex items-center">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            article.type === "travel"
              ? "bg-sky-50 text-sky-500"
              : "bg-emerald-50 text-emerald-500"
          }`}>
            {article.type === "travel" ? <TravelIcon /> : <ArticleIcon />}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base sm:text-lg font-semibold text-stone-800 group-hover:text-amber-500 transition-colors line-clamp-1">
              {article.title}
            </h3>
            <span className="flex-shrink-0 text-stone-400 group-hover:text-amber-500 transition-colors">
              <ExternalLinkIcon />
            </span>
          </div>

          <p className="text-sm text-stone-500 mt-1 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-stone-500">
            <span className="flex items-center gap-1">
              <ClockIcon />
              {article.date}
            </span>
            {article.readTime && (
              <span>{article.readTime}</span>
            )}
            <div className="flex gap-1.5">
              {article.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
