import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function RecruiterDashboard() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            const res = await axios.get("/api/jobs/recruiter", { withCredentials: true });
            setJobs(res.data);
        };
        fetchJobs();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`/api/jobs/${id}`, { withCredentials: true });
        setJobs(jobs.filter(job => job._id !== id));
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Recruiter Dashboard</h2>
            <Link to="/post-job" className="bg-blue-600 text-white px-4 py-2 rounded">Post New Job</Link>
            <div className="mt-6">
                {jobs.map(job => (
                    <div key={job._id} className="border p-4 mb-4 rounded shadow">
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <p>{job.companyName} - {job.location}</p>
                        <p>Deadline: {new Date(job.deadline).toLocaleDateString()}</p>
                        <button onClick={() => handleDelete(job._id)} className="bg-red-600 text-white px-3 py-1 rounded mt-2">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
