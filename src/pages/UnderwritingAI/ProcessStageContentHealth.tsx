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
import { Button } from "@/components/ui/button";

export default function ProcessStageContentHealth({ stepKey, manualStepCompletion }) {
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
                    Sarah Johnson
                  </p>
                  <p className="text-sm text-gray-500">Female, 38</p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  Product:{" "}
                  <span className="font-medium text-gray-900">Health Insurance</span>
                </p>
                <p>
                  Coverage:{" "}
                  <span className="font-medium text-gray-900">₹5,00,000</span>
                </p>
                <p>
                  Family Size:{" "}
                  <span className="font-medium text-gray-900">4 Members</span>
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
                  <FileText className="text-cyan-500" size={20} /> Health Document Tray
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
                    {/* <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      PDF
                    </span> */}
                  </div>
                  {/* <div className="text-sm text-gray-600">
                    <p>
                      ID Type:{" "}
                      <span className="font-medium text-gray-800">Aadhaar</span>
                    </p>
                    <p>
                      Verification:{" "}
                      <span className="text-green-600 font-medium">
                        Verified
                      </span>
                    </p>
                    <p>
                      Issue Date:{" "}
                      <span className="font-medium text-gray-700">
                        12 Mar 2020
                      </span>
                    </p>
                  </div> */}
                </div>

                {/* Medical Report */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-medium text-gray-800">
                      <HeartPulse size={18} className="text-pink-500" /> Medical
                      Report
                    </span>
                    {/* <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      Lab Report
                    </span> */}
                  </div>
                  {/* <div className="text-sm text-gray-600">
                    <p>
                      Lab:{" "}
                      <span className="font-medium text-gray-800">
                        Apollo Diagnostics
                      </span>
                    </p>
                    <p>
                      Report Date:{" "}
                      <span className="font-medium text-gray-700">
                        24 Sep 2025
                      </span>
                    </p>
                    <p>
                      Status:{" "}
                      <span className="text-blue-600 font-medium">Ready</span>
                    </p>
                  </div> */}
                </div>

                <div className="space-y-1 text-sm text-gray-700 leading-relaxed">
                  <p>
                    Age: <TypeWriter text="38" startDelay={0} />
                  </p>
                  <p>
                    Condition: <TypeWriter text="Hypertension" startDelay={1000} />
                  </p>
                  <p>
                    BP: <TypeWriter text="140/90" startDelay={2000} />
                  </p>
                  <p>
                    Duration: <TypeWriter text="2 years" startDelay={3000} />
                  </p>
                  <p>
                    Medication:{" "}
                    <TypeWriter text="Amlodipine" startDelay={4000} />
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
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

    // 🅲 RISK CLASSIFICATION
    case "risk-classification":
      return (
        <motion.div {...fade} className="text-center space-y-4">
          <h3 className="text-2xl font-semibold text-purple-400 flex items-center justify-center gap-2">
            <ShieldCheck className="w-6 h-6" />
            Risk Classification
          </h3>

          <p className="text-gray-400 text-sm mb-2">
            Analyzing risk profile and assigning classification...
          </p>

          {/* 🎯 Animated Risk Icons */}
          <div className="flex justify-center gap-6 relative w-full h-10">
            {[ShieldCheck, UserCircle2].map((Icon, i) => (
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
                <Icon size={40} className="text-purple-400" />
              </motion.div>
            ))}
          </div>

          {/* ✅ Status Message */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="text-purple-400 font-semibold mt-2"
          >
            Classification in Progress...
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
                  className="w-2.5 h-2.5 bg-purple-400 rounded-full"
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
              Evaluating medical history, lifestyle factors, and risk indicators...
            </p>
          </motion.div>

          {/* Risk Class Result */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3, type: "spring" }}
            className="mt-6"
          >
            {(() => {
              const riskClasses = [
                { name: "Bronze", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
                { name: "Silver", color: "text-gray-600", bg: "bg-gray-50", border: "border-gray-200" },
                { name: "Gold", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" },
                { name: "Platinum", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" }
              ];
              const randomClass = riskClasses[Math.floor(Math.random() * riskClasses.length)];
              
              return (
                <div className={`inline-block px-6 py-3 rounded-xl ${randomClass.bg} ${randomClass.border} border-2 shadow-md`}>
                  <span className={`text-xl font-bold ${randomClass.color}`}>
                    Risk Class: {randomClass.name}
                  </span>
                </div>
              );
            })()}
          </motion.div>

          {/* 📝 Info Text */}
          <p className="text-gray-400 text-sm italic">
            "Risk classification determines pricing tier and underwriting requirements."
          </p>
        </motion.div>
      );

    // 🅳 REINSURER
    case "reinsurer":
      return (
        <motion.div {...fade} className="justify-start">
          {/* Header */}
          <h3 className="text-2xl font-semibold text-amber-400 flex mb-4 gap-2">
            Reinsurer Rating
          </h3>
          <div className="flex flex-col md:flex-row justify-center items-start gap-6 w-full max-w-4xl mx-auto">
            {/* Left Column: API Request + Animation */}
            <div className="flex flex-col gap-4 w-full md:w-1/2">
              {/* API Request Panel */}
              <div className="bg-[#1a1c2a] rounded-xl shadow-md border border-gray-700 w-full text-left overflow-hidden">
                <div className="bg-[#2a2c3f] px-4 py-2 flex justify-between items-center border-b border-gray-600">
                  <span className="text-green-400 font-mono font-semibold">
                    POST
                  </span>
                  <span className="text-gray-300 font-mono">
                    {"/api/reinsurer/lookup"}
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

              {/* API Call Animation */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-gray-400 text-sm italic">
                  Calling reinsurer API...
                </p>
                <Lottie animationData={apiAnim} loop style={{ height: 80 }} />
              </div>
            </div>

            {/* Right Column: Response + Outcome */}
            <div className="flex flex-col gap-4 w-full md:w-1/2 items-center">
              {/* Streaming Response */}
              <motion.div
                className="bg-[#1a223a] p-4 rounded-xl border border-gray-700 w-full text-sm text-gray-300 shadow-lg font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <TypeWriterPlain
                  text={`{ "load": "15%", "risk_class": "Substandard B" }`}
                />
              </motion.div>

              {/* Outcome Badge */}
              <motion.div
                className="bg-[#2e2b1f] inline-block px-4 py-2 rounded-full text-amber-300 font-semibold shadow-md"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.5, type: "spring", stiffness: 100 }}
              >
                Substandard B — +15% Load
              </motion.div>

              {/* Narration */}
              <p className="text-gray-400 text-sm italic mt-2 text-center">
                “Live lookup to reinsurer logic/table/calculator via API; result
                feeds into pricing.”
              </p>
            </div>
          </div>
        </motion.div>
      );

    // 🅳 QUOTE & PAYMENT
    case "quote":
      return (
        <>
          {stepKey === "quote" && (
            <motion.div {...fade} className="text-center space-y-5">
              <div className="bg-gradient-to-br from-[#faf5ff] to-[#fce7f3] p-6 rounded-2xl border border-fuchsia-200 max-w-sm mx-auto shadow-md text-center">
                <h3 className="text-2xl font-semibold text-fuchsia-600 mb-4">
                  Health Insurance Quote
                </h3>

                <p className="text-gray-700 mb-6">
                  Your calculated health insurance premium is shown below. Proceed to
                  complete your payment.
                </p>

                <div className="bg-white border border-fuchsia-100 rounded-xl py-4 mb-6 shadow-sm">
                  <span className="text-gray-600 text-sm font-medium">
                    Annual Premium
                  </span>
                  <div className="text-3xl font-bold text-fuchsia-600 mt-1">
                    ₹18,500
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    (Family of 4, ₹5L coverage)
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
                              placeholder="Sarah Johnson"
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
                                Rs. 18,500
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
                Standard
              </p>
              <p>
                <span className="font-medium text-gray-500">Coverage:</span> ₹5,00,000
              </p>
              <p>
                <span className="font-medium text-gray-500">Premium:</span>{" "}
                ₹18,500
              </p>
              <p>
                <span className="font-medium text-gray-500">AML:</span> Cleared
                <span className="text-xs text-gray-400 ml-2">
                  (Audit ID: AML-HEALTH-99321)
                </span>
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center mt-6">
              <button className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                <FileText size={16} /> Email PDF
              </button>
              <button className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                <Send size={16} /> Send to Policy Admin
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
