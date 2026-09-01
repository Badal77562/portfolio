import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProjectCard from "../components/ProjectCard";

import { seedProjects } from "../utils/seedData";

// Pre-generate pseudo-random stars deterministically outside the component for React 19 purity rules
const STATIC_STARS = [...Array(25)].map((_, i) => ({
  id: i,
  width: `${((i * 7) % 3) * 0.8 + 1}px`,
  height: `${((i * 7) % 3) * 0.8 + 1}px`,
  top: `${((i * 19) % 97) + 2}%`,
  left: `${((i * 29) % 97) + 2}%`,
  duration: `${((i * 13) % 4) + 3}s`,
  delay: `${((i * 17) % 3) * 0.8}s`,
}));

export default function Projects() {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("gis_portfolio_projects");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return seedProjects;
  });



  // Search, Filter, Sort, Pagination states
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Save seed data to localStorage if not already present, and sync any code-level updates
  useEffect(() => {
    const saved = localStorage.getItem("gis_portfolio_projects");
    if (!saved) {
      localStorage.setItem("gis_portfolio_projects", JSON.stringify(seedProjects));
    } else {
      try {
        const parsed = JSON.parse(saved);
        let updated = false;

        // Update existing projects if seed data changed
        const newList = parsed.map((p) => {
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

        // Append any brand-new seed projects not yet in localStorage
        const existingIds = new Set(parsed.map((p) => p.id));
        const newSeedProjects = seedProjects.filter((s) => !existingIds.has(s.id));
        if (newSeedProjects.length > 0) {
          newList.push(...newSeedProjects);
          updated = true;
        }

        if (updated) {
          localStorage.setItem("gis_portfolio_projects", JSON.stringify(newList));
          setProjects(newList);
        }
      } catch (e) {
        console.error("Error syncing seed data:", e);
      }
    }
  }, []);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setCurrentPage(1);
  };



  // Filter & Sort Projects logic
  const filteredProjects = projects
    .filter((project) => {
      // Search
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.tech &&
          project.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      // Category
      const matchesCategory =
        activeCategory === "All" || project.category === activeCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.date) - new Date(a.date);
      }
      if (sortBy === "oldest") {
        return new Date(a.date) - new Date(b.date);
      }
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  // Pagination details
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Star generation moved statically outside component for purity

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-black text-white min-h-screen flex flex-col justify-between relative overflow-hidden"
    >
      <Navbar />

      {/* Particle stars/grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-red/5 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Floating Canvas Stars / Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {STATIC_STARS.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white/20 rounded-full"
            style={{
              width: star.width,
              height: star.height,
              top: star.top,
              left: star.left,
              animation: `pulse ${star.duration} infinite ease-in-out`,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      <main className="max-w-7xl mx-auto w-full px-6 md:px-12 pt-28 pb-24 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="inline-block px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-2">
              <span className="text-xs uppercase tracking-widest text-brand-red font-bold font-outfit">
                Dashboard
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none font-outfit">
              My GIS &amp; Remote <span className="text-brand-red">Sensing Projects.</span>
            </h1>
            <p className="text-white/60 text-base md:text-lg max-w-xl font-light leading-relaxed">
              A curated collection of my research modeling, web mapping portals, machine learning classifications, and spatial analysis case studies.
            </p>
          </div>


        </div>



        {/* Search, Filter & Sort Controls */}
        <div className="space-y-6 mb-12 bg-neutral-950/40 border border-white/5 rounded-3xl p-6 backdrop-blur-md">
          <SearchBar searchQuery={searchQuery} setSearchQuery={handleSearchChange} />
          <CategoryFilter
            activeCategory={activeCategory}
            setActiveCategory={handleCategoryChange}
            sortBy={sortBy}
            setSortBy={handleSortChange}
          />
        </div>

        {/* Grid display */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {paginatedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center text-center py-20 px-6 border border-white/5 bg-neutral-950/40 rounded-3xl"
          >
            <AlertCircle className="w-12 h-12 text-neutral-600 mb-4 stroke-1 animate-pulse" />
            <h3 className="text-lg font-bold text-white tracking-wide font-outfit uppercase">
              No Projects Found
            </h3>
            <p className="text-neutral-500 text-xs mt-2 max-w-sm font-light">
              Try adjusting your search keywords or checking other category filters.
            </p>
          </motion.div>
        )}

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-16 font-mono text-xs">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 border rounded-lg transition-all ${
                currentPage === 1
                  ? "border-white/5 text-neutral-600 pointer-events-none"
                  : "border-white/10 text-neutral-300 hover:border-white hover:text-white cursor-pointer"
              }`}
            >
              Previous
            </button>
            <span className="text-neutral-400">
              Page <strong className="text-white">{currentPage}</strong> of{" "}
              <strong className="text-white">{totalPages}</strong>
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border rounded-lg transition-all ${
                currentPage === totalPages
                  ? "border-white/5 text-neutral-600 pointer-events-none"
                  : "border-white/10 text-neutral-300 hover:border-white hover:text-white cursor-pointer"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </main>

      <Footer />
    </motion.div>
  );
}
