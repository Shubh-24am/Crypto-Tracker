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
      if (origin.includes("vercel.app")) {
        return callback(null, true);
      }
      if (origin.startsWith("https://")) {
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
connectDB();
app.use("/api", routes);

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is running and MongoDB connected" });
});

app.get("/", (req, res) => {
  res.json({ status: "Server is running" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: false, message: err.message || "Internal server error" });
});

export default app;
