// // backend/middleware/authMiddleware.js

// import jwt from 'jsonwebtoken';
// import Admin from '../models/Admin.js';
// import User from '../models/User.js';
// import dotenv from 'dotenv';

// dotenv.config();

// export const verifyAccessToken = async (req, res, next) => {
//   try {
//     // Access token from httpOnly cookie or Authorization header
//     const token =
//       req.cookies?.accessToken ||
//       (req.headers.authorization && req.headers.authorization.split(' ')[1]);

//     if (!token) {
//       return res.status(401).json({ message: 'No token provided' });
//     }

//     const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
//     // Payload contains { id, type } where type is 'admin' or 'user'
    
//     // ---
//     // 💡 BUG FIX:
//     // The recommendations route expects the full user object on `req.user`.
//     // We will fetch the profile and attach it to `req.user`.
//     // ---

//     // Optionally fetch full user/admin profile
//     if (payload.type === 'user') {
//       // Fetch the full user profile and attach it to req.user
//       req.user = await User.findById(payload.id).select('-password');
//       req.profile = req.user; // Also assign to req.profile in case other routes use it
//     } else if (payload.type === 'admin') {
//       // Handle admin logic
//       req.user = await Admin.findById(payload.id).select('-password');
//       req.profile = req.user; // Also assign to req.profile
//     } else {
//       // Fallback in case payload has no type (shouldn't happen with your setup)
//       req.user = payload;
//     }

//     // Check if user was not found after trying to fetch
//     if (!req.user) {
//       return res.status(401).json({ message: 'Invalid token. User not found.' });
//     }

//     next();
//   } catch (err) {
//     console.error(err);
//     return res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };













// backend/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

export const verifyAccessToken = async (req, res, next) => {
  try {
    // Access token from httpOnly cookie or Authorization header
    const token =
      req.cookies?.accessToken ||
      (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    // Payload contains { id, type } where type is 'admin' or 'user'
    
    console.log('🔑 JWT Payload:', payload); // Debug log

    // Fetch full user/admin profile
    if (payload.type === 'user') {
      const userProfile = await User.findById(payload.id).select('-password');
      
      if (!userProfile) {
        return res.status(401).json({ message: 'Invalid token. User not found.' });
      }
      
      // ✅ FIX: Convert mongoose document to plain object and add type from JWT
      req.user = {
        ...userProfile.toObject(),
        type: 'user' // Preserve type from JWT payload
      };
      req.profile = req.user;
      
      console.log('👤 User authenticated:', req.user.name, 'Type:', req.user.type);
      
    } else if (payload.type === 'admin') {
      const adminProfile = await Admin.findById(payload.id).select('-password');
      
      if (!adminProfile) {
        return res.status(401).json({ message: 'Invalid token. Admin not found.' });
      }
      
      // ✅ FIX: Convert mongoose document to plain object and add type from JWT
      req.user = {
        ...adminProfile.toObject(),
        type: 'admin' // Preserve type from JWT payload
      };
      req.profile = req.user;
      
      console.log('🛡️  Admin authenticated:', req.user.name, 'Type:', req.user.type);
      
    } else {
      return res.status(401).json({ message: 'Invalid token type' });
    }

    next();
  } catch (err) {
    console.error('❌ Auth middleware error:', err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};