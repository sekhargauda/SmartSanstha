// // backend/controllers/progressController.js
// import mongoose from "mongoose";
// import UserArticleProgress from "../models/UserArticleProgress.js";
// import UserStats from "../models/UserStats.js";

// const PART_TOTALS = {
//   Preamble: 1,

//   "Part I": 4,
//   "Part II": 7,
//   "Part III": 30,
//   "Part IV": 19,
//   "Part IV A": 1,

//   "Part V": 102,
//   "Part VI": 87,
//   "Part VII": 1,
//   "Part VIII": 7,

//   "Part IX": 16,
//   "Part IX A": 18,
//   "Part IX B": 13,

//   "Part X": 2,
//   "Part XI": 20,
//   "Part XII": 38,
//   "Part XIII": 6,
//   "Part XIV": 15,
//   "Part XIV A": 2,

//   "Part XV": 6,
//   "Part XVI": 14,
//   "Part XVII": 11,
//   "Part XVIII": 9,
//   "Part XIX": 9,
//   "Part XX": 1,
//   "Part XXI": 22,
//   "Part XXII": 4,
// };

// async function getOrCreateStats(userId) {
//   let stats = await UserStats.findOne({ user: userId });

//   // ✅ create with proper defaults (VERY IMPORTANT)
//   if (!stats) {
//     stats = await UserStats.create({
//       user: userId,
//       totalScore: 0,
//       articleScore: 0,
//       gameScore: 0,
//       articlesRead: 0,
//       gamesPlayed: 0,
//       quizzesTaken: 0,
//       currentStreak: 0,
//       playedSessions: [],
//     });
//   }

//   // ✅ ensure always number
//   stats.totalScore = Number(stats.totalScore || 0);
//   stats.articleScore = Number(stats.articleScore || 0);
//   stats.gameScore = Number(stats.gameScore || 0);
//   stats.articlesRead = Number(stats.articlesRead || 0);
//   stats.gamesPlayed = Number(stats.gamesPlayed || 0);

//   return stats;
// }

// const cleanArticleNumber = (raw) => {
//   const str = String(raw).trim();
//   if (str.toLowerCase().includes("preamble")) return "0";

//   const match = str.match(/(\d+[A-Za-z]*)/);
//   return match ? match[1] : str;
// };

// export const markArticleRead = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     let { articleNumber, partName } = req.body;

//     if (!articleNumber) {
//       return res.status(400).json({ message: "articleNumber is required" });
//     }

//     articleNumber = cleanArticleNumber(articleNumber);

//     // ✅ check article already completed or not
//     const existing = await UserArticleProgress.findOne({
//       user: userId,
//       articleNumber,
//     });

//     const wasAlreadyCompleted = existing?.status === "completed";

//     // ✅ mark as completed
//     await UserArticleProgress.findOneAndUpdate(
//       { user: userId, articleNumber },
//       {
//         $set: {
//           partName,
//           status: "completed",
//           lastReadAt: new Date(),
//         },
//       },
//       { upsert: true, new: true }
//     );

//     // ✅ update stats safely
//     const stats = await getOrCreateStats(userId);

//     // ✅ count completed for UI
//     const completedCount = await UserArticleProgress.countDocuments({
//       user: userId,
//       status: "completed",
//     });
//     stats.articlesRead = completedCount;

//     // ✅ add points ONLY if this is first time completing this article
//     if (!wasAlreadyCompleted) {
//       stats.articleScore += 10;
//     }

//     // ✅ totalScore ALWAYS = articleScore + gameScore
//     stats.totalScore = stats.articleScore + stats.gameScore;

//     stats.lastActive = new Date();
//     await stats.save();

//     return res.json({ success: true, stats });
//   } catch (err) {
//     console.error("markArticleRead error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// export const toggleBookmark = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { articleNumber, partName } = req.body;

//     if (!articleNumber) {
//       return res.status(400).json({ message: "articleNumber is required" });
//     }

//     let progress = await UserArticleProgress.findOne({
//       user: userId,
//       articleNumber,
//     });

//     if (!progress) {
//       progress = await UserArticleProgress.create({
//         user: userId,
//         articleNumber,
//         partName,
//         bookmarked: true,
//       });
//     } else {
//       progress.bookmarked = !progress.bookmarked;
//       progress.lastReadAt = new Date();
//       await progress.save();
//     }

//     return res.json({ success: true, bookmarked: progress.bookmarked });
//   } catch (err) {
//     console.error("toggleBookmark error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// export const getDashboardData = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const stats = await getOrCreateStats(userId);

//     const lastArticles = await UserArticleProgress.find({
//       user: userId,
//       status: "completed",
//     })
//       .sort({ lastReadAt: -1 })
//       .limit(3)
//       .lean();

//     const bookmarks = await UserArticleProgress.find({
//       user: userId,
//       bookmarked: true,
//     })
//       .sort({ updatedAt: -1 })
//       .lean();

//     // per-part progress
//     const perPartRaw = await UserArticleProgress.aggregate([
//       {
//         $match: {
//           user: new mongoose.Types.ObjectId(userId),
//           status: "completed",
//           partName: { $ne: null },
//         },
//       },
//       {
//         $group: {
//           _id: "$partName",
//           readCount: { $sum: 1 },
//         },
//       },
//       { $sort: { _id: 1 } },
//     ]);

