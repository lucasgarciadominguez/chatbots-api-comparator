const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // 30-second wait time
  socketTimeoutMS: 45000, // Timeout for socket operations
  connectTimeoutMS: 30000, // Timeout before rejecting the connection
});

// CONNECTION EVENTS
mongoose.connection.on("connected", () => {
  console.log("[MongoDB] Successfully connected to the database.");
});

mongoose.connection.on("error", (err) => {
  console.error("[MongoDB] Connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("[MongoDB] Disconnected.");
});

// FUNCTION FOR GRACEFUL SHUTDOWN
function gracefulShutdown(msg, callback) {
  mongoose.connection.close(() => {
    console.log(`[MongoDB] Disconnected due to: ${msg}`);
    callback();
  });
}

// SYSTEM SIGNAL HANDLING
process.once("SIGUSR2", () => {
  gracefulShutdown("restart due to nodemon", () => {
    process.kill(process.pid, "SIGUSR2");
  });
});

process.on("SIGINT", () => {
  gracefulShutdown("application termination", () =
