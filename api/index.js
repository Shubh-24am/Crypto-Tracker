import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "../backend/dbConnection.js";
import routes from "../backend/routes/routes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (origin === "http://localhost:3000" || origin === "http://127.0.0.1:3000") {
        return callback(null, true);
      }
      if (/^http:\/\/192\.168\..*:3000$/.test(origin)) {
        return callback(null, true);
      }
      if (origin && origin.includes("vercel.app")) {
        return callback(null, true);
      }
      if (origin && origin.startsWith("https://")) {
        return callback(null, true);
      }
      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Health check route
app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "Backend is running and MongoDB connected" });
});

app.get("/", (req, res) => {
  res.status(200).json({ status: "Server is running" });
});

// API routes
app.use("/api", routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ 
    status: false, 
    message: err.message || "Internal server error",
    error: process.env.NODE_ENV === "production" ? undefined : err.stack
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ status: false, message: "Route not found" });
});

export default app;
