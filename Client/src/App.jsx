import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/protected" element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                        <h1>Admin Protected Page</h1>
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;
