import express from 'express'
import { attendanceReport, getAttendance, updateAttendance } from '../controller/attendanceController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import restrictDemoUser from '../middleware/restrictDemoUser.js';
import defaultAttendance from '../middleware/defaultAttendance.js';

const router = express.Router();

router.get('/', authMiddleware, defaultAttendance, getAttendance);
router.put('/update/:employeeId', authMiddleware, restrictDemoUser, updateAttendance);
router.get('/report', authMiddleware, attendanceReport);

export default router;
