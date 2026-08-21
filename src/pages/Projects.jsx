import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, FolderGit, AlertCircle, Plus } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProjectCard from "../components/ProjectCard";
import UploadProjectForm from "../components/UploadProjectForm";
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

  const [isAdmin, setIsAdmin] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

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

  const saveProjects = (updatedList) => {
    localStorage.setItem("gis_portfolio_projects", JSON.stringify(updatedList));
    setProjects(updatedList);
  };

  const handleSaveProject = (savedProject) => {
    const exists = projects.find((p) => p.id === savedProject.id);
    let updatedList;
    if (exists) {
      updatedList = projects.map((p) => (p.id === savedProject.id ? savedProject : p));
    } else {
      updatedList = [savedProject, ...projects];
    }
    saveProjects(updatedList);
    setEditingProject(null);
    setShowUploadForm(false);
  };

  const handleDeleteProject = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (confirmDelete) {
      const updatedList = projects.filter((p) => p.id !== id);
      saveProjects(updatedList);
      // Reset editing if the deleted project was open
      if (editingProject && editingProject.id === id) {
        setEditingProject(null);
        setShowUploadForm(false);
      }
    }
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
    setShowUploadForm(true);
    // Scroll to form smoothly
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleCancelForm = () => {
    setEditingProject(null);
    setShowUploadForm(false);
  };

  const handleOpenUpload = () => {
    setEditingProject(null);
    setShowUploadForm(true);
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

          {/* Admin Toggle Switch */}
          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={() => {
                setIsAdmin(!isAdmin);
                setShowUploadForm(false);
                setEditingProject(null);
              }}
              className={`p-3 border rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                isAdmin
                  ? "bg-brand-red border-brand-red text-white shadow-[0_0_15px_rgba(255,42,42,0.25)]"
                  : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
              }`}
              title={isAdmin ? "Disable Admin Panel" : "Activate Admin Panel"}
            >
              {isAdmin ? (
                <>
                  <Unlock className="w-4 h-4 text-white" />
                  <span>Admin Mode Active</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-neutral-400" />
                  <span>Admin Panel</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Upload form container (shown only to admin) */}
        <AnimatePresence>
          {isAdmin && showUploadForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12"
            >
              <UploadProjectForm
                key={editingProject?.id || "new"}
                editingProject={editingProject}
                onSave={handleSaveProject}
                onCancel={handleCancelForm}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Admin Dashboard summary / Add project shortcut */}
        {isAdmin && !showUploadForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 border border-dashed border-white/15 hover:border-brand-red/40 bg-[#0c0c0c] rounded-3xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-neutral-900 border border-white/5 rounded-2xl text-brand-red">
                <FolderGit className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-white tracking-wide text-sm font-outfit uppercase">
                  Project Workspace Management
                </h4>
                <p className="text-neutral-500 text-xs font-light mt-1">
                  You can upload new GIS maps or edit existing case studies stored in local storage.
                </p>
              </div>
            </div>
            <button
              onClick={handleOpenUpload}
              className="w-full md:w-auto px-6 py-3 bg-brand-red hover:bg-brand-red/90 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-red/10"
            >
              <Plus className="w-4 h-4" />
              Add Project Case Study
            </button>
          </motion.div>
        )}

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
                isAdmin={isAdmin}
                onEdit={handleEditClick}
                onDelete={handleDeleteProject}
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
              Try adjusting your search keywords, checking other category filters, or click the Admin Panel to upload a custom project.
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
