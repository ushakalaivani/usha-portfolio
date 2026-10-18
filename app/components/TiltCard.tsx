"use client";

import React, { useRef, useState, MouseEvent } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  maxTilt?: number;
}

export default function TiltCard({
  children,
  className = "",
  glowColor = "rgba(139, 92, 246, 0.25)",
  maxTilt = 12,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setRotation({ x: rotateX, y: rotateY });
    setSpotlight({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="group relative transition-all duration-200"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out, box-shadow 0.2s ease",
        }}
        className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[#101625]/80 backdrop-blur-md ${className}`}
      >
        {/* Dynamic cursor spotlight glow */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: spotlight.opacity,
            background: `radial-gradient(circle 280px at ${spotlight.x}% ${spotlight.y}%, ${glowColor}, transparent 70%)`,
          }}
        />
        <div style={{ transform: "translateZ(20px)" }} className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
