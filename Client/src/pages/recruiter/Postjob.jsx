import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PostJob() {
    const [form, setForm] = useState({
        companyName: "",
        title: "",
        description: "",
        location: "",
        salary: "",
        experienceRequired: "",
        skillsRequired: "",
        jobType: "Full-time",
        deadline: ""
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/jobs", { ...form, skillsRequired: form.skillsRequired.split(",") }, { withCredentials: true });
            alert("Job posted successfully!");
            navigate("/recruiter-dashboard");
        } catch (err) {
            alert("Error posting job");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Post a Job</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Company Name" value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })} className="w-full p-2 border rounded" />
                <input type="text" placeholder="Job Title" value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full p-2 border rounded" />
                <textarea placeholder="Description" value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full p-2 border rounded" />
                <input type="text" placeholder="Location" value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full p-2 border rounded" />
                <input type="number" placeholder="Salary" value={form.salary}
                    onChange={(e) => setForm({ ...form, salary: e.target.value })} className="w-full p-2 border rounded" />
                <input type="text" placeholder="Experience Required" value={form.experienceRequired}
                    onChange={(e) => setForm({ ...form, experienceRequired: e.target.value })} className="w-full p-2 border rounded" />
                <input type="text" placeholder="Skills (comma separated)" value={form.skillsRequired}
                    onChange={(e) => setForm({ ...form, skillsRequired: e.target.value })} className="w-full p-2 border rounded" />
                <select value={form.jobType} onChange={(e) => setForm({ ...form, jobType: e.target.value })}
                    className="w-full p-2 border rounded">
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Remote</option>
                    <option>Internship</option>
                </select>
                <input type="date" value={form.deadline}
                    onChange={(e) => setForm({ ...form, deadline: e.target.value })} className="w-full p-2 border rounded" />
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Post Job</button>
            </form>
        </div>
    );
}
