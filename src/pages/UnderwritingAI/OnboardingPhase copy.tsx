import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaDatabase, FaCheckCircle } from "react-icons/fa";
import { SiGoogledatastudio } from "react-icons/si";
import { IoMdSend } from "react-icons/io";
import logoLight from "@/assets/logo_light.png";

export default function CustomerOnboardingPhase({ setPhase }) {
  const [stage, setStage] = useState("bundling");

  useEffect(() => {
    const sequence = [
      { t: 0, s: "bundling" },
      { t: 3000, s: "sending" },
      { t: 6000, s: "saving" },
      { t: 9000, s: "complete" },
    ];

    sequence.forEach(({ t, s }) => setTimeout(() => setStage(s), t));
    const end = setTimeout(() => setPhase("completion"), 11000);

    return () => clearTimeout(end);
  }, [setPhase]);

  return (
    <motion.div
      key="customerOnboardingPhase"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#030712] to-[#0f172a] text-white overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)]" />

      {/* Title */}
      <h2 className="text-2xl font-semibold text-cyan-400 mb-8">
        Customer Onboarding to Policy Administration System
      </h2>

      <div className="flex items-center justify-between w-[70%] max-w-5xl relative">
        {/* Left: Customer Data Bundle */}
        <motion.div
          animate={{
            y: stage === "bundling" ? [0, -5, 0] : 0,
            scale: stage === "bundling" ? [1, 1.05, 1] : 1,
          }}
          transition={{
            duration: 1.5,
            repeat: stage === "bundling" ? Infinity : 0,
          }}
          className="flex flex-col items-center p-4"
        >
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-[0_0_25px_rgba(59,130,246,0.5)] mb-3">
            <img
              src={logoLight}
              alt="AI Agent"
              //className="w-10 h-10 rounded-full object-cover border border-white/30"
            />
          </div>
          <p className="text-sm text-gray-300">Customer Data Bundle</p>
        </motion.div>

        {/* Center: Transfer Animation */}
        <div className="relative flex-1 flex items-center justify-center">
          {/* Data stream path */}
          <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-full opacity-40" />

          {/* Moving packet */}
          {stage === "sending" && (
            <motion.div
              initial={{ x: "-40%" }}
              animate={{ x: "40%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
              className="absolute w-10 h-10 rounded-full bg-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.8)]"
            >
              <IoMdSend className="text-black text-2xl" />
            </motion.div>
          )}

          {/* Center AI bubble */}
          {/* <motion.div
            animate={{
              scale: stage === "sending" ? [1, 1.15, 1] : [1, 1.05, 1],
              boxShadow:
                stage === "sending"
                  ? [
                      "0 0 25px rgba(34,211,238,0.8)",
                      "0 0 40px rgba(34,197,94,0.8)",
                      "0 0 25px rgba(34,211,238,0.8)",
                    ]
                  : ["0 0 15px rgba(34,211,238,0.5)"],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-green-400 flex items-center justify-center overflow-hidden"
          >
            <img
              src={logoLight}
              alt="AI Agent"
              className="w-10 h-10 rounded-full object-cover border border-white/30"
            />
          </motion.div> */}
        </div>

        {/* Right: Policy Administration System */}
        <motion.div
          animate={{
            scale: stage === "saving" ? [1, 1.1, 1] : 1,
            y: stage === "saving" ? [0, -4, 0] : 0,
          }}
          transition={{
            duration: 1.5,
            repeat: stage === "saving" ? Infinity : 0,
          }}
          className="flex flex-col items-center"
        >
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center shadow-[0_0_25px_rgba(34,197,94,0.5)] mb-3">
            <FaDatabase className="text-3xl text-white" />
          </div>
          <p className="text-sm text-gray-300">Policy Administration System</p>
        </motion.div>
      </div>

      {/* Folder Save Animation */}
      {stage === "saving" && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-10 bg-[#1a1c2a] p-4 rounded-xl border border-green-500/40 text-green-400 font-mono text-sm shadow-lg"
        >
          <p>{`Saving customer bundle → /system/data/customers/`}</p>
        </motion.div>
      )}

      {/* Completion */}
      {stage === "complete" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-8 text-green-400 flex items-center gap-2 text-lg font-semibold"
        >
          <FaCheckCircle /> Customer Onboarded Successfully
        </motion.div>
      )}
    </motion.div>
  );
}
