import express from "express";
import { applyJob, getMyApplications } from "../controllers/applicationController.js";
import { protect, protectRole } from "../middleware/authMiddleware.js";
import { getJobApplicants, updateApplicationStatus } from "../controllers/applicationController.js";
const router = express.Router();

router.post("/apply/:jobId", protect, protectRole("job_seeker"), applyJob);
router.get("/my-applications", protect, protectRole("job_seeker"), getMyApplications);
router.get("/job/:jobId", protect, protectRole("recruiter"), getJobApplicants);
router.put("/status/:id", protect, protectRole("recruiter"), updateApplicationStatus);
export default router;
