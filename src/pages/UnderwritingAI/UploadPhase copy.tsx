import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaFilePdf, FaUserCircle } from "react-icons/fa";
import { SiProcessingfoundation } from "react-icons/si";
import { Bot } from "lucide-react";
import log_light from "@/assets/logo_light.png";
import log_dark from "@/assets/logo_dark.png";

export default function UploadPhase({ setPhase }) {
  const [agentInCenter, setAgentInCenter] = useState(false);
  const [showSpeech, setShowSpeech] = useState(false);
  const [receivedDocs, setReceivedDocs] = useState([]);
  const [processing, setProcessing] = useState(false);

  const documents = [
    "income_certificate.csv",
    "KYC.pdf",
    "Medical_summary.pdf",
  ];

  useEffect(() => {
    // Only animation setup — no phase change here
    const timer1 = setTimeout(() => setAgentInCenter(true), 2000);
    const timer2 = setTimeout(() => setShowSpeech(true), 4000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleDragStart = (e, doc) => {
    e.dataTransfer.setData("doc", doc);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const doc = e.dataTransfer.getData("doc");
    if (!receivedDocs.includes(doc)) {
      setReceivedDocs((prev) => [...prev, doc]);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  useEffect(() => {
    if (receivedDocs.length === documents.length) {
      setShowSpeech(false);
      // Start processing after all docs received
      setTimeout(() => setProcessing(true), 1000);
    }
  }, [receivedDocs, documents.length]);

  return (
    <motion.div
      key="uploadPhase"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white"
    >
      {/* Subtle grid and glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Left: Applicant Data */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute left-8 -translate-y-1/2 bg-gradient-to-br from-blue-950 via-blue-900 to-gray-900 rounded-2xl shadow-xl border border-blue-800/30 p-6 w-64"
      >
        <div className="flex items-center gap-3 mb-4">
          <FaUserCircle className="text-blue-400 text-4xl" />
          <div>
            <h3 className="text-lg font-semibold text-blue-200">
              Applicant's Data
            </h3>
            <p className="text-xs text-gray-400">ID: #APL-2025-11</p>
          </div>
        </div>

        <div className="space-y-2">
          {documents.map((doc, i) => (
            <motion.div
              key={doc}
              draggable
              onDragStart={(e) => handleDragStart(e, doc)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.3 }}
              className={`flex items-center gap-2 bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-sm cursor-grab hover:bg-blue-900/30 transition ${
                receivedDocs.includes(doc)
                  ? "opacity-40 line-through text-gray-500"
                  : "text-gray-200"
              }`}
            >
              <FaFilePdf className="text-red-400" />
              <span className="truncate">{doc}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right: AI Core (Drop Target) */}
      <motion.div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        className={`absolute right-8 -translate-y-1/2 rounded-2xl shadow-lg border p-6 w-64 flex flex-col items-center transition-all ${
          processing
            ? "bg-gradient-to-br from-green-500/30 to-emerald-400/20 border-green-400/40"
            : "bg-gradient-to-br from-blue-800 via-cyan-700 to-blue-900 border-cyan-500/40"
        }`}
      >
        <div
          //transition={{ duration: 2.5, repeat: Infinity }}
          className={` flex items-center justify-center mb-4 overflow-hidden `}
        >
          <img
            src={log_light}
            alt="AI Agent"
            className="w-15 h-15 object-contain"
          />
        </div>

        {/* <h3 className="text-blue-100 text-lg font-semibold mb-2">Zentis</h3> */}

        <div className="space-y-2 text-sm text-gray-200 text-center w-full">
          {documents.map((doc) => (
            <div
              key={doc}
              className={`p-1 rounded-md border ${
                receivedDocs.includes(doc)
                  ? "border-green-400/50 bg-green-500/20 text-green-200"
                  : "border-gray-700 bg-gray-800/50 text-gray-400"
              }`}
            >
              {receivedDocs.includes(doc)
                ? `✅ ${doc}`
                : `Awaiting ${doc.split(".")[0]}...`}
            </div>
          ))}
        </div>

        {processing && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            onClick={() => setPhase("checking")}
            className="mt-5 px-5 py-2 bg-green-500 hover:bg-green-400 text-black rounded-sm font-semibold shadow-md transition"
          >
            Run Data Verification
          </motion.button>
        )}
      </motion.div>

      {/* AI Agent */}
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{
          x: agentInCenter ? 0 : 300,
          opacity: 1,
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute translate-x-1/2  flex flex-col items-center"
      >
        <motion.div
          animate={{
            y: [0, -5, 0],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 flex items-center justify-center shadow-lg"
        >
          <Bot className="text-black text-3xl" />
        </motion.div>

        {showSpeech && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative inline-block max-w-xs"
          >
            {/* Speech Bubble */}
            <div className="relative inline-block max-w-xs">
              {/* Tail (speech pointer pointing upward) */}
              <div
                className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 
        border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-blue-300/30"
              />

              <div className="px-5 py-3 bg-white/10 border border-blue-300/30 backdrop-blur-md text-sm text-blue-100 rounded-xl shadow-lg text-center">
                Please provide the applicant data for the underwriting process.
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
