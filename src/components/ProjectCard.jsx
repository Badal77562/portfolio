import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Layers, ExternalLink, Edit2, Trash2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function ProjectCard({ project, isAdmin, onEdit, onDelete }) {
  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative bg-neutral-950/80 border border-white/10 hover:border-brand-red/40 rounded-3xl overflow-hidden flex flex-col justify-between shadow-2xl backdrop-blur-md"
    >
      {/* Glow background on card hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-red/0 via-brand-red/0 to-brand-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        {/* Cover Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900 border-b border-white/5">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-neutral-600 gap-2">
              <Layers className="w-10 h-10 stroke-1" />
              <span className="text-xs uppercase tracking-widest font-mono">No Image Uploaded</span>
            </div>
          )}

          {/* Category Badge overlay */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-[9px] font-extrabold uppercase tracking-widest text-brand-red backdrop-blur-md">
              {project.category}
            </span>
          </div>

          {/* Featured Ribbon overlay */}
          {project.featured && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1.5 rounded-full bg-brand-red border border-brand-red/20 text-[9px] font-extrabold uppercase tracking-widest text-white shadow-lg shadow-brand-red/30">
                ★ Featured
              </span>
            </div>
          )}
        </div>

        {/* Content Box */}
        <div className="p-6 md:p-8">
          {/* Title */}
          <h3 className="text-xl font-bold text-white group-hover:text-brand-red tracking-tight font-outfit transition-colors duration-300">
            {project.title}
          </h3>

          {/* Date */}
          <div className="flex items-center text-neutral-500 text-xs font-mono tracking-wider mt-2 uppercase">
            <Calendar className="w-3.5 h-3.5 mr-1.5 text-neutral-500" />
            {formatDate(project.date)}
          </div>

          {/* Short Description */}
          <p className="text-neutral-400 text-sm font-light mt-4 leading-relaxed line-clamp-3">
            {project.shortDesc}
          </p>

          {/* Tech stack */}
          {project.tech && project.tech.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-6">
              {project.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-mono font-medium text-neutral-300 uppercase tracking-wide"
                >
                  {t.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Buttons / Actions */}
      <div className="p-6 md:p-8 pt-0 border-t border-white/5 bg-black/10 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          {/* View Details Page Link */}
          <Link
            to={`/projects/${project.id}`}
            className="flex-1 px-5 py-3 rounded-xl bg-white text-black hover:bg-brand-red hover:text-white font-bold text-xs uppercase tracking-widest text-center transition-all duration-300 shadow-[0_4px_15px_rgba(255,255,255,0.05)] hover:shadow-[0_4px_15px_rgba(255,42,42,0.25)] hover:scale-[1.02] cursor-pointer"
          >
            View Details
          </Link>
        </div>

        {/* Admin Actions */}
        {isAdmin && (
          <div className="flex items-center gap-3 pt-3 border-t border-white/5">
            <button
              onClick={() => onEdit(project)}
              className="flex-1 py-2 px-3 bg-neutral-900 hover:bg-neutral-800 border border-white/10 hover:border-white/20 rounded-xl text-neutral-300 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              Edit
            </button>
            <button
              onClick={() => onDelete(project.id)}
              className="flex-1 py-2 px-3 bg-brand-red/10 hover:bg-brand-red border border-brand-red/20 hover:border-brand-red rounded-xl text-brand-red hover:text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
