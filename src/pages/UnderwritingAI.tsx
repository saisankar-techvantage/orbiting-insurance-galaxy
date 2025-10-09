import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import cosmicBg from "@/assets/cosmic-background.jpg";

const UnderwritingAI = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("single");
  const [phase, setPhase] = useState("upload");
  const [logs, setLogs] = useState([]);
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const dropRef = useRef(null);

  const aiLogs = [
    "Initializing risk assessment engines...",
    "Parsing applicant data...",
    "Extracting income, health and behavioral metrics...",
    "Applying risk evaluation models...",
    "Computing dynamic premium adjustment...",
    "Generating underwriting decision...",
    "✅ Assessment completed successfully.",
  ];

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

  const bulkData = [
    {
      Name: "Amit Sharma",
      Age: 39,
      Gender: "Male",
      "Health Condition": "Good",
      Duration: "3 years",
      Remark: "Low claim frequency",
      "Global Index": "IDX-9021",
      "Monthly Salary": "₹1,10,000",
      "Annual Income": "₹13,20,000",
      Designation: "Manager",
      "Risk Class": "B1",
      "Initial Premium": "₹25,000",
      "Underwriting Comments": "Stable profile with low risk.",
      "Final Premium": "₹27,200",
      "Final Decision Comments": "Approved",
    },
    {
      Name: "Neha Verma",
      Age: 34,
      Gender: "Female",
      "Health Condition": "Excellent",
      Duration: "7 years",
      Remark: "No previous claims",
      "Global Index": "IDX-8934",
      "Monthly Salary": "₹1,25,000",
      "Annual Income": "₹15,00,000",
      Designation: "Consultant",
      "Risk Class": "A1",
      "Initial Premium": "₹22,000",
      "Underwriting Comments": "Perfect health and zero claims history.",
      "Final Premium": "₹23,100",
      "Final Decision Comments": "Approved (Preferred Rate)",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.classList.remove("page-transition");
    }, 700);
    return () => clearTimeout(timer);
  }, []);

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
      }, 700);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const handleFile = (f) => setFile(f);
  const startProcessing = () => file && setPhase("processing");

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center text-gray-800 overflow-hidden"
      style={{
        backgroundImage: `url(${cosmicBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-2xl" />

      {/* Application window (Light theme) */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-11/12 max-w-6xl h-[85vh] rounded-2xl overflow-hidden bg-gray-100 shadow-[0_0_40px_rgba(0,0,0,0.8)]"
      >
        {/* App Header Bar */}
        <div className="flex items-center justify-between bg-gradient-to-r from-gray-200 to-gray-300 px-4 py-2 border-b border-gray-300">
          <div className="flex items-center gap-2">
            <div className="flex gap-2 items-center">
              {/* Red - Close */}
              <button
                onClick={() => navigate("/")}
                className="w-4 h-4 flex items-center justify-center bg-red-500 rounded-full hover:bg-red-600 transition"
                title="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-2.5 h-2.5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Yellow - Minimize */}
              <button
                className="w-4 h-4 flex items-center justify-center bg-yellow-400 rounded-full hover:bg-yellow-500 transition"
                title="Minimize"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 text-black"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="M5 12h14" />
                </svg>
              </button>

              {/* Green - Expand */}
              <button
                className="w-4 h-4 flex items-center justify-center bg-green-500 rounded-full hover:bg-green-600 transition"
                title="Expand"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-2.5 h-2.5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="M8 16l8-8M16 8v8H8" />
                </svg>
              </button>
            </div>

            <div className="ml-3 text-sm text-gray-700 font-semibold">
              Underwriting AI — Risk Engine
            </div>
          </div>

          {/* <button
            onClick={() => navigate("/")}
            className="text-xs text-gray-500 hover:text-gray-700 transition"
          >
            ⤺ Exit to Solar System
          </button> */}
        </div>

        {/* App Body */}
        <div className="flex h-full bg-white">
          {/* Sidebar */}
          <div className="w-1/3 border-r border-gray-200 p-5 flex flex-col gap-4 bg-gray-50">
            <div className="text-lg font-semibold text-gray-800">
              Upload Dataset
            </div>

            {/* Mode Selector */}
            <div className="flex gap-3 text-sm">
              <label
                className={`px-3 py-1 rounded-lg cursor-pointer ${
                  mode === "single"
                    ? "bg-cyan-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <input
                  type="radio"
                  hidden
                  checked={mode === "single"}
                  onChange={() => setMode("single")}
                />
                Single
              </label>
              <label
                className={`px-3 py-1 rounded-lg cursor-pointer ${
                  mode === "bulk"
                    ? "bg-cyan-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <input
                  type="radio"
                  hidden
                  checked={mode === "bulk"}
                  onChange={() => setMode("bulk")}
                />
                Bulk
              </label>
            </div>

            {/* Drag & Drop Area */}
            <div
              ref={dropRef}
              className={` border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center transition ${
                isDragging
                  ? "border-cyan-500 bg-cyan-50"
                  : "border-gray-300 bg-white"
              }`}
            >
              <input
                id="fileInput"
                type="file"
                accept=".csv,.xlsx"
                onChange={(e) => handleFile(e.target.files[0])}
                className="hidden"
              />
              <label htmlFor="fileInput" className="cursor-pointer">
                <div className="text-5xl mb-2">📂</div>
                {!file ? (
                  <>
                    <div className="font-medium text-gray-700">
                      Drag & drop CSV here
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      or click to browse
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-cyan-600 font-semibold">
                      {file.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {(file.size / 1024).toFixed(1)} KB
                    </div>
                  </>
                )}
              </label>
            </div>

            <button
              onClick={startProcessing}
              disabled={!file}
              className={`mt-4 px-4 py-2 rounded-md text-sm font-semibold ${
                file
                  ? "bg-cyan-500 text-white hover:bg-cyan-400"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Start Processing
            </button>
          </div>

          {/* Main Workspace */}
          <div className="w-2/3 p-6 overflow-auto">
            <AnimatePresence mode="wait">
              {phase === "upload" && (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center justify-center h-full text-center text-gray-700"
                >
                  <div className="text-3xl font-bold mb-2 text-cyan-600">
                    Underwriting AI
                  </div>
                  <div className="text-sm text-gray-500">
                    Upload your insurance dataset to simulate AI-driven risk
                    assessment.
                  </div>
                </motion.div>
              )}

              {phase === "processing" && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-3 h-full text-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                    <div className="font-semibold">
                      Processing with AI Engine...
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col text-gray-800"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-lg font-semibold">
                      Underwriting Results
                    </div>
                    <button
                      onClick={() => setPhase("upload")}
                      className="text-xs text-cyan-600 hover:text-cyan-500"
                    >
                      ↺ New Upload
                    </button>
                  </div>

                  {mode === "single" ? (
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
                  ) : (
                    <div className="overflow-auto border border-gray-300 rounded-md">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="bg-gray-100 text-left">
                            {Object.keys(bulkData[0]).map((h) => (
                              <th key={h} className="px-3 py-2 font-semibold">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {bulkData.map((row, i) => (
                            <tr key={i} className="odd:bg-gray-50">
                              {Object.values(row).map((v, j) => (
                                <td
                                  key={j}
                                  className="px-3 py-2 border-t border-gray-200"
                                >
                                  {v}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UnderwritingAI;
