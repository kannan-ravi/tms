import express from "express";
import { deleteUser, getAllUsers } from "../controllers/user.controller.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.get("/get-all-users", verifyAdmin, getAllUsers);
router.delete("/:id", verifyAdmin, deleteUser);
export default router;
