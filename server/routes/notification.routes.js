import express from "express";
import { getUserNotifications } from "../controllers/notification.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/:id", verifyToken, getUserNotifications);
export default router;