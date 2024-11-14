import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getSummary } from "../controllers/AdminSummaryController.js";

const router = express.Router();

router.get("/summary/:id", authMiddleware, getSummary);

export default router;
