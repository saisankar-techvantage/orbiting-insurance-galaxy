import { motion } from "framer-motion";
import { DownloadIcon, ListRestartIcon } from "lucide-react";
import { sampleUser } from "@/utils/constants";

export default function ResultPhase({ setSelectedFiles, setPhase }) {
  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="h-full flex flex-col text-gray-800 p-6"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between mb-4 top-0 backdrop-blur z-10 py-2"
      >
        <div className="text-lg font-semibold text-cyan-700">
          AI Underwriting Results
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const blob = new Blob([JSON.stringify(sampleUser, null, 2)], {
                type: "application/json",
              });
              const link = document.createElement("a");
              link.href = URL.createObjectURL(blob);
              link.download = "AI_Underwriting_Results.json";
              link.click();
            }}
            className="text-xs px-3 py-1.5 bg-cyan-600 text-white rounded-md shadow-sm hover:bg-cyan-500 transition"
          >
            <DownloadIcon className="inline-block w-4 h-4 mr-1 -mt-1" />
          </motion.button>

          <button
            onClick={() => {
              setSelectedFiles({
                customer: null,
                financial: null,
                behavior: null,
              });
              setPhase("upload");
            }}
            className="text-xs text-cyan-600 hover:text-cyan-500"
          >
            <ListRestartIcon className="inline-block w-5 h-5" />
          </button>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 1 },
          visible: { transition: { staggerChildren: 0.05 } },
        }}
        className="grid grid-cols-2 gap-4"
      >
        {Object.entries(sampleUser).map(([k, v], i) => (
          <motion.div
            key={k}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, delay: i * 0.02 }}
            className="bg-gray-50 p-3 rounded-md border border-gray-200 hover:shadow-md transition"
          >
            <div className="text-xs text-gray-500">{k}</div>
            <div className="text-sm font-medium mt-1">{v}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
