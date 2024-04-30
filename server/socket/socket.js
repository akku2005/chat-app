const { connect } = require("mongoose");
const socketIO = require("socket.io"); // Corrected import statement

function initializeSocket(server) {
  const io = socketIO(server); // Corrected variable name

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("chat message", (msg) => {
      console.log("Message received:", msg);
      io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}

module.exports = initializeSocket;
