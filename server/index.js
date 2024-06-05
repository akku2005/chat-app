require("dotenv").config({ path: "./.env" });
const express = require("express");
const http = require("http");
const cors = require("cors");
const connectDB = require("./db/connectDb");
const initializeSocket = require("./socket/socket.js"); // Ensure the correct path
const router = require("./routes/index");
const UserList = require("./routes/userList.js");

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB and initialize Socket.IO
connectDB()
  .then(() => {
    console.log("MongoDB connected...");

    // Initialize Socket.IO
    initializeSocket(server);
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });

// Routes
app.use("/", router);
app.use("/login", router);
app.get("/users", UserList);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
