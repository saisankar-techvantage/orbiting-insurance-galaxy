// src/components/LayoutWrapper.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import cosmicBg from "@/assets/cosmic-background.jpg";

const MacScreenLayout = ({ title, children }) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${cosmicBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 backdrop-blur-md" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-11/12 max-w-6xl h-[90vh] rounded-2xl overflow-hidden 
                   bg-white/90 shadow-[0_0_50px_rgba(0,0,0,0.25)] border border-gray-200 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-gray-100 to-gray-200 px-5 py-2 border-b border-gray-300 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 bg-red-500 rounded-full cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <div className="w-3 h-3 bg-yellow-400 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <div className="ml-3 font-semibold text-gray-700">{title}</div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col relative px-6 overflow-y-auto py-10">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default MacScreenLayout;
