import { useState, useRef, useEffect } from "react";
import { Play, Pause, ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import badalPhoto from "../assets/badal.jpg";


export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showReel, setShowReel] = useState(false);
  const [reelSpeechIndex, setReelSpeechIndex] = useState(0);
  const videoRef = useRef(null);

  const speechText = [
    "Hi, I'm BADAL MAHATA.",
    "I'm a GIS Specialist and Geospatial Developer passionate about creating interactive web-mapping applications and spatial analyses.",
    "I enjoy turning spatial ideas into real products using technologies like HTML, CSS, JavaScript, React, Tailwind CSS, Node.js, and MongoDB, alongside QGIS and ArcGIS.",
    "My journey started with curiosity, and over time it grew into a passion for building clean, responsive, and user-friendly geospatial applications.",
    "I love designing beautiful interfaces, developing scalable backend systems, and creating seamless user experiences.",
    "I'm constantly learning new technologies, improving my problem-solving skills, and working on exciting projects that challenge me to grow as a geospatial professional.",
    "My goal is to build innovative products that make a meaningful impact while continuing to evolve in the geospatial and software domain.",
    "Thank you for visiting my portfolio. I'm excited to connect, collaborate, and create something amazing together."
  ];

  // Determine active image in the reel based on current sentence index
  const activeImage =
    (reelSpeechIndex === 0 || reelSpeechIndex === 1 || reelSpeechIndex === 6 || reelSpeechIndex === 7)
      ? badalPhoto
      : (reelSpeechIndex === 2 || reelSpeechIndex === 3)
      ? image1
      : image2;

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((err) => console.log("Video play failed: ", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleOpenReel = () => {
    setShowReel(true);
    // Pause main background video when opening reel
    if (videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleCloseReel = () => {
    setShowReel(false);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  // Cycle through reel sentences automatically
  useEffect(() => {
    let interval;
    if (showReel) {
      setReelSpeechIndex(0);
      let currentSentence = 0;
      interval = setInterval(() => {
        if (currentSentence < speechText.length - 1) {
          currentSentence++;
          setReelSpeechIndex(currentSentence);
        } else {
          clearInterval(interval);
          handleCloseReel();
        }
      }, 7000);
    }
    return () => clearInterval(interval);
  }, [showReel]);

  // Handle smooth scroll to about section
  const handleScrollToAbout = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="https://svs.gsfc.nasa.gov/vis/a010000/a014800/a014869/Earth_wAtmos_spin_02_1080p60.mp4"
        loop
        muted
        playsInline
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/75 z-10" />

      {/* Hero content grid */}
      <div className="relative max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-center z-20">

        {/* Left Side Info */}
        <div className="md:col-span-7 flex flex-col items-start text-left mt-16 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/30 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-brand-red animate-ping" />
            <span className="text-xs uppercase tracking-widest text-brand-red font-bold font-outfit">
              GIS Analyst &amp; GIS Specialist &amp; Remote sensing
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tighter font-outfit"
          >
            Hi, I'm a <br />
            <span className="text-stroke-white font-black">Geospatial Developer</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/70 text-base md:text-lg max-w-xl mt-6 font-light leading-relaxed drop-shadow"
          >
            Passionate about constructing high-performance React.js and Node.js applications, while combining cutting-edge geospatial intelligence and Remote Sensing workflows.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mt-8"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-3.5 rounded-full bg-white text-black text-sm font-bold tracking-wide hover:scale-105 transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
            >
              View My Work
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-sm font-bold text-white backdrop-blur-md transition-all duration-300"
            >
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Right Side Video Controls & Interactive Showreel */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative flex flex-col items-center group"
          >

          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center z-20">
        <button
          onClick={handleScrollToAbout}
          className="text-white/40 hover:text-white transition-colors flex flex-col items-center gap-1.5 focus:outline-none"
        >
          <span className="text-[10px] uppercase tracking-widest font-semibold font-outfit">Scroll</span>
          <ChevronDown className="animate-bounce" size={20} />
        </button>
      </div>

      {/* Cinematic Fullscreen Showreel Modal */}
      <AnimatePresence>
        {showReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/95 flex flex-col items-center justify-center p-4 md:p-8"
          >
            {/* Top Close Button & Audio Control */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-[1010]">
              <span className="text-white/60 text-xs tracking-wider uppercase font-mono flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-red animate-ping" />
                Live Animated Showreel
              </span>
              <button
                  onClick={handleCloseReel}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all flex items-center justify-center"
                >
                  <X size={18} />
                </button>
            </div>

            {/* Video Content Screen */}
            <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-white/15 bg-[#111] shadow-2xl flex items-center justify-center">

              {/* Smooth Animated Image Sequence */}
              <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={activeImage}
                    alt="Badal Mahata Creator Pose"
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                </AnimatePresence>
              </div>

              {/* Subtitles Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col items-center text-center">


                {/* Live Caption Text */}
                <motion.p
                  key={reelSpeechIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-white text-base md:text-xl font-medium tracking-wide max-w-2xl text-shadow font-outfit"
                >
                  {speechText[reelSpeechIndex]}
                </motion.p>
              </div>
            </div>

            {/* Bottom Info Status */}
            <div className="mt-6 flex flex-col items-center">
              <span className="text-white/40 text-[10px] tracking-widest uppercase font-mono">
                Duration: 60s • 60 FPS • AI Voice &amp; Animation Simulation
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
