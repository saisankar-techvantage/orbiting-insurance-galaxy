import { motion } from "framer-motion";

export const ResultScreen = ({ onRestart }) => {
  const sampleResult = {
    Name: "Rahul Mehta",
    Age: 42,
    Gender: "Male",
    Health: "Moderate",
    Income: "₹11,40,000 / year",
    RiskScore: "B2 (Moderate Risk)",
    InitialPremium: "₹28,500",
    AdjustedPremium: "₹32,450",
    Decision: "✅ Approved with adjusted premium",
  };

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
      className="h-full flex flex-col bg-gray-50 text-gray-800 p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="text-2xl font-semibold text-cyan-700">
          Underwriting Results
        </div>
        <button
          onClick={onRestart}
          className="px-3 py-1 text-sm font-medium text-cyan-600 hover:text-cyan-700 hover:underline"
        >
          ↺ New Analysis
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(sampleResult).map(([key, value]) => (
          <div
            key={key}
            className="bg-white border border-gray-200 rounded-md p-3 shadow-sm"
          >
            <div className="text-xs text-gray-500">{key}</div>
            <div className="text-sm font-medium mt-1">{value}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={() => alert("Downloading report...")}
          className="px-4 py-2 bg-cyan-500 text-white text-sm rounded-md hover:bg-cyan-400"
        >
          ⬇ Download Report
        </button>
      </div>
    </motion.div>
  );
};
