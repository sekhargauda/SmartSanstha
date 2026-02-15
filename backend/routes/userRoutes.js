// routes/userRoutes.js
import express from 'express';
import * as userController from '../controllers/userController.js';
import { verifyAccessToken } from '../middleware/authMiddleware.js';
import { allowRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// GET /me should only require valid token, not role check
router.get('/me', verifyAccessToken, userController.getProfile);

// All other routes require both token AND user role
router.use(verifyAccessToken, allowRoles('user'));

router.put('/me', userController.updateProfile);
router.delete('/me', userController.deleteAccount);

export default router;