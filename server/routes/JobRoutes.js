import express from "express";
import { createJob, getJobs, getRecruiterJobs, deleteJob } from "../controllers/jobController.js";
import { protect, protectRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, protectRole("recruiter"), createJob);
router.get("/", getJobs);
router.get("/recruiter", protect, protectRole("recruiter"), getRecruiterJobs);
router.delete("/:id", protect, protectRole("recruiter"), deleteJob);

export default router;
