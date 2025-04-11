import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="login-form">
            <form className="form">
                <label for="email">
                    Email
                    <input
                        type="text"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label for="password">
                    Password
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <Link to="/home">Login</Link>
            </form>
            <p>
                Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
};

export default Login;
