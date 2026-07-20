import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AlertToaster = ({
  show,
  status = "success",
  message,
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [show, duration, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 20 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.3 }}
          className="fixed left-1/2 top-0 z-9999 -translate-x-1/2">
          <div
            className={`relative overflow-hidden min-w-72 max-w-96 rounded-xl px-2 py-4 shadow-xl flex justify-between ${
              status === "success"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}>
            <p className="font-medium">{message}</p>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-1 w-full bg-white/20">
              <div
                className="h-full bg-white animate-toast-progress"
                style={{
                  animationDuration: `${duration}ms`,
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertToaster;
