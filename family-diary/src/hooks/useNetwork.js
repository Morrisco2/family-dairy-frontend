import { useContext } from "react";
import NetworkContext from "../context/NetworkContext";

export default function useNetwork() {
  const context = useContext(NetworkContext);

  if (!context) {
    throw new Error("useNetwork must be used within a NetworkProvider.");
  }

  return context;
}
