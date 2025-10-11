import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  HeartPulse,
  CheckCircle,
  CreditCard,
  ShieldCheck,
  FileJson,
  UserCircle2,
  Send,
  History,
} from "lucide-react";
import Lottie from "lottie-react";
import extractionAnim from "@/assets/lottie/extraction.json";
import apiAnim from "@/assets/lottie/apiFlow.json";
import paymentAnim from "@/assets/lottie/paymentSuccess.json";

import decisionAnim from "@/assets/lottie/approval.json";
import auditAnim from "@/assets/lottie/audit.json";

import { Info } from "lucide-react";

export default function ProcessStageContent({ stepKey, manualStepCompletion }) {
  const [showAudit, setShowAudit] = useState(false);
  const [showRequest, setShowRequest] = useState(false);

  const auditEvents = [
    { time: "10:12 AM", event: "Document extraction completed" },
    { time: "10:14 AM", event: "Rule-based underwriting applied" },
    { time: "10:15 AM", event: "Reinsurer rating service call" },
    { time: "10:17 AM", event: "Quote calculation complete" },
    { time: "10:18 AM", event: "Payment validation successful" },
    { time: "10:20 AM", event: "AML screening and resolution complete" },
    { time: "10:22 AM", event: "Decision issued: Approved" },
  ];
  const fade = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  };

  // Reusable typewriter animation
  const TypeWriter = ({ text, delay = 100 }) => {
    const [displayText, setDisplayText] = useState("");
    useEffect(() => {
      let i = 0;
      const timer = setInterval(() => {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
        if (i >= text.length) clearInterval(timer);
      }, delay);
      return () => clearInterval(timer);
    }, [text, delay]);
    return <span>{displayText}</span>;
  };

  switch (stepKey) {
    // 🅰️ PROPOSAL INTAKE
    case "proposal":
      return (
        <motion.div {...fade} className="space-y-6 text-left">
          <h3 className="text-2xl font-semibold text-cyan-400 flex items-center gap-2">
            <FileText className="text-cyan-400" /> Proposal Intake
          </h3>

          <div className="grid grid-cols-2 gap-6">
            {/* Applicant Card */}
            <motion.div
              className="bg-[#1a223a] p-5 rounded-2xl border border-gray-700 shadow-lg"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <UserCircle2 size={40} className="text-cyan-400" />
                <div>
                  <p className="text-gray-100 font-medium text-lg">
                    Rahul Monen
                  </p>
                  <p className="text-gray-400 text-sm">Male, 44</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">Product: Term Life</p>
              <p className="text-gray-400 text-sm">Sum Assured: ₹50,00,000</p>
            </motion.div>

            {/* Document Tray */}
            <div className="bg-[#1a223a] p-5 rounded-2xl border border-gray-700 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-200 font-medium flex items-center gap-2">
                  <FileText size={18} /> KYC Document
                </span>
                <span className="text-gray-400 text-sm">PDF</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-200 font-medium flex items-center gap-2">
                  <HeartPulse size={18} /> Medical Report
                </span>
                <span className="text-gray-400 text-sm">Lab Report</span>
              </div>

              {/* <motion.button
                whileHover={{ scale: 1.05 }}
                className="mt-4 bg-cyan-600 text-white px-4 py-2 rounded-lg w-full"
                onClick={manualStepCompletion}
              >
                Pull from Proposal System
              </motion.button> */}

              <div className="mt-3 bg-[#101527] rounded-xl p-3 flex justify-center">
                <Lottie
                  animationData={extractionAnim}
                  loop
                  style={{ height: 120 }}
                />
              </div>

              <div className="text-sm text-gray-300 space-y-1 mt-3">
                <p>
                  <TypeWriter text="Age: 44" />
                </p>
                <p>
                  <TypeWriter text="Condition: Diabetes" />
                </p>
                <p>
                  <TypeWriter text="HbA1c: 7.1" />
                </p>
                <p>
                  <TypeWriter text="Duration: 5 years" />
                </p>
                <p>
                  <TypeWriter text="Medication: Metformin" />
                </p>
              </div>
            </div>
          </div>
          <motion.div
            className="mt-8 w-full h-2 bg-gray-700 rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={{
              width: "100%",
            }}
            transition={{
              duration: 5,
              delay: 0.8,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
              initial={{ x: "-100%" }}
              animate={{ x: ["-100%", "0%"] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>

          <p className="text-gray-400 text-sm italic">
            “Zen Pilot ingests proposal & medicals; normalizes features for
            underwriting.”
          </p>
        </motion.div>
      );

    // 🅱️ MEDICAL
    case "medical":
      return (
        <motion.div {...fade} className="text-center space-y-4">
          <h3 className="text-2xl font-semibold text-blue-400 flex items-center justify-center gap-2">
            <HeartPulse className="w-6 h-6" />
            Medical Data Extraction
          </h3>

          <p className="text-gray-400 text-sm mb-2">
            Extracting applicant’s medical conditions...
          </p>

          {/* 🧬 Animated Extraction Icons */}
          <div className="flex justify-center gap-6">
            {[FileText, HeartPulse].map((Icon, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 1, type: "spring" }}
              >
                <Icon size={40} className="text-blue-400" />
              </motion.div>
            ))}
          </div>

          {/* ✅ Status Message */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="text-blue-400 font-semibold mt-2"
          >
            Extraction in Progress...
          </motion.div>

          {/* 🌀 Loader Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center justify-center mt-3 space-y-2"
          >
            <div className="flex gap-2">
              {[0, 0.2, 0.4].map((delay, index) => (
                <motion.div
                  key={index}
                  className="w-2.5 h-2.5 bg-blue-400 rounded-full"
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.6,
                    delay,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
            <p className="text-gray-400 text-xs italic">
              Scanning health declarations, lab reports, and condition
              summaries...
            </p>
          </motion.div>

          {/* 🩺 Info Text */}
          <p className="text-gray-400 text-sm italic">
            “The system automatically identifies relevant medical conditions to
            streamline underwriting decisions.”
          </p>
        </motion.div>
      );

    // 🅱️ ELIGIBILITY
    case "eligibility":
      return (
        <motion.div {...fade} className="text-center space-y-4">
          <h3 className="text-2xl font-semibold text-green-400">
            U/W Eligibility Check
          </h3>
          <p className="text-gray-400 text-sm mb-2">
            Running U/W Eligibility Rules...
          </p>

          {/* ✅ Animated Check Icons */}
          <div className="flex justify-center gap-4">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 1, type: "spring" }}
              >
                <CheckCircle size={36} className="text-green-400" />
              </motion.div>
            ))}
          </div>

          {/* ✅ Status Message */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="text-green-400 font-semibold mt-2"
          >
            Policy Rules Passed ✅
          </motion.div>

          {/* ⚙️ Condition Checking Loader */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center justify-center mt-3 space-y-2"
          >
            <div className="flex gap-2">
              {[0, 0.2, 0.4].map((delay, index) => (
                <motion.div
                  key={index}
                  className="w-2.5 h-2.5 bg-green-400 rounded-full"
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.6,
                    delay,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
            <p className="text-gray-400 text-xs italic">
              Checking underwriting conditions...
            </p>
          </motion.div>

          {/* 📝 Info Text */}
          <p className="text-gray-400 text-sm italic">
            “Policy-level rules evaluated first to avoid unnecessary reinsurer
            calls.”
          </p>
        </motion.div>
      );

    // 🅲 REINSURER
    case "reinsurer":
      return (
        <motion.div {...fade} className="text-center space-y-6">
          <h3 className="text-2xl font-semibold text-amber-400 flex justify-center items-center gap-2">
            Reinsurer Rating
            <button
              onClick={() => setShowRequest(!showRequest)}
              className="text-gray-400 hover:text-amber-400 transition"
              title="View API Request"
            >
              <Info className="w-5 h-5" />
            </button>
          </h3>

          <Lottie animationData={apiAnim} loop style={{ height: 120 }} />

          {/* API Request Popover */}
          {showRequest && (
            <motion.div
              className="bg-[#111827] border border-gray-700 p-4 rounded-xl text-xs text-left text-gray-300 inline-block shadow-xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <pre className="font-mono text-green-400">
                {`POST /api/reinsurer/lookup
{
  "age": 45,
  "sum_assured": "50L",
  "bmi": 29.3,
  "medical_class": "II",
  "smoker": false
}`}
              </pre>
            </motion.div>
          )}

          {/* Streaming Response */}
          <motion.div
            className="bg-[#1a223a] p-5 rounded-xl border border-gray-700 inline-block text-sm text-gray-300 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <TypeWriter
              text={`{ "load": "15%", "risk_class": "Substandard B" }`}
            />
          </motion.div>

          {/* Animated Outcome Badge */}
          <motion.div
            className="bg-[#2e2b1f] inline-block px-4 py-2 rounded-full text-amber-300 font-semibold shadow-md"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2, type: "spring", stiffness: 100 }}
          >
            Substandard B — +15% Load
          </motion.div>

          {/* Narration Caption */}
          <p className="text-gray-400 text-sm italic mt-2">
            “Live lookup to reinsurer logic/table/calculator via API; result
            feeds into pricing.”
          </p>
        </motion.div>
      );

    // 🅳 QUOTE & PAYMENT
    case "quote":
      return (
        <motion.div {...fade} className="text-center space-y-5">
          <h3 className="text-2xl font-semibold text-fuchsia-400">
            Quote & Payment
          </h3>
          <div className="bg-gradient-to-br from-[#1a223a] to-[#2a1f3a] p-6 rounded-2xl border border-gray-700 max-w-sm mx-auto shadow-xl">
            <p className="text-gray-300">Base premium ₹22,000</p>
            <p className="text-gray-300">Load +15%</p>
            <motion.p
              className="text-2xl text-fuchsia-300 mt-2 font-semibold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              Final premium ₹25,300
            </motion.p>
          </div>
          {/* <div className="flex justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-fuchsia-600 text-white px-4 py-2 rounded-lg"
              onClick={manualStepCompletion}
            >
              Approve Quote
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg"
            >
              Recalculate
            </motion.button>
          </div> */}
          <div className="flex justify-center">
            <Lottie
              animationData={paymentAnim}
              loop={false}
              style={{ height: 100 }}
            />
          </div>
          <p className="text-gray-400 text-sm italic">
            “Once customer approves & pays, policy is bound subject to AML
            clearance.”
          </p>
        </motion.div>
      );

    // 🅴 AML / SANCTIONS
    case "aml":
      return (
        <motion.div {...fade} className="text-left space-y-8">
          {/* ================= Decision Card ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-[#141b2d] border border-gray-700 rounded-2xl p-6 text-gray-200 shadow-xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="text-green-400" />
              <h3 className="text-2xl font-semibold text-green-400">
                Decision: APPROVED ✅
              </h3>
            </div>

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium text-gray-400">Risk Class:</span>{" "}
                Substandard B
              </p>
              <p>
                <span className="font-medium text-gray-400">Load:</span> +15%
              </p>
              <p>
                <span className="font-medium text-gray-400">Premium:</span>{" "}
                ₹25,300
              </p>
              <p>
                <span className="font-medium text-gray-400">AML:</span> Cleared
                <span className="text-xs text-gray-500 ml-2">
                  (Audit ID: AML-LOG-99321)
                </span>
              </p>
            </div>

            <div className="flex justify-center mt-6">
              <Lottie
                animationData={decisionAnim}
                loop={false}
                style={{ height: 120 }}
              />
            </div>

            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <button className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                <FileText size={16} /> Email PDF
              </button>
              <button className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                <Send size={16} /> Send to Policy Admin
              </button>
              <button
                onClick={() => setShowAudit(true)}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                <History size={16} /> View Audit Trail
              </button>
            </div>
          </motion.div>

          {/* ================= Narration ================= */}
          <p className="text-gray-400 text-sm italic text-center">
            “Decision + audit trail, ready for handoff to PAS/Policy Admin.”
          </p>

          {/* ================= Audit Trail Modal ================= */}
          {showAudit && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-[#1b243c] p-6 rounded-2xl shadow-2xl w-[90%] max-w-lg border border-gray-700"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-rose-400 flex items-center gap-2">
                    <History /> Audit Trail
                  </h3>
                  <button
                    onClick={() => setShowAudit(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="bg-[#12182b] rounded-lg p-4 space-y-2 max-h-64 overflow-y-auto text-sm">
                  {auditEvents.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between border-b border-gray-700/50 pb-1"
                    >
                      <span className="text-gray-400">{item.time}</span>
                      <span className="text-gray-200">{item.event}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center mt-6">
                  <Lottie
                    animationData={auditAnim}
                    loop
                    style={{ height: 80 }}
                  />
                </div>

                <div className="flex justify-end mt-4">
                  <button className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                    Export Audit Log
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      );

    default:
      return null;
  }
}
