import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import cosmicBg from "@/assets/cosmic-background.jpg";

const UnderwritingAIPlatform = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState("upload");
  const [logs, setLogs] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState({
    customer: null,
    financial: null,
    behavior: null,
  });

  const aiLogs = [
    "Initializing AI reasoning module...",
    "Reading customer data streams...",
    "Analyzing financial integrity...",
    "Evaluating behavioral patterns...",
    "Optimizing underwriting prediction model...",
    "Generating AI Decision Report...",
    "✅ Process completed successfully.",
  ];

  const panels = [
    {
      key: "customer",
      title: "Customer Data",
      files: [
        "Customer_Profile_1.csv",
        "Customer_Profile_2.csv",
        "Personal_Details.csv",
      ],
    },
    {
      key: "financial",
      title: "Financial Records",
      files: ["Income_Data.csv", "Tax_Statements.csv", "Credit_Score.csv"],
    },
    {
      key: "behavior",
      title: "Behavioral & Claims Data",
      files: ["Claim_History.csv", "Travel_Patterns.csv", "Health_Checks.csv"],
    },
  ];

  const allFilesSelected = Object.values(selectedFiles).every(Boolean);

  const sampleUser = {
    Name: "Rahul Mehta",
    Age: 42,
    Gender: "Male",
    "Health Condition": "Moderate",
    Duration: "5 years",
    Remark: "Frequent traveler with 2 minor claims",
    "Global Index": "IDX-7841",
    "Monthly Salary": "₹95,000",
    "Annual Income": "₹11,40,000",
    Designation: "Senior Analyst",
    "Risk Class": "B2 (Moderate Risk)",
    "Initial Premium": "₹28,500",
    "Underwriting Comments":
      "Slightly above-average claim probability due to travel patterns.",
    "Final Premium": "₹32,450",
    "Final Decision Comments": "Approved with adjusted premium",
  };

  useEffect(() => {
    if (phase === "processing") {
      setLogs([]);
      let i = 0;
      const interval = setInterval(() => {
        setLogs((prev) => [...prev, aiLogs[i]]);
        i++;
        if (i === aiLogs.length) {
          clearInterval(interval);
          setTimeout(() => setPhase("result"), 800);
        }
      }, 800);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const handleDragStart = (e, file, type) => {
    e.dataTransfer.setData("file", JSON.stringify({ file, type }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const { file, type } = JSON.parse(e.dataTransfer.getData("file"));
    setSelectedFiles((prev) => ({ ...prev, [type]: file }));
  };

  const handleDragOver = (e) => e.preventDefault();

  const startAnalysis = () => {
    setPhase("processing");
  };

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${cosmicBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 backdrop-blur-md" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-11/12 max-w-6xl h-[90vh] rounded-2xl overflow-hidden bg-white/90 shadow-[0_0_50px_rgba(0,0,0,0.25)] border border-gray-200 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-gray-100 to-gray-200 px-5 py-2 border-b border-gray-300">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 bg-red-500 rounded-full"
              onClick={() => navigate(-1)}
            />
            <div className="w-3 h-3 bg-yellow-400 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <div className="ml-3 font-semibold text-gray-700">
              Underwriting AI – Data Intelligence Console
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col items-center justify-center relative px-6">
          <AnimatePresence mode="wait">
            {phase === "upload" && (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex flex-col items-center"
              >
                {/* Top Panels */}
                <div className="flex justify-center gap-6 mb-16">
                  {panels.map((panel, i) => (
                    <motion.div
                      key={panel.key}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: i * 0.15 }}
                      className="w-56 bg-white rounded-xl shadow-md border border-gray-200 p-4 flex flex-col"
                    >
                      <div className="text-center text-cyan-600 font-semibold mb-2">
                        {panel.title}
                      </div>
                      <div className="flex-1 space-y-2 overflow-hidden">
                        {panel.files.map((file) => (
                          <motion.div
                            key={file}
                            draggable
                            onDragStart={(e) =>
                              handleDragStart(e, file, panel.key)
                            }
                            whileHover={{ scale: 1.03 }}
                            className="p-2 bg-gray-50 border border-gray-200 rounded-lg cursor-grab hover:shadow-md flex items-center gap-2"
                          >
                            📄 <span className="text-sm">{file}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Connecting Glow Lines */}
                <div className="absolute top-[38%] w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[2px]" />

                {/* AI Core */}
                <motion.div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className={`relative mt-10 flex flex-col items-center justify-center w-80 h-64 rounded-2xl border-2 border-dashed transition-all ${
                    allFilesSelected
                      ? "border-cyan-500 bg-cyan-50"
                      : "border-gray-300 bg-gray-100"
                  } shadow-lg`}
                >
                  {/* Glow Effect */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.5,
                      ease: "easeInOut",
                    }}
                    className="absolute w-64 h-64 rounded-full bg-cyan-300/30 blur-3xl"
                  />

                  <div className="z-10 text-center">
                    <div className="text-xl font-semibold text-cyan-700 mb-3">
                      AI Core System
                    </div>
                    <div className="space-y-2">
                      {Object.entries(selectedFiles).map(([key, val]) => (
                        <div
                          key={key}
                          className={`p-2 rounded-md text-sm font-medium ${
                            val
                              ? "bg-white text-cyan-700 border border-cyan-300"
                              : "bg-gray-50 text-gray-400 border border-gray-200"
                          }`}
                        >
                          {val ? `✅ ${val}` : `Awaiting ${key} file...`}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={startAnalysis}
                      disabled={!allFilesSelected}
                      className={`mt-6 px-5 py-2 rounded-lg font-semibold transition ${
                        allFilesSelected
                          ? "bg-cyan-600 text-white hover:bg-cyan-500 shadow-md"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {allFilesSelected
                        ? "Start AI Analysis"
                        : "Select 3 Files to Begin"}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {phase === "processing" && (
              <motion.div
                key="processing"
                className="flex flex-col gap-3 h-full text-gray-700 p-8 w-full"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                  <div className="font-semibold text-cyan-700">
                    AI Core Analyzing Inputs...
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-300 rounded-md p-4 font-mono text-xs flex-1 overflow-auto">
                  {logs.map((l, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-cyan-700 mb-1"
                    >
                      {l}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {phase === "result" && (
              <motion.div
                key="result"
                className="h-full flex flex-col text-gray-800 p-6 overflow-auto"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-lg font-semibold text-cyan-700">
                    AI Underwriting Results
                  </div>
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
                    ↺ Restart
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(sampleUser).map(([k, v]) => (
                    <div
                      key={k}
                      className="bg-gray-50 p-3 rounded-md border border-gray-200"
                    >
                      <div className="text-xs text-gray-500">{k}</div>
                      <div className="text-sm font-medium mt-1">{v}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default UnderwritingAIPlatform;
