import Application from "../models/Application.js";
import Job from "../models/Job.js";

export const applyJob = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ message: "Job not found" });

        const existing = await Application.findOne({ userId: req.user.id, jobId });
        if (existing) return res.status(400).json({ message: "Already applied to this job" });

        const application = await Application.create({
            userId: req.user.id,
            jobId,
            recruiterId: job.recruiterId
        });

        res.status(201).json(application);
    } catch (err) {
        res.status(500).json({ message: "Error applying to job" });
    }
};

export const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ userId: req.user.id })
            .populate("jobId")
            .sort({ appliedDate: -1 });

        res.status(200).json(applications);
    } catch (err) {
        res.status(500).json({ message: "Error fetching applications" });
    }
};

export const getJobApplicants = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const applications = await Application.find({ jobId })
            .populate("userId", "-password")
            .sort({ atsScore: -1 });

        res.status(200).json(applications);
    } catch (err) {
        res.status(500).json({ message: "Error fetching applicants" });
    }
};

export const updateApplicationStatus = async (req, res) => {
    try {
        const appId = req.params.id;
        const { status } = req.body;

        const application = await Application.findById(appId);
        if (!application) return res.status(404).json({ message: "Application not found" });

        application.status = status;
        await application.save();

        res.status(200).json(application);
    } catch (err) {
        res.status(500).json({ message: "Error updating application status" });
    }
};
