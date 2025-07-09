import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import restrictDemoUser from '../middleware/restrictDemoUser.js';
import upload from '../middleware/upload.js';

import {
  addEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  fetchEmployeesByDepId,
  updateEmployeeImage
} from '../controller/employeeController.js';

const router = express.Router();

router.get('/', authMiddleware, getEmployees);

router.post(
  '/add',
  authMiddleware,
  restrictDemoUser,
  upload.single('profileImage'),
  addEmployee
);

router.get('/:id', authMiddleware, getEmployee);

router.put(
  '/:id',
  authMiddleware,
  restrictDemoUser,
  upload.single('profileImage'),
  updateEmployee
);

router.put(
  '/update-image/:id',
  authMiddleware,
  restrictDemoUser,
  upload.single('profileImage'),
  updateEmployeeImage
);

router.get('/department/:id', authMiddleware, fetchEmployeesByDepId);

export default router;