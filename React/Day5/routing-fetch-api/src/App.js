import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import ProductsPage from "./pages/ProductsPage";

function App() {
    const [accessToken, setAccessToken] = useState("");

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login setToken={setAccessToken} />} />
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute accessToken={accessToken}>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute accessToken={accessToken}>
                            <ProfilePage accessToken={accessToken} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/products"
                    element={
                        <ProtectedRoute accessToken={accessToken}>
                            <ProductsPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
