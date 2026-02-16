import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "../backend/dbConnection.js";
import routes from "../backend/routes/routes.js";

dotenv.config();

const app = express();

// CORS configuration - Allow all origins for Vercel deployment
const corsOptions = {
  origin: true, // Allow any origin
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  optionsSuccessStatus: 200,
  preflightContinue: false
};

app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options("*", cors(corsOptions));

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
