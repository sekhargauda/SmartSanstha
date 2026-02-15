// backend/utils/statsHelper.js

import UserStats from "../models/UserStats.js";
import User from "../models/User.js";

export const getOrCreateStats = async (userId, userType) => {
  if (userType !== "user") {
    return null;
  }

  const user = await User.findById(userId);
  if (!user) return null;

  const stats = await UserStats.findOneAndUpdate(
    { user: userId },
    {
      $setOnInsert: {
        user: userId,
        email: user.email,
        articleScore: 0,
        gameScore: 0,
        totalScore: 0,
        articlesRead: 0,
        gamesPlayed: 0,
        quizzesTaken: 0,
        quizzesScore: {},
        currentStreak: 0,
        playedSessions: [],
        lastActive: new Date(),
      },
    },
    {
      new: true,
      upsert: true,
    }
  );

  return stats;
};
