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

export default function ProcessingPhase({ setPhase }) {
  const steps = [
    { key: "proposal", label: "Proposal", icon: FileText },
    // { key: "medical", label: "Medical Extraction", icon: HeartPulse },
    {
      key: "eligibility",
      label: "Underwriting Eligibility",
      icon: ShieldCheck,
    },
    { key: "reinsurer", label: "Reinsurer Rating", icon: Building2 },
    { key: "aml", label: "AML Recommendation", icon: ShieldAlert },
    { key: "hitl", label: "Human approval", icon: ShieldAlert },
    { key: "quote", label: "Quote & Buy", icon: CreditCard },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [isFinalizing, setIsFinalizing] = useState(false);

  // Auto progress logic
  useEffect(() => {
    if (currentStep === 5) return;
    if (currentStep === 4) return;
    if (currentStep === 3) return;

    if (currentStep < steps.length) {
      const timeInterval = currentStep === 2 ? 9000 : 5500;
      const timer = setTimeout(
        () => setCurrentStep((s) => s + 1),
        timeInterval
      );
      return () => clearTimeout(timer);
    }

    if (currentStep === steps.length) {
      setIsFinalizing(true);
      const doneTimer = setTimeout(() => {
        setPhase("result");
      }, 3500);
      return () => clearTimeout(doneTimer);
    }
  }, [currentStep, steps.length, setPhase]);

  const manualStepCompletion = () => {
    if (currentStep < steps.length) {
      setCurrentStep((s) => s + 1);
    }
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
      className="flex flex-row items-center justify-center w-full h-full text-white overflow-hidden px-6 py-8 gap-5"
    >
      {/* --- Left: Vertical Step Sidebar --- */}
      <div className="w-72 flex flex-col items-start rounded-2xl py-6 px-6 relative overflow-hidden">
        {/* Vertical connector line behind the icons */}
        {/* <div className="absolute left-[32px] top-10 bottom-10 w-[2px] bg-gray-700" /> */}

        <div className="flex flex-col gap-8 relative z-10 ml-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isDone = i < currentStep;
            const isActive = i === currentStep;

            return (
              <motion.div
                key={step.key}
                className="flex items-center gap-4 relative"
              >
                {/* Connecting line between icons */}
                {i < steps.length - 1 && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{
                      height:
                        i < currentStep
                          ? "100%"
                          : i === currentStep
                          ? "50%"
                          : "0%",
                    }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className={`absolute top-8 left-[16px] w-[2px] ${
                      i < currentStep ? "bg-cyan-400" : "bg-gray-700"
                    }`}
                    style={{ zIndex: -1 }}
                  />
                )}

                {/* Step icon circle */}
                <motion.div
                  animate={{
                    scale: isActive ? [1, 1.2, 1] : 1,
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
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    isDone
                      ? "border-cyan-400"
                      : isActive
                      ? "border-cyan-700"
                      : "border-gray-500"
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
                    size={18}
                  />
                </motion.div>

                {/* Step label (on the left side) */}
                <div
                  className={`text-sm font-medium ${
                    isDone
                      ? "text-cyan-400"
                      : isActive
                      ? "text-cyan-400"
                      : "text-gray-500"
                  }`}
                >
                  {step.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* --- Right: Dynamic Stage Content --- */}
      <div className="flex-1 h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isFinalizing ? (
            <motion.div
              key={steps[currentStep]?.key}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
              //className="w-full max-w-3xl"
            >
              <ProcessStageContent
                setPhase={setPhase}
                stepKey={steps[currentStep]?.key}
                manualStepCompletion={manualStepCompletion}
              />
            </motion.div>
          ) : (
            <motion.div
              key="finalizing-screen"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center bg-[#0c152b] border border-gray-700 rounded-2xl shadow-xl p-10"
            >
              <Loader2 className="animate-spin text-cyan-400 mb-4" size={40} />
              <h2 className="text-xl font-semibold text-cyan-300 mb-2">
                Finalizing Decision
              </h2>
              <p className="text-gray-400 text-sm">
                Compiling AI underwriting results and generating
                recommendation...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
