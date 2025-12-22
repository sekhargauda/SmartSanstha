// backend/models/UserArticleProgress.js
import mongoose from "mongoose";

const userArticleProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    articleNumber: {
      type: String,
      required: true, // "0" for Preamble, "1", "21A", etc.
    },
    partName: {
      type: String, // e.g. "Preamble", "Part I", "Part III"
    },
    status: {
      type: String,
      enum: ["not-started", "in-progress", "completed"],
      default: "in-progress",
    },
    lastReadAt: {
      type: Date,
      default: Date.now,
    },
    bookmarked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Enforce one document per user+article
userArticleProgressSchema.index({ user: 1, articleNumber: 1 }, { unique: true });

export default mongoose.model("UserArticleProgress", userArticleProgressSchema);
