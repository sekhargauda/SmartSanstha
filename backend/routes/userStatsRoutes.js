// backend/routes/userStatsRoutes.js
import express from "express";
import { verifyAccessToken } from "../middleware/authMiddleware.js";
import { trackGameEnd } from "../controllers/userStatsController.js";

const router = express.Router();

router.post("/track-game", verifyAccessToken, trackGameEnd);

export default router;
