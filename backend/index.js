import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./dbConnection.js";
import routes from "./routes/routes.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like curl requests or Postman)
      if (!origin) return callback(null, true);
      
      // Allow localhost
      if (origin === "http://localhost:3000" || origin === "http://127.0.0.1:3000") {
        return callback(null, true);
      }
      
      // Allow LAN access
      if (/^http:\/\/192\.168\..*:3000$/.test(origin)) {
        return callback(null, true);
      }
      
      // Allow all Vercel deployments
      if (origin.includes("vercel.app")) {
        return callback(null, true);
      }
      
      // Allow any HTTPS requests (for production)
      if (origin.startsWith("https://")) {
        return callback(null, true);
      }
      
      // Block all other origins
      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Connect to MongoDB
connectDB();

// Load routes
app.use("/api", routes);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is running and MongoDB connected" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));