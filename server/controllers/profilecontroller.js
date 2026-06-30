import User from "../models/User.js";
import axios from "axios";

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "Profile not found" });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error fetching profile" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const updates = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select("-password");
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error updating profile" });
    }
};

export const uploadResume = async (req, res) => {
    try {
        if (!req.file || !req.file.path) return res.status(400).json({ message: "No file uploaded" });

        const resumeUrl = req.file.path;

        const fileResponse = await axios.get(resumeUrl, { responseType: "arraybuffer" });
        const buffer = Buffer.from(fileResponse.data);
        const FormData = (await import("form-data")).default;
        const formData = new FormData();
        formData.append("file", buffer, {
            filename: req.file.originalname || "resume",
            contentType: req.file.mimetype || "application/octet-stream"
        });
        formData.append("jobSkills", req.body.jobSkills || "");

        const aiRes = await axios.post(`${process.env.AI_SERVICE_URL}/api/ai/parse-and-score`, formData, {
            headers: formData.getHeaders()
        });

        const { atsScore, matchedSkills, missingSkills } = aiRes.data;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { resumeUrl, atsScore, skills: matchedSkills },
            { new: true }
        ).select("-password");

        res.status(200).json({ user, missingSkills });
    } catch (err) {
        res.status(500).json({ message: "Error uploading resume" });
    }
};
