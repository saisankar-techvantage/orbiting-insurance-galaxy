// // import { motion } from 'framer-motion';
// // import { useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import cosmicBg from '@/assets/cosmic-background.jpg';

// // const UnderwritingAI = () => {
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     document.body.classList.remove('page-transition'); // cleanup after transition
// //   }, []);

// //   return (
// //     <div
// //       className="relative w-full h-screen flex flex-col items-center justify-center text-white overflow-hidden page-enter"
// //       style={{
// //         backgroundImage: `url(${cosmicBg})`,
// //         backgroundSize: 'cover',
// //         backgroundPosition: 'center',
// //       }}
// //     >
// //       {/* Cosmic overlay */}
// //       <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90 pointer-events-none" />

// //       {/* Animated Heading */}
// //       <motion.h1
// //         initial={{ opacity: 0, y: -40, scale: 0.9 }}
// //         animate={{ opacity: 1, y: 0, scale: 1 }}
// //         transition={{ duration: 0.8, ease: 'easeOut' }}
// //         className="text-6xl font-extrabold font-orbitron mb-8 z-10"
// //       >
// //         Underwriting AI
// //       </motion.h1>

// //       {/* Animated Description */}
// //       <motion.p
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ delay: 0.3, duration: 0.8 }}
// //         className="text-lg max-w-2xl text-center z-10"
// //       >
// //         Experience next-generation risk assessment with autonomous AI-driven underwriting.
// //       </motion.p>

// //       {/* Return button */}
// //       <motion.button
// //         whileHover={{ scale: 1.1 }}
// //         whileTap={{ scale: 0.95 }}
// //         onClick={() => navigate('/')}
// //         className="mt-12 px-8 py-3 bg-primary text-black font-bold rounded-xl shadow-lg hover:shadow-2xl transition"
// //       >
// //         Back to Solar System
// //       </motion.button>
// //     </div>
// //   );
// // };

// // export default UnderwritingAI;

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import cosmicBg from "@/assets/cosmic-background.jpg";

// // 🧩 Dummy data
// const sampleUser = {
//   name: "Rahul Mehta",
//   age: 42,
//   vehicleType: "Sedan",
//   claims: 2,
//   income: "₹12L",
//   riskScore: 78,
//   premium: "₹32,450",
// };

// const bulkData = [
//   { id: "C1023", age: 45, claims: 1, risk: 67, premium: 25300 },
//   { id: "C1024", age: 39, claims: 3, risk: 84, premium: 31750 },
//   { id: "C1025", age: 50, claims: 0, risk: 59, premium: 22800 },
//   { id: "C1026", age: 36, claims: 4, risk: 90, premium: 34500 },
//   { id: "C1027", age: 29, claims: 0, risk: 48, premium: 19800 },
// ];

// const aiLogs = [
//   "Initializing neural risk model...",
//   "Normalizing input features...",
//   "Evaluating claim patterns...",
//   "Applying predictive loss models...",
//   "Calculating premium recommendations...",
//   "✅ Risk Assessment Completed.",
// ];

// const UnderwritingAI = () => {
//   const navigate = useNavigate();
//   const [mode, setMode] = useState(null); // "single" | "bulk"
//   const [phase, setPhase] = useState("select"); // select | upload | processing | result
//   const [logs, setLogs] = useState([]);
//   const [logIndex, setLogIndex] = useState(0);

//   useEffect(() => {
//     document.body.classList.remove("page-transition");
//   }, []);

//   // Simulate AI processing logs
//   useEffect(() => {
//     if (phase === "processing") {
//       setLogs([]);
//       setLogIndex(0);
//       let i = 0;
//       const interval = setInterval(() => {
//         setLogs((prev) => [...prev, aiLogs[i]]);
//         i++;
//         if (i === aiLogs.length) {
//           clearInterval(interval);
//           setTimeout(() => setPhase("result"), 1200);
//         }
//       }, 800);
//       return () => clearInterval(interval);
//     }
//   }, [phase]);

//   const startProcessing = () => {
//     setPhase("processing");
//   };

//   return (
//     <div
//       className="relative w-full h-screen flex flex-col items-center justify-center text-white overflow-hidden"
//       style={{
//         backgroundImage: `url(${cosmicBg})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90 pointer-events-none" />

//       {/* Heading */}
//       <motion.h1
//         initial={{ opacity: 0, y: -40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="text-5xl font-orbitron font-extrabold mb-8 z-10"
//       >
//         Underwriting AI
//       </motion.h1>

