import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const steps = [
      { target: 40, duration: 500 },
      { target: 75, duration: 700 },
      { target: 100, duration: 400 },
    ];

    let current = 0;
    let timeoutId;

    const runStep = (idx) => {
      if (idx >= steps.length) {
        timeoutId = setTimeout(onComplete, 500);
        return;
      }
      const { target, duration } = steps[idx];
      const start = current;
      const startTime = performance.now();

      const animate = (now) => {
        const elapsed = now - startTime;
        const frac = Math.min(elapsed / duration, 1);
        const val = Math.round(start + (target - start) * frac);
        setProgress(val);
        current = val;
        if (frac < 1) requestAnimationFrame(animate);
        else runStep(idx + 1);
      };
      requestAnimationFrame(animate);
    };

    runStep(0);
    return () => clearTimeout(timeoutId);
  }, [onComplete]);

  return (
    <motion.div
      key="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
    >
      {/* Brand */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-white font-outfit tracking-tight">
          BADAL MAHATA<span className="text-brand-red">.</span>
        </h1>
        <p className="text-[10px] text-white/40 tracking-widest uppercase mt-2 font-mono">
          GIS &amp; Remote Sensing Portfolio
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-brand-red rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ ease: "easeOut" }}
        />
      </div>

      {/* Progress text */}
      <span className="mt-4 font-mono text-[10px] text-white/30">{progress}%</span>
    </motion.div>
  );
}
