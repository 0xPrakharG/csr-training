import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    });
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch("http://localhost:3008/sign", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.status) {
                if (data.data && data.data[0] && data.data[0].auth) {
                    localStorage.setItem("token", data.data[0].auth);
                    setFormData({
                        username: "",
                        password: "",
                        email: "",
                    });
                    navigate("/", { replace: true });
                } else {
                    setSuccess(data.message);
                }
            } else {
                setError(data.message || "Authentication failed");
            }
        } catch (err) {
            setError("Error: " + err.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        setDisabled(
            !(
                formData.username.trim() &&
                formData.password.trim() &&
                formData.email.trim() &&
                formData.email.includes("@")
            )
        );
    }, [formData]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/", { replace: true });
        }
    }, [navigate]);

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="card-header">
                    <h1>Login / Register</h1>
                </div>
                <div className="card-body">
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="login-button"
                            disabled={disabled}
                        >
                            Login / Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
