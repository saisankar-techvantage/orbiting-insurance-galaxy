import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import cosmicBg from "@/assets/cosmic-background.jpg";
import { FaFileCsv, FaFilePdf } from "react-icons/fa";

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
      const totalDuration = 3500 * 5 + 500; // processing duration
      const timer = setTimeout(() => setPhase("loading"), totalDuration);
      return () => clearTimeout(timer);
    }

    if (phase === "loading") {
      const loadTimer = setTimeout(() => setPhase("result"), 2000); // loading screen for 2s
      return () => clearTimeout(loadTimer);
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
                            <FaFilePdf className="text-red-500 text-lg" />
                            <span className="text-sm  text-black">{file}</span>
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

            {phase === "loading" && (
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
            )}

            {phase === "processing" && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col h-full text-gray-700 p-8 w-full"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                  <div className="font-semibold text-cyan-700 text-lg">
                    AI Core Analyzing Inputs...
                  </div>
                </div>

                {/* Processing Nodes */}
                <div className="flex flex-col gap-6 overflow-auto">
                  {[
                    {
                      title: "Customer Data Analysis",
                      desc: "Extracting key demographic and behavior attributes...",
                    },
                    {
                      title: "Financial Record Evaluation",
                      desc: "Analyzing transactions and validating income statements...",
                    },
                    {
                      title: "Behavioral Pattern Detection",
                      desc: "Identifying claim frequency and anomaly behaviors...",
                    },
                    {
                      title: "Underwriting Model Optimization",
                      desc: "Applying predictive algorithms to estimate risk class...",
                    },
                    {
                      title: "Generating Final AI Decision",
                      desc: "Compiling premium adjustments and recommendation report...",
                    },
                  ].map((node, index) => (
                    <ProcessingNode
                      key={index}
                      index={index}
                      title={node.title}
                      desc={node.desc}
                      activeDelay={index * 3500} // each node runs after the previous one
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {phase === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.97 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full flex flex-col text-gray-800 p-6 overflow-auto"
              >
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center justify-between mb-4"
                >
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
                </motion.div>

                {/* Result Cards */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 1 },
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
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
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default UnderwritingAIPlatform;

const ProcessingNode = ({ index, title, desc, activeDelay }) => {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setActive(true), activeDelay);
    return () => clearTimeout(startTimer);
  }, [activeDelay]);

  useEffect(() => {
    if (active) {
      let p = 0;
      const interval = setInterval(() => {
        p += 5;
        setProgress(p);
        if (p >= 100) {
          clearInterval(interval);
          setDone(true);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [active]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className={`relative flex items-start gap-4 p-4 rounded-xl border ${
        done
          ? "border-cyan-400 bg-cyan-50/60"
          : active
          ? "border-cyan-300 bg-white"
          : "border-gray-200 bg-gray-50"
      } shadow-sm`}
    >
      {/* Node Circle */}
      <motion.div
        animate={
          done
            ? { scale: [1, 1.3, 1], backgroundColor: "#22d3ee" }
            : active
            ? { scale: [1, 1.2, 1], backgroundColor: "#06b6d4" }
            : { backgroundColor: "#d1d5db" }
        }
        transition={{ repeat: active && !done ? Infinity : 0, duration: 1 }}
        className={`w-6 h-6 rounded-full mt-1 ${
          done ? "bg-cyan-400" : "bg-gray-300"
        }`}
      />

      {/* Content */}
      <div className="flex-1">
        <div className="font-semibold text-cyan-700">{title}</div>
        <div className="text-xs text-gray-500 mb-2">{desc}</div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <motion.div
            className="h-2 bg-cyan-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Status text */}
        <div className="text-xs mt-1 text-right font-medium">
          {done ? "✅ Completed" : active ? `${progress}%` : "Waiting..."}
        </div>
      </div>
    </motion.div>
  );
};
