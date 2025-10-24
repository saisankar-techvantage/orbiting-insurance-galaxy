import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { FaCheckCircle } from "react-icons/fa";

export default function DataVerificationPhase({ setPhase }) {
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState("Initializing verification system...");
  const terminalRef = useRef(null);

  const logTemplates = [
    "Extracting metadata from document: {file}",
    "Analyzing OCR content checksum...",
    "Cross-validating policy ID and applicant profile...",
    "KYC validation passed ✅",
    "Income verification score: {score}",
    "Medical data integrity: {integrity}",
    "Comparing document signatures...",
    "No anomaly detected in field alignment.",
    "Hash verification successful.",
    "Identity mapping confidence: {confidence}",
    "AI Confidence level: {ai_conf}",
  ];

  const randomValue = () => {
    const randoms = [
      Math.floor(Math.random() * 1000),
      (Math.random() * 0.99 + 0.01).toFixed(2),
      "PASS",
      "OK",
      "True",
    ];
    return randoms[Math.floor(Math.random() * randoms.length)];
  };

  // Generate a random log line
  const generateLog = () => {
    const template =
      logTemplates[Math.floor(Math.random() * logTemplates.length)];
    return template
      .replace("{file}", `DOC_${Math.floor(Math.random() * 100)}.pdf`)
      .replace("{score}", (Math.random() * 100).toFixed(2))
      .replace("{integrity}", Math.random() > 0.2 ? "100%" : "97%")
      .replace("{confidence}", `${(Math.random() * 100).toFixed(1)}%`)
      .replace("{ai_conf}", (Math.random() * 99 + 1).toFixed(2));
  };

  useEffect(() => {
    let logInterval;
    let phaseTimeout;

    // Start printing logs gradually
    const startLogs = () => {
      logInterval = setInterval(() => {
        setLogs((prev) => [...prev.slice(-60), generateLog()]);
      }, 80);

      // Update status dynamically
      setTimeout(() => setStatus("Scanning document metadata..."), 2000);
      setTimeout(
        () => setStatus("Performing deep field verification..."),
        5000
      );
      setTimeout(
        () => setStatus("Cross-validating KYC and medical data..."),
        7500
      );
      setTimeout(() => setStatus("Check for data missing..."), 9500);
      setTimeout(() => setStatus("Verification complete ✅"), 11500);

      // Move to next phase
      phaseTimeout = setTimeout(() => {
        clearInterval(logInterval);
        setPhase("init");
      }, 12500);
    };

    startLogs();
    return () => {
      clearInterval(logInterval);
      clearTimeout(phaseTimeout);
    };
  }, [setPhase]);

  // Auto-scroll terminal down as new logs come in
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <motion.div
      key="dataVerificationPhase"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-full flex items-center justify-center bg-black text-green-400 font-mono overflow-hidden"
    >
      {/* Terminal Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.1)_0%,transparent_70%)]" />

      {/* Left: Terminal Window */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute left-10 -translate-y-1/2 w-[55%] h-[70%] bg-[#0a0a0a] border border-green-500/40 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(34,197,94,0.4)]"
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-2 bg-green-950/50 border-b border-green-800/50 text-sm text-green-300">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-3 font-semibold">AI Verification Terminal</span>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalRef}
          className="p-3 text-xs h-[calc(100%-32px)] overflow-y-auto scrollbar-thin scrollbar-thumb-green-700/50 scrollbar-track-transparent"
        >
          {logs.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap">
              <span className="text-green-500">zen@pilot:</span>{" "}
              <span className="text-green-300">{line}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right: AI Agent */}
      <motion.div
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute right-10 flex flex-col items-center"
      >
        {/* Agent glow animation */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 0 15px rgba(34,197,94,0.4)",
              "0 0 35px rgba(59,130,246,0.7)",
              "0 0 15px rgba(34,197,94,0.4)",
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-cyan-400 flex items-center justify-center"
        >
          <Bot className="text-black text-3xl" />
        </motion.div>

        {/* Speech Bubble */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: -5 }}
          transition={{ duration: 0.8 }}
          className="relative mt-4"
        >
          <div
            className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 
            border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-green-400/40"
          />
          <div className="px-5 py-3 bg-green-900/30 border border-green-400/40 rounded-xl text-green-200 text-sm shadow-lg backdrop-blur-sm">
            {status}
          </div>
        </motion.div>

        {status.includes("complete") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-green-400 flex items-center gap-2 font-semibold"
          >
            <FaCheckCircle /> All Documents Verified
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
