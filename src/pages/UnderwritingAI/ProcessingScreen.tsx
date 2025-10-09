import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const ProcessingScreen = ({ onComplete }) => {
  const [logs, setLogs] = useState([]);
  const aiLogs = [
    "Initializing risk evaluation modules...",
    "Reading input datasets...",
    "Extracting key underwriting features...",
    "Applying AI-based scoring model...",
    "Computing premium risk ratios...",
    "Finalizing assessment results...",
    "✅ Analysis complete!",
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLogs((prev) => [...prev, aiLogs[i]]);
      i++;
      if (i === aiLogs.length) {
        clearInterval(interval);
        setTimeout(onComplete, 1200); // proceed to result
      }
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      key="processing"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-full bg-gray-50 text-gray-800"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        <div className="text-lg font-semibold">
          Processing with AI Engine...
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-md p-4 w-2/3 max-h-[300px] overflow-auto text-xs font-mono shadow-inner">
        {logs.map((log, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="text-cyan-700 mb-1"
          >
            {log}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
