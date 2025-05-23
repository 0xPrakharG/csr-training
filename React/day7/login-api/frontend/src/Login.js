import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(true);

    const signin = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3008/sign", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok && data.status) {
            localStorage.setItem("token", data.data[0].auth);
            setFormData({
                username: "",
                email: "",
                password: "",
            });
            navigate("/", { replace: true });
        } else {
            setError(data.message);
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
        setDisabled(!(formData.username.trim() && formData.password.trim()));
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
                    <h1>Login</h1>
                </div>
                <div className="card-body">
                    <form onSubmit={signin}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your Email"
                                value={formData.email}
                                onChange={handleChange}
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
                            />
                        </div>
                        {error && <p>{error}</p>}
                        <button
                            type="submit"
                            className="login-button"
                            disabled={disabled}
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
