import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    companyName: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: Number, required: true },
    experienceRequired: { type: String, required: true },
    skillsRequired: [{ type: String }],
    jobType: { type: String, enum: ["Full-time", "Part-time", "Remote", "Internship"], required: true },
    postedDate: { type: Date, default: Date.now },
    deadline: { type: Date, required: true }
}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);
export default Job;
