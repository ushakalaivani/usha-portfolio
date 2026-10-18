"use client";

import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import JourneySection from "./components/JourneySection";
import Skills3DSection from "./components/Skills3DSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

// Dynamically import ThreeBackground with SSR disabled to ensure WebGL only runs in browser
const ThreeBackground = dynamic(() => import("./components/ThreeBackground"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#080b14] text-white">
      {/* 3D WebGL Background Starfield & Floating Polyhedra */}
      <ThreeBackground />

      {/* Top Glassmorphic Navigation */}
      <Navbar />

      {/* Hero Section with Interactive 3D WebGL Core */}
      <HeroSection />

      {/* About & Journey Section */}
      <JourneySection />

      {/* 3D Skills Arsenal */}
      <Skills3DSection />

      {/* Featured Projects with 3D Tilt Cards */}
      <ProjectsSection />

      {/* Holographic Contact Terminal */}
      <ContactSection />

      {/* Footer & Back to Top */}
      <Footer />
    </main>
  );
}