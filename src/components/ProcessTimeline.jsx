import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ProcessTimeline() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);

  // States to keep track of active steps
  const [activeCards, setActiveCards] = useState([false, false, false, false]);

  // Track scroll position in the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Smooth drawing progress of the path
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((val) => {
      // Thresholds to activate the cards based on scroll progress
      setActiveCards([
        val > 0.15, // Step 1 Define
        val > 0.40, // Step 2 Design
        val > 0.65, // Step 3 Build
        val > 0.88, // Step 4 Launch
      ]);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const steps = [
    {
      num: "01",
      title: "Define",
      desc: "Gathering requirements, researching constraints, and mapping structural inputs for the project. Creating detailed data architectures and layout specs.",
      rotation: "rotate-2 hover:rotate-0",
      activeRotation: "rotate-1",
      positionClass: "col-start-7 lg:col-start-7 col-span-5 md:translate-x-12",
      align: "left",
    },
    {
      num: "02",
      title: "Design",
      desc: "Creating high-fidelity interactive wireframes, aesthetic mockups, and planning spatial databases. Crafting a beautiful visual hierarchy and modern styles.",
      rotation: "-rotate-2 hover:rotate-0",
      activeRotation: "-rotate-1",
      positionClass: "col-start-1 col-span-5 md:-translate-x-12",
      align: "right",
    },
    {
      num: "03",
      title: "Build",
      desc: "Programming frontend layouts with React/Tailwind, setting up scalable Node.js servers, and linking GIS maps. Running iterative unit and validation test runs.",
      rotation: "rotate-3 hover:rotate-0",
      activeRotation: "rotate-1",
      positionClass: "col-start-7 lg:col-start-7 col-span-5 md:translate-x-12",
      align: "left",
    },
    {
      num: "04",
      title: "Launch",
      desc: "Final deployment to fast cloud instances, SEO optimizations, client delivery hand-offs, and continuing post-launch performance monitoring.",
      rotation: "-rotate-3 hover:rotate-0",
      activeRotation: "-rotate-1",
      positionClass: "col-start-1 col-span-5 md:-translate-x-12",
      align: "right",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white bg-grid-pattern py-24 md:py-32 overflow-hidden text-neutral-900 border-t border-neutral-100"
    >
      {/* Header Info */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center mb-28 relative">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-neutral-200 bg-white shadow-sm mb-6">
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-bold font-outfit">
            How We Work
          </span>
        </div>
        
        <div className="relative max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-black text-black leading-tight tracking-tight font-outfit">
            Let us show you how we drive your brand to new heights
          </h2>
          
          {/* Sketch Arrow */}
          <div className="absolute right-[-40px] md:right-[-90px] bottom-[-20px] md:bottom-[-40px] w-16 md:w-24 h-auto pointer-events-none opacity-80 rotate-12 hidden sm:block">
            <svg viewBox="0 0 100 100" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 20 C 30 15, 60 25, 75 55 C 80 65, 82 78, 65 75 C 55 72, 62 60, 68 55" />
              <path d="M50 45 L70 57 L75 35" />
            </svg>
          </div>
        </div>

        <p className="text-neutral-500 text-sm md:text-base max-w-xl mt-6 font-light">
          A client-focused, design-first development cycle that pairs structural planning with rapid, pixel-perfect visual iteration.
        </p>
      </div>

      {/* Main Timeline Body */}
      <div className="max-w-5xl mx-auto px-6 relative flex flex-col items-center">
        
        {/* SVG Curved Path (Overlay behind cards) */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[320px] pointer-events-none z-0 hidden md:block">
          <svg
            width="320"
            height="100%"
            viewBox="0 0 320 1800"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            {/* Background path: Gray dashed */}
            <path
              d="M 160 0 C 300 200, 300 350, 160 500 C 20 650, 20 800, 160 950 C 300 1100, 300 1250, 160 1400 C 20 1550, 20 1700, 160 1800"
              stroke="#e5e5e5"
              strokeWidth="4"
              strokeDasharray="8 8"
            />
            {/* Foreground animated path: Black solid/dash */}
            <motion.path
              ref={pathRef}
              d="M 160 0 C 300 200, 300 350, 160 500 C 20 650, 20 800, 160 950 C 300 1100, 300 1250, 160 1400 C 20 1550, 20 1700, 160 1800"
              stroke="#ff2a2a"
              strokeWidth="5"
              style={{ pathLength }}
            />
          </svg>
        </div>

        {/* Mobile vertical line fallback */}
        <div className="absolute top-0 bottom-0 left-6 w-[2px] bg-neutral-100 z-0 block md:hidden">
          <motion.div
            className="w-full bg-brand-red origin-top h-full"
            style={{ scaleY: scrollYProgress }}
          />
        </div>

        {/* Timeline Steps Card Layout */}
        <div className="w-full flex flex-col space-y-16 md:space-y-36 relative z-10">
          {steps.map((step, idx) => {
            const isActive = activeCards[idx];
            return (
              <div key={step.num} className="grid grid-cols-1 md:grid-cols-11 items-center w-full">
                
                {/* Luggage Tag Process Card */}
                <motion.div
                  initial={{ opacity: 0, x: step.align === "left" ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 80, damping: 12 }}
                  className={`${step.positionClass} pl-10 md:pl-0`}
                >
                  <div
                    className={`relative w-full max-w-sm p-6 md:p-8 rounded-[2rem] border transition-all duration-500 ease-out shadow-lg hover:shadow-xl ${
                      isActive
                        ? "bg-brand-red text-white border-brand-red shadow-[0_20px_40px_rgba(255,42,42,0.3)] scale-[1.03]"
                        : "bg-white text-neutral-800 border-neutral-200"
                    } ${isActive ? step.activeRotation : step.rotation} group`}
                  >
                    {/* Hanging String to Timeline */}
                    <div
                      className={`absolute hidden md:block top-8 w-14 h-[2px] border-t border-dashed transition-colors duration-500 ${
                        step.align === "left"
                          ? "-left-14 origin-right"
                          : "-right-14 origin-left"
                      } ${isActive ? "border-brand-red" : "border-neutral-200"}`}
                    />

                    {/* Tag Hole Punch */}
                    <div
                      className={`absolute top-6 w-5 h-5 rounded-full border shadow-inner transition-colors duration-500 ${
                        step.align === "left" ? "-left-2.5" : "-right-2.5"
                      } ${
                        isActive
                          ? "bg-brand-red border-white/20"
                          : "bg-neutral-100 border-neutral-200"
                      }`}
                    />

                    {/* Card Inner Content */}
                    <div className="flex flex-col">
                      <span
                        className={`font-playfair text-5xl font-black italic tracking-tighter transition-colors duration-500 ${
                          isActive ? "text-white/20" : "text-neutral-150 text-neutral-200"
                        }`}
                      >
                        {step.num}
                      </span>
                      
                      <h3 className="text-2xl font-black tracking-tight font-outfit mt-2">
                        {step.title}
                      </h3>
                      
                      <p
                        className={`text-sm font-light mt-3 leading-relaxed transition-colors duration-500 ${
                          isActive ? "text-white/80" : "text-neutral-500"
                        }`}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Segment */}
      <div className="w-full flex flex-col items-center justify-center mt-28 mb-10 text-center relative z-10 px-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100 }}
          className="rotate-[-2deg]"
        >
          <span className="font-playfair text-3xl md:text-4xl italic font-bold text-neutral-800 select-none">
            Ready to be delivered!
          </span>
        </motion.div>
      </div>
    </section>
  );
}
