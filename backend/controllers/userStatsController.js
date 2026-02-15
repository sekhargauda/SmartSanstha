// backend/controllers/userStatsController.js
import UserStats from "../models/UserStats.js";
import User from "../models/User.js";
import { getOrCreateStats } from "../utils/statsHelper.js";
import { calculateTotalScore } from "../utils/scoreUtils.js";



function calculateGamePoints({ gameId, score = 0, timeTaken = 0, isWin = false, meta = {} }) {
  const time = Number(timeTaken) || 0;

  if (!isWin && time < 30) return 0;

  if (!isWin) {
    if (time >= 30 && time < 120) return 2;
    if (time >= 120 && time < 300) return 4;
    return 5;
  }

  if (gameId === "memory_game") {
    const moves = Number(meta.moves) || 9999;
    const totalPairs = Number(meta.totalPairs) || 0;

    if (totalPairs > 0) {
      if (moves <= totalPairs + 2) return 20;
      if (moves <= totalPairs + 5) return 15;
      if (moves <= totalPairs + 9) return 10;
      return 8;
    }
    return 10;
  }

  if (gameId === "jigsaw_puzzle") {
    const wrongDrops = Number(meta.wrongDrops) || 0;

    if (wrongDrops <= 2) return 15;
    if (wrongDrops <= 6) return 10;
    return 8;
  }

  if (gameId === "rights_duties_game") {
    const finalFreedom = Number(meta.finalFreedom ?? meta.freedom) || 0;
    const finalOrder = Number(meta.finalOrder ?? meta.order) || 0;
    const diff = Math.abs(finalFreedom - finalOrder);

    if (diff <= 15) return 20;
    if (diff <= 30) return 12;
    return 8;
  }

  if (gameId === "civic_city_builder") {
    const solved = Number(meta.solvedProblems) || 0;

    if (solved === 0) return 0;
    if (solved <= 3) return 5;
    if (solved <= 7) return 10;
    return 20;
  }

  return 10;
}

export const trackGameEnd = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;

    const stats = await getOrCreateStats(userId, req.user.type);

    if (!stats) {
      return res.status(403).json({
        success: false,
        message: "Stats not available for admin",
      });
    }


    const {
      sessionId,
      gameId,
      score = 0,
      timeTaken = 0,
      isWin = false,
      meta = {},
    } = req.body;

    if (!sessionId || !gameId) {
      return res.status(400).json({
        success: false,
        message: "sessionId and gameId are required",
      });
    }

    if (stats.playedSessions.includes(sessionId)) {
      return res.json({
        success: true,
        message: "⚠️ Already tracked",
        pointsAdded: 0,
        stats,
      });
    }

    const points = calculateGamePoints({
      gameId,
      score,
      timeTaken,
      isWin,
      meta,
    });

    stats.gamesPlayed += 1;
    stats.gameScore += points;

    stats.totalScore = calculateTotalScore(stats);

    stats.lastActive = new Date();
    stats.playedSessions.push(sessionId);


    if (stats.playedSessions.length > 50) {
      stats.playedSessions = stats.playedSessions.slice(-50);
    }

    await stats.save();

    return res.json({
      success: true,
      message: "✅ Game tracked",
      pointsAdded: points,
      stats,
    });

  } catch (error) {
    console.error("trackGameEnd error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

