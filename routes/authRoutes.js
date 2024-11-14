import express from "express"

import { userRegister, login, verify } from "../controllers/AuthControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/register', userRegister)
router.post('/login', login)
router.get('/verify', authMiddleware, verify)

export default router;