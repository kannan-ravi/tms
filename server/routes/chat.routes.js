import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createGroupChat,
  deleteGroupChat,
  fetchChats,
  fetchSingleChat,
  getAllTeamChat,
} from "../controllers/chat.controller.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.get("/", verifyToken, fetchChats);
router.get("/all", verifyToken, getAllTeamChat);
router.get("/:id", verifyToken, fetchSingleChat);
router.post("/group", verifyAdmin, createGroupChat);
router.delete("/:id", verifyAdmin, deleteGroupChat);

export default router;
