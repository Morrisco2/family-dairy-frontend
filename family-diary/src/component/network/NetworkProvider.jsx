import { useEffect, useMemo, useRef, useState } from "react";

import NetworkContext from "../../context/NetworkContext";
import useOnlineStatus from "../../hooks/useOnlineStatus";

export default function NetworkProvider({ children }) {
  const isOnline = useOnlineStatus();

  const [showBanner, setShowBanner] = useState(false);

const previousStatus = useRef(isOnline);
  useEffect(() => {
    // Nothing changed
    if (previousStatus.current === isOnline) {
      return;
    }

    // Save the new status
    previousStatus.current = isOnline;

    // Show the banner
    setShowBanner(true);

    if (isOnline) {
      const timer = setTimeout(() => {
        setShowBanner(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  const value = useMemo(
    () => ({
      isOnline,
      status: isOnline ? "online" : "offline",
      showBanner,
      setShowBanner,
    }),
    [isOnline, showBanner],
  );

  return (
    <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>
  );
}
