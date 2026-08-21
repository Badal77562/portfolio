import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "../components/Preloader";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import SkillsSection from "../components/SkillsSection";
import ProcessTimeline from "../components/ProcessTimeline";

import ProjectsSection from "../components/ProjectsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Lock scrolling during preloader phase
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main page content (mounted alongside or after loading to ensure exit transitions overlay) */}
      <div className={`relative bg-black min-h-screen ${isLoading ? "h-screen overflow-hidden" : ""}`}>
        <Navbar />
        <Hero />
        <About />
        <SkillsSection />
        <ProcessTimeline />

        <ProjectsSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}
