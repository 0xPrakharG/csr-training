import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProfileField from "../components/Profile/ProfileField";

const ProfilePage = ({ accessToken }) => {
    const [user, setUser] = useState(null);
    const [keys, setKeys] = useState([]);
    const [loading, setLoading] = useState(true);

    const getCurrentUser = async () => {
        if (!accessToken) return;

        try {
            const res = await fetch("https://dummyjson.com/user/me", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                // credentials: "include",
            });

            const data = await res.json();
            console.log(data);
            setUser(data);
            setKeys(Object.keys(data));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, [accessToken]);

    const flattenObject = (obj) => {
        const result = [];

        const recurse = (value) => {
            if (value === null || value === undefined) return;
            if (typeof value === "object" && !Array.isArray(value)) {
                Object.values(value).forEach(recurse);
            } else if (Array.isArray(value)) {
                value.forEach(recurse);
            } else {
                result.push(value);
            }
        };

        recurse(obj);
        return result.join(", ");
    };

    const formatData = (value) => {
        if (typeof value === "object" && value !== null) {
            return flattenObject(value);
        }
        return value;
    };

    return (
        <div>
            <Navbar />
            {loading ? (
                <div className="loader">Loading User Profile...</div>
            ) : (
                <div className="profile-container">
                    <h2>User Profile</h2>
                    {keys &&
                        keys.map((key, index) => (
                            <ProfileField
                                key={index}
                                label={key}
                                value={formatData(user[key])}
                            />
                        ))}
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
