import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserData = () => {
    const navigate = useNavigate();
    let location = useLocation();

    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    const fetchUserData = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const response = await fetch("http://localhost:3008/sign", {
                method: "GET",
                headers: {
                    AUthorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                setError("Token expired or invalid");
            }

            const data = await response.json();
            setUser(data.data[0].user);
        } catch (error) {
            setError("Error Occured", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    useEffect(() => {
        fetchUserData();
    }, [navigate]);

    return (
        <div className="home-container">
            <h1>
                {location.pathname === "/"
                    ? "Home"
                    : location.pathname === "/about"
                    ? "About"
                    : "User"}{" "}
                Page
            </h1>
            {error && <p className="error">{error}</p>}
            {user ? (
                <>
                    <p>
                        Welcome, <strong>{user}</strong>!
                    </p>
                </>
            ) : (
                !error && <p>Loading user info...</p>
            )}
        </div>
    );
};

export default UserData;
