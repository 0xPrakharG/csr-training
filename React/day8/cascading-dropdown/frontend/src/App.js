import "./index.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import ProfileView from "./pages/ProfileView";
import ProfileForm from "./components/ProfileForm";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<ProfileView />} />
                    <Route path="/profile/edit" element={<ProfileForm />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
