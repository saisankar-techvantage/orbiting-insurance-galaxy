import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export default function UnderwritingInitPhase({ setPhase }) {
  const [message, setMessage] = useState("Initializing underwriting engine...");
  const [subStatus, setSubStatus] = useState([]);

  useEffect(() => {
    const messages = [
      "Loading policy risk matrix...",
      "Fetching customer historical data...",
      "Running predictive underwriting model...",
      "Calibrating AI confidence thresholds...",
      "Optimizing decision parameters...",
      "Underwriting system ready ✅",
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length) {
        setSubStatus((prev) => [...prev, messages[i]]);
        setMessage(messages[i]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setPhase("processing"), 1500); // move to next phase
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [setPhase]);

  return (
    <motion.div
      key="underwritingInitPhase"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#030712] to-[#0a1a2f] text-cyan-300 overflow-hidden"
    >
      {/* Background animation waves */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ y: [0, 20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-0 w-full h-[2px] bg-cyan-400/20"
        />
        <motion.div
          animate={{ y: [40, 0, 40], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 left-0 w-full h-[2px] bg-green-400/20"
        />
      </div>

      {/* AI Agent */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [1, 1.1, 1], opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity }}
        className="relative flex flex-col items-center"
      >
        <motion.div
          animate={{
            boxShadow: [
              "0 0 20px rgba(34,211,238,0.5)",
              "0 0 40px rgba(16,185,129,0.6)",
              "0 0 20px rgba(34,211,238,0.5)",
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-green-400 flex items-center justify-center"
        >
          <Bot className="text-black text-4xl" />
        </motion.div>

        {/* Speech bubble */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: -5 }}
          transition={{ duration: 0.8 }}
          className="relative mt-6"
        >
          <div
            className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 
            border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-cyan-400/50"
          />
          <div className="px-5 py-3 bg-cyan-900/20 border border-cyan-400/40 rounded-xl text-cyan-100 text-sm shadow-lg backdrop-blur-sm">
            Initialising Underwiting process...
          </div>
        </motion.div>
      </motion.div>

      {/* Scrolling text area below */}
      <div className="mt-10 w-[70%] h-40 bg-[#08121f] border border-cyan-500/30 rounded-lg overflow-hidden shadow-inner shadow-cyan-500/20 p-3 font-mono text-xs text-cyan-200/90">
        <div className="overflow-y-auto h-full space-y-1">
          {subStatus.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="flex items-center gap-2"
            >
              <span className="text-cyan-500">{">"}</span>
              <span>{line}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom loading bar */}
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "70%" }}
        transition={{ duration: 8, ease: "easeInOut" }}
        className="absolute bottom-10 h-1 rounded-full bg-gradient-to-r from-cyan-400 via-green-400 to-transparent"
      />
    </motion.div>
  );
}
