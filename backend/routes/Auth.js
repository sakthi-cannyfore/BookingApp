import express from "express";
import { createUser, LoginUser } from "../controllers/AuthController.js";

const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(LoginUser);

export default router;
