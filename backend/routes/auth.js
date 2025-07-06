import express from 'express'
import { signin, verify } from '../controller/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'


const router = express.Router()

router.post('/signin', signin)
router.get('/verify', authMiddleware, verify)

export default router;