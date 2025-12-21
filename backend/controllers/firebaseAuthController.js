import admin from "../config/firebaseAdmin.js";
import User from "../models/User.js";
import getCategoryFromDOB from "../utils/categorize.js";

export const firebaseAuth = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No Firebase token" });
    }

    const token = authHeader.split(" ")[1];

    // ✅ Verify Firebase token
    const decoded = await admin.auth().verifyIdToken(token);

    const email = decoded.email?.toLowerCase();
    const name = decoded.name || "User";

    if (!email) {
      return res.status(400).json({ message: "Email not found in token" });
    }

    // 🔍 Check MongoDB
    let user = await User.findOne({ email });

    if (!user) {
      // ⚠️ DOB is mandatory in your schema
      // Using a safe default → advanced_learner
      const dob = new Date("2000-01-01");

      user = new User({
        name,
        email,
        dob,
        category: getCategoryFromDOB(dob),
        password: "firebase-auth", // dummy (never used)
      });

      await user.save();
    }

    return res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        category: user.category,
      },
    });
  } catch (err) {
    console.error("Firebase auth error:", err.message);
    return res.status(401).json({ message: "Invalid Firebase token" });
  }
};
