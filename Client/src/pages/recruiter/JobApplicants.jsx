import { useEffect, useState } from "react";
import axios from "axios";

export default function JobApplicants({ jobId }) {
    const [apps, setApps] = useState([]);

    useEffect(() => {
        const fetchApplicants = async () => {
            const res = await axios.get(`/api/applications/job/${jobId}`, { withCredentials: true });
            setApps(res.data);
        };
        fetchApplicants();
    }, [jobId]);

    const updateStatus = async (id, status) => {
        await axios.put(`/api/applications/status/${id}`, { status }, { withCredentials: true });
        setApps(apps.map(app => app._id === id ? { ...app, status } : app));
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Applicants</h2>
            {apps.map(app => (
                <div key={app._id} className="border p-4 mb-4 rounded shadow">
                    <h3 className="text-xl font-semibold">{app.userId.name}</h3>
                    <p>Email: {app.userId.email}</p>
                    <p>ATS Score: <span className={app.userId.atsScore >= 80 ? "text-green-600" : app.userId.atsScore >= 50 ? "text-yellow-600" : "text-red-600"}>
                        {app.userId.atsScore}%
                    </span></p>
                    <p>Status: {app.status}</p>
                    <div className="space-x-2 mt-2">
                        <button onClick={() => updateStatus(app._id, "Shortlisted")} className="bg-blue-600 text-white px-3 py-1 rounded">Shortlist</button>
                        <button onClick={() => updateStatus(app._id, "Rejected")} className="bg-red-600 text-white px-3 py-1 rounded">Reject</button>
                        <button onClick={() => updateStatus(app._id, "Interview Scheduled")} className="bg-green-600 text-white px-3 py-1 rounded">Schedule Interview</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