//     const perPart = perPartRaw.map((p) => ({
//       partName: p._id,
//       readCount: p.readCount,
//       totalInPart: PART_TOTALS[p._id] ?? 0,
//     }));

//     return res.json({
//       success: true,
//       stats,
//       lastArticles,
//       bookmarks,
//       perPart,
//     });
//   } catch (err) {
//     console.error("getDashboardData error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };














// backend/controllers/progressController.js
import mongoose from "mongoose";
import UserArticleProgress from "../models/UserArticleProgress.js";
import { getOrCreateStats } from "../utils/statsHelper.js";
import { calculateTotalScore } from "../utils/scoreUtils.js";



const PART_TOTALS = {
  Preamble: 1,
  "Part I": 4, "Part II": 7, "Part III": 30, "Part IV": 19, "Part IV A": 1,
  "Part V": 102, "Part VI": 87, "Part VII": 1, "Part VIII": 7,
  "Part IX": 16, "Part IX A": 18, "Part IX B": 13,
  "Part X": 2, "Part XI": 20, "Part XII": 38, "Part XIII": 6, "Part XIV": 15, "Part XIV A": 2,
  "Part XV": 6, "Part XVI": 14, "Part XVII": 11, "Part XVIII": 9, "Part XIX": 9, "Part XX": 1, "Part XXI": 22, "Part XXII": 4,
};

// Helper to safely get User ID
const getUserId = (req) => {
  if (!req.user) return null;
  return req.user._id || req.user.id || req.user.userId;
};




const cleanArticleNumber = (raw) => {
  if (!raw) return "";
  const str = String(raw).trim();
  if (str.toLowerCase().includes("preamble")) return "0";
  const match = str.match(/Article\s*(\d+[A-Za-z]*)/i);
  if (match) return match[1];
  const digitMatch = str.match(/^(\d+[A-Za-z]*)$/);
  return digitMatch ? digitMatch[1] : str;
};

export const markArticleRead = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    let { articleNumber, partName } = req.body;
    if (!articleNumber)
      return res.status(400).json({ message: "articleNumber required" });

    articleNumber = cleanArticleNumber(articleNumber);

    let progress = await UserArticleProgress.findOne({ user: userId });

    if (!progress) {
      progress = await UserArticleProgress.create({ user: userId });
    }

    const alreadyCompleted = progress.completedArticles.some(
      (a) => a.articleNumber === articleNumber
    );

    if (!alreadyCompleted) {
      progress.completedArticles.push({
        articleNumber,
        partName,
      });
    }

    progress.recentlyRead = progress.recentlyRead.filter(
      (a) => a.articleNumber !== articleNumber
    );

    progress.recentlyRead.unshift({
      articleNumber,
      partName,
    });

    progress.recentlyRead = progress.recentlyRead.slice(0, 10);

    await progress.save();

    const stats = await getOrCreateStats(userId, req.user.type);

    if (stats) {
      stats.articlesRead = progress.completedArticles.length;
      stats.articleScore = stats.articlesRead * 10;
      stats.totalScore =
        stats.articleScore + stats.gameScore;
      stats.lastActive = new Date();
      await stats.save();
    }

    return res.json({ success: true, stats });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};


export const toggleBookmark = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    let { articleNumber, partName } = req.body;
    articleNumber = cleanArticleNumber(articleNumber);

    let progress = await UserArticleProgress.findOne({ user: userId });

    if (!progress) {
      progress = await UserArticleProgress.create({ user: userId });
    }

    const index = progress.bookmarks.findIndex(
      (b) => b.articleNumber === articleNumber
    );

    if (index > -1) {
      progress.bookmarks.splice(index, 1);
      await progress.save();
      return res.json({ success: true, bookmarked: false });
    }

    progress.bookmarks.push({
      articleNumber,
      partName,
    });

    await progress.save();

    return res.json({ success: true, bookmarked: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};


export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    if (!userId)
      return res.status(401).json({ message: "Unauthorized" });

    const stats = await getOrCreateStats(userId, req.user.type);
    if (!stats)
      return res.status(403).json({ success: false });

    const progress = await UserArticleProgress.findOne({
      user: userId,
    }).lean();

    const completed = progress?.completedArticles || [];

    // 🔥 PER PART CALCULATION
    const partMap = {};

    completed.forEach((a) => {
      if (!a.partName) return;
      if (!partMap[a.partName]) partMap[a.partName] = 0;
      partMap[a.partName]++;
    });

    const perPart = Object.keys(partMap).map((part) => ({
      partName: part,
      readCount: partMap[part],
      totalInPart: PART_TOTALS[part] || 0,
    }));

    const recentlyRead =
      progress?.recentlyRead
        ?.sort(
          (a, b) =>
            new Date(b.lastReadAt) - new Date(a.lastReadAt)
        )
        .slice(0, 3) || [];

    return res.json({
      success: true,
      stats,
      lastArticles: recentlyRead,
      bookmarks: progress?.bookmarks || [],
      perPart, // 🔥 RETURN REAL DATA
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

