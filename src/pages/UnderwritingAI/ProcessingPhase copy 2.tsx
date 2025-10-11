import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCogs, FaHeartbeat, FaUserCheck, FaShieldAlt } from "react-icons/fa";
import { CheckCircle2 } from "lucide-react";

export default function ProcessingPhase({ setPhase }) {
  const stages = [
    {
      key: "extract",
      label: "Extracting Medical & Financial Data",
      icon: <FaCogs />,
    },
    {
      key: "eligibility",
      label: "Running U/W Eligibility Rules",
      icon: <FaUserCheck />,
    },
    {
      key: "reinsurer",
      label: "Calling Reinsurer Rating API",
      icon: <FaHeartbeat />,
    },
    {
      key: "quote",
      label: "Generating Quote & Payment Simulation",
      icon: <FaCogs />,
    },
    {
      key: "aml",
      label: "Performing AML / Sanctions Screening",
      icon: <FaShieldAlt />,
    },
    {
      key: "final",
      label: "Issuing Final Underwriting Decision",
      icon: <FaUserCheck />,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const timers = [];
    stages.forEach((_, i) => {
      const timer = setTimeout(() => setActiveIndex(i), i * 2500);
      timers.push(timer);
    });

    const completeTimer = setTimeout(
      () => setPhase("loading"),
      stages.length * 2500 + 1000
    );
    timers.push(completeTimer);

    return () => timers.forEach(clearTimeout);
  }, [setPhase]);

  return (
    <motion.div
      key="processing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex flex-col items-center justify-center w-full h-full py-10"
    >
      {/* Glow Background */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute w-[40rem] h-[40rem] bg-cyan-200/20 rounded-full blur-3xl"
      />

      <div className="z-10 text-center mb-10">
        <h2 className="text-2xl font-semibold text-cyan-700">
          Underwriting AI – Analysis in Progress
        </h2>
        <p className="text-gray-600 mt-1">
          ZenPilot is processing your submitted data through multi-stage
          analysis...
        </p>
      </div>

      {/* Processing Track */}
      <div className="relative w-full max-w-3xl flex flex-col gap-4">
        {stages.map((stage, i) => (
          <motion.div
            key={stage.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: i <= activeIndex ? 1 : 0.5,
              y: 0,
              backgroundColor:
                i < activeIndex
                  ? "rgba(16,185,129,0.15)" // completed - soft green
                  : i === activeIndex
                  ? "rgba(6,182,212,0.15)" // current - cyan glow
                  : "rgba(243,244,246,1)", // pending
            }}
            transition={{ duration: 0.6 }}
            className={`flex items-center justify-between px-5 py-3 rounded-xl border shadow-sm ${
              i <= activeIndex ? "border-cyan-300" : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`text-xl ${
                  i < activeIndex
                    ? "text-emerald-500"
                    : i === activeIndex
                    ? "text-cyan-600"
                    : "text-gray-400"
                }`}
              >
                {stage.icon}
              </div>
              <span
                className={`text-base font-medium ${
                  i < activeIndex
                    ? "text-emerald-700"
                    : i === activeIndex
                    ? "text-cyan-700"
                    : "text-gray-500"
                }`}
              >
                {stage.label}
              </span>
            </div>
            {i < activeIndex && (
              <CheckCircle2 className="text-emerald-500 w-5 h-5" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Animated Line */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${((activeIndex + 1) / stages.length) * 100}%` }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 h-[3px] bg-gradient-to-r from-cyan-400 via-emerald-400 to-transparent rounded-full"
      />

      {/* Footer */}
      <div className="absolute bottom-10 text-sm text-gray-400">
        {activeIndex < stages.length - 1
          ? `Processing stage ${activeIndex + 1} of ${stages.length}...`
          : "Finalizing underwriting decision..."}
      </div>
    </motion.div>
  );
}
