// socket/Socket.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

// Replace with your backend URL
const socket = io("http://localhost:6060", {
  transports: ["websocket"],
  reconnection: true,
});

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socketInstance, setSocketInstance] = useState(null);

  useEffect(() => {
    setSocketInstance(socket);
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socketInstance}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
