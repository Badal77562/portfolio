import { motion } from "framer-motion";
import { Globe, Cpu, Database, Code, FileJson } from "lucide-react";

export default function SkillsSection() {
  const skillCategories = [
    {
      title: "Geospatial & Remote Sensing",
      icon: <Globe className="w-5 h-5 text-brand-red" />,
      desc: "Analyzing earth observation data and spatial environmental modelling.",
      skills: [
        { name: "QGIS", level: "95%" },
        { name: "ArcGIS", level: "90%" },
        { name: "ERDAS Imagine", level: "85%" },
        { name: "ENVI", level: "80%" },
        { name: "SNAP", level: "75%" },
        { name: "GeoDa", level: "80%" },
        { name: "DEM Processing", level: "90%" },
        { name: "Cartographic Design", level: "95%" },
        { name: "NetCDF / GeoTIFF", level: "85%" },
        { name: "Spatial Analyst", level: "90%" },
      ],
    },
  ];

  return (
    <section id="skills" className="relative w-full bg-[#080808] py-24 md:py-32 overflow-hidden border-t border-neutral-900">
      
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-red/5 rounded-full filter blur-[150px] pointer-events-none" />

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
              Core Capabilities
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter font-outfit"
          >
            Dual Technical <span className="text-brand-red">Toolsets.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-base md:text-lg max-w-xl mt-4 font-light"
          >
            Bridging the gap between software development architectures and professional geospatial remote sensing workflows.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: catIdx === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
              className="bg-black/50 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative"
            >
              {/* Header inside category card */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-neutral-900 border border-white/5 rounded-2xl flex items-center justify-center">
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight font-outfit">
                    {category.title}
                  </h3>
                  <p className="text-xs text-white/40 mt-1 font-light">
                    {category.desc}
                  </p>
                </div>
              </div>

              {/* Skills List */}
              <div className="grid grid-cols-2 gap-3 mt-8">
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.03 }}
                    className="p-3 rounded-xl bg-neutral-950 border border-white/5 hover:border-brand-red/30 flex flex-col justify-between transition-colors group cursor-default"
                  >
                    <span className="text-xs font-semibold text-white/80 group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                    
                    {/* Tiny Progress bar indicator */}
                    <div className="w-full bg-white/10 h-[3px] rounded-full mt-3 overflow-hidden">
                      <motion.div
                        className="bg-brand-red h-full rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: skill.level }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: skillIdx * 0.05 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
}
