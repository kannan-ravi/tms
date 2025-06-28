import express from "express";
import {
  createCheckList,
  deleteCheckList,
  editCheckList,
} from "../controllers/checklist.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/", verifyToken, createCheckList);
router.delete("/:id", verifyToken, deleteCheckList);
router.put("/", verifyToken, editCheckList);

export default router;
