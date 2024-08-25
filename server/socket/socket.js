// const socketIO = require("socket.io");

// const userSockets = new Map();

// function initializeSocket(server) {
//   const io = socketIO(server, {
//     cors: {
//       origin: "http://localhost:5173",
//       methods: ["GET", "POST"],
//       allowedHeaders: ["Content-Type", "Authorization"],
//       credentials: true,
//     },
//   });

//   io.on("connection", (socket) => {
//     console.log(`A user connected with socket ID ${socket.id}`);

//     // Retrieve user ID from socket handshake query
//     const { userId } = socket.handshake.query;

//     if (userId) {
//       // Check if the user already has a socket ID stored
//       const existingSocketId = userSockets.get(userId);
//       if (existingSocketId) {
//         // Disconnect the existing socket
//         io.sockets.sockets.get(existingSocketId)?.disconnect(true);
//         console.log(
//           `User with user ID ${userId} disconnected from socket ID ${existingSocketId}`
//         );
//       }

//       // Store the new socket ID associated with the user ID
//       userSockets.set(userId, socket.id);
//       console.log(`Socket ID ${socket.id} assigned to user ID ${userId}`);
//     } else {
//       console.log("No user ID provided in the handshake query");
//     }

//     // Handle private messaging
//     socket.on("privateMessage", (data) => {
//       const targetSocketId = userSockets.get(data.userId);
//       if (targetSocketId) {
//         io.to(targetSocketId).emit("privateMessage", data);
//       } else {
//         console.log(`No active socket found for user ID ${data.userId}`);
//       }
//     });

//     socket.on("disconnect", () => {
//       console.log(`User with socket ID ${socket.id} disconnected`);
//       // Remove the user from the map when they disconnect
//       userSockets.forEach((value, key) => {
//         if (value === socket.id) {
//           userSockets.delete(key);
//           console.log(`Socket ID ${socket.id} removed for user ID ${key}`);
//         }
//       });
//     });
//   });

//   // Handle server shutdown
//   process.on("SIGINT", async () => {
//     console.log("Server is shutting down...");
//     try {
//       // Close MongoDB connection here if needed
//       // await mongoose.disconnect(); // Example if using Mongoose
//       process.exit(0);
//     } catch (error) {
//       console.error("Error during server shutdown:", error);
//       process.exit(1);
//     }
//   });
// }

// module.exports = initializeSocket;

const socketIO = require("socket.io");

function initializeSocket(server) {
  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:5173", // Change this to your client URL
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
      credentials: true,
    },
  });

  // Maps userId to socketId
  const userSocketMap = new Map();

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle setting the user ID for the socket
    socket.on("setUserId", (userId) => {
      userSocketMap.set(userId, socket.id);
      io.emit("updateOnlineUsers", Array.from(userSocketMap.keys()));
      console.log(
        `User ID ${userId} is now connected with socket ID ${socket.id}`
      );
    });

    // Handle private messages
    socket.on("private_message", (data) => {
      const targetSocketId = userSocketMap.get(data.to);
      if (targetSocketId) {
        io.to(targetSocketId).emit("private_message", data);
        console.log(
          `Message sent from ${data.from} to ${data.to}: ${data.message}`
        );
      } else {
        console.log(`User with ID ${data.to} is not online`);
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      // Remove socket from userSocketMap
      userSocketMap.forEach((value, key) => {
        if (value === socket.id) {
          userSocketMap.delete(key);
          io.emit("updateOnlineUsers", Array.from(userSocketMap.keys()));
        }
      });
    });
  });
}

module.exports = initializeSocket;
