import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import restrictDemoUser from '../middleware/restrictDemoUser.js';
import { changePassword } from '../controller/settingController.js';

const router = express.Router();

router.put('/change-password', authMiddleware, restrictDemoUser, changePassword);

export default router;
