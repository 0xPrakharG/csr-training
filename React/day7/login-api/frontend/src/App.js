import { useEffect, useState } from "react";
import "./index.css";

function App() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [disabled, setDisabled] = useState(true);

    const signin = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3008/sign", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log(data);
        if (response.ok) {
            localStorage.setItem("userData", JSON.stringify(data));
            setFormData({
                username: "",
                password: "",
            });
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
        if (formData.username.trim() && formData.password.trim()) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [formData]);

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
}

export default App;
