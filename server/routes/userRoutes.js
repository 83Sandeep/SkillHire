import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// Use authController for registration/login (cookie-based auth)
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
