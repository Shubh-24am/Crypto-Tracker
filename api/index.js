import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "../backend/dbConnection.js";
import routes from "../backend/routes/routes.js";

dotenv.config();

const app = express();

// Manual CORS headers - applies to ALL responses
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Set CORS headers for all requests
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.setHeader("Access-Control-Max-Age", "3600");
  
  // Handle preflight OPTIONS requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  
  next();
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Connect to MongoDB
connectDB();

// Health check route
app.get("/api/test", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json({ message: "Backend is running and MongoDB connected" });
});

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json({ status: "Server is running" });
});

// API routes
app.use("/api", routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.setHeader("Content-Type", "application/json");
  res.status(500).json({ 
    status: false, 
    message: err.message || "Internal server error",
    error: process.env.NODE_ENV === "production" ? undefined : err.stack
  });
});

// 404 handler
app.use((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(404).json({ status: false, message: "Route not found" });
});

export default app;
