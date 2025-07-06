import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import restrictDemoUser from '../middleware/restrictDemoUser.js';
import {
  addDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
} from '../controller/departmentController.js';

const router = express.Router();

router.get('/', authMiddleware, getDepartments);
router.post('/add', authMiddleware, restrictDemoUser, addDepartment);
router.get('/:id', authMiddleware, getDepartment);
router.put('/:id', authMiddleware, restrictDemoUser, updateDepartment);
router.delete('/:id', authMiddleware, restrictDemoUser, deleteDepartment);

export default router;
