import { useState } from "react";
import { motion } from "framer-motion";
import { FaFilePdf } from "react-icons/fa";

export default function UploadPhaseMarine({
  selectedFiles,
  setSelectedFiles,
  setPhase,
}) {
  const panels = [
    {
      key: "financial",
      title: "KYC",
      files: ["Income_Data.csv", "Tax_Statements.csv", "Credit_Score.csv"],
    },
    {
      key: "landing",
      title: "Bill Of Lading",
      files: [
        "Shipment_Details.csv",
        "Consignment_Data.csv",
        "Port_Information.csv",
      ],
    },
    {
      key: "invoice",
      title: "Invoice",
      files: [
        "Billing_Summary.csv",
        "Payment_Records.csv",
        "Transaction_History.csv",
      ],
    },
    {
      key: "packing",
      title: "Packing List",
      files: [
        "Item_List.csv",
        "Cargo_Weights.csv",
        "Packaging_Details.csv",
      ],
    },
  ];

  const [draggingFile, setDraggingFile] = useState(null);
  const allFilesSelected = Object.values(selectedFiles).every(Boolean);

  // --- Drag & Drop Handlers ---
  const handleDragStart = (e, file, type) => {
    e.dataTransfer.setData("file", JSON.stringify({ file, type }));
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const { file, type } = JSON.parse(e.dataTransfer.getData("file"));
    setSelectedFiles((prev) => ({ ...prev, [type]: file }));
  };
  const handleDragOver = (e) => e.preventDefault();

  // --- Touch Handlers ---
  const handleTouchStart = (e, file, type) => {
    setDraggingFile({ file, type });
  };
  const handleTouchMove = (e) => e.preventDefault();
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

  const startAnalysis = () => setPhase("processing");

  return (
    <motion.div
      key="upload"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full flex flex-col justify-center items-center px-8"
    >
      <h2 className="text-2xl font-semibold text-gray-800 my-10">
        Upload Required Files
      </h2>

      {/* Main Layout */}
      <div className="flex justify-center items-center gap-6 w-full max-w-5xl">
        {/* File Panels */}
        <div className="flex gap-4">
          {panels.map((panel, i) => (
            <motion.div
              key={panel.key}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="w-48 bg-white rounded-xl shadow-sm border border-gray-200 p-3 flex flex-col"
            >
              <h3 className="text-center text-blue-600 font-medium mb-2">
                {panel.title}
              </h3>
              <div className="space-y-2 overflow-hidden">
                {panel.files.map((file) => (
                  <motion.div
                    key={file}
                    draggable
                    onDragStart={(e) => handleDragStart(e, file, panel.key)}
                    onTouchStart={(e) => handleTouchStart(e, file, panel.key)}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    whileHover={{ scale: 1.03 }}
                    className={`p-2 bg-gray-50 border border-gray-200 rounded-lg cursor-grab hover:bg-blue-50 flex items-center gap-2 transition ${draggingFile?.file === file ? "opacity-70 scale-105" : ""
                      }`}
                  >
                    <FaFilePdf className="text-red-500 text-lg" />
                    <span className="text-sm text-gray-800 truncate">
                      {file}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connection Line */}
        <div className="w-16 h-[2px] bg-gradient-to-r from-blue-200 via-blue-500 to-blue-200 rounded-full" />

        {/* AI Core */}
        <motion.div
          id="ai-drop-zone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={`relative w-72 p-3 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center ${allFilesSelected
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-gray-50"
            } shadow-sm`}
        >
          <div className="z-10 text-center">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">
              AI Core System
            </h3>

            <div className="space-y-2">
              {Object.entries(selectedFiles).map(([key, val]) => (
                <div
                  key={key}
                  className={`p-2 rounded-md text-sm font-medium ${val
                      ? "bg-white text-blue-700 border border-blue-200"
                      : "bg-gray-100 text-gray-400 border border-gray-200"
                    }`}
                >
                  {val ? `✅ ${val}` : `Awaiting ${key} file...`}
                </div>
              ))}
            </div>

            <button
              onClick={startAnalysis}
              disabled={!allFilesSelected}
              className={`mt-5 px-5 py-2 rounded-lg font-semibold transition ${allFilesSelected
                  ? "bg-blue-600 text-white hover:bg-blue-500 shadow-sm"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              {allFilesSelected
                ? "Start AI Analysis"
                : "Select 4 Files to Begin"}
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
