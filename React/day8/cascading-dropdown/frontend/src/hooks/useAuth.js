const { useState, useEffect } = require("react");

const useAuth = (navigate) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(null);

    const fetchUserData = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch("http://localhost:3008/sign", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                setError("Token expired or invalid");
                setUser(null);
                return;
            }

            const data = await response.json();
            setUser(data.data[0].user);
            setError("");
        } catch (error) {
            setError("Error Occured", error);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        if (navigate) {
            navigate("/login");
        }
    };

    return {
        user,
        error,
        fetchUserData,
        loading,
        logout,
    };
};

export default useAuth;
