import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Layout = () => {
    const navigate = useNavigate();
    const { logout } = useAuth(navigate);

    return (
        <>
            <nav className="navbar">
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/profile">Profile</Link>
                </div>
                <button onClick={logout}>Logout</button>
            </nav>
            <main className="main-content">
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
