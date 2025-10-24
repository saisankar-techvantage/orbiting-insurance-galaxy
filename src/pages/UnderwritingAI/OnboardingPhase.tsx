import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaFolder } from "react-icons/fa";
import { Bot } from "lucide-react";
import log_light from "@/assets/logo_light.png";

export default function SendToPolicySystem({ setPhase }) {
  const [agentAction, setAgentAction] = useState("idle"); // idle | travelling | returning | done
  const [packetSent, setPacketSent] = useState(false);

  const handleAgentClick = () => {
    if (agentAction !== "idle") return;

    setAgentAction("travelling");

    // Step 1: Travel to the right (Policy Admin)
    setTimeout(() => {
      setPacketSent(true); // Drop packet in Policy Admin
      setAgentAction("returning");
    }, 2500);

    // Step 2: Return to Zentis
    setTimeout(() => {
      setAgentAction("done");
    }, 5000);
  };

  // 🕒 Step 3: After completion, move to phase "completion"
  useEffect(() => {
    if (agentAction === "done") {
      const timeout = setTimeout(() => {
        setPhase?.("completion");
      }, 3500);
      return () => clearTimeout(timeout);
    }
  }, [agentAction, setPhase]);

  return (
    <motion.div
      key="sendPhase"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white"
    >
      {/* Background effects */}
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
        <h3 className="text-blue-200 font-semibold text-lg mb-3 text-center">
          Zentis System
        </h3>

        {agentAction === "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 w-full flex flex-col items-center"
          >
            <div className="flex items-center justify-center h-16 w-16 rounded-lg border border-blue-500/40 bg-blue-900/40 mb-2">
              <FaFolder className="text-blue-400 text-3xl" />
            </div>
            <p className="text-sm text-blue-200">Customer Data Packet</p>
          </motion.div>
        )}

        {(agentAction === "travelling" || agentAction === "returning") && (
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="text-gray-400 text-sm mt-6"
          >
            Sending data...
          </motion.div>
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
            const isTargetFolder = i === 4;
            const received = packetSent && isTargetFolder;
            return (
              <motion.div
                key={i}
                animate={{
                  scale: received ? [1, 1.2, 1] : 1,
                  opacity: received ? 1 : 0.9,
                }}
                transition={{ duration: 0.6 }}
                className={`h-14 w-14 rounded-md flex items-center justify-center border ${
                  isTargetFolder
                    ? received
                      ? "border-green-400/70 bg-green-500/20"
                      : "border-yellow-400/60 bg-yellow-400/10"
                    : "border-gray-700 bg-gray-800/40"
                }`}
              >
                <FaFolder
                  className={`text-2xl ${
                    isTargetFolder
                      ? received
                        ? "text-green-400"
                        : "text-yellow-400"
                      : "text-gray-400 opacity-80"
                  }`}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* CENTER: AI Agent (non-overlapping position) */}
      <motion.div
        animate={{
          x:
            agentAction === "travelling"
              ? 600 // move to right
              : agentAction === "returning"
              ? 0 // return left
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
            Click to send customer data
          </motion.div>
        )}
      </motion.div>

      {/* ✅ Final success message */}
      {agentAction === "done" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute text-center text-green-300 text-lg font-semibold px-6 py-3 bg-green-900/30 border border-green-400/40 rounded-xl backdrop-blur-md shadow-lg"
        >
          ✅ Successfully onboarded the customer to the Policy Administration
          System
        </motion.div>
      )}
    </motion.div>
  );
}
