import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import cosmicBg from "@/assets/cosmic-background.jpg";
import { FaFileCsv, FaFilePdf } from "react-icons/fa";
import { DownloadIcon, ListRestartIcon, RefreshCwIcon } from "lucide-react";
import MacScreenLayout from "@/layout/MacScreenLayout";
import UploadPhase from "./UploadPhase";
import { sampleUser } from "@/utils/constants";
import LoadingPhase from "./LoadingPhase";
import ProcessingPhase from "./ProcessingPhase";
import ResultPhase from "./ResultPhase";
import UsecaseSelection, { usecases } from "./UsecaseSelection";
import UploadPhaseHealth from "./UploadPhaseHealth";
import ProcessingPhaseHealth from "./ProcessingPhaseHealth";
import ProcessingPhaseMarine from "./ProcessingPhaseMarine";
import UploadPhaseMarine from "./UploadPhaseMarine";
import DataFetchingPhase from "./DataFetchingPhase";
import CheckingPhase from "./CheckingPhase";
import UnderwritingInitPhase from "./UnderwritingInitPhase";
import CustomerOnboardingPhase from "./OnboardingPhase";
import UnderwritingCompletionPhase from "./EndScreen";

const UnderwritingAIPlatform = () => {
  const [phase, setPhase] = useState("upload"); // fetching, upload, checking,init, loading, processing, result
  const [selectedFiles, setSelectedFiles] = useState({
    customer: null,
    financial: null,
    behavior: null,
  });
  const [selectedUsecase, setSelectedUsecase] = useState<string>();
  const [selectedFilesHealth, setSelectedFilesHealth] = useState({
    financial: null,
    medical: null,
    lab: null,
  });
  const [selectedFilesMarine, setSelectedFilesMarine] = useState({
    financial: null,
    landing: null,
    invoice: null,
    packing: null,
  });

  // useEffect(() => {
  //   if (phase === "processing") {
  //     const totalDuration = 3500 * 5 + 500;
  //     const timer = setTimeout(() => setPhase("loading"), totalDuration);
  //     return () => clearTimeout(timer);
  //   }

  //   if (phase === "loading") {
  //     const loadTimer = setTimeout(() => setPhase("result"), 2000);
  //     return () => clearTimeout(loadTimer);
  //   }
  // }, [phase]);

  // console.log("usecase", selectedUsecase);

  return (
    <MacScreenLayout
      title={
        selectedUsecase
          ? `${selectedUsecase} insurance Underwriting`
          : "Underwriting AI Assistant"
      }
      zentisLayout={
        (phase === "fetching" ||
          phase === "upload" ||
          phase === "onboarding" ||
          phase === "completion") &&
        selectedUsecase
          ? false
          : true
      }
    >
      <div className="absolute top-4 right-6 z-20">
        <button
          onClick={() => {
            setSelectedFiles({
              customer: null,
              financial: null,
              behavior: null,
            });
            setPhase("fetching");
          }}
          className="text-xs text-gray-600 hover:text-cyan-500 transition"
        >
          <RefreshCwIcon className="inline-block w-5 h-5" />
        </button>
      </div>
      {!selectedUsecase && <UsecaseSelection setUsecase={setSelectedUsecase} />}
      {selectedUsecase && selectedUsecase == "life" && (
        <AnimatePresence mode="wait">
          {/* --- Data fetching Phase --- */}
          {phase === "fetching" && (
            <DataFetchingPhase
              //selectedFiles={selectedFiles}
              //setSelectedFiles={setSelectedFiles}
              setPhase={setPhase}
            />
          )}

          {/* --- Upload Phase --- */}
          {phase === "upload" && (
            <UploadPhase
              //selectedFiles={selectedFiles}
              //setSelectedFiles={setSelectedFiles}
              setPhase={setPhase}
            />
          )}

          {/* --- checking Phase --- */}
          {phase === "checking" && (
            <CheckingPhase
              //selectedFiles={selectedFiles}
              //setSelectedFiles={setSelectedFiles}
              setPhase={setPhase}
            />
          )}

          {/* --- init Phase --- */}
          {phase === "init" && (
            <UnderwritingInitPhase
              //selectedFiles={selectedFiles}
              //setSelectedFiles={setSelectedFiles}
              setPhase={setPhase}
            />
          )}

          {/* --- Loading Phase --- */}
          {phase === "loading" && (
            <LoadingPhase phase={phase} setPhase={setPhase} />
          )}

          {/* --- Processing Phase --- */}
          {phase === "processing" && <ProcessingPhase setPhase={setPhase} />}

          {/* --- onboarding Phase --- */}
          {phase === "onboarding" && (
            <CustomerOnboardingPhase
              //setSelectedFiles={setSelectedFiles}
              setPhase={setPhase}
            />
          )}

          {/* --- completion Phase --- */}
          {phase === "completion" && (
            <UnderwritingCompletionPhase
            //setSelectedFiles={setSelectedFiles}
            //setPhase={setPhase}
            />
          )}

          {/* --- Result Phase --- */}
          {phase === "result" && (
            <ResultPhase
              setSelectedFiles={setSelectedFiles}
              setPhase={setPhase}
            />
          )}
        </AnimatePresence>
      )}

      {/* Health Insurance */}
      {selectedUsecase && selectedUsecase == "health" && (
        <AnimatePresence mode="wait">
          {/* --- Upload Phase --- */}
          {phase === "upload" && (
            <UploadPhaseHealth
              selectedFiles={selectedFilesHealth}
              setSelectedFiles={setSelectedFilesHealth}
              setPhase={setPhase}
            />
          )}

          {/* --- Loading Phase --- */}
          {phase === "loading" && (
            <LoadingPhase phase={phase} setPhase={setPhase} />
          )}

          {/* --- Processing Phase --- */}
          {phase === "processing" && (
            <ProcessingPhaseHealth setPhase={setPhase} />
          )}

          {/* --- Result Phase --- */}
          {phase === "result" && (
            <ResultPhase
              setSelectedFiles={setSelectedFilesHealth}
              setPhase={setPhase}
            />
          )}
        </AnimatePresence>
      )}

      {/* Marine Insurance */}
      {selectedUsecase && selectedUsecase == "marine" && (
        <AnimatePresence mode="wait">
          {/* --- Upload Phase --- */}
          {phase === "upload" && (
            <UploadPhaseMarine
              selectedFiles={selectedFilesMarine}
              setSelectedFiles={setSelectedFilesMarine}
              setPhase={setPhase}
            />
          )}

          {/* --- Loading Phase --- */}
          {phase === "loading" && (
            <LoadingPhase phase={phase} setPhase={setPhase} />
          )}

          {/* --- Processing Phase --- */}
          {phase === "processing" && (
            <ProcessingPhaseMarine setPhase={setPhase} />
          )}

          {/* --- Result Phase --- */}
          {phase === "result" && (
            <ResultPhase
              setSelectedFiles={setSelectedFilesMarine}
              setPhase={setPhase}
            />
          )}
        </AnimatePresence>
      )}
    </MacScreenLayout>
  );
};

export default UnderwritingAIPlatform;
