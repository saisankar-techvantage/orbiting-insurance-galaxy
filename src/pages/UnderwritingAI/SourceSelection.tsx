import { useState } from "react";
import { motion } from "framer-motion";

export const SourceSelection = ({ onStart }) => {
  const [masterFiles, setMasterFiles] = useState([]);
  const [sources, setSources] = useState([
    { id: 1, name: "Claims Data.csv", type: "Claims", dragged: false },
    { id: 2, name: "Customer Records.xlsx", type: "Customer", dragged: false },
    { id: 3, name: "Policy Metadata.csv", type: "Policy", dragged: false },
  ]);

  const handleDragStart = (e, file) => {
    e.dataTransfer.setData("file", JSON.stringify(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = JSON.parse(e.dataTransfer.getData("file"));

    // Avoid duplicates
    if (!masterFiles.find((f) => f.id === dropped.id)) {
      setMasterFiles((prev) => [...prev, dropped]);
      setSources((prev) =>
        prev.map((s) => (s.id === dropped.id ? { ...s, dragged: true } : s))
      );
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const allFilesDropped = masterFiles.length === 3;

  return (
    <motion.div
      key="selection"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5 }}
      className="h-full w-full bg-gray-50 text-gray-800 p-8 flex flex-col"
    >
      <div className="text-2xl font-semibold text-cyan-700 mb-6">
        AI Underwriting Source Selection
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-4 gap-6 flex-1">
        {/* Source Columns */}
        {sources.map((source) => (
          <div
            key={source.id}
            draggable={!source.dragged}
            onDragStart={(e) => handleDragStart(e, source)}
            className={`border-2 border-dashed rounded-lg p-4 bg-white flex flex-col justify-between cursor-grab shadow-sm hover:shadow-md transition ${
              source.dragged ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <div>
              <div className="text-sm font-semibold">{source.type} Source</div>
              <div className="text-xs text-gray-500 mt-1">{source.name}</div>
            </div>
            {!source.dragged && (
              <div className="mt-4 text-center text-cyan-600 text-xs font-medium">
                Drag to Master →
              </div>
            )}
          </div>
        ))}

        {/* Master Column */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={`border-2 border-dashed rounded-lg p-6 bg-white shadow-inner flex flex-col items-center justify-between transition ${
            allFilesDropped ? "border-cyan-500 bg-cyan-50" : "border-gray-300"
          }`}
        >
          <div className="text-lg font-semibold text-gray-700 mb-4">
            Master Column
          </div>

          <div className="flex-1 flex flex-col items-center justify-center w-full gap-3">
            {masterFiles.length > 0 ? (
              masterFiles.map((file) => (
                <div
                  key={file.id}
                  className="px-3 py-1 bg-cyan-100 text-cyan-800 text-xs rounded-md w-2/3 text-center border border-cyan-200"
                >
                  {file.name}
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-sm text-center">
                Drag one file from each source
              </div>
            )}
          </div>

          <button
            onClick={onStart}
            disabled={!allFilesDropped}
            className={`mt-4 px-4 py-2 rounded-md text-sm font-semibold w-full transition ${
              allFilesDropped
                ? "bg-cyan-500 text-white hover:bg-cyan-400"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Start AI Analysis
          </button>
        </div>
      </div>
    </motion.div>
  );
};
