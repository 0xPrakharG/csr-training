import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch("https://dummyjson.com/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username,
                password,
                expiresInMins: 30,
            }),
        });

        const data = await res.json();
        if (data.accessToken) {
            setToken(data.accessToken);
            navigate("/home");
        } else {
            setError("Login failed");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form>
                <label>
                    Username
                    <input
                        type="text"
                        placeholder="Enter your username..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    Password
                    <input
                        type="text"
                        placeholder="Enter your password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button onClick={handleLogin}>Login</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
};

export default Login;
