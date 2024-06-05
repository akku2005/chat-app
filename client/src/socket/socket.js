// socket.js
import { createContext } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:6060");
const SocketContext = createContext(socket);

export { socket, SocketContext };
