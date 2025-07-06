import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import restrictDemoUser from '../middleware/restrictDemoUser.js';
import {
  addLeave,
  getLeave,
  getLeaves,
  getLeaveDetail,
  updateLeave,
} from '../controller/leaveController.js';

const router = express.Router();

router.post('/add', authMiddleware, restrictDemoUser, addLeave);
router.get('/detail/:id', authMiddleware, getLeaveDetail);
router.get('/:id/:role', authMiddleware, getLeave);
router.get('/', authMiddleware, getLeaves);
router.put('/:id', authMiddleware, restrictDemoUser, updateLeave);

export default router;
