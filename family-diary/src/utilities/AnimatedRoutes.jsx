
import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

const pageTransition = {
  initial: {
    x: "100%",
  },
  animate: {
    x: 0,
  },
  exit: {
    x: "-18%",
  },
};

const transitionSettings = {
  type: "tween",
  duration: 0.24,
  ease: [0.22, 1, 0.36, 1],
};

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100dvh",
        overflow: "hidden",
        background: "#fff",
      }}
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={location.pathname}
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transitionSettings}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            minHeight: "100%",
            overflowY: "auto",
            overflowX: "hidden",
            background: "#fff",
            willChange: "transform",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
