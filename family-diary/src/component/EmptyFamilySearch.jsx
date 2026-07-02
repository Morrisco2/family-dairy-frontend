import { motion } from "framer-motion";

const EmptyFamilySearch = ({text}) => {
  return (
    <div className="flex flex-col items-center h-52 justify-center py-5 px-6">
      <div className="relative w-full max-w-xs overflow-hidden">
        <svg viewBox="0 0 320 180" className="w-full h-auto overflow-hidden">
          <defs>
            <linearGradient id="card" x1="0" x2="1">
              <stop offset="0%" stopColor="#EDF5FC" />
              <stop offset="100%" stopColor="#D9EAFB" />
            </linearGradient>

            <radialGradient id="lensGlow">
              <stop offset="0%" stopColor="#93C5FD" stopOpacity=".45" />
              <stop offset="100%" stopColor="#93C5FD" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Cards */}
          {[40, 105].map((y, i) => (
            <g key={i}>
              <rect
                x="35"
                y={y}
                rx="18"
                width="250"
                height="52"
                fill="url(#card)"
              />

              <circle cx="62" cy={y + 26} r="10" fill="#9FC5F8" />

              <rect
                x="82"
                y={y + 16}
                width="120"
                height="7"
                rx="5"
                fill="#B8D5F8"
              />

              <rect
                x="82"
                y={y + 30}
                width="70"
                height="6"
                rx="5"
                fill="#CFE2F7"
              />
            </g>
          ))}

          {/* Scanner */}
          <motion.g
            animate={{
              x: [25, 210, 25],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}>
            <circle cx="40" cy="105" r="24" fill="url(#lensGlow)" />

            <circle
              cx="40"
              cy="105"
              r="18"
              fill="none"
              stroke="#2E5E99"
              strokeWidth="4"
            />

            <line
              x1="52"
              y1="117"
              x2="70"
              y2="135"
              stroke="#2E5E99"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </motion.g>
        </svg>

        {/* shimmer */}
        <motion.div
          animate={{
            x: ["-100%", "250%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.4,
          duration: 0.5,
        }}
        className="text-center mt-2">
        <h2 className="text-2xl font-bold text-[#2E5E99]">{text}</h2>

        
      </motion.div>
    </div>
  );
};

export default EmptyFamilySearch;
