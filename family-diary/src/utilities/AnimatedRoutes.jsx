// utilities/AnimatedRoutes.jsx
import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

const pageVariants = {
  initial: {
    x: "100%",
    opacity: 0.8,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: "-25%",
    opacity: 0.8,
  },
};

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
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
        style={{ height: "100%" }}>
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}
