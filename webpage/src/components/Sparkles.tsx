"use client";

import { useEffect, useState, useMemo } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

export function SparklesCore({
  background = "transparent",
  minSize = 0.4,
  maxSize = 1.2,
  particleDensity = 60,
  className = "",
}: {
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
}) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  // Pre-compute stable animation values to avoid Math.random() in render
  const initialSparkles = useMemo(() => {
    return Array.from({ length: particleDensity }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: minSize + Math.random() * (maxSize - minSize),
      opacity: 0.3 + Math.random() * 0.7,
      duration: 1 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
  }, [particleDensity, minSize, maxSize]);

  useEffect(() => {
    setSparkles(initialSparkles);

    const interval = setInterval(() => {
      setSparkles((prev) => {
        const idx = Math.floor(Math.random() * prev.length);
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: minSize + Math.random() * (maxSize - minSize),
          opacity: 0.3 + Math.random() * 0.7,
        };
        return updated;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [initialSparkles, minSize, maxSize]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} style={{ background }}>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            backgroundColor: "#F59E0B",
            opacity: sparkle.opacity,
            boxShadow: `0 0 ${sparkle.size * 2}px rgba(245,158,11,0.6)`,
            animation: `twinkle ${sparkle.duration}s ease-in-out infinite`,
            animationDelay: `${sparkle.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
