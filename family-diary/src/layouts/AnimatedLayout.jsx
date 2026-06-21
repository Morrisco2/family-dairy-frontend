import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

const pageVariants = {
  initial: {
    x: "100%",
    opacity: 1,
    scale: 1,
  },

  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
  },

  exit: {
    x: "-20%",
    opacity: 0.95,
    scale: 0.98,
  },
};

export default function AnimatedLayout() {
  const location = useLocation();

  return (
    <div className="relative w-full min-h-screen ">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0 w-full h-full">
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
