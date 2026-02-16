import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./dbConnection.js";
import routes from "./routes/routes.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isLocalhost = origin === "http://localhost:3000" || origin === "http://127.0.0.1:3000";
      const isLan = /^http:\/\/192\.168\..*:3000$/.test(origin);
      if (isLocalhost || isLan) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
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