import { useState, useEffect } from "react";
import axios from "axios";

export default function CompleteProfile() {
    const [profile, setProfile] = useState(null);
    const [form, setForm] = useState({ skills: [], education: [], experience: [] });
    const [resumeFile, setResumeFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const res = await axios.get("/api/profile", { withCredentials: true });
            setProfile(res.data);
            setForm({
                skills: res.data.skills || [],
                education: res.data.education || [],
                experience: res.data.experience || []
            });
        };
        fetchProfile();
    }, []);

    const handleUpdate = async () => {
        await axios.put("/api/profile", form, { withCredentials: true });
        alert("Profile updated!");
    };

    const handleResumeUpload = async () => {
        if (!resumeFile) return alert("Please select a resume file");
        const formData = new FormData();
        formData.append("resume", resumeFile);
        setUploading(true);
        try {
            const res = await axios.post("/api/profile/upload-resume", formData, {
                withCredentials: true
            });
            setProfile(res.data.user);
            alert(`Resume uploaded! ATS Score: ${res.data.user.atsScore}`);
        } catch (err) {
            alert("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Complete Your Profile</h2>
            <div className="mb-4">
                <label className="block mb-2">Skills</label>
                <input
                    type="text"
                    value={form.skills.join(",")}
                    onChange={(e) => setForm({ ...form, skills: e.target.value.split(",") })}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Education</label>
                <input
                    type="text"
                    value={form.education.join(",")}
                    onChange={(e) => setForm({ ...form, education: e.target.value.split(",") })}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Experience</label>
                <input
                    type="text"
                    value={form.experience.join(",")}
                    onChange={(e) => setForm({ ...form, experience: e.target.value.split(",") })}
                    className="w-full p-2 border rounded"
                />
            </div>
            <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded">Save Profile</button>

            <div className="mt-6">
                <label className="block mb-2">Upload Resume</label>
                <input type="file" onChange={(e) => setResumeFile(e.target.files[0])} />
                <button
                    onClick={handleResumeUpload}
                    disabled={uploading}
                    className="bg-green-600 text-white px-4 py-2 rounded mt-2"
                >
                    {uploading ? "Uploading..." : "Upload Resume"}
                </button>
            </div>
        </div>
    );
}
