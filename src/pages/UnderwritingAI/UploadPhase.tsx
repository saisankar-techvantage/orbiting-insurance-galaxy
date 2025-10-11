import { useState } from "react";
import { motion } from "framer-motion";
import { FaFilePdf } from "react-icons/fa";

export default function UploadPhase({
  selectedFiles,
  setSelectedFiles,
  setPhase,
}) {
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
  const [draggingFile, setDraggingFile] = useState(null);

  const allFilesSelected = Object.values(selectedFiles).every(Boolean);

  // --- Mouse-based Drag Handlers ---
  const handleDragStart = (e, file, type) => {
    e.dataTransfer.setData("file", JSON.stringify({ file, type }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const { file, type } = JSON.parse(e.dataTransfer.getData("file"));
    setSelectedFiles((prev) => ({ ...prev, [type]: file }));
  };

  const handleDragOver = (e) => e.preventDefault();

  // --- Touch-based Drag Simulation ---
  const handleTouchStart = (e, file, type) => {
    console.log("e", e);
    console.log("Touch start", file, type);
    setDraggingFile({ file, type });
  };

  const handleTouchMove = (e) => {
    console.log("Touch move", e);
    e.preventDefault();
  };

  const handleTouchEnd = (e) => {
    if (!draggingFile) return;

    const dropZone = document.elementFromPoint(
      e.changedTouches[0].clientX,
      e.changedTouches[0].clientY
    );

    if (dropZone && dropZone.id === "ai-drop-zone") {
      setSelectedFiles((prev) => ({
        ...prev,
        [draggingFile.type]: draggingFile.file,
      }));
    }

    setDraggingFile(null);
  };

  const startAnalysis = () => {
    setPhase("processing");
  };

  return (
    <motion.div
      key="upload"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full flex flex-col items-center"
    >
      {/* Panels */}
      <div className="flex justify-center gap-6 mb-16 flex-wrap">
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
                  onDragStart={(e) => handleDragStart(e, file, panel.key)}
                  onTouchStart={(e) => handleTouchStart(e, file, panel.key)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  whileHover={{ scale: 1.03 }}
                  className={`p-2 bg-gray-50 border border-gray-200 rounded-lg cursor-grab hover:shadow-md flex items-center gap-2 transition ${
                    draggingFile?.file === file ? "opacity-70 scale-105" : ""
                  }`}
                >
                  <FaFilePdf className="text-red-500 text-lg" />
                  <span className="text-sm text-black">{file}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Glow Line */}
      <div className="absolute top-[38%] w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[2px]" />

      {/* AI Core */}
      <motion.div
        id="ai-drop-zone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`relative mt-10 flex flex-col items-center justify-center w-80 h-64 rounded-2xl border-2 border-dashed transition-all ${
          allFilesSelected
            ? "border-cyan-500 bg-cyan-50"
            : "border-gray-300 bg-gray-100"
        } shadow-lg`}
      >
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
            {allFilesSelected ? "Start AI Analysis" : "Select 3 Files to Begin"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
