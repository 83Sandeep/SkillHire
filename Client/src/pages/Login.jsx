import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/");
        } catch (err) {
            alert(err);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <input type="email" placeholder="Email" value={email}
                    onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border mb-3 rounded" />
                <input type="password" placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border mb-3 rounded" />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
            </form>
        </div>
    );
}
