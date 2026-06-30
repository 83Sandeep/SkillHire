import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const { register } = useContext(AuthContext);
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "job_seeker" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(form.name, form.email, form.password, form.role);
            navigate("/");
        } catch (err) {
            alert(err);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <input type="text" placeholder="Name" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full p-2 border mb-3 rounded" />
                <input type="email" placeholder="Email" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full p-2 border mb-3 rounded" />
                <input type="password" placeholder="Password" value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full p-2 border mb-3 rounded" />
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full p-2 border mb-3 rounded">
                    <option value="job_seeker">Job Seeker</option>
                    <option value="recruiter">Recruiter</option>
                </select>
                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Register</button>
            </form>
        </div>
    );
}
