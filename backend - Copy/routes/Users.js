import express from "express";
import {
  createUser,
  updateUserById,
  deleteUsers,
  getAllUsers,
} from "../controllers/UserController.js";
import { verifyAdmin, verifyUser } from "../utils/VerifyToken.js";

const router = express.Router();

router.route("/").post(verifyUser, createUser).get(verifyAdmin, getAllUsers);
router
  .route("/:id")
  .put(verifyUser, updateUserById)
  .delete(verifyUser, deleteUsers);

export default router;
