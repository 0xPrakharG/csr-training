import { Link, Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <>
            <nav className="navbar">
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/user">User Data</Link>
                </div>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            <main className="main-content">
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
