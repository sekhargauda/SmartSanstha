// backend/server.js

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/database.js";
import articleRoutes from "./routes/articleRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import courtRoutes from "./routes/courtRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import { verifyAccessToken } from "./middleware/authMiddleware.js";
import userStatsRoutes from "./routes/userStatsRoutes.js";

// =====================================================
// Path resolution for ES Modules
// =====================================================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "./.env") });
console.log("📝 Environment loaded");

const app = express();
const PORT = process.env.PORT || 5001;

// =====================================================
// MIDDLEWARE
// =====================================================
console.log("⚙️ Setting up middleware...");

const allowedOrigins = [
  "http://localhost:5173",
  "https://smartsansthaindia.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

console.log("✅ Middleware configured");

// =====================================================
// HEALTH CHECK
// =====================================================
app.get("/api/health", (req, res) => {
  const dbState = connectDB ? "configured" : "unavailable";

  res.json({
    success: true,
    status: "healthy",
    service: "smartsanstha-backend",
    database: dbState,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// =====================================================
// API ROUTES
// =====================================================
app.use("/api/articles", articleRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/quiz", verifyAccessToken, quizRoutes);
app.use("/api/court", courtRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/user-stats", userStatsRoutes);

// =====================================================
// API 404 HANDLER
// =====================================================
app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
    path: req.originalUrl,
  });
});

// =====================================================
// GLOBAL ERROR HANDLER
// =====================================================
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.message);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// =====================================================
// START SERVER
// =====================================================
console.log("🚀 Starting server...");

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("=".repeat(50));
      console.log("✅ Server is RUNNING!");
      console.log(`🌐 Local: http://localhost:${PORT}`);
      console.log(`📍 API Base: http://localhost:${PORT}/api`);
      console.log(`❤️ Health: http://localhost:${PORT}/api/health`);
      console.log("=".repeat(50));
    });
  })
  .catch((error) => {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  });