import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js';
import { addDepartment, getDepartments, getDepartmentsById, updateDepartment, deleteDepartment } from '../controllers/DeparmentController.js';

const router = express.Router();

router.get('/list', authMiddleware, getDepartments)

router.post("/add", authMiddleware, addDepartment)
router.get('/get/:id', authMiddleware, getDepartmentsById)
router.put('/edit/:id', authMiddleware, updateDepartment)
router.delete("/delete/:id", authMiddleware, deleteDepartment)

export default router