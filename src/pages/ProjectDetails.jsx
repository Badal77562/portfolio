import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Layers,
  ChevronLeft,
  Share2,
  Copy,
  Check,
  Download,
  Terminal,
  Cpu,
  HelpCircle,
  Award,
  X,
  Maximize2,
  Minimize2
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { seedProjects } from "../utils/seedData";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project] = useState(() => {
    const saved = localStorage.getItem("gis_portfolio_projects");
    const list = saved ? JSON.parse(saved) : seedProjects;
    
    // Sync any seed updates
    let updated = false;
    const newList = list.map((p) => {
      const seed = seedProjects.find((s) => s.id === p.id);
      if (seed) {
        const needsUpdate =
          seed.image !== p.image ||
          seed.shortDesc !== p.shortDesc ||
          seed.fullDesc !== p.fullDesc ||
          JSON.stringify(seed.screenshots) !== JSON.stringify(p.screenshots);
        if (needsUpdate) {
          updated = true;
          return { ...p, ...seed };
        }
      }
      return p;
    });
    if (updated && saved) {
      localStorage.setItem("gis_portfolio_projects", JSON.stringify(newList));
    }
    
    return newList.find((p) => p.id === id) || null;
  });
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const lightboxRef = useRef(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (lightboxRef.current) {
        lightboxRef.current.requestFullscreen().catch((err) => {
          console.error("Error enabling full-screen mode:", err);
        });
      }
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === lightboxRef.current);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project?.title,
          text: project?.shortDesc,
          url: window.location.href,
        });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch (err) {
        console.log("Error sharing: ", err);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col justify-between">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <div className="w-12 h-12 rounded-full border-t-2 border-brand-red animate-spin" />
          <p className="text-neutral-500 font-mono text-sm tracking-widest uppercase">Loading project data...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-black text-white min-h-screen flex flex-col justify-between relative overflow-hidden"
    >
      <Navbar />

      {/* Decorative stars */}
      <div className="absolute top-40 left-10 w-24 h-24 bg-brand-red/5 rounded-full filter blur-[80px] pointer-events-none" />
      <div className="absolute bottom-40 right-10 w-40 h-40 bg-brand-red/5 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Main Details Panel (Hide elements during browser print) */}
      <main className="max-w-6xl mx-auto w-full px-6 md:px-12 pt-28 pb-24 relative z-10 print:pt-0 print:pb-0">
        
        {/* Back and Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 print:hidden">
          <button
            onClick={() => navigate("/projects")}
            className="flex items-center gap-2 text-neutral-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Projects
          </button>
          
          <div className="flex items-center gap-3">
            {/* Copy Link Button */}
            <button
              onClick={handleCopyLink}
              className="p-2.5 bg-white/5 border border-white/10 hover:border-white/20 text-neutral-400 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              title="Copy details link"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline uppercase tracking-wider text-[10px]">
                {copied ? "Copied" : "Copy Link"}
              </span>
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="p-2.5 bg-white/5 border border-white/10 hover:border-white/20 text-neutral-400 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              title="Share project details"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline uppercase tracking-wider text-[10px]">
                {shared ? "Shared" : "Share"}
              </span>
            </button>

            {/* Print PDF Button */}
            <button
              onClick={handleDownloadPDF}
              className="p-2.5 bg-white/5 border border-white/10 hover:border-white/20 text-neutral-400 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              title="Download PDF version"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline uppercase tracking-wider text-[10px]">PDF Case Study</span>
            </button>
          </div>
        </div>

        {/* Hero Section Banner */}
        <section className="relative rounded-3xl overflow-hidden aspect-[21/9] md:aspect-[3/1] bg-neutral-900 border border-white/10 shadow-2xl mb-12">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-neutral-600">
              <Layers className="w-16 h-16 stroke-1 mb-2 animate-pulse" />
              <span className="text-sm font-mono uppercase tracking-widest">No Cover Image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          {/* Metadata Overlay */}
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="px-3 py-1.5 rounded-full bg-brand-red border border-brand-red/20 text-[9px] font-extrabold uppercase tracking-widest text-white shadow-lg shadow-brand-red/20">
                {project.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-black font-outfit text-white tracking-tight mt-4">
                {project.title}
              </h1>
              <div className="flex items-center gap-6 mt-3 text-neutral-400 text-xs font-mono tracking-wider uppercase">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-brand-red" /> {formatDate(project.date)}
                </span>
                {project.featured && (
                  <span className="text-brand-red font-bold">★ Featured Case Study</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Case Study Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Content (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Overview / Tabs navigation */}
            <div className="bg-neutral-950 border border-white/10 rounded-3xl p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-bold font-outfit tracking-tight border-b border-white/5 pb-3">
                Project Overview
              </h2>
              <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed whitespace-pre-line">
                {project.fullDesc || project.shortDesc}
              </p>
            </div>

            {/* GIS Methodology Timeline */}
            {project.workflow && project.workflow.length > 0 && (
              <div className="bg-neutral-950 border border-white/10 rounded-3xl p-6 md:p-8">
                <h2 className="text-xl font-bold font-outfit tracking-tight border-b border-white/5 pb-3 mb-8">
                  GIS Workflow & Methodology
                </h2>
                <div className="relative pl-6 md:pl-8 border-l border-white/10 space-y-8">
                  {project.workflow.map((step, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-[-31px] md:left-[-39px] top-0 w-4 h-4 rounded-full bg-black border-2 border-brand-red flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono text-brand-red font-bold uppercase tracking-widest">
                          Step {idx + 1}
                        </span>
                        <p className="text-neutral-300 text-sm font-light mt-1">
                          {step}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Screenshots Gallery Section */}
            {project.screenshots && project.screenshots.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold font-outfit tracking-tight">
                  Map Layout
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.screenshots.map((shot, idx) => (
                    <div
                      key={idx}
                      onClick={() => setLightboxIndex(idx)}
                      className="relative rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 aspect-video hover:border-brand-red/40 hover:shadow-lg transition-all duration-300 cursor-zoom-in group"
                    >
                      <img
                        src={shot}
                        alt={`Screenshot ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white/80 font-mono text-xs uppercase tracking-widest transition-opacity duration-300">
                        View Image
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Tech Stack Summary */}
            {project.tech && project.tech.length > 0 && (
              <div className="bg-neutral-950 border border-white/10 rounded-3xl p-6 md:p-8">
                <h3 className="text-sm uppercase tracking-widest text-neutral-500 font-bold font-mono block mb-4">
                  Tools & Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-mono font-semibold text-neutral-300 uppercase tracking-wide flex items-center gap-1.5"
                    >
                      <Terminal className="w-3.5 h-3.5 text-brand-red" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <div className="bg-neutral-950 border border-white/10 rounded-3xl p-6 md:p-8">
                <h3 className="text-sm uppercase tracking-widest text-neutral-500 font-bold font-mono block mb-4">
                  Key Specifications
                </h3>
                <ul className="space-y-3">
                  {project.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-neutral-300 text-xs font-light leading-relaxed">
                      <Cpu className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Challenges Box */}
            {project.challenges && (
              <div className="bg-neutral-950 border border-white/10 rounded-3xl p-6 md:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <HelpCircle className="w-4 h-4 text-brand-red" />
                  <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-bold font-mono block">
                    Technical Challenge
                  </h3>
                </div>
                <p className="text-neutral-400 text-xs font-light leading-relaxed">
                  {project.challenges}
                </p>
              </div>
            )}

            {/* Results Box */}
            {project.results && (
              <div className="bg-neutral-950 border border-white/10 rounded-3xl p-6 md:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-brand-red" />
                  <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-bold font-mono block">
                    Research Impact
                  </h3>
                </div>
                <p className="text-neutral-400 text-xs font-light leading-relaxed">
                  {project.results}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Action Button at bottom */}
        <div className="mt-16 text-center print:hidden">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/15 hover:border-brand-red hover:bg-brand-red/10 rounded-xl text-xs font-bold uppercase tracking-widest text-neutral-300 hover:text-white transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Projects Dashboard
          </Link>
        </div>
      </main>

      {/* Lightbox / Gallery Slideshow Overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (document.fullscreenElement) {
                document.exitFullscreen();
              }
              setLightboxIndex(null);
            }}
            className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Top controls toolbar */}
            <div 
              className="absolute top-6 right-6 flex items-center gap-3 z-10 print:hidden" 
              onClick={(e) => e.stopPropagation()}
            >
              {/* Toggle Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="p-3 bg-white/5 hover:bg-white/15 rounded-full text-white/70 hover:text-white transition-all cursor-pointer flex items-center justify-center"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Mode"}
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>

              {/* Close Button */}
              <button
                onClick={() => {
                  if (document.fullscreenElement) {
                    document.exitFullscreen();
                  }
                  setLightboxIndex(null);
                }}
                className="p-3 bg-white/5 hover:bg-white/15 rounded-full text-white/70 hover:text-white transition-all cursor-pointer flex items-center justify-center"
                title="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <motion.div
              ref={lightboxRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative overflow-hidden transition-all duration-300 ${
                isFullscreen 
                  ? "w-screen h-screen max-w-none max-h-none border-none rounded-none bg-black flex items-center justify-center" 
                  : "max-w-5xl max-h-[85vh] rounded-2xl border border-white/10"
              }`}
            >
              <img
                src={project.screenshots[lightboxIndex]}
                alt={`Lightbox image ${lightboxIndex + 1}`}
                className={`object-contain transition-all duration-300 ${
                  isFullscreen ? "w-screen h-screen p-2" : "w-full h-auto max-h-[85vh]"
                }`}
              />
              
              {/* Pagination indicators */}
              {project.screenshots.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/60 px-4 py-2 rounded-full border border-white/10 text-xs font-mono">
                  {project.screenshots.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setLightboxIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                        idx === lightboxIndex ? "bg-brand-red scale-110" : "bg-white/30 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom print CSS for beautiful layouts */}
      <style>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          main {
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          nav, footer, header, .print\\:hidden, button, a {
            display: none !important;
          }
          h1, h2, h3, p, span, li {
            color: black !important;
          }
          .bg-neutral-950, .bg-neutral-900, .bg-black {
            background: transparent !important;
            border-color: #ddd !important;
            box-shadow: none !important;
          }
          .border, .border-t, .border-b, .border-l {
            border-color: #ddd !important;
          }
          img {
            max-width: 100% !important;
            page-break-inside: avoid !important;
          }
        }
      `}</style>

      <Footer />
    </motion.div>
  );
}
