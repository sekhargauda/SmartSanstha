// routes/adminRoutes.js
import express from 'express';
import * as adminController from '../controllers/adminController.js';
import { verifyAccessToken } from '../middleware/authMiddleware.js';
import { allowRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// All routes below require a valid access token from a user with the 'admin' type.
router.use(verifyAccessToken, allowRoles('admin'));

// --- User Management Routes ---
router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserById);
router.post('/users', adminController.createUserAsAdmin);
router.put('/users/:id', adminController.updateUserByAdmin);
router.delete('/users/:id', adminController.deleteUserByAdmin);

// --- Admin Management Routes ---
// The superadmin check has been removed. Any admin can now access these endpoints.
router.get('/admins', adminController.getAllAdmins);
router.put('/admins/:id', adminController.updateAdmin);
router.delete('/admins/:id', adminController.deleteAdmin);

router.get('/stats', adminController.getAdminStats);

export default router;
