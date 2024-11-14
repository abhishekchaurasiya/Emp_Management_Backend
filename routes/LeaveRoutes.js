import express from "express";
import {
  addLeave,
  getLeaveList,
  getLeaves,
  getLeaveDetails,
  updateLeaveStatus
} from "../controllers/LeaveController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addLeave);
router.get("/list", authMiddleware, getLeaves);
router.get("/details/:id", authMiddleware, getLeaveDetails);
router.get("/list/:id/:role", authMiddleware, getLeaveList);
router.put("/status/:id", authMiddleware, updateLeaveStatus);

export default router;
