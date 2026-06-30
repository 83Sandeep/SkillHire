import Job from "../models/Job.js";

export const createJob = async (req, res) => {
    try {
        const job = await Job.create({ ...req.body, recruiterId: req.user.id });
        res.status(201).json(job);
    } catch (err) {
        res.status(500).json({ message: "Error creating job" });
    }
};

export const getJobs = async (req, res) => {
    try {
        const { title, company, location, jobType, experienceRequired } = req.query;
        const query = {};

        if (title) query.title = { $regex: title, $options: "i" };
        if (company) query.companyName = { $regex: company, $options: "i" };
        if (location) query.location = { $regex: location, $options: "i" };
        if (jobType) query.jobType = jobType;
        if (experienceRequired) query.experienceRequired = experienceRequired;

        const jobs = await Job.find(query).sort({ postedDate: -1 });
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ message: "Error fetching jobs" });
    }
};


export const getRecruiterJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ recruiterId: req.user.id }).sort({ postedDate: -1 });
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ message: "Error fetching recruiter jobs" });
    }
};

export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });
        if (job.recruiterId.toString() !== req.user.id) return res.status(403).json({ message: "Not authorized" });

        await job.deleteOne();
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting job" });
    }
};
