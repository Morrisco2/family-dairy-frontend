import { io } from "socket.io-client";
import baseUrl from "./BaseURL";

const socket = io(`${baseUrl}`, {
  withCredentials: true,
  autoConnect: false,
  transports: ["websocket"]
});

let wasConnected = false;

socket.on("connect", () => {
  wasConnected = true;
});

socket.on("disconnect", (reason) => {
  if (reason === "io client disconnect") wasConnected = false;
});

if (typeof window !== "undefined") {
  window.addEventListener("family-diary:session-refreshed", () => {
    if (wasConnected && !socket.connected) {
      socket.connect();
    } else if (socket.connected) {
      socket.disconnect();
      socket.connect();
    }
  });
}

export default socket;
