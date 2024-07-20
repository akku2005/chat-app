require("dotenv").config({ path: "./.env" });
const initializeSocket = require("./socket/socket"); // Ensure this is correctly exporting a function
const cors = require("cors");
const connectDB = require("./db/connectDb");
const express = require("express");
const http = require("http");
const router = require("./routes/index");
const UserList = require("./routes/userList");

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log("MongoDB connected...");

    // Initialize Socket.IO after successful DB connection
    initializeSocket(server); // Pass the server instance
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });

// Routes
app.use("/", router);
app.use("/login", router); // Ensure this route is correct
app.get("/users", UserList);

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
