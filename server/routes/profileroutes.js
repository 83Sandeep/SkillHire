import express from "express";
import { getProfile, updateProfile, uploadResume } from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../config/cloudinary.js";  // ✅ only import upload

const router = express.Router();

// Routes
router.get("/", protect, getProfile);
router.put("/", protect, updateProfile);
router.post("/upload-resume", protect, upload.single("resume"), uploadResume);

export default router;
