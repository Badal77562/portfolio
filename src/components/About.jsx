import { motion } from "framer-motion";
import badalPhoto from "../assets/badal.jpg";

// Custom SVG Icons
function StarIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 0 L14.8 9.2 L24 12 L14.8 14.8 L12 24 L9.2 14.8 L0 12 L9.2 9.2 Z" />
    </svg>
  );
}

function ReactIcon() {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-16 h-16 text-sky-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]">
      <title>React Logo</title>
      <circle cx="0" cy="0" r="2.05" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function NodeIcon() {
  return (
    <svg viewBox="0 0 256 256" className="w-16 h-16 text-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]">
      <title>Node.js Logo</title>
      <path
        fill="currentColor"
        d="M231.2 115.4L137.6 61a19.2 19.2 0 0 0-19.2 0L24.8 115.4a19.2 19.2 0 0 0-9.6 16.6v108.8a19.2 19.2 0 0 0 9.6 16.6l93.6 54.4a19.2 19.2 0 0 0 19.2 0l93.6-54.4a19.2 19.2 0 0 0 9.6-16.6V132a19.2 19.2 0 0 0-9.6-16.6zM128 256a127.3 127.3 0 0 1-52.6-11.3l85-147.2v88.2a16 16 0 0 0 16 16h4.3a95.8 95.8 0 0 0 18.2-11.7l13.5-13.5a16 16 0 0 0-22.6-22.6l-13.5 13.5h-4.3v-88.2a32 32 0 0 0-32-32H95a63.9 63.9 0 0 0-48.4 22.3l-10 12.3a16 16 0 0 0 24.6 20l10-12.3A31.9 31.9 0 0 1 95 96h33v135.5l-63-36.4a16.2 16.2 0 0 0-16 0L38.4 201a16 16 0 0 0 16 27.7l10.6-6.1L128 256z"
      />
    </svg>
  );
}

function MongoIcon() {
  return (
    <svg viewBox="0 0 256 256" className="w-16 h-16 text-emerald-600 drop-shadow-[0_0_15px_rgba(5,150,105,0.5)]">
      <title>MongoDB Logo</title>
      <path
        fill="currentColor"
        d="M191.2 101.4c-9.1-23.7-27.1-49.8-49.8-71.1a12.1 12.1 0 0 0-16.8 0c-22.7 21.3-40.7 47.4-49.8 71.1-13.3 34.6-11 70.8 6.2 97.4a12.1 12.1 0 0 0 20.4-1.2 56 56 0 0 1 9.2-15.6V228a12 12 0 0 0 24 0v-46.1a56 56 0 0 1 9.2 15.6 12.1 12.1 0 0 0 20.4 1.2c17.2-26.6 19.5-62.8 6.2-97.3zM128 156.4a28 28 0 0 1-5.1-4.7 12 12 0 0 0-17 17A52 52 0 0 0 128 180.4v-24zm0-92a106.8 106.8 0 0 1 29 44.8H99a106.8 106.8 0 0 1 29-44.8z"
      />
    </svg>
  );
}

