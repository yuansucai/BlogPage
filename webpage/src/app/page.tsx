"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { TechStack } from "@/components/TechStack";
import { Projects } from "@/components/Projects";
import { Articles } from "@/components/Articles";
import { Contact, Footer } from "@/components/Contact";
import { fetchProfile, fetchProjects, fetchArticles, fetchTechStack } from "@/lib/api";

export default function Home() {
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [techStack, setTechStack] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetchProfile(),
      fetchProjects(),
      fetchArticles(),
      fetchTechStack(),
    ])
      .then(([p, proj, a, t]) => {
        setProfile(p);
        setProjects(proj);
        setArticles(a);
        setTechStack(t);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "加载失败，请确保后端服务已启动");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFBF5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-stone-500">加载中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FFFBF5] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-stone-800 mb-2">加载失败</h2>
          <p className="text-stone-500 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-full bg-amber-50 border border-amber-200 text-amber-600 hover:bg-amber-100 transition-colors"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <TechStack techStack={techStack} />
        <Projects projects={projects} />
        <Articles articles={articles} />
        <Contact profile={profile} />
      </main>
      <Footer socialLinks={profile.social} />
    </>
  );
}
