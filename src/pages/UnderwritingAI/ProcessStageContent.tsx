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
  Loader2,
  DollarSign,
  ClipboardList,
} from "lucide-react";
import Lottie from "lottie-react";
import extractionAnim from "@/assets/lottie/extraction.json";
import apiAnim from "@/assets/lottie/apiFlow.json";
import paymentAnim from "@/assets/lottie/paymentSuccess.json";

import decisionAnim from "@/assets/lottie/approval.json";
import auditAnim from "@/assets/lottie/audit.json";

import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProcessStageContent({
  setPhase,
  stepKey,
  manualStepCompletion,
}) {
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
  const TypeWriterPlain = ({ text, speed = 50, startDelay = 0 }) => {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
      const startTimeout = setTimeout(() => {
        let i = 0;
        const timer = setInterval(() => {
          setDisplayText((prev) => prev + text.charAt(i));
          i++;
          if (i >= text.length) clearInterval(timer);
        }, speed);
      }, startDelay);

      return () => clearTimeout(startTimeout);
    }, [text, speed, startDelay]);

    return <span className="font-bold font-45">{displayText}</span>;
  };

  // Reusable typewriter animation
  const TypeWriter = ({ text, speed = 50, startDelay = 0 }) => {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
      const startTimeout = setTimeout(() => {
        let i = 0;
        const timer = setInterval(() => {
          setDisplayText((prev) => prev + text.charAt(i));
          i++;
          if (i >= text.length) clearInterval(timer);
        }, speed);
      }, startDelay);

      return () => clearTimeout(startTimeout);
    }, [text, speed, startDelay]);

    return (
      <span className="text-xl sm:text-xl md:text-xl font-extrabold text-gray-900 tracking-tight leading-snug">
        {displayText}
      </span>
    );
  };

  const [step, setStep] = useState(4); // start from Tap 4
  const [finalPremium, setFinalPremium] = useState(null);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const basePremium = 22000;
  const loadPercent = 15;

  const calculatePremium = () => {
    return Math.round(basePremium * (1 + loadPercent / 100));
  };

  const handleGenerateQuote = () => {
    setFinalPremium(calculatePremium());
  };

  const handleApprovePayment = () => {
    setStep(5);
  };

  const [showPaymentFlow, setShowPaymentFlow] = useState(false);
  const [paymentStage, setPaymentStage] = useState(null); // "sending" | "waiting" | "received"

  useEffect(() => {
    if (showPaymentFlow) {
      setPaymentStage(null); // start fresh
      // Step 1: Sending
      setTimeout(() => setPaymentStage("waiting"), 2000);
      // Step 2: Waiting → Received
      setTimeout(() => setPaymentStage("received"), 6000);
      // Step 3: Move to next step
      setTimeout(() => {
        setShowPaymentFlow(false);
        setPhase("onboarding");
        //manualStepCompletion(); // go to next phase
      }, 8000);
    }
  }, [showPaymentFlow]);

  switch (stepKey) {
    // 🅰️ PROPOSAL INTAKE
    case "proposal":
      return (
        <motion.div
          {...fade}
          className="bg-white text-gray-800 px-8 py-5 rounded-2xl shadow-lg border border-gray-200 space-y-3"
        >
          {/* Header */}
          <div className="flex items-center ">
            <FileText className="text-cyan-500" size={26} />
            <h3 className="text-2xl font-semibold text-cyan-600">
              Proposal Intake
            </h3>
          </div>
          {/* Progress + Footer */}
          <div className="space-y-3">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
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
            </div>
            <p className="text-gray-500 text-sm italic text-center">
              Zen Pilot ingests proposal & medical data; normalizes features for
              underwriting.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Applicant Info */}
            <motion.div
              className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
              initial={{ scale: 0.97 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <UserCircle2 size={48} className="text-cyan-500" />
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    Rahul Monen
                  </p>
                  <p className="text-sm text-gray-500">Male, 44</p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  Product:{" "}
                  <span className="font-medium text-gray-900">Term Life</span>
                </p>
                <p>
                  Sum Assured:{" "}
                  <span className="font-medium text-gray-900">₹50,00,000</span>
                </p>
              </div>
            </motion.div>

            {/* Document Tray */}
            <motion.div
              className="lg:col-span-2 bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between border-b pb-2">
                <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FileText className="text-cyan-500" size={20} /> Document Tray
                </h4>
                <span className="text-xs text-gray-500">Auto Extract Mode</span>
              </div>

              {/* Animation + Extraction Info */}
              <div className="grid sm:grid-cols-2 gap-4 items-center mt-4">
                {/* KYC Document */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-medium text-gray-800">
                      <FileText size={18} className="text-cyan-500" /> KYC
                      Document
                    </span>
                  </div>
                </div>

                {/* Medical Report */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-medium text-gray-800">
                      <HeartPulse size={18} className="text-pink-500" /> Medical
                      Report
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-1 text-sm text-gray-700 leading-relaxed">
                <p>
                  Age: <TypeWriter text="444" startDelay={0} />
                </p>
                <p>
                  Condition: <TypeWriter text="Diiabetes" startDelay={1000} />
                </p>
                <p>
                  HbA1c: <TypeWriter text="7..1" startDelay={2000} />
                </p>
                <p>
                  Duration: <TypeWriter text="5  years" startDelay={3000} />
                </p>
                <p>
                  Medication: <TypeWriter text="Meetformin" startDelay={4000} />
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      );

    // 🅱️ MEDICAL
    case "medical":
      return (
        <motion.div {...fade} className="text-center space-y-4 w-50">
          <h3 className="text-2xl font-semibold text-blue-400 flex items-center justify-center gap-2">
            <HeartPulse className="w-6 h-6" />
            Medical Data Extraction
          </h3>

          <p className="text-gray-400 text-sm mb-2">
            Extracting applicant’s medical conditions...
          </p>

          {/* 🧬 Animated Extraction Icons */}
          <div className="flex justify-center gap-6 relative w-full h-10">
            {[FileText, HeartPulse].map((Icon, i) => (
              <motion.div
                key={i}
                className="absolute"
                animate={{
                  x: i === 0 ? [0, 80, 0] : [0, -80, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
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
            Underwriting Eligibility Check
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
          {/* ✅ Status Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 3, // wait until all 3 checks are animated (0 + 1 + 2 sec)
              duration: 0.5,
              type: "spring",
            }}
            className="text-green-400 font-semibold mt-2"
          >
            Policy Rules Passed ✅
          </motion.div>

          {/* ⚙️ Condition Checking Loader */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 3, duration: 0.5, ease: "easeInOut" }} // hide after 3s
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
        <motion.div {...fade} className="justify-start">
          {/* Header */}
          <h3 className="text-2xl font-semibold text-amber-400 flex mb-4 gap-1">
            Reinsurer Rating
          </h3>

          <div className="flex flex-col md:flex-row justify-center items-start gap-6 w-full max-w-5xl mx-auto relative overflow-visible">
            {/* Left Column: API Request */}
            <div className="flex flex-col gap-4 w-full md:w-1/2 relative z-10">
              <div className="bg-[#1a1c2a] rounded-xl shadow-md border border-gray-700 w-full text-left overflow-hidden">
                <div className="bg-[#2a2c3f] px-4 py-2 flex justify-between items-center border-b border-gray-600">
                  <span className="text-green-400 font-mono font-semibold">
                    POST
                  </span>
                  <span className="text-gray-300 font-mono">
                    /api/reinsurer/lookup
                  </span>
                </div>
                <pre className="p-4 text-sm text-green-400 font-mono">
                  {`{
  "age": 45,
  "sum_assured": "50L",
  "bmi": 29.3,
  "medical_class": "II",
  "smoker": false
}`}
                </pre>
              </div>

              {/* Payload trigger text */}
              <motion.p
                className="text-gray-400 text-sm italic text-center mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Triggering request to reinsurer API...
              </motion.p>
            </div>

            {/* Animated “Data Beam” Between Request and Response */}
            <div className="absolute left-[48%] top-1/2 -translate-y-1/2 flex flex-col items-center">
              {/* Beam line */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "160px" }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
                className="w-[2px] bg-gradient-to-b from-green-400 via-amber-400 to-amber-500 rounded-full shadow-[0_0_12px_rgba(251,191,36,0.6)]"
              />

              {/* Outgoing pulse (API trigger) */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.2, 0.8, 1],
                  opacity: [0, 1, 1, 0],
                  y: [0, 160],
                }}
                transition={{
                  delay: 0.6,
                  duration: 1.8,
                  ease: "easeInOut",
                  repeat: 0,
                }}
                className="w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.7)]"
              />

              {/* Returning pulse (response) */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.1, 1],
                  opacity: [0, 1, 1, 0],
                  y: [160, 0],
                }}
                transition={{
                  delay: 2.6,
                  duration: 1.8,
                  ease: "easeInOut",
                  repeat: 0,
                }}
                className="w-4 h-4 rounded-full bg-gradient-to-r from-amber-400 to-green-400 shadow-[0_0_15px_rgba(251,191,36,0.7)]"
              />

              {/* Reinsurer Node */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: 1,
                  boxShadow: [
                    "0 0 0px rgba(251,191,36,0.3)",
                    "0 0 25px rgba(251,191,36,0.5)",
                    "0 0 0px rgba(251,191,36,0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-400/20 border border-amber-400/50 mt-6"
              >
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="text-amber-300 text-sm font-semibold"
                >
                  R
                </motion.span>
              </motion.div>
            </div>

            {/* Right Column: Response */}
            <div className="flex flex-col gap-4 w-full md:w-1/2 items-center">
              {/* Response header */}
              <motion.p
                className="text-gray-400 text-sm italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.8 }}
              >
                Awaiting response from reinsurer...
              </motion.p>

              {/* Response Box */}
              <motion.div
                className="bg-[#1a223a] p-4 rounded-xl border border-gray-700 w-full text-sm text-gray-300 shadow-lg font-mono"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.4 }}
              >
                <TypeWriterPlain
                  text={`{ "load": "15%", "risk_class": "Silver" }`}
                  speed={40}
                />
              </motion.div>

              {/* Response Glow Animation */}
              <motion.div
                className="bg-[#2e2b1f] inline-block px-5 py-2 rounded-full text-amber-300 font-semibold shadow-md"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 5, type: "spring", stiffness: 100 }}
              >
                Silver — +15% Load
              </motion.div>

              <motion.p
                className="text-gray-400 text-sm italic mt-2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 6 }}
              >
                “Reinsurer API returned classification and load factor for
                pricing.”
              </motion.p>
            </div>
          </div>
        </motion.div>
      );

    case "hitl":
      return (
        <motion.div
          {...fade}
          className="flex flex-col items-center justify-center space-y-8 text-left"
        >
          {/* Header */}
          <h3 className="text-2xl font-semibold text-amber-400 flex items-center gap-2">
            <ShieldCheck className="text-amber-400" /> Final Summary
          </h3>

          {/* Decision Summary Cards */}
          <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl">
            {/* Reinsurer Summary */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1 bg-[#1b243c] border border-gray-700 rounded-2xl p-5 shadow-lg"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-amber-400 text-xl font-semibold">
                  Reinsurer
                </span>
                <CheckCircle className="text-green-400" />
              </div>
              <div className="space-y-2 text-sm font-mono text-gray-300">
                <p>
                  <span className="text-gray-500">Risk Class:</span> Silver
                </p>
                <p>
                  <span className="text-gray-500">Load:</span> +15%
                </p>
                <p>
                  <span className="text-gray-500">Status:</span>{" "}
                  <span className="text-green-400">Approved ✅</span>
                </p>
              </div>
            </motion.div>

            {/* AML Summary */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-1 bg-[#1b243c] border border-gray-700 rounded-2xl p-5 shadow-lg"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-green-400 text-xl font-semibold">
                  AML
                </span>
                <CheckCircle className="text-green-400" />
              </div>
              <div className="space-y-2 text-sm font-mono text-gray-300">
                <p>
                  <span className="text-gray-500">AML Check:</span> Cleared
                </p>
                <p>
                  <span className="text-gray-500">Audit ID:</span> AML-LOG-99321
                </p>
                <p>
                  <span className="text-gray-500">Status:</span>{" "}
                  <span className="text-green-400">Approved ✅</span>
                </p>
              </div>
            </motion.div>
          </div>

          {/* Divider / Narration */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 italic text-sm text-center"
          >
            “Both reinsurer and AML validations are complete — ready for policy
            confirmation.”
          </motion.p>

          {/* Approve and Continue Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center"
          >
            <button
              onClick={() => manualStepCompletion()} // define this function below
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md transition"
            >
              <CheckCircle size={20} /> Approve & Continue
            </button>
          </motion.div>
        </motion.div>
      );

    // 🅳 QUOTE & PAYMENT
    case "quote":
      return (
        <>
          {stepKey === "quote" && (
            <motion.div {...fade} className="text-center space-y-5">
              {/* Quote Card */}
              <div className="bg-gradient-to-br from-[#faf5ff] to-[#fce7f3] p-6 rounded-2xl border border-fuchsia-200 max-w-sm mx-auto shadow-md text-center">
                <h3 className="text-2xl font-semibold text-fuchsia-600 mb-4">
                  Premium Quote
                </h3>

                <p className="text-gray-700 mb-6">
                  The system has recommented a premium quote for the applicant.
                </p>

                <div className="bg-white border border-fuchsia-100 rounded-xl py-4 mb-6 shadow-sm">
                  <span className="text-gray-600 text-sm font-medium">
                    Total Amount
                  </span>
                  <div className="text-3xl font-bold text-fuchsia-600 mt-1">
                    $25,300
                  </div>
                </div>

                <Button
                  onClick={() => setShowPaymentFlow(true)}
                  className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-6 py-2 rounded-sm font-semibold shadow-sm transition-all"
                >
                  Send Payment Request
                </Button>
              </div>

              {/* --- Payment Flow Simulation Popup --- */}
              {showPaymentFlow && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-[#1a223a] p-8 rounded-2xl border border-gray-700 text-center max-w-md w-full shadow-2xl relative"
                  >
                    <h4 className="text-2xl font-semibold text-fuchsia-400 mb-6">
                      Payment Processing
                    </h4>

                    {/* Step Simulation: Sending → Waiting → Received */}
                    {!paymentStage ? (
                      <motion.div
                        key="sending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4"
                      >
                        <p className="text-gray-300 text-sm">
                          Sending payment request to the customer for the quoted
                          premium...
                        </p>
                        <Loader2
                          className="animate-spin text-fuchsia-400 mx-auto"
                          size={36}
                        />
                      </motion.div>
                    ) : paymentStage === "waiting" ? (
                      <motion.div
                        key="waiting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4"
                      >
                        <p className="text-gray-300 text-sm">
                          Waiting for customer to complete the payment...
                        </p>
                        <div className="flex justify-center items-center gap-2">
                          <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="w-3 h-3 bg-fuchsia-400 rounded-full"
                          />
                          <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              delay: 0.2,
                            }}
                            className="w-3 h-3 bg-fuchsia-400 rounded-full"
                          />
                          <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              delay: 0.4,
                            }}
                            className="w-3 h-3 bg-fuchsia-400 rounded-full"
                          />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="received"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-4"
                      >
                        <div className="flex flex-col items-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-10 h-10 text-green-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <h4 className="text-xl text-green-400 font-semibold">
                            Payment Received
                          </h4>
                          <p className="text-gray-400 text-sm">
                            The customer has successfully completed the payment.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}
        </>
      );

      return (
        <>
          {stepKey === "quote" && (
            <motion.div {...fade} className="text-center space-y-5">
              <div className="bg-gradient-to-br from-[#faf5ff] to-[#fce7f3] p-6 rounded-2xl border border-fuchsia-200 max-w-sm mx-auto shadow-md text-center">
                <h3 className="text-2xl font-semibold text-fuchsia-600 mb-4">
                  Premium Quote
                </h3>

                <p className="text-gray-700 mb-6">
                  Your calculated premium amount is shown below. Proceed to
                  complete your payment.
                </p>

                <div className="bg-white border border-fuchsia-100 rounded-xl py-4 mb-6 shadow-sm">
                  <span className="text-gray-600 text-sm font-medium">
                    Total Amount
                  </span>
                  <div className="text-3xl font-bold text-fuchsia-600 mt-1">
                    $25,300
                  </div>
                </div>

                <Button
                  onClick={() => setShowPaymentPopup(true)}
                  className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-6 py-2 rounded-1 font-semibold shadow-sm transition-all"
                >
                  Make Payment
                </Button>
              </div>

              {/* Payment Popup */}
              {showPaymentPopup && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-[#1a223a] p-8 rounded-2xl border border-gray-700 text-center max-w-md w-full shadow-2xl relative"
                  >
                    <h4 className="text-2xl font-semibold text-fuchsia-400 mb-6">
                      Payment Gateway
                    </h4>

                    {!paymentSuccess ? (
                      <>
                        <div className="bg-[#101729] p-4 rounded-xl border border-gray-700 space-y-4 text-left">
                          <div>
                            <label className="text-gray-400 text-sm">
                              Cardholder Name
                            </label>
                            <input
                              type="text"
                              placeholder="Rahul Mehta"
                              className="w-full mt-1 px-3 py-2 rounded-md bg-[#0e1320] border border-gray-600 text-gray-200 focus:border-fuchsia-500 outline-none text-sm"
                            />
                          </div>

                          <div>
                            <label className="text-gray-400 text-sm">
                              Card Number
                            </label>
                            <input
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              className="w-full mt-1 px-3 py-2 rounded-md bg-[#0e1320] border border-gray-600 text-gray-200 focus:border-fuchsia-500 outline-none text-sm"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-gray-400 text-sm">
                                Expiry
                              </label>
                              <input
                                type="text"
                                placeholder="MM/YY"
                                className="w-full mt-1 px-3 py-2 rounded-md bg-[#0e1320] border border-gray-600 text-gray-200 focus:border-fuchsia-500 outline-none text-sm"
                              />
                            </div>
                            <div>
                              <label className="text-gray-400 text-sm">
                                CVV
                              </label>
                              <input
                                type="password"
                                placeholder="***"
                                className="w-full mt-1 px-3 py-2 rounded-md bg-[#0e1320] border border-gray-600 text-gray-200 focus:border-fuchsia-500 outline-none text-sm"
                              />
                            </div>
                          </div>

                          <div className="flex justify-between items-center mt-4">
                            <span className="text-gray-300 font-medium text-sm">
                              Amount:{" "}
                              <span className="text-fuchsia-400">
                                Rs. 25,300
                              </span>
                            </span>
                            <Button
                              onClick={() => {
                                setPaymentSuccess(true);
                                setTimeout(() => {
                                  setShowPaymentPopup(false);
                                  manualStepCompletion(); // move to next step
                                }, 1500);
                              }}
                              className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white"
                            >
                              Pay Now
                            </Button>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          onClick={() => setShowPaymentPopup(false)}
                          className="text-gray-400 hover:text-gray-200 mt-4"
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-8"
                      >
                        <div className="flex flex-col items-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-10 h-10 text-green-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <h4 className="text-xl text-green-400 font-semibold">
                            Payment Successful
                          </h4>
                          <p className="text-gray-400 text-sm">
                            Redirecting to the next step...
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}
        </>
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
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="text-green-500" />
              <h3 className="text-2xl font-semibold text-green-500">
                Decision: APPROVED ✅
              </h3>
            </div>

            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-medium text-gray-500">Risk Class:</span>{" "}
                Silver
              </p>
              <p>
                <span className="font-medium text-gray-500">Load:</span> +15%
              </p>
              <p>
                <span className="font-medium text-gray-500">Premium:</span>{" "}
                $25,300
              </p>
              <p>
                <span className="font-medium text-gray-500">AML:</span> Cleared
                <span className="text-xs text-gray-400 ml-2">
                  (Audit ID: AML-LOG-99321)
                </span>
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center mt-6">
              <button className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                <FileText size={16} /> Send cover note
              </button>
              <button
                className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                onClick={() => manualStepCompletion()}
              >
                <ClipboardList size={16} /> Final summary
              </button>
              <button
                onClick={() => setShowAudit(true)}
                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                <History size={16} /> View Audit Trail
              </button>
            </div>
          </motion.div>

          {/* ================= Narration ================= */}
          <p className="text-gray-500 text-sm italic text-center">
            “Reinsurer approved — ready for quote & buy.”
          </p>

          {/* ================= Audit Trail Modal ================= */}
          {showAudit && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
              {" "}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-[#1b243c] p-6 rounded-2xl shadow-2xl w-[90%] max-w-lg border border-gray-700"
              >
                {" "}
                <div className="flex justify-between items-center mb-4">
                  {" "}
                  <h3 className="text-lg font-semibold text-rose-400 flex items-center gap-2">
                    {" "}
                    <History /> Audit Trail{" "}
                  </h3>{" "}
                  <button
                    onClick={() => setShowAudit(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    {" "}
                    ✕{" "}
                  </button>{" "}
                </div>{" "}
                <div className="bg-[#12182b] rounded-lg p-4 space-y-2 max-h-64 overflow-y-auto text-sm">
                  {" "}
                  {auditEvents.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between border-b border-gray-700/50 pb-1"
                    >
                      {" "}
                      <span className="text-gray-400">{item.time}</span>{" "}
                      <span className="text-gray-200">{item.event}</span>{" "}
                    </div>
                  ))}{" "}
                </div>{" "}
                <div className="flex justify-center mt-6">
                  {" "}
                  <Lottie
                    animationData={auditAnim}
                    loop
                    style={{ height: 80 }}
                  />{" "}
                </div>{" "}
                <div className="flex justify-end mt-4">
                  {" "}
                  <button className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                    {" "}
                    Export Audit Log{" "}
                  </button>{" "}
                </div>{" "}
              </motion.div>{" "}
            </div>
          )}
        </motion.div>
      );

    default:
      return null;
  }
}
