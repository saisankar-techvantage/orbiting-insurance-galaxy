import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  HeartPulse,
  ShieldCheck,
  Building2,
  CreditCard,
  ShieldAlert,
  Loader2,
} from "lucide-react";
import ProcessStageContent from "./ProcessStageContent";
import ProcessStageContentHealth from "./ProcessStageContentHealth";
import ProcessStageContentMarine from "./ProcessStageContentMarine";

export default function ProcessingPhaseMarine({ setPhase }) {
  const steps = [
    { key: "data-structuring", label: "Data Structuring", icon: FileText },
    { key: "data-extraction", label: "Data Extraction", icon: HeartPulse },
    { key: "data-formatting", label: "Data Formatting", icon: ShieldCheck },
    { key: "eligibility", label: "U/W Eligibility", icon: ShieldCheck },
    { key: "quote", label: "Quotation/Payment", icon: CreditCard },
    { key: "aml", label: "AML Recommendation", icon: ShieldAlert },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [isFinalizing, setIsFinalizing] = useState(false);

  // Auto-progress each step
  useEffect(() => {
    if (currentStep === 6) return;

    // Stop auto progression at the Quote & Payment step (index 4)
    if (currentStep === 4) return;

    if (currentStep < steps.length) {
      const timer = setTimeout(() => setCurrentStep((s) => s + 1), 5500);
      return () => clearTimeout(timer);
    }

    // After AML → show finalizing screen first, then result
    if (currentStep === steps.length) {
      setIsFinalizing(true);
      const doneTimer = setTimeout(() => {
        setPhase("result");
      }, 3500);
      return () => clearTimeout(doneTimer);
    }
  }, [currentStep, steps.length, setPhase]);

  const manualStepCompletion = () => {
    //return;
    if (currentStep < steps.length) {
      setCurrentStep((s) => s + 1);
    }
    // After AML → show finalizing screen first, then result
    if (currentStep === steps.length) {
      setIsFinalizing(true);
      const doneTimer = setTimeout(() => {
        setPhase("result");
      }, 3500);
      return () => clearTimeout(doneTimer);
    }
  };

  return (
    <motion.div
      key="uw-processing-flow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-start w-full h-full px-8 pb-10 text-white overflow-y-auto"
    >
      {/* --- Header Progress Bar --- */}
      <div className="w-full max-w-5xl mb-12 sticky top-0 z-20 bg-[#0c152b] py-4 rounded-2xl border border-gray-700 shadow-md">
        <div className="flex items-center justify-between relative">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isDone = i < currentStep;
            const isActive = i === currentStep;

            return (
              <div
                key={step.key}
                className="flex flex-col items-center relative flex-1"
              >
                {/* Line connectors */}
                {i < steps.length - 1 && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width:
                        i < currentStep
                          ? "100%"
                          : i === currentStep
                          ? "60%"
                          : "0%",
                    }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className={`absolute top-3 left-1/2 h-[2px] ${
                      i < currentStep ? "bg-cyan-400" : "bg-gray-700"
                    }`}
                    style={{ width: "100%", zIndex: -1 }}
                  />
                )}

                {/* Step circle */}
                <motion.div
                  animate={{
                    scale: isActive ? [1, 1.3, 1] : 1,
                    backgroundColor: isDone
                      ? "#08a9c2ff"
                      : isActive
                      ? "#164e63"
                      : "#8e9299ff",
                  }}
                  transition={{
                    repeat: isActive ? Infinity : 0,
                    duration: 1.5,
                  }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                    isDone
                      ? "border-cyan-400"
                      : isActive
                      ? "border-cyan-700"
                      : "border-gray-300"
                  }`}
                >
                  <Icon
                    className={`${
                      isDone
                        ? "text-cyan-100"
                        : isActive
                        ? "text-cyan-400"
                        : "text-gray-500"
                    }`}
                    size={16}
                  />
                </motion.div>

                <div
                  className={`mt-2 text-xs ${
                    isDone
                      ? "text-cyan-600"
                      : isActive
                      ? "text-cyan-700"
                      : "text-gray-500"
                  }`}
                >
                  {step.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- Main Section --- */}
      <AnimatePresence mode="wait">
        {!isFinalizing ? (
          <motion.div
            key={steps[currentStep]?.key}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            //className="w-full max-w-3xl border border-gray-700 rounded-2xl shadow-lg p-10 text-center"
          >
            <ProcessStageContentMarine
              stepKey={steps[currentStep]?.key}
              manualStepCompletion={manualStepCompletion}
            />
            {/* <motion.div
              className="mt-8 w-full h-2 bg-gray-700 rounded-full overflow-hidden"
              initial={{ width: 0 }}
              animate={{
                width: "100%",
              }}
              transition={{
                duration: 2.5,
                delay: 0.4,
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
            </motion.div> */}
          </motion.div>
        ) : (
          // --- Finalizing Screen ---
          <motion.div
            key="finalizing-screen"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center w-full max-w-3xl bg-[#0c152b] border border-gray-700 rounded-2xl shadow-xl p-10"
          >
            <Loader2 className="animate-spin text-cyan-400 mb-4" size={40} />
            <h2 className="text-xl font-semibold text-cyan-300 mb-2">
              Finalizing Decision
            </h2>
            <p className="text-gray-400 text-sm">
              Compiling AI underwriting results and generating recommendation...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
