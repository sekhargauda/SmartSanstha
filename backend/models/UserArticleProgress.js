// backend/models/UserArticleProgress.js
import mongoose from "mongoose";

const userArticleProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    completedArticles: [
      {
        articleNumber: {
          type: String,
          required: true,
        },
        partName: {
          type: String,
        },
        completedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    bookmarks: [
      {
        articleNumber: {
          type: String,
          required: true,
        },
        partName: {
          type: String,
        },
        bookmarkedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    recentlyRead: [
      {
        articleNumber: {
          type: String,
          required: true,
        },
        partName: {
          type: String,
        },
        lastReadAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model(
  "UserArticleProgress",
  userArticleProgressSchema
);
