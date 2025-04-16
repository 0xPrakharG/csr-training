import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();

    const getHeaderText = () => {
        switch (location.pathname) {
            case "/home":
                return "Users List";
            case "/products":
                return "Products List";
            case "/cart":
                return "Shopping Cart";
            case "/profile":
                return "User Profile";
            default:
                return "Dashboard";
        }
    };

    return (
        <nav className="navbar">
            <h2 className="nav-header">{getHeaderText()}</h2>
            <div className="nav-links">
                <Link className="nav-link" to="/products">
                    Products
                </Link>
                <Link className="nav-link">Cart</Link>
                <Link className="nav-link" to="/profile">
                    Profile
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