export default function About() {
  // Generate jagged torn-paper divider points deterministically for React 19 purity rules
  const generateTornPoints = () => {
    let points = "M 0 20";
    const segments = 60;
    const width = 2000;
    const step = width / segments;

    for (let i = 1; i <= segments; i++) {
      const x = i * step;
      // alternate heights for organic tear look using deterministic math
      const y = i % 2 === 0 
        ? 10 + ((i * 7) % 8) 
        : 22 + ((i * 13) % 8);
      points += ` L ${x} ${y}`;
    }
    points += ` L 2000 100 L 0 100 Z`;
    return points;
  };

  return (
    <section id="about" className="relative w-full min-h-screen bg-brand-red py-24 md:py-32 flex items-center justify-center overflow-hidden">

      {/* Black star decorations */}
      <StarIcon className="absolute top-16 left-12 w-6 h-6 text-black animate-pulse opacity-40" />
      <StarIcon className="absolute bottom-28 left-20 w-8 h-8 text-black animate-pulse opacity-30" style={{ animationDelay: '1s' }} />
      <StarIcon className="absolute top-24 right-20 w-10 h-10 text-black opacity-30" />
      <StarIcon className="absolute middle right-1/3 w-6 h-6 text-black animate-pulse opacity-40" style={{ animationDelay: '1.5s' }} />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12 items-center relative z-10">

        {/* Left Side: Hanging ID Badge */}
        <div className="col-span-1 md:col-span-5 flex flex-col items-center relative min-h-[460px] md:min-h-[500px]">
          {/* Lanyard strap from top */}
          <div className="absolute top-[-100px] w-6 h-[120px] bg-neutral-900 rounded-b-md shadow-lg z-20 flex items-end justify-center">
            {/* Lanyard stitch line */}
            <div className="w-[2px] h-full bg-neutral-800 border-r border-dashed border-white/10" />
          </div>

          {/* Metal Clip */}
          <div className="absolute top-[20px] w-10 h-6 bg-neutral-400 rounded shadow-md z-20 flex items-center justify-center border-b border-black/20">
            <div className="w-4 h-4 rounded-full bg-neutral-700" />
          </div>

          {/* Hanging badge container */}
          <motion.div
            initial={{ rotate: -15, y: -20, opacity: 0 }}
            whileInView={{ rotate: -3, y: 0, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ rotate: 1, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="mt-10 w-72 bg-neutral-900 rounded-2xl p-5 border-2 border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center select-none"
          >
            {/* Badge header slot */}
            <div className="w-12 h-2.5 rounded-full bg-black mb-6 border border-white/5" />

            {/* Photo frame */}
            <div className="w-48 h-56 rounded-xl overflow-hidden bg-neutral-800 border-2 border-neutral-700 shadow-inner relative flex items-center justify-center">
              <img
                src={badalPhoto}
                alt="Badal Mahata Photo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-neutral-950/10 pointer-events-none" />
            </div>

            {/* Badge details */}
            <div className="w-full text-center mt-5">
              <h3 className="text-xl font-bold tracking-tight text-white font-outfit uppercase">
                Badal Mahata
              </h3>
              <p className="text-[10px] tracking-widest text-brand-red font-bold uppercase mt-1">
                Geospatial &amp; GIS Analyst
              </p>
            </div>

            {/* Barcode/Scan section */}
            <div className="w-full mt-6 pt-4 border-t border-white/5 flex flex-col items-center">
              <div className="w-full h-8 flex items-center justify-center text-white/40">
                {/* Simulated Barcode */}
                {[...Array(24)].map((_, i) => (
                  <span
                    key={i}
                    className="h-full bg-white/40"
                    style={{
                      width: `${(i % 3 === 0 ? 3 : i % 2 === 0 ? 1.5 : 0.8)}px`,
                      marginLeft: `${(i % 5 === 0 ? 2.5 : 1)}px`,
                    }}
                  />
                ))}
              </div>
              <span className="text-[8px] font-mono text-white/30 tracking-widest mt-2 uppercase">
                ID-8617832572 // DEV-2026
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Narrative Bio */}
        <div className="col-span-1 md:col-span-7 text-left flex flex-col items-start justify-center">
          <motion.h2
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-8xl font-black text-black tracking-tight leading-[1] mb-6 font-outfit"
          >
            Hello!
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6 text-white text-base md:text-lg font-light leading-relaxed max-w-xl"
          >
            <p>
              I am <span className="font-extrabold text-black uppercase tracking-wide">BADAL MAHATA</span>. I occupy the unique intersection of a Geospatial Developer and a seasoned Remote Sensing &amp; GIS specialist.
            </p>
            <p className="text-white/80">
              With a background in Geography and Remote Sensing, I turn complex Earth observation data, satellite imagery, and spatial models into interactive digital products. I design responsive frontend architectures with <strong className="font-semibold text-white">React.js/Next.js</strong>, backend infrastructures with <strong className="font-semibold text-white">Node.js</strong>, and combine them with advanced geospatial analytics tools.
            </p>
          </motion.div>

          {/* Technology Logos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 w-full"
          >
            <span className="text-[10px] tracking-widest text-black/60 font-bold uppercase block mb-6 font-outfit">
              Core Tech Stack
            </span>
            <div className="flex items-center gap-8 md:gap-12">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.15 }}
                className="cursor-pointer"
              >
                <ReactIcon />
              </motion.div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                whileHover={{ scale: 1.15 }}
                className="cursor-pointer"
              >
                <NodeIcon />
              </motion.div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                whileHover={{ scale: 1.15 }}
                className="cursor-pointer"
              >
                <MongoIcon />
              </motion.div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Torn Paper Divider Bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
        <svg
          viewBox="0 0 2000 100"
          preserveAspectRatio="none"
          className="relative block w-full h-[50px] md:h-[70px]"
        >
          <path
            d={generateTornPoints()}
            className="fill-white"
          />
        </svg>
      </div>

    </section>
  );
}
