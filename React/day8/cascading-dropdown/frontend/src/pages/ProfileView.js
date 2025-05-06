import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProfileView = () => {
    const navigate = useNavigate();
    const { error: authError } = useAuth(navigate);

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch("http://localhost:3008/getProfile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (data.status) {
                setProfile(data.data);
            } else {
                setError(data.message || "Failed to load profile");
            }
        } catch (err) {
            setError("Error loading profile: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [navigate]);

    if (authError) {
        return <p className="error">{authError}</p>;
    }

    if (loading) {
        return <div className="profile-loading">Loading profile...</div>;
    }

    if (error) {
        return (
            <div className="profile-error">
                <p className="error">{error}</p>
                <p>You may need to create your profile first.</p>
                <button
                    className="create-profile-btn"
                    onClick={() => navigate("/profile/edit")}
                >
                    Create Profile
                </button>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="no-profile">
                <p>No profile found. Please create your profile.</p>
                <button
                    className="create-profile-btn"
                    onClick={() => navigate("/profile/edit")}
                >
                    Create Profile
                </button>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <h2>User Profile</h2>

            <div className="profile-card">
                <div className="profile-header">
                    <h3>{profile.name}</h3>
                </div>

                <div className="profile-details">
                    <div className="profile-item">
                        <span className="label">Username:</span>
                        <span
                            className="value"
                            style={{ textTransform: "capitalize" }}
                        >
                            {profile.username}
                        </span>
                    </div>
                    <div className="profile-item">
                        <span className="label">Email:</span>
                        <span className="value">{profile.email}</span>
                    </div>
                    <div className="profile-item">
                        <span className="label">Age:</span>
                        <span className="value">{profile.age}</span>
                    </div>
                    <div className="profile-item">
                        <span className="label">Gender:</span>
                        <span
                            className="value"
                            style={{ textTransform: "capitalize" }}
                        >
                            {profile.gender}
                        </span>
                    </div>
                    <div className="profile-item">
                        <span className="label">Address:</span>
                        <span className="value">{profile.address}</span>
                    </div>
                    <div className="profile-item">
                        <span className="label">Location:</span>
                        <span className="value">
                            {profile.city}, {profile.state}, {profile.country}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;
