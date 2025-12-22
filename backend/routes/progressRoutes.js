// backend/routes/progressRoutes.js
import express from "express";
import { verifyAccessToken } from "../middleware/authMiddleware.js";
import {
  markArticleRead,
  toggleBookmark,
  getDashboardData,
} from "../controllers/progressController.js";

const router = express.Router();

router.use(verifyAccessToken); // user must be logged in

router.post("/article/read", markArticleRead);
router.post("/article/bookmark", toggleBookmark);
router.get("/dashboard", getDashboardData);

export default router;
