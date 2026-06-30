import { useEffect, useState } from "react";
import axios from "axios";

export default function AppliedJobs() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            const res = await axios.get("/api/applications/my-applications", { withCredentials: true });
            setApplications(res.data);
        };
        fetchApplications();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">My Applications</h2>
            <div>
                {applications.map(app => (
                    <div key={app._id} className="border p-4 mb-4 rounded shadow">
                        <h3 className="text-xl font-semibold">{app.jobId.title}</h3>
                        <p>{app.jobId.companyName} - {app.jobId.location}</p>
                        <p>Status: <span className="font-bold">{app.status}</span></p>
                        <p>Applied on: {new Date(app.appliedDate).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

