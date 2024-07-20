const socketIO = require("socket.io");

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

    // Retrieve user email from socket handshake query
    const { email } = socket.handshake.query;

    if (email) {
      // Check if the user already has a socket ID stored
      const existingSocketId = userSockets.get(email);
      if (existingSocketId) {
        // Disconnect the existing socket
        io.sockets.sockets.get(existingSocketId)?.disconnect(true);
        console.log(
          `User with email ${email} disconnected from socket ID ${existingSocketId}`
        );
      }

      // Store the new socket ID associated with the user email
      userSockets.set(email, socket.id);
      console.log(`Socket ID ${socket.id} assigned to ${email}`);
    } else {
      console.log("No email provided in the handshake query");
    }

    // Handle private messaging
    socket.on("privateMessage", (data) => {
      const targetSocketId = userSockets.get(data.to);
      if (targetSocketId) {
        io.to(targetSocketId).emit("privateMessage", data);
      } else {
        console.log(`No active socket found for user ${data.to}`);
      }
    });

    socket.on("disconnect", () => {
      console.log(`User with socket ID ${socket.id} disconnected`);
      // Remove the user from the map when they disconnect
      userSockets.forEach((value, key) => {
        if (value === socket.id) {
          userSockets.delete(key);
          console.log(`Socket ID ${socket.id} removed for user ${key}`);
        }
      });
    });
  });

  // Handle server shutdown
  process.on("SIGINT", async () => {
    console.log("Server is shutting down...");
    try {
      // Close MongoDB connection here if needed
      // await mongoose.disconnect(); // Example if using Mongoose
      process.exit(0);
    } catch (error) {
      console.error("Error during server shutdown:", error);
      process.exit(1);
    }
  });
}

module.exports = initializeSocket;

// const io = require('socket.io')(server);

// const users = {}; // To keep track of users and their socket ids

// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   // Register a user with their email
//   socket.on('register', (email) => {
//     users[email] = socket.id;
//     io.emit('updateOnlineUsers', Object.keys(users));
//   });

//   // Handle private message
//   socket.on('privateMessage', (messageData) => {
//     const { message, from, to } = messageData;

//     if (users[to]) {
//       // Send the message to the recipient
//       io.to(users[to]).emit('privateMessage', messageData);
//     } else {
//       console.log(`User with email ${to} is not online.`);
//     }
//   });

//   // Handle user disconnection
//   socket.on('disconnect', () => {
//     // Remove user from the list
//     for (const [email, id] of Object.entries(users)) {
//       if (id === socket.id) {
//         delete users[email];
//         io.emit('updateOnlineUsers', Object.keys(users));
//         break;
//       }
//     }
//     console.log('User disconnected:', socket.id);
//   });
// });

// const { Server } = require("socket.io");

// const initializeSocket = (server) => {
//   const io = new Server(server);

//   // Mapping between user email and their socket ID
//   const userSocketMap = {};

//   io.on("connection", (socket) => {
//     console.log("A user connected:", socket.id);

//     // Register a user with their email
//     socket.on("login", (email) => {
//       userSocketMap[email] = socket.id;
//       console.log(`User registered: ${email} with socket ID ${socket.id}`);
//     });

//     // Handle private messages
//     socket.on("privateMessage", (data) => {
//       const { message, from, to } = data;

//       // Check if the recipient is registered and has a socket ID
//       if (userSocketMap[to]) {
//         io.to(userSocketMap[to]).emit("privateMessage", { message, from, to });
//         console.log(`Message from ${from} to ${to}: ${message}`);
//       } else {
//         console.log(`User ${to} is not connected`);
//       }
//     });

//     // Handle socket disconnection
//     socket.on("disconnect", () => {
//       console.log("User disconnected:", socket.id);
//       // Remove the socket ID from the userSocketMap
//       for (const [email, id] of Object.entries(userSocketMap)) {
//         if (id === socket.id) {
//           delete userSocketMap[email];
//           console.log(`User ${email} disconnected and removed from map`);
//           break;
//         }
//       }
//     });
//   });
// };

// module.exports = initializeSocket;
