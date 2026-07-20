import { AnimatePresence, motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { MdWifiOff } from "react-icons/md";

import useNetwork from "../../hooks/useNetwork";

const bannerVariants = {
  hidden: {
    opacity: 0,
    y: -80,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },

  exit: {
    opacity: 0,
    y: -80,
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  },
};

export default function NetworkBanner() {
  const { status, showBanner } = useNetwork();

  const isOnline = status === "online";

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          variants={bannerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="status"
          aria-live="polite"
          className="fixed top-5 left-1/2 z-9999 -translate-x-1/2">
          <div
            className={`
              flex items-center gap-3
              rounded-xl
              px-5 py-3
              shadow-2xl
              border
              backdrop-blur-lg
              min-w-[320px]
              max-w-[90vw]
              ${
                isOnline
                  ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                  : "bg-rose-100 border-rose-300 text-rose-800"
              }
            `}>
            <div className="text-xl">
              {isOnline ? <FaCheckCircle /> : <MdWifiOff />}
            </div>

            <div className="flex flex-col">
              <span className="font-semibold">
                {isOnline ? "Connection restored" : "You're offline"}
              </span>

              <span className="text-sm opacity-80">
                {isOnline
                  ? "You're back online."
                  : "Please check your internet connection."}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
