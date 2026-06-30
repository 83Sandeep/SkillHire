import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
    const [stats, setStats] = useState({ totalUsers: 0, totalJobs: 0, totalApplications: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            const res = await axios.get("/api/admin/stats", { withCredentials: true });
            setStats(res.data);
        };
        fetchStats();
    }, []);

    const pruneApplications = async () => {
        await axios.delete("/api/admin/prune", { withCredentials: true });
        alert("Applications pruned");
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
            <p>Total Users: {stats.totalUsers}</p>
            <p>Total Jobs: {stats.totalJobs}</p>
            <p>Total Applications: {stats.totalApplications}</p>
            <button onClick={pruneApplications} className="bg-red-600 text-white px-4 py-2 rounded mt-4">Prune Applications</button>
        </div>
    );
}
