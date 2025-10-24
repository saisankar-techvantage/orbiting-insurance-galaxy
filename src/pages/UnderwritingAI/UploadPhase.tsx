import { useState } from "react";
import { motion } from "framer-motion";
import { FaFilePdf, FaUserCircle, FaFolder } from "react-icons/fa";
import { Bot } from "lucide-react";
import log_light from "@/assets/logo_light.png";

export default function UploadPhase({ setPhase }) {
  const [agentAction, setAgentAction] = useState("idle"); // idle | travelling | returning | done
  const [fetchedDocs, setFetchedDocs] = useState([]);
  const [processing, setProcessing] = useState(false);

  const documents = [
    "Applicant_Data.json",
    "KYC.pdf",
    "Medical_Summary.pdf",
    "Income_Certificate.csv",
  ];

  const handleAgentClick = () => {
    if (agentAction !== "idle") return;

    setAgentAction("travelling");

    // Agent travels to the right (touch Policy Admin)
    setTimeout(() => {
      setAgentAction("returning");
      setFetchedDocs(documents);
    }, 2500);

    // Agent comes back to Zentis
    setTimeout(() => {
      setAgentAction("done");
      setProcessing(true);
    }, 5000);
  };

  return (
    <motion.div
      key="uploadPhase"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* LEFT: Zentis */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute left-12 -translate-y-1/2 bg-gradient-to-br from-blue-950 via-blue-900 to-gray-900 rounded-2xl shadow-xl border border-blue-800/30 p-6 w-72 flex flex-col items-center"
      >
        <img
          src={log_light}
          alt="Zentis"
          className="w-16 h-16 object-contain mb-3"
        />
        <h3 className="text-blue-200 font-semibold text-lg mb-3">
          Zentis System
        </h3>

        {fetchedDocs.length === 0 ? (
          <p className="text-gray-400 text-sm text-center">
            Awaiting applicant data...
          </p>
        ) : (
          <div className="w-full">
            <div className="flex items-center gap-3 mb-4">
              <FaUserCircle className="text-blue-400 text-4xl" />
              <div>
                <h3 className="text-md font-semibold text-blue-200">
                  Applicant’s Data
                </h3>
                <p className="text-xs text-gray-400">Fetched Info</p>
              </div>
            </div>

            <div className="space-y-2">
              {documents.map((doc, i) => (
                <motion.div
                  key={doc}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.2 }}
                  className="flex items-center gap-2 bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-sm text-green-200 border-green-500/50 bg-green-500/20"
                >
                  <FaFilePdf className="text-red-400" />
                  <span className="truncate">{doc}</span>
                </motion.div>
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
          </div>
        )}
      </motion.div>

      {/* RIGHT: Policy Admin System */}
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        className="absolute right-12 -translate-y-1/2 bg-gradient-to-br from-cyan-900 via-blue-800 to-cyan-950 rounded-2xl shadow-lg border border-cyan-500/40 p-6 w-72 flex flex-col items-center"
      >
        <h3 className="text-blue-100 text-lg font-semibold mb-3 text-center">
          Policy Administration System
        </h3>

        <div className="grid grid-cols-3 gap-4 mt-2">
          {[...Array(9)].map((_, i) => {
            const isTargetFolder = i === 4; // middle folder = target
            const isActive = agentAction === "travelling" && isTargetFolder;
            const isPicked =
              agentAction === "returning" || agentAction === "done";

            return (
              <motion.div
                key={i}
                animate={{
                  scale: isActive ? [1, 1.2, 1] : 1,
                  opacity: isPicked && isTargetFolder ? 0.4 : 1,
                }}
                transition={{ duration: 0.6, repeat: isActive ? 2 : 0 }}
                className={`h-14 w-14 rounded-md flex items-center justify-center border ${
                  isTargetFolder
                    ? "border-yellow-400/60 bg-yellow-400/10"
                    : "border-gray-700 bg-gray-800/40"
                }`}
              >
                <FaFolder
                  className={`text-2xl ${
                    isTargetFolder
                      ? "text-yellow-400"
                      : "text-gray-400 opacity-80"
                  }`}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* CENTER: AI Agent */}
      <motion.div
        animate={{
          x:
            agentAction === "travelling"
              ? 600 // moves to right system
              : agentAction === "returning"
              ? 0 // returns to Zentis
              : 0,
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute left-[350px] bottom-[180px] flex flex-col items-center space-y-2"
      >
        <motion.div
          onClick={handleAgentClick}
          animate={{
            y: [0, -5, 0],
            scale: agentAction === "travelling" ? 1.15 : 1,
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg cursor-pointer ${
            agentAction === "done"
              ? "bg-gradient-to-br from-green-400 to-emerald-300"
              : "bg-gradient-to-br from-blue-400 to-cyan-300"
          }`}
        >
          <Bot className="text-black text-3xl" />
        </motion.div>

        {agentAction === "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-2 bg-white/10 border border-blue-300/30 backdrop-blur-md text-sm text-blue-100 rounded-xl shadow-lg text-center"
          >
            Click to fetch applicant data
          </motion.div>
        )}

        {agentAction === "travelling" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-cyan-200"
          >
            Fetching data...
          </motion.div>
        )}

        {agentAction === "done" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-green-300"
          >
            Data retrieved successfully!
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
