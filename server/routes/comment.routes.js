import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createComments } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/", verifyToken, createComments);

export default router;
