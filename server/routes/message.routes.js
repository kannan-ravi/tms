import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getAllMessage,
  markAsSeen,
  sendDocument,
  sendMessage,
} from "../controllers/message.controller.js";
import { uploadForChatFile } from "../middleware/multer.middleware.js";

const router = express.Router();

router.post("/", verifyToken, sendMessage);
router.post(
  "/file",
  verifyToken,
  uploadForChatFile.single("chat_document"),
  sendDocument
);
router.get("/:id", verifyToken, getAllMessage);
router.put('/seen/:messageId', verifyToken, markAsSeen)
export default router;
