import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["Pending", "Shortlisted", "Rejected", "Interview Scheduled"], default: "Pending" },
    appliedDate: { type: Date, default: Date.now }
}, { timestamps: true });

const Application = mongoose.model("Application", applicationSchema);
export default Application;
