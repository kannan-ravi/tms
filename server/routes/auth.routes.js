import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
const router = express.Router();

router.post("/register", verifyAdmin, register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
