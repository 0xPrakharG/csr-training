import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    });
    const [errors, setErrors] = useState({
        username: "",
        password: "",
        email: "",
    });
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [touchedFields, setTouchedFields] = useState({
        username: false,
        password: false,
        email: false,
    });

    const validateUsername = (username) => {
        if (!username.trim()) return "Username is required";
        if (username.length < 3)
            return "Username must be at least 3 characters";
        if (username.length > 20)
            return "Username must be less than 20 characters";
        if (!/^[a-zA-Z0-9_]+$/.test(username))
            return "Username can only contain letters, numbers and underscores";
        return "";
    };

    const validateEmail = (email) => {
        if (!email.trim()) return "Email is required";
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email))
            return "Please enter a valid email address";
        return "";
    };

    const validatePassword = (password) => {
        if (!password.trim()) return "Password is required";
        if (password.length < 8)
            return "Password must be at least 8 characters";
        if (!/(?=.*[a-z])/.test(password))
            return "Password must contain at least one lowercase letter";
        if (!/(?=.*[A-Z])/.test(password))
            return "Password must contain at least one uppercase letter";
        if (!/(?=.*\d)/.test(password))
            return "Password must contain at least one number";
        if (!/(?=.*[!@#$%^&*])/.test(password))
            return "Password must contain at least one special character (!@#$%^&*)";
        return "";
    };

    const validateForm = () => {
        const usernameError = validateUsername(formData.username);
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);

        setErrors({
            username: usernameError,
            email: emailError,
            password: passwordError,
        });

        return !usernameError && !emailError && !passwordError;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!validateForm()) {
            return;
        }

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

        if (touchedFields[name]) {
            let fieldError = "";

            if (name === "username") fieldError = validateUsername(value);
            else if (name === "email") fieldError = validateEmail(value);
            else if (name === "password") fieldError = validatePassword(value);

            setErrors((prev) => ({
                ...prev,
                [name]: fieldError,
            }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;

        setTouchedFields((prev) => ({
            ...prev,
            [name]: true,
        }));

        let fieldError = "";

        if (name === "username") fieldError = validateUsername(value);
        else if (name === "email") fieldError = validateEmail(value);
        else if (name === "password") fieldError = validatePassword(value);

        setErrors((prev) => ({
            ...prev,
            [name]: fieldError,
        }));
    };

    useEffect(() => {
        const isFormValid =
            !validateUsername(formData.username) &&
            !validateEmail(formData.email) &&
            !validatePassword(formData.password);

        setDisabled(!isFormValid);
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

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                    errors.username && touchedFields.username
                                        ? "input-error"
                                        : ""
                                }
                                required
                            />
                            {errors.username && touchedFields.username && (
                                <p className="error-text">{errors.username}</p>
                            )}
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
                                onBlur={handleBlur}
                                className={
                                    errors.email && touchedFields.email
                                        ? "input-error"
                                        : ""
                                }
                                required
                            />
                            {errors.email && touchedFields.email && (
                                <p className="error-text">{errors.email}</p>
                            )}
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
                                onBlur={handleBlur}
                                className={
                                    errors.password && touchedFields.password
                                        ? "input-error"
                                        : ""
                                }
                                required
                            />
                            {errors.password && touchedFields.password && (
                                <p className="error-text">{errors.password}</p>
                            )}
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
