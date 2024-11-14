import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  addEmployee,
  getEmployee,
  getEmployeeById,
  updateEmployee,
  getEmployeeByDepId
} from "../controllers/EmployeeController.js";
import uploadImage from "../config/multer.js"

const router = express.Router();

router.get("/list", authMiddleware, getEmployee);

router.post("/add", authMiddleware, uploadImage.single('image'), addEmployee);
router.get("/:id", authMiddleware, getEmployeeById);
router.put("/:id", authMiddleware, updateEmployee);
router.get("/department/:id", authMiddleware, getEmployeeByDepId)


export default router;
