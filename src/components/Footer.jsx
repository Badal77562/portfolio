import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative w-full bg-[#111111] text-[#F4F4F4] pt-20 pb-12 overflow-hidden border-t border-neutral-800">

      {/* Top Information Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-sm z-10 relative">

        {/* Left Column: Monospace Services */}
        <div className="flex flex-col space-y-3">
          <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-500 font-bold">
            Core Services
          </span>
          <ul className="space-y-1.5 font-mono text-xs text-neutral-300 uppercase tracking-wider">
            <li>🛰️ GIS &amp; RS ANALYTICS</li>
            <li>💻 WEB DEVELOPMENT</li>
            <li>🎨 UI/UX INTERFACE DESIGN</li>
            <li>🎬 CINEMATIC SHOWREELS</li>
          </ul>
        </div>

        {/* Center Column: Experience */}
        <div className="flex flex-col space-y-3">
          <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-500 font-bold">
            Showcase
          </span>
          <p className="text-base font-light text-neutral-300">
            1+ Years of GIS Research &amp; Web Development
          </p>
          <a
            href="#projects"
            onClick={handleScrollToProjects}
            className="text-xs uppercase tracking-wider font-bold text-brand-red border-b border-brand-red/30 pb-0.5 hover:border-brand-red hover:text-white transition-all w-fit"
          >
            View Work
          </a>
        </div>

        {/* Right Column: Status */}
        <div className="flex flex-col space-y-3 md:items-end md:text-right">
          <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-500 font-bold">
            Status
          </span>
          <p className="text-base font-light text-neutral-300">
            Available Worldwide
          </p>
          <p className="text-xs font-mono text-neutral-400">
            Kolkata, WB, India // UTC+5:30
          </p>
        </div>

      </div>



      {/* Bottom Contact Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-neutral-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-400 font-mono items-center z-10 relative">

        {/* Left: Copyright */}
        <div>
          <span>&copy; {currentYear} BADAL MAHATA. ALL RIGHTS RESERVED.</span>
          <span className="block mt-1 text-[10px] text-neutral-600">Built with React + Vite + Tailwind CSS</span>
        </div>

        {/* Center: Email */}
        <div className="md:text-center">
          <a
            href="mailto:badalmahata46@gmail.com"
            className="text-neutral-300 text-sm hover:text-white underline underline-offset-4 decoration-brand-red decoration-2 hover:decoration-white transition-all font-sans font-medium"
          >
            badalmahata46@gmail.com
          </a>
        </div>

        {/* Right: Privacy Policy */}
        <div className="md:text-right flex md:justify-end gap-6">
          <a href="#home" className="hover:text-white transition-colors">BACK TO TOP</a>
          <a href="#about" className="hover:text-white transition-colors">ABOUT ME</a>
        </div>

      </div>

    </footer>
  );
}
