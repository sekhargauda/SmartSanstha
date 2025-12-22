// backend/controllers/progressController.js
import UserArticleProgress from "../models/UserArticleProgress.js";
import UserStats from "../models/UserStats.js";

async function getOrCreateStats(userId) {
  let stats = await UserStats.findOne({ user: userId });
  if (!stats) stats = await UserStats.create({ user: userId });
  return stats;
}

const cleanArticleNumber = (raw) => {
  const str = String(raw).trim();
  if (str.toLowerCase().includes("preamble")) return "0";
  const match = str.match(/(\d+)/);
  return match ? match[1] : str;
};

export const markArticleRead = async (req, res) => {
  try {
    const userId = req.user.id;
    let { articleNumber, partName } = req.body;

    if (!articleNumber) {
      return res.status(400).json({ message: "articleNumber is required" });
    }

    // 🔧 normalize before saving
    articleNumber = cleanArticleNumber(articleNumber);

    const progress = await UserArticleProgress.findOneAndUpdate(
      { user: userId, articleNumber },          // now "323"
      {
        $set: { partName, status: "completed", lastReadAt: new Date() },
      },
      { upsert: true, new: true }
    );

    // update stats
    const stats = await getOrCreateStats(userId);
    // count distinct completed articles
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

    if (!articleNumber)
      return res.status(400).json({ message: "articleNumber is required" });

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

    // ⬇️ get last 3 completed articles
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

    return res.json({
      success: true,
      stats,
      lastArticles,          // ⬅️ array, not single item
      bookmarks,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

