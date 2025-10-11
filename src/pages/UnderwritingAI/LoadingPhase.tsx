import { motion } from "framer-motion";

export default function LoadingPhase({ phase, setPhase }) {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center h-full text-cyan-700 p-8"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
        className="w-14 h-14 border-4 border-cyan-400 border-t-transparent rounded-full mb-6"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          repeatType: "reverse",
        }}
        className="text-lg font-semibold"
      >
        Compiling AI Decision Results...
      </motion.div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 2 }}
        className="w-64 h-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full mt-6 overflow-hidden"
      />
    </motion.div>
  );
}
