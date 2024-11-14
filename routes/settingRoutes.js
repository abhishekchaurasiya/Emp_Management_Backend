import express from "express";
import { changePassword } from "../controllers/SettingController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/change-password", changePassword);

export default router;
