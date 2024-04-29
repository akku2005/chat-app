require("dotenv").config({ path: "./.env" });
const DB_NAME = require("./dbName"); // Import the database name
const mongoose = require("mongoose");

const CONNECTING_URL = process.env.CONNECTING_URL;

const connectDB = async () => {
  try {
    const connectionUrl = `${CONNECTING_URL}/${DB_NAME}`;
    await mongoose.connect(connectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB instance: ${connectionUrl}`);
    console.log(`Database Name: ${DB_NAME}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
