// routes/authRoutes.js
import express from 'express';
import * as authController from '../controllers/authController.js';
import { verifyAccessToken } from '../middleware/authMiddleware.js';
import { firebaseAuth } from '../controllers/firebaseAuthController.js';


const router = express.Router();

// User routes
router.post('/register', authController.registerUser); // create user
router.post('/login', authController.loginUser);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refreshToken);
router.post('/firebase', firebaseAuth);


// Admin routes
router.post('/admin/create', authController.createAdmin); // protected via master key in body
router.post('/admin/login', authController.loginAdmin);

export default router;
