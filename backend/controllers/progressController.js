// backend/controllers/progressController.js
import mongoose from "mongoose";
import UserArticleProgress from "../models/UserArticleProgress.js";
import UserStats from "../models/UserStats.js";

const PART_TOTALS = {
  // special
  Preamble: 1,

  // core Parts
  "Part I": 4,
  "Part II": 7,
  "Part III": 30,
  "Part IV": 19,
  "Part IV A": 1,

  "Part V": 102,
  "Part VI": 87,
  "Part VII": 1,
  "Part VIII": 7,

  "Part IX": 16,
  "Part IX A": 18,
  "Part IX B": 13,

  "Part X": 2,
  "Part XI": 20,
  "Part XII": 38,
  "Part XIII": 6,
  "Part XIV": 15,
  "Part XIV A": 2,

  "Part XV": 6,
  "Part XVI": 14,
  "Part XVII": 11,
  "Part XVIII": 9,
  "Part XIX": 9,
  "Part XX": 1,
  "Part XXI": 22,
  "Part XXII": 4,
};

async function getOrCreateStats(userId) {
  let stats = await UserStats.findOne({ user: userId });
  if (!stats) stats = await UserStats.create({ user: userId });
  return stats;
}

const cleanArticleNumber = (raw) => {
  const str = String(raw).trim();
  if (str.toLowerCase().includes("preamble")) return "0";
  const match = str.match(/(\d+[A-Za-z]*)/);
  return match ? match[1] : str;
};

export const markArticleRead = async (req, res) => {
  try {
    const userId = req.user.id;
    let { articleNumber, partName } = req.body;

    if (!articleNumber) {
      return res.status(400).json({ message: "articleNumber is required" });
    }

    // normalize before saving
    articleNumber = cleanArticleNumber(articleNumber);

    const progress = await UserArticleProgress.findOneAndUpdate(
      { user: userId, articleNumber },
      {
        $set: { partName, status: "completed", lastReadAt: new Date() },
      },
      { upsert: true, new: true }
    );

    // update stats
    const stats = await getOrCreateStats(userId);
    const completedCount = await UserArticleProgress.countDocuments({
      user: userId,
      status: "completed",
    });
    stats.articlesRead = completedCount;
    stats.lastActive = new Date();
    await stats.save();

    return res.json({ success: true, progress, stats });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const toggleBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const { articleNumber, partName } = req.body;

    if (!articleNumber) {
      return res.status(400).json({ message: "articleNumber is required" });
    }

    let progress = await UserArticleProgress.findOne({
      user: userId,
      articleNumber,
    });

    if (!progress) {
      progress = await UserArticleProgress.create({
        user: userId,
        articleNumber,
        partName,
        bookmarked: true,
      });
    } else {
      progress.bookmarked = !progress.bookmarked;
      progress.lastReadAt = new Date();
      await progress.save();
    }

    return res.json({ success: true, bookmarked: progress.bookmarked });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    const stats = await getOrCreateStats(userId);

    const lastArticles = await UserArticleProgress.find({
      user: userId,
      status: "completed",
    })
      .sort({ lastReadAt: -1 })
      .limit(3)
      .lean();

    const bookmarks = await UserArticleProgress.find({
      user: userId,
      bookmarked: true,
    })
      .sort({ updatedAt: -1 })
      .lean();

    // per‑part progress
    const perPartRaw = await UserArticleProgress.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          status: "completed",
          partName: { $ne: null },
        },
      },
      {
        $group: {
          _id: "$partName",
          readCount: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const perPart = perPartRaw.map((p) => ({
      partName: p._id,
      readCount: p.readCount,
      totalInPart: PART_TOTALS[p._id] ?? 0,
    }));

    return res.json({
      success: true,
      stats,
      lastArticles,
      bookmarks,
      perPart,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
