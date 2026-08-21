import { motion } from "framer-motion";
import { Layers, MapPin, Compass, AlertTriangle, ShieldAlert, Droplet } from "lucide-react";

export default function ProjectsSection() {
  const projects = [
    {
      title: "Sub/Micro Watershed Prioritization",
      subtitle: "Morphometric Analysis for Soil Conservation",
      role: "Researcher / Analyst",
      desc: "Conducted detailed morphometric analysis using GIS and Remote Sensing techniques to analyze linear, areal, and relief aspects of watersheds, prioritizing them for soil and water conservation practices.",
      icon: <Layers className="w-6 h-6 text-brand-red" />,
      tags: ["QGIS", "ArcGIS", "Python", "DEM Processing", "Morphometry"],
      category: "Hydrology",
    },
    {
      title: "Soil Loss Potential Mapping",
      subtitle: "RUSLE Erosion Modeling",
      role: "GIS Analyst",
      desc: "Mapped soil loss potential zones by integrating rainfall erosivity, soil erodibility, slope length, cover management, and support practice factors using the RUSLE equation to pinpoint highly vulnerable erosion zones.",
      icon: <MapPin className="w-6 h-6 text-brand-red" />,
      tags: ["RUSLE", "ArcGIS Spatial Analyst", "Map Algebra", "Erosion Modeling"],
      category: "Environmental",
    },
    {
      title: "Groundwater Potential Delineation",
      subtitle: "Multi-Criteria Spatial Modeling",
      role: "Remote Sensing & GIS Analyst",
      desc: "Delineated groundwater potential zones by synthesizing thematic layers such as geology, geomorphology, slope, lineament density, drainage density, and Land Use Land Cover (LULC).",
      icon: <Droplet className="w-6 h-6 text-brand-red" />,
      tags: ["ERDAS Imagine", "Landsat-8", "Weighted Overlay", "Geomorphology"],
      category: "Hydrogeology",
    },
    {
      title: "Flood Risk Zonation",
      subtitle: "DEM-Based Hydrological Modeling",
      role: "GIS & RS Analyst",
      desc: "Identified flood-prone zones using DEM-based hydrological modeling, slope analysis, drainage networks, and multi-criteria decision making (AHP/MCDM) to aid local disaster mitigation planning.",
      icon: <AlertTriangle className="w-6 h-6 text-brand-red" />,
      tags: ["MCDM / AHP", "DEM Modeling", "QGIS", "Hydrology Tools"],
      category: "Disaster Management",
    },
    {
      title: "Landslide Susceptibility Mapping",
      subtitle: "Terrain Stability Assessment",
      role: "GIS Analyst",
      desc: "Mapped landslide susceptibility zones across mountainous terrain using geological maps, soil type databases, slope stability models, and DEM-derived terrain parameters.",
      icon: <ShieldAlert className="w-6 h-6 text-brand-red" />,
      tags: ["ArcGIS", "DEM", "Geological Mapping", "Terrain Parameters"],
      category: "Geohazards",
    },
    {
      title: "Potential Sites for Dam Construction",
      subtitle: "Hydrological Configuration Modeling",
      role: "Remote Sensing & GIS Analyst",
      desc: "Identified optimal dam construction sites by analyzing topographic slope profiles, drainage patterns, local geology, reservoir area capacity, and watershed runoff configurations.",
      icon: <Compass className="w-6 h-6 text-brand-red" />,
      tags: ["ArcGIS Hydrology", "Runoff Modeling", "Topographic Analysis", "DEM"],
      category: "Engineering GIS",
    },
  ];

  return (
    <section id="projects" className="relative w-full min-h-screen bg-black py-24 md:py-32 flex flex-col justify-center">
      {/* Background subtle elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-red/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-left mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4"
          >
            <span className="text-xs uppercase tracking-widest text-white/60 font-semibold font-outfit">
              Portfolio
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter font-outfit"
          >
            Geospatial &amp; Web <span className="text-brand-red">Projects.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-base md:text-lg max-w-2xl mt-4 font-light"
          >
            A showcase of professional spatial analysis, satellite remote sensing, and custom modeling applications designed to extract earth intelligence.
          </motion.p>
        </div>

        {/* Grid of Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-[#080808] border border-white/10 hover:border-brand-red/50 rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 shadow-2xl"
            >
              <div>
                {/* Top Info */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-neutral-900 border border-white/5 rounded-xl group-hover:bg-brand-red/10 group-hover:border-brand-red/20 transition-all">
                    {project.icon}
                  </div>
                  <span className="text-[10px] tracking-widest uppercase font-mono text-white/40">
                    {project.category}
                  </span>
                </div>

                {/* Role Badge */}
                <span className="px-2.5 py-1 rounded bg-brand-red/10 border border-brand-red/20 text-[10px] uppercase font-bold tracking-wider text-brand-red mb-3 inline-block">
                  {project.role}
                </span>

                {/* Project Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-brand-red tracking-tight font-outfit mt-2 transition-colors duration-300">
                  {project.title}
                </h3>
                <h4 className="text-xs font-semibold text-white/50 tracking-wide mt-1">
                  {project.subtitle}
                </h4>

                {/* Description */}
                <p className="text-sm font-light text-white/60 leading-relaxed mt-4">
                  {project.desc}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-8 pt-6 border-t border-white/5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono text-white/40 bg-neutral-900 px-2 py-1 rounded border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Highlight red accent dot */}
              <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-brand-red opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
