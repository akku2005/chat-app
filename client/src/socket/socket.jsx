// socket.jsx
import { io } from "socket.io-client";
import { createContext } from "react";

const SocketContext = createContext();

const socket = io("http://localhost:6060", {
  // This will be updated with the actual user email when available
  query: { email: "user@example.com" },
});

export { socket, SocketContext };
