import "./index.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Home from "./Home";
import About from "./About";
import UserData from "./UserData";
import Layout from "./components/Layout";
import ProfileView from "./components/ProfileView";
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
                    <Route path="/about" element={<About />} />
                    <Route path="/profile" element={<ProfileView />} />
                    <Route path="/profile/edit" element={<ProfileForm />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
