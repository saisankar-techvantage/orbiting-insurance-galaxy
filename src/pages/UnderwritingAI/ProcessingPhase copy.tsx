import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ProcessingPhase({ phase, setPhase }) {
  return (
    <motion.div
      key="processing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full text-gray-700 w-full py-10"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        <div className="font-semibold text-cyan-700 text-lg">
          AI Core Analyzing Inputs...
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {[
          {
            title: "Customer Data Analysis",
            desc: "Extracting key demographic and behavior attributes...",
          },
          {
            title: "Financial Record Evaluation",
            desc: "Analyzing transactions and validating income statements...",
          },
          {
            title: "Behavioral Pattern Detection",
            desc: "Identifying claim frequency and anomaly behaviors...",
          },
          {
            title: "Underwriting Model Optimization",
            desc: "Applying predictive algorithms to estimate risk class...",
          },
          {
            title: "Generating Final AI Decision",
            desc: "Compiling premium adjustments and recommendation report...",
          },
        ].map((node, index) => (
          <ProcessingNode
            key={index}
            index={index}
            title={node.title}
            desc={node.desc}
            activeDelay={index * 3500}
          />
        ))}
      </div>
    </motion.div>
  );
}

// --- Processing Node Component ---
const ProcessingNode = ({ index, title, desc, activeDelay }) => {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setActive(true), activeDelay);
    return () => clearTimeout(startTimer);
  }, [activeDelay]);

  useEffect(() => {
    if (active) {
      let p = 0;
      const interval = setInterval(() => {
        p += 5;
        setProgress(p);
        if (p >= 100) {
          clearInterval(interval);
          setDone(true);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [active]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className={`relative flex items-start gap-4 p-4 rounded-xl border ${
        done
          ? "border-cyan-400 bg-cyan-50/60"
          : active
          ? "border-cyan-300 bg-white"
          : "border-gray-200 bg-gray-50"
      } shadow-sm`}
    >
      <motion.div
        animate={
          done
            ? { scale: [1, 1.3, 1], backgroundColor: "#22d3ee" }
            : active
            ? { scale: [1, 1.2, 1], backgroundColor: "#06b6d4" }
            : { backgroundColor: "#d1d5db" }
        }
        transition={{ repeat: active && !done ? Infinity : 0, duration: 1 }}
        className={`w-6 h-6 rounded-full mt-1 ${
          done ? "bg-cyan-400" : "bg-gray-300"
        }`}
      />

      <div className="flex-1">
        <div className="font-semibold text-cyan-700">{title}</div>
        <div className="text-xs text-gray-600">{desc}</div>
        {active && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
            className="h-1 bg-cyan-400 rounded-full mt-2"
          />
        )}
      </div>
    </motion.div>
  );
};
