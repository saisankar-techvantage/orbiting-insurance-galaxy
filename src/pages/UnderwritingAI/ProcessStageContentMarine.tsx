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

export default function ProcessStageContentMarine({
  stepKey,
  manualStepCompletion,
}) {
  const [showAudit, setShowAudit] = useState(false);
  const [showRequest, setShowRequest] = useState(false);

  const auditEvents = [
    { time: "10:12 AM", event: "Marine document extraction completed" },
    { time: "10:14 AM", event: "Cargo data validation applied" },
    { time: "10:15 AM", event: "Route risk assessment complete" },
    { time: "10:17 AM", event: "Marine premium calculation complete" },
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

  const [step, setStep] = useState(4);
  const [finalPremium, setFinalPremium] = useState(null);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const basePremium = 112500;
  const loadPercent = 0;

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
    // 🅰️ DATA STRUCTURING
    case "data-structuring":
      return (
        <motion.div
          {...fade}
          className="bg-white text-gray-800 px-8 py-5 rounded-2xl shadow-lg border border-gray-200 space-y-3"
        >
          {/* Header */}
          <div className="flex items-center ">
            <FileText className="text-cyan-500" size={26} />
            <h3 className="text-2xl font-semibold text-cyan-600">
              Marine Data Structuring
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
              Zen Pilot ingests marine documents & cargo data; normalizes
              features for marine underwriting.
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
                    Ocean Freight Ltd
                  </p>
                  <p className="text-sm text-gray-500">
                    Marine Cargo Insurance
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  Cargo Type:{" "}
                  <span className="font-medium text-gray-900">Electronics</span>
                </p>
                <p>
                  Cargo Value:{" "}
                  <span className="font-medium text-gray-900">₹45,00,000</span>
                </p>
                <p>
                  Route:{" "}
                  <span className="font-medium text-gray-900">
                    Mumbai → Singapore
                  </span>
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
                  <FileText className="text-cyan-500" size={20} /> Marine
                  Document Tray
                </h4>
                <span className="text-xs text-gray-500">Auto Extract Mode</span>
              </div>

              {/* Animation + Extraction Info */}
              <div className="grid sm:grid-cols-2 gap-4 items-center mt-4">
                {/* Bill of Lading */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-medium text-gray-800">
                      <FileText size={18} className="text-cyan-500" /> Bill of
                      Lading
                    </span>
                  </div>
                </div>

                {/* Invoice Document */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-medium text-gray-800">
                      <FileText size={18} className="text-pink-500" /> Invoice
                      Document
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-sm text-gray-700 leading-relaxed">
                  <p>
                    Cargo Value: <TypeWriter text="₹45,00,000" startDelay={0} />
                  </p>
                  <p>
                    Route:{" "}
                    <TypeWriter text="Mumbai → Singapore" startDelay={1000} />
                  </p>
                  <p>
                    Vessel:{" "}
                    <TypeWriter text="MV Ocean Star" startDelay={2000} />
                  </p>
                  <p>
                    Transit Days:{" "}
                    <TypeWriter text="12 days" startDelay={3000} />
                  </p>
                  <p>
                    Cargo Type:{" "}
                    <TypeWriter text="Electronics" startDelay={4000} />
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      );

    // 🅱️ DATA EXTRACTION
    case "data-extraction":
      return (
        <motion.div {...fade} className="text-center space-y-4">
          <h3 className="text-2xl font-semibold text-blue-400 flex items-center justify-center gap-2">
            <HeartPulse className="w-6 h-6" />
            Marine Data Extraction
          </h3>

          <p className="text-gray-400 text-sm mb-2">
            Extracting cargo and shipment information...
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
              Scanning bills of lading, invoices, and cargo documentation...
            </p>
          </motion.div>

          {/* Marine Extraction Results */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3, type: "spring" }}
            className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 max-w-md mx-auto"
          >
            <h4 className="text-lg font-semibold text-blue-700 mb-3">
              Extraction Findings
            </h4>
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex justify-between">
                <span>Insurance Rate:</span>
                <span className="font-medium">2.5%</span>
              </div>
              <div className="flex justify-between">
                <span>Cargo Value:</span>
                <span className="font-medium">₹45,00,000</span>
              </div>
              <div className="flex justify-between">
                <span>Voyage Route:</span>
                <span className="font-medium">Mumbai → Singapore</span>
              </div>
              <div className="flex justify-between">
                <span>Cargo Type:</span>
                <span className="font-medium">Electronics</span>
              </div>
            </div>
          </motion.div>

          {/* 🚢 Info Text */}
          <p className="text-gray-400 text-sm italic">
            "The system automatically extracts cargo details, routes, and values
            to streamline marine underwriting decisions."
          </p>
        </motion.div>
      );

    // 🅲 DATA FORMATTING
    case "data-formatting":
      return (
        <motion.div {...fade} className="text-center space-y-4">
          <h3 className="text-2xl font-semibold text-purple-400 flex items-center justify-center gap-2">
            <FileJson className="w-6 h-6" />
            Data Formatting
          </h3>

          <p className="text-gray-400 text-sm mb-2">
            Standardizing marine data formats...
          </p>

          {/* 🎯 Animated Formatting Icons */}
          <div className="flex justify-center gap-6 relative w-full h-10">
            {[FileJson, FileText].map((Icon, i) => (
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
            Formatting in Progress...
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
              Converting documents to standardized marine insurance format...
            </p>
          </motion.div>

          {/* 📝 Info Text */}
          <p className="text-gray-400 text-sm italic">
            "Data is standardized to ensure consistent processing across all
            marine insurance workflows."
          </p>
        </motion.div>
      );

    // 🅳 ELIGIBILITY
    case "eligibility":
      return (
        <motion.div {...fade} className="text-center space-y-4">
          <h3 className="text-2xl font-semibold text-green-400">
            U/W Eligibility Check
          </h3>
          <p className="text-gray-400 text-sm mb-2">
            Running Marine U/W Eligibility Rules...
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 3,
              duration: 0.5,
              type: "spring",
            }}
            className="text-green-400 font-semibold mt-2"
          >
            Marine Rules Passed ✅
          </motion.div>

          {/* ⚙️ Condition Checking Loader */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 3, duration: 0.5, ease: "easeInOut" }}
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
              Checking marine underwriting conditions...
            </p>
          </motion.div>

          {/* Marine U/W Results */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3, type: "spring" }}
            className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 max-w-lg mx-auto"
          >
            <h4 className="text-lg font-semibold text-green-700 mb-3">
              U/W Eligibility Results
            </h4>
            <div className="space-y-3 text-sm text-green-800">
              <div className="bg-white rounded-lg p-3 border border-green-100">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-green-600" size={16} />
                  <span className="font-medium">
                    Missing Field Identification
                  </span>
                </div>
                <p className="text-xs text-green-600">
                  All required fields present ✓
                </p>
              </div>

              <div className="bg-white rounded-lg p-3 border border-green-100">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-green-600" size={16} />
                  <span className="font-medium">Mismatch Identification</span>
                </div>
                <p className="text-xs text-green-600">
                  No data inconsistencies found ✓
                </p>
              </div>

              <div className="bg-white rounded-lg p-3 border border-green-100">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="text-green-600" size={16} />
                  <span className="font-medium">U/W Decision</span>
                </div>
                <p className="text-xs text-green-600">
                  Approved for standard marine coverage ✓
                </p>
              </div>

              <div className="bg-white rounded-lg p-3 border border-green-100">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="text-green-600" size={16} />
                  <span className="font-medium">Logic Applied</span>
                </div>
                <p className="text-xs text-green-600">
                  Route risk assessment: Low risk ✓
                </p>
              </div>
            </div>
          </motion.div>

          {/* 📝 Info Text */}
          <p className="text-gray-400 text-sm italic">
            "Marine-specific rules evaluated for cargo type, route, and voyage
            conditions."
          </p>
        </motion.div>
      );

    // 🅴 QUOTE & PAYMENT
    case "quote":
      return (
        <>
          {stepKey === "quote" && (
            <motion.div {...fade} className="text-center space-y-5">
              <div className="bg-gradient-to-br from-[#faf5ff] to-[#fce7f3] p-6 rounded-2xl border border-fuchsia-200 max-w-sm mx-auto shadow-md text-center">
                <h3 className="text-2xl font-semibold text-fuchsia-600 mb-4">
                  Marine Premium Quote
                </h3>

                <p className="text-gray-700 mb-6">
                  Your calculated marine insurance premium is shown below.
                  Proceed to complete your payment.
                </p>

                <div className="bg-white border border-fuchsia-100 rounded-xl py-4 mb-6 shadow-sm">
                  <span className="text-gray-600 text-sm font-medium">
                    Total Premium
                  </span>
                  <div className="text-3xl font-bold text-fuchsia-600 mt-1">
                    ₹1,12,500
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    (2.5% of ₹45,00,000 cargo value)
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
                              placeholder="Ocean Freight Ltd"
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
                                Rs. 1,12,500
                              </span>
                            </span>
                            <Button
                              onClick={() => {
                                setPaymentSuccess(true);
                                setTimeout(() => {
                                  setShowPaymentPopup(false);
                                  manualStepCompletion();
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

    // 🅵 AML / SANCTIONS
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
                Standard Marine
              </p>
              <p>
                <span className="font-medium text-gray-500">Premium:</span>{" "}
                ₹1,12,500
              </p>
              <p>
                <span className="font-medium text-gray-500">Coverage:</span> All
                Risks Marine Cargo
              </p>
              <p>
                <span className="font-medium text-gray-500">AML:</span> Cleared
                <span className="text-xs text-gray-400 ml-2">
                  (Audit ID: AML-MARINE-99321)
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
            "Reinsurer approved — ready for quote & buy."
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
