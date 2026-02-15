// import admin from "../config/firebaseAdmin.js";
// import User from "../models/User.js";
// import getCategoryFromDOB from "../utils/categorize.js";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

// // same helpers as in authController
// const createAccessToken = (payload) =>
//   jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
//     expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "15m",
//   });

// const createRefreshToken = (payload) =>
//   jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
//     expiresIn: process.env.REFRESH_TOKEN_EXPIRES || "7d",
//   });

// const isProduction =
//   process.env.NODE_ENV === "production" || process.env.RENDER === "true";

// const cookieOptions = {
//   httpOnly: true,
//   secure: isProduction,
//   sameSite: isProduction ? "none" : "lax",
//   path: "/",
// };

// export const firebaseAuth = async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "No Firebase token" });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = await admin.auth().verifyIdToken(token);
//     const email = decoded.email?.toLowerCase();
//     const name = decoded.name || "User";

//     if (!email) {
//       return res.status(400).json({ message: "Email not found in token" });
//     }

//     let user = await User.findOne({ email });

//     if (!user) {
//       const dob = new Date("2000-01-01");

//       user = new User({
//         name,
//         email,
//         dob,
//         category: getCategoryFromDOB(dob),
//         password: "firebase-auth",
//       });

//       await user.save();
//     }

//     // 🔥 create app tokens + cookies
//     const accessToken = createAccessToken({ id: user._id, type: "user" });
//     const refreshToken = createRefreshToken({ id: user._id, type: "user" });

//     res.cookie("accessToken", accessToken, {
//       ...cookieOptions,
//       maxAge: 15 * 60 * 1000,
//     });
//     res.cookie("refreshToken", refreshToken, {
//       ...cookieOptions,
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     return res.json({
//       success: true,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         category: user.category,
//       },
//     });
//   } catch (err) {
//     console.error("Firebase auth error:", err.message);
//     return res.status(401).json({ message: "Invalid Firebase token" });
//   }
// };






// backend/controllers/firebaseAuthController.js
import admin from "../config/firebaseAdmin.js";
import User from "../models/User.js";
import getCategoryFromDOB from "../utils/categorize.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// JWT token creation helpers
const createAccessToken = (payload) =>
  jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "15m",
  });

const createRefreshToken = (payload) =>
  jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES || "7d",
  });

const isProduction =
  process.env.NODE_ENV === "production" || process.env.RENDER === "true";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  path: "/",
};

/**
 * Firebase Authentication Handler
 * Verifies Firebase ID token and creates/logs in user
 */
export const firebaseAuth = async (req, res) => {
  try {
    // 1. Extract Firebase token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in again."
      });
    }

    const token = authHeader.split(" ")[1];

    // 2. Verify Firebase ID token
    let decoded;
    try {
      decoded = await admin.auth().verifyIdToken(token);
    } catch (firebaseError) {
      console.error("Firebase token verification failed:", firebaseError.message);

      // Provide specific error messages
      if (firebaseError.code === "auth/id-token-expired") {
        return res.status(401).json({
          success: false,
          message: "Your session has expired. Please log in again."
        });
      }
      if (firebaseError.code === "auth/argument-error") {
        return res.status(401).json({
          success: false,
          message: "Invalid authentication token."
        });
      }

      return res.status(401).json({
        success: false,
        message: "Authentication failed. Please log in again."
      });
    }

    // 3. Extract user info from decoded token
    const email = decoded.email?.toLowerCase();
    const name = decoded.name || "User";

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email not found in authentication token."
      });
    }

    // 4. Find or create user in MongoDB
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if doesn't exist
      const { dob } = req.body;

      if (!dob) {
        return res.status(400).json({
          success: false,
          message: "Date of birth is required."
        });
      }


      user = new User({
        name,
        email,
        dob,
        category: getCategoryFromDOB(dob),
        password: "firebase-auth-user", // Placeholder password for Firebase users
      });

      await user.save();
      console.log(`✅ New Firebase user created: ${email}`);
    } else {
      console.log(`✅ Existing user logged in: ${email}`);
    }

    // 5. Create JWT tokens for session management
    const accessToken = createAccessToken({ id: user._id, type: "user" });
    const refreshToken = createRefreshToken({ id: user._id, type: "user" });

    // 6. Set JWT tokens as httpOnly cookies
    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 7. Return success response
    return res.json({
      success: true,
      message: "Authentication successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        category: user.category,
      },
    });
  } catch (err) {
    console.error("Firebase auth error:", err.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred during authentication. Please try again."
    });
  }
};