import express from 'express';
import { dashboardStats, getUsers } from '../controllers/adminController.js';
import { adminOnly, protect } from '../middleware/auth.js';
const router = express.Router();
router.get('/stats', protect, adminOnly, dashboardStats);
router.get('/users', protect, adminOnly, getUsers);
export default router;
