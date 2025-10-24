// src/components/LayoutWrapper.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import cosmicBg from "@/assets/cosmic-background.jpg";
import { Home, Workflow, Settings, LogOut } from "lucide-react";

const MacScreenLayout = ({ title, children, zentisLayout = true }) => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Human Assisted Workflows", icon: <Home size={18} />, path: "" },
    { label: "Automated Workflows", icon: <Workflow size={18} />, path: "" },
    // { label: "Settings", icon: <Settings size={18} />, path: "" },
  ];

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${cosmicBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Cosmic Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-md" />

      {/* Mac Screen Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-11/12 max-w-7xl h-[90vh] rounded-2xl overflow-hidden 
                   bg-[#f5f5f7] shadow-[0_0_50px_rgba(0,0,0,0.25)] border border-gray-300 flex flex-col"
      >
        {/* Mac Title Bar */}
        <div className="flex items-center justify-between bg-gradient-to-r from-gray-200 to-gray-100 px-5 py-2 border-b border-gray-300">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 bg-red-500 rounded-full cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <div className="w-3 h-3 bg-yellow-400 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
          <div className="text-sm text-gray-600 font-medium capitalize">
            {title}
          </div>
          <div className="w-12" /> {/* Placeholder for spacing symmetry */}
        </div>

        {/* Browser Body */}
        {zentisLayout ? (
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-60 bg-white border-r border-gray-200 flex flex-col justify-between">
              <div>
                <div className="px-5 py-4 border-b border-gray-200 font-semibold text-gray-700 text-lg tracking-wide">
                  ZenPilot
                </div>
                <nav className="flex flex-col mt-4 space-y-1 px-2">
                  {menuItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => navigate(item.path)}
                      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200
      text-gray-700 hover:text-cyan-600 hover:bg-cyan-50 group`}
                    >
                      <div className="flex-shrink-0 text-xl text-cyan-600 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <span className="text-sm font-medium text-left whitespace-normal leading-snug flex-1">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="px-4 py-3 border-t border-gray-200">
                <button
                  onClick={() => navigate("/logout")}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-red-100 hover:text-red-600 transition-all w-full"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
              {/* Top Navigation Bar inside Browser */}
              <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
                <div className="font-semibold text-gray-800 text-lg capitalize">
                  {title}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto bg-gradient-to-b from-white to-gray-50">
                {children}
              </div>
            </div>
          </div>
        ) : (
          // Fullscreen Mode (no sidebar/topbar)
          <div className="flex-1 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
            {children}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MacScreenLayout;
