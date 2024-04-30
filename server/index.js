require("dotenv").config({ path: "./.env" });
const initializeSocket = require("./socket/socket.js");
const cors = require("cors");
const connectDB = require("./db/connectDb");
const express = require("express");
const http = require("http");
const router = require("./routes/index");

const app = express();
const server = http.createServer(app);

initializeSocket(server);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });

// Routes
app.use("/", router);
app.use("/login", router);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
