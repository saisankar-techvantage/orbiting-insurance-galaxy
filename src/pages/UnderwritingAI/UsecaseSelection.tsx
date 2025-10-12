import { motion } from "framer-motion";
import { HeartPulse, User2, Car, Home, Plane, ArrowRight } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Usecase {
  key: string;
  title: string;
  description: string;
  icon: LucideIcon;
  active: boolean;
}

interface UsecaseGridProps {
  setUsecase: (key: string) => void;
}

export const usecases = [
  {
    key: "life",
    title: "Life Insurance",
    description: "End-to-end AI underwriting for new business proposals.",
    icon: User2,
    active: true,
  },
  {
    key: "health",
    title: "Health Insurance",
    description: "AI-driven claim and policy assessment for health cases.",
    icon: HeartPulse,
    active: false,
  },
  {
    key: "motor",
    title: "Motor Insurance",
    description: "AI-based claim validation and repair cost estimation.",
    icon: Car,
    active: false,
  },
  {
    key: "property",
    title: "Property Insurance",
    description: "Evaluate property risks and policy alignment instantly.",
    icon: Home,
    active: false,
  },
  {
    key: "travel",
    title: "Travel Insurance",
    description: "Assess travel risk and automate eligibility screening.",
    icon: Plane,
    active: false,
  },
];

const UsecaseGrid: React.FC<UsecaseGridProps> = ({ setUsecase }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full mx-auto px-4"
    >
      {usecases?.map((usecase, index) => {
        const Icon = usecase.icon;

        return (
          <motion.div
            key={usecase.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              y: -4,
              boxShadow: "0 12px 25px rgba(34,211,238,0.2)",
            }}
            onClick={() => usecase.active && setUsecase(usecase.key)}
            className={`relative group rounded-2xl cursor-pointer overflow-hidden border transition-all duration-300 bg-white ${
              usecase.active
                ? "border-cyan-400 shadow-lg"
                : "border-gray-200 hover:shadow-md"
            }`}
          >
            {/* Top Accent */}
            {usecase.active && (
              <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 rounded-t-md" />
            )}

            <div className="relative p-6 flex flex-col h-full justify-between z-10">
              {/* Icon + Title */}
              <div>
                <div className="flex items-center mb-4">
                  <div
                    className={`p-3 rounded-xl transition-all duration-300 flex items-center justify-center ${
                      usecase.active
                        ? "bg-cyan-50 text-cyan-500"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <Icon size={28} />
                  </div>
                  <h2
                    className={`text-lg font-semibold ml-3 transition-colors duration-300 ${
                      usecase.active ? "text-gray-900" : "text-gray-600"
                    }`}
                  >
                    {usecase.title}
                  </h2>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                  {usecase.description}
                </p>
              </div>

              {/* Footer CTA */}
              <div className="flex justify-end mt-6">
                {usecase.active ? (
                  <motion.div
                    whileHover={{ x: 3 }}
                    className="flex items-center text-cyan-500 text-sm font-medium"
                  >
                    Explore <ArrowRight size={16} className="ml-1" />
                  </motion.div>
                ) : (
                  <div className="text-gray-400 text-sm italic">
                    Coming Soon
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default UsecaseGrid;
