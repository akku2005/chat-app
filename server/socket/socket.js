const socketIO = require("socket.io");

// Map to store socket IDs associated with user emails
const userSockets = new Map();

function initializeSocket(server) {
  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`A user connected with socket ID ${socket.id}`);

    socket.on("login", (email) => {
      // Check if the user already has a socket ID stored
      const existingSocketId = userSockets.get(email);
      if (existingSocketId) {
        // Disconnect the existing socket
        io.sockets.sockets.get(existingSocketId).disconnect();
        console.log(
          `User with email ${email} disconnected from socket ID ${existingSocketId}`
        );
      }

      // Store the socket ID associated with the user email
      userSockets.set(email, socket.id);
      console.log(`Socket ID ${socket.id} assigned to ${email}`);
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

  // Handle server shutdown to close MongoDB connection
  process.on("SIGINT", async () => {
    try {
      await disconnect();
      console.log("MongoDB connection closed.");
      process.exit(0);
    } catch (error) {
      console.error("Error closing MongoDB connection:", error);
      process.exit(1);
    }
  });
}

module.exports = initializeSocket;
