import { Link } from "react-router-dom";

const SignUp = () => {
    return (
        <div className="login-form">
            <form className="form">
                <label for="email">
                    Email
                    <input type="text" name="email" />
                </label>
                <label for="password">
                    Password
                    <input type="password" name="password" />
                </label>
                <Link to="/home">Sign up</Link>
            </form>
            <p>
                Already have an account? <Link to="/">Login</Link>
            </p>
        </div>
    );
};

export default SignUp;
