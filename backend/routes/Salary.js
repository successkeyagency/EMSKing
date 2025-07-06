import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import restrictDemoUser from '../middleware/restrictDemoUser.js';
import { addSalary, getSalary } from '../controller/SalaryController.js';

const router = express.Router();

router.post('/add', authMiddleware, restrictDemoUser, addSalary);
router.get('/:id/:role', authMiddleware, getSalary);

export default router;