//       {/* PHASE: Select Mode */}
//       <AnimatePresence mode="wait">
//         {phase === "select" && (
//           <motion.div
//             key="mode-select"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0 }}
//             className="z-10 flex flex-col items-center"
//           >
//             <p className="mb-6 text-lg">Choose data processing mode:</p>
//             <div className="flex gap-6">
//               <button
//                 onClick={() => {
//                   setMode("single");
//                   setPhase("upload");
//                 }}
//                 className="px-6 py-3 bg-primary text-black font-bold rounded-xl hover:scale-105 transition"
//               >
//                 🧍 Single User
//               </button>
//               <button
//                 onClick={() => {
//                   setMode("bulk");
//                   setPhase("upload");
//                 }}
//                 className="px-6 py-3 bg-secondary text-black font-bold rounded-xl hover:scale-105 transition"
//               >
//                 👥 Bulk Upload
//               </button>
//             </div>
//           </motion.div>
//         )}

//         {/* PHASE: Upload */}
//         {phase === "upload" && (
//           <motion.div
//             key="upload-phase"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0 }}
//             className="z-10 flex flex-col items-center"
//           >
//             <p className="mb-4 text-lg font-light">
//               Select a CSV file to begin analysis
//             </p>
//             <div className="bg-white/10 rounded-xl p-6 w-80 space-y-3">
//               {["user_profile_data.csv", "bulk_risk_portfolio.csv", "claims_history_2024.csv"].map(
//                 (file, idx) => (
//                   <motion.div
//                     key={file}
//                     whileHover={{ scale: 1.05 }}
//                     onClick={startProcessing}
//                     className="cursor-pointer bg-white/10 hover:bg-white/20 px-4 py-3 rounded-lg text-center font-medium"
//                   >
//                     {file}
//                   </motion.div>
//                 )
//               )}
//             </div>
//             <button
//               onClick={() => setPhase("select")}
//               className="mt-6 underline text-sm opacity-70 hover:opacity-100"
//             >
//               ← Back
//             </button>
//           </motion.div>
//         )}

//         {/* PHASE: Processing */}
//         {phase === "processing" && (
//           <motion.div
//             key="processing-phase"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="z-10 flex flex-col items-center"
//           >
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
//               className="w-16 h-16 border-4 border-t-primary border-gray-600 rounded-full mb-6"
//             />
//             <p className="mb-4 text-lg font-light">Analyzing data...</p>
//             <div className="bg-black/50 p-4 rounded-lg w-[360px] text-left text-sm font-mono h-40 overflow-y-auto border border-white/10">
//               {logs.map((log, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   className="text-primary mb-1"
//                 >
//                   {log}
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         )}

//         {/* PHASE: Result */}
//         {phase === "result" && (
//           <motion.div
//             key="result-phase"
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0 }}
//             className="z-10 flex flex-col items-center"
//           >
//             {mode === "single" ? (
//               <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md">
//                 <h3 className="text-2xl font-semibold mb-4">
//                   Analyzed User: {sampleUser.name}
//                 </h3>
//                 <table className="text-left text-sm">
//                   <tbody>
//                     {Object.entries(sampleUser).map(([k, v]) => (
//                       <tr key={k}>
//                         <td className="pr-4 py-1 capitalize opacity-70">{k}</td>
//                         <td className="py-1 font-medium">{v}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md w-[600px] max-h-[400px] overflow-y-auto">
//                 <table className="w-full text-sm text-left">
//                   <thead>
//                     <tr className="border-b border-white/10">
//                       <th className="py-2">Customer ID</th>
//                       <th>Age</th>
//                       <th>Claims</th>
//                       <th>Risk</th>
//                       <th>Premium (₹)</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {bulkData.map((row, i) => (
//                       <motion.tr
//                         key={row.id}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: i * 0.1 }}
//                         className={`${
//                           row.risk > 80
//                             ? "text-red-400"
//                             : row.risk > 65
//                             ? "text-yellow-300"
//                             : "text-green-400"
//                         }`}
//                       >
//                         <td className="py-2">{row.id}</td>
//                         <td>{row.age}</td>
//                         <td>{row.claims}</td>
//                         <td>{row.risk}</td>
//                         <td>{row.premium.toLocaleString()}</td>
//                       </motion.tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}

//             <button
//               onClick={() => setPhase("select")}
//               className="mt-8 px-6 py-2 bg-primary text-black font-bold rounded-xl hover:scale-105 transition"
//             >
//               Run New Analysis
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Back Button */}
//       <motion.button
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => navigate("/")}
//         className="absolute bottom-8 px-6 py-2 bg-primary text-black font-bold rounded-xl shadow-lg hover:shadow-2xl transition z-20"
//       >
//         Back to Solar System
//       </motion.button>
//     </div>
//   );
// };

// export default UnderwritingAI;
