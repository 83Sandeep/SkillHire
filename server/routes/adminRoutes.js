import express from "express";
import User from "../models/User.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";
import { protect, protectRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats", protect, protectRole("admin"), async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalJobs = await Job.countDocuments();
        const totalApplications = await Application.countDocuments();

        res.status(200).json({ totalUsers, totalJobs, totalApplications });
    } catch (err) {
        res.status(500).json({ message: "Error fetching system stats" });
    }
});

router.delete("/prune", protect, protectRole("admin"), async (req, res) => {
    try {
        await Application.deleteMany({});
        res.status(200).json({ message: "Applications pruned" });
    } catch (err) {
        res.status(500).json({ message: "Error pruning applications" });
    }
});

export default router;
