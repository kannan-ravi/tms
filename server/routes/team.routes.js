import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createTeam,
  deleteTeam,
  getAllTeams,
  getSingleTeam,
} from "../controllers/team.controller.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.get("/all-teams", verifyAdmin, getAllTeams);
router.get("/:id", verifyToken, getSingleTeam);
router.post("/", verifyAdmin, createTeam);
router.delete("/:id", verifyAdmin, deleteTeam);
export default router;
