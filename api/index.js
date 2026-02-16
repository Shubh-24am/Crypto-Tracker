import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "../backend/dbConnection.js";
import routes from "../backend/routes/routes.js";

dotenv.config();

const app = express();

// CORS middleware - MUST be first
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Allow specific origins
  const allowedOrigins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ];
  
  // Allow all vercel.app domains
  if (origin && origin.includes("vercel.app")) {
    allowedOrigins.push(origin);
  }
  
  // Allow HTTPS in production
  if (origin && origin.startsWith("https://")) {
    allowedOrigins.push(origin);
  }
  
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
  }
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  
  next();
});

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
