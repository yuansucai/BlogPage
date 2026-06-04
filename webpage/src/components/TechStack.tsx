"use client";

import { motion } from "framer-motion";

interface TechItem {
  name: string;
  icon: string;
  category: string;
  description: string;
}

interface TechStackProps {
  techStack: TechItem[];
}

export function TechStack({ techStack }: TechStackProps) {
  return (
    <section id="tech" className="relative py-24 sm:py-32 bg-[#FFFBF5] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-stone-800 mb-4">
            技术栈
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            持续学习，保持对新技术的好奇心和热情
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative rounded-2xl border border-stone-200 bg-white shadow-sm p-5 hover:border-amber-300 transition-all duration-300"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="text-4xl mb-3 select-none" aria-hidden="true">{tech.icon}</div>
                <h3 className="text-stone-800 font-semibold mb-1">{tech.name}</h3>
                <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-white text-stone-500 mb-2">
                  {tech.category}
                </span>
                <p className="text-sm text-stone-500 leading-relaxed">
                  {tech.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
