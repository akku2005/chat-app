const socketIO = require("socket.io");

// Map to store socket IDs associated with user emails
const userSockets = new Map();

function initializeSocket(server) {
  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:5173", // Update this if needed
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`A user connected with socket ID ${socket.id}`);

    // Retrieve user email from socket handshake query
    const { email } = socket.handshake.query;

    if (email) {
      // Check if the user already has a socket ID stored
      const existingSocketId = userSockets.get(email);
      if (existingSocketId) {
        // Disconnect the existing socket
        io.sockets.sockets.get(existingSocketId)?.disconnect();
        console.log(
          `User with email ${email} disconnected from socket ID ${existingSocketId}`
        );
      }

      // Store the new socket ID associated with the user email
      userSockets.set(email, socket.id);
      console.log(`Socket ID ${socket.id} assigned to ${email}`);
    }

    socket.on("callUser", (data) => {
      console.log(`Calling user ${data.userToCall} from ${data.from}`);
      io.to(data.userToCall).emit("callUser", {
        signal: data.signalData,
        from: data.from,
      });
    });

    socket.on("acceptCall", (data) => {
      console.log(`Accepting call from ${data.to}`);
      io.to(data.to).emit("callAccepted", data.signal);
    });

    socket.on("disconnect", () => {
      console.log(`User with socket ID ${socket.id} disconnected`);
      // Remove the user from the map when they disconnect
      userSockets.forEach((value, key) => {
        if (value === socket.id) {
          userSockets.delete(key);
        }
      });
    });
  });

  // Handle server shutdown
  process.on("SIGINT", async () => {
    try {
      console.log("Server is shutting down...");
      process.exit(0);
    } catch (error) {
      console.error("Error during server shutdown:", error);
      process.exit(1);
    }
  });
}

module.exports = initializeSocket;
