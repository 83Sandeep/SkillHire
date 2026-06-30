import { useState, useEffect } from "react";
import axios from "axios";

export default function JobSearch() {
    const [jobs, setJobs] = useState([]);
    const [filters, setFilters] = useState({ title: "", company: "", location: "", jobType: "", experienceRequired: "" });

    useEffect(() => {
        const fetchJobs = async () => {
            const res = await axios.get("/api/jobs", { params: filters });
            setJobs(res.data);
        };
        fetchJobs();
    }, [filters]);

    const handleApply = async (id) => {
        try {
            await axios.post(`/api/applications/apply/${id}`, {}, { withCredentials: true });
            alert("Applied successfully!");
        } catch (err) {
            alert(err.response?.data?.message || "Error applying");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Job Search</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <input placeholder="Title" value={filters.title} onChange={(e) => setFilters({ ...filters, title: e.target.value })} className="p-2 border rounded" />
                <input placeholder="Company" value={filters.company} onChange={(e) => setFilters({ ...filters, company: e.target.value })} className="p-2 border rounded" />
                <input placeholder="Location" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} className="p-2 border rounded" />
                <select value={filters.jobType} onChange={(e) => setFilters({ ...filters, jobType: e.target.value })} className="p-2 border rounded">
                    <option value="">All Types</option>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Remote</option>
                    <option>Internship</option>
                </select>
                <input placeholder="Experience Required" value={filters.experienceRequired} onChange={(e) => setFilters({ ...filters, experienceRequired: e.target.value })} className="p-2 border rounded" />
            </div>

            <div>
                {jobs.map(job => (
                    <div key={job._id} className="border p-4 mb-4 rounded shadow">
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <p>{job.companyName} - {job.location}</p>
                        <p>{job.description}</p>
                        <button onClick={() => handleApply(job._id)} className="bg-green-600 text-white px-3 py-1 rounded mt-2">Apply</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
