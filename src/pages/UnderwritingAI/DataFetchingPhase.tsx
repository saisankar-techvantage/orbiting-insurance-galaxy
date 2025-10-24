import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaDatabase, FaFileAlt } from "react-icons/fa";
import { SiProcessingfoundation } from "react-icons/si";

export default function DataFetchingPhase({ setPhase }) {
  const [progress, setProgress] = useState(0);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    // Simulated API Fetch (8 seconds total)
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setFetching(false);
          setTimeout(() => setPhase("upload"), 2000); // smoother transition
          return 100;
        }
        return p + 5;
      });
    }, 400);
    return () => clearInterval(timer);
  }, [setPhase]);

  return (
    <motion.div
      key="fetch"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-full flex flex-col justify-center items-center overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white"
    >
      {/* Glowing Background Grid */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Title */}
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-3xl font-semibold mb-10 tracking-wide text-blue-300"
      >
        AI Underwriting Assistant
      </motion.h2>

      {/* Core Layout */}
      <div className="relative flex justify-between items-center w-[600px] h-[280px]">
        {/* Left: PAS Server */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="relative">
            <FaDatabase className="text-blue-500 text-5xl mb-3" />
            <div className="absolute inset-0 blur-xl bg-blue-500 opacity-30 rounded-full" />
          </div>
          <p className="text-gray-300 text-sm">Policy Admininstration System</p>
        </motion.div>

        {/* Animated Data Tunnel */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: -30, y: -20 + i * 15, opacity: 0 }}
            animate={{
              x: fetching ? [0, 200, 280] : 280,
              y: [-20 + i * 15, -5 + i * 15, 0 + i * 15],
              opacity: [0, 1, 0],
            }}
            transition={{
              delay: i * 0.6,
              duration: 4,
              repeat: fetching ? Infinity : 0,
              repeatDelay: 1.2,
            }}
            className="absolute left-[150px] flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg shadow-md"
          >
            <FaFileAlt className="text-black text-sm" />
          </motion.div>
        ))}

        {/* AI Core */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, 5, -5, 0],
              boxShadow: [
                "0 0 0px rgba(59,130,246,0.6)",
                "0 0 25px rgba(59,130,246,0.9)",
                "0 0 10px rgba(59,130,246,0.7)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="relative w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 via-cyan-400 to-blue-700 flex items-center justify-center text-white text-4xl"
          >
            <SiProcessingfoundation />
            <div className="absolute inset-0 blur-2xl bg-blue-500 opacity-30 rounded-full" />
          </motion.div>
          <p className="text-gray-300 text-sm mt-3">Zentis</p>
        </motion.div>
      </div>

      {/* Progress Info */}
      <div className="mt-12 text-center">
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-blue-200 text-sm mb-3 tracking-wide"
        >
          {fetching
            ? "Synchronizing applicant data from Policy Administration System..."
            : "Data fetched successfully! Preparing for AI analysis..."}
        </motion.p>

        <div className="w-80 h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-400 to-cyan-400"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">{progress}%</p>
      </div>

      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-blue-500/10 to-transparent blur-3xl" />
    </motion.div>
  );
}
