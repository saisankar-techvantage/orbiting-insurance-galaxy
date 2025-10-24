import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import zentisLogo from "@/assets/logo_dark.png";

export default function UnderwritingCompletionPhase() {
  return (
    <motion.div
      key="underwritingCompletion"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] text-white overflow-hidden"
    >
      {/* Subtle background animation */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(34,197,94,0.15), transparent 70%)",
            "radial-gradient(circle at 60% 40%, rgba(59,130,246,0.15), transparent 70%)",
            "radial-gradient(circle at 50% 50%, rgba(34,197,94,0.15), transparent 70%)",
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      />

      {/* Zentis Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 p-3 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
          <img
            src={zentisLogo}
            alt="Zentis AI"
            className="w-full h-full object-contain rounded-full"
          />
        </div>

        <motion.h2
          className="mt-6 text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-300 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          Underwriting Completed
        </motion.h2>
      </motion.div>

      {/* Completion Badge */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 80 }}
        className="mt-6 flex items-center gap-2 text-green-400 text-lg font-semibold"
      >
        <FaCheckCircle className="text-2xl" />
        Zentis successfully completed the underwriting process seamlessly
      </motion.div>

      {/* Floating particles effect */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-green-400/40"
          initial={{
            x: Math.random() * window.innerWidth - window.innerWidth / 2,
            y: Math.random() * 600 - 300,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            y: [null, -400],
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}
