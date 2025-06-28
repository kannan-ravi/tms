import express from "express";
import {
  changeTaskStatus,
  createTasks,
  editTask,
  getIndividualsTasks,
  getMyTeamTasks,
  getOtherTeamTasks,
  getUserTasks,
} from "../controllers/tasks.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { uploadForTasks } from "../middleware/multer.middleware.js";
const router = express.Router();

router.get("/:id", verifyToken, getIndividualsTasks);
router.get("/myteam/:id", verifyToken, getMyTeamTasks);
router.get("/other-team-tasks/:id", verifyToken, getOtherTeamTasks);
router.get("/my-tasks/:id", verifyToken, getUserTasks);
router.put("/status", verifyToken, changeTaskStatus);
router.post(
  "/",
  verifyToken,
  uploadForTasks.array("tasks_images"),
  createTasks
);
router.put("/:id", verifyToken, editTask);

export default router;
