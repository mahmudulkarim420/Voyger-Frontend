"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function GlobalLoader() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Check if the user has already seen the loader in this session
    const hasSeenLoader = sessionStorage.getItem("voyage_has_seen_loader");

    if (hasSeenLoader) {
      setShowLoader(false);
      return;
    }

    // Set a timeout to dismiss the loader after animation finishes
    const timer = setTimeout(() => {
      setShowLoader(false);
      sessionStorage.setItem("voyage_has_seen_loader", "true");
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          key="global-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#FCFAF6] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle slow pulse background glow effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1.2 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute w-[60vh] h-[60vh] rounded-full bg-[#A05C55] blur-[100px]"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-col items-center gap-6 relative z-10"
          >
            {/* Animated Logo */}
            <div className="relative">
              <motion.svg
                width="64"
                height="64"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* SVG Paths from the logo, animated to draw */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  d="M4 10 L16 30 L28 10"
                  stroke="#3A322B"
                  strokeWidth="1.5"
                  strokeLinejoin="miter"
                />
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                  d="M16 2 L16 30"
                  stroke="#3A322B"
                  strokeWidth="1.5"
                />
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
                  d="M10 6 L10 20"
                  stroke="#3A322B"
                  strokeWidth="1.5"
                />
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
                  d="M22 6 L22 20"
                  stroke="#3A322B"
                  strokeWidth="1.5"
                />
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }}
                  d="M4 10 L10 10"
                  stroke="#3A322B"
                  strokeWidth="1.5"
                />
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }}
                  d="M22 10 L28 10"
                  stroke="#3A322B"
                  strokeWidth="1.5"
                />
              </motion.svg>
            </div>

            {/* Revealing Text */}
            <motion.div className="flex flex-col items-center gap-1 overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="text-2xl text-[#3A322B] font-medium tracking-[0.3em] ml-2"
              >
                VOYΛGE
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="text-[10px] text-[#A05C55] font-medium tracking-[0.2em] uppercase"
              >
                divine couture
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
