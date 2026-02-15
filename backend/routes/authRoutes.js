// // routes/authRoutes.js
// import express from 'express';
// import * as authController from '../controllers/authController.js';
// import { verifyAccessToken } from '../middleware/authMiddleware.js';
// import { firebaseAuth } from '../controllers/firebaseAuthController.js';


// const router = express.Router();

// // User routes
// router.post('/register', authController.registerUser); // create user
// router.post('/login', authController.loginUser);
// router.post('/logout', authController.logout);
// router.post('/refresh', authController.refreshToken);
// router.post('/firebase', firebaseAuth);


// // Admin routes
// router.post('/admin/create', authController.createAdmin); // protected via master key in body
// router.post('/admin/login', authController.loginAdmin);

// export default router;










// backend/routes/authRoutes.js
// ⚠️ UPDATED - Removed traditional register/login routes
// Using Firebase for user authentication

import express from 'express';
import * as authController from '../controllers/authController.js';
import { firebaseAuth } from '../controllers/firebaseAuthController.js';

const router = express.Router();

// ========================================================
// USER AUTHENTICATION (Firebase)
// ========================================================
router.post('/firebase', firebaseAuth);         // Firebase login/register
router.post('/logout', authController.logout);   // Logout (clear cookies)
router.post('/refresh', authController.refreshToken); // Refresh access token

// ========================================================
// ADMIN AUTHENTICATION (Traditional JWT)
// ========================================================
router.post('/admin/login', authController.loginAdmin);       // Admin login
router.post('/admin/create', authController.createAdmin);     // Create admin (master key required)

export default router;