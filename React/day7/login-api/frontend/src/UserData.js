import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const UserData = () => {
    const navigate = useNavigate();
    let location = useLocation();
    const { user, error, loading } = useAuth(navigate);

    return (
        <div className="home-container">
            <h1 style={{ textTransform: "capitalize" }}>
                {location.pathname.split("/")[1] === ""
                    ? "Home"
                    : location.pathname.split("/")[1]}{" "}
                Page
            </h1>
            {error && <p className="error">{error}</p>}
            {user ? (
                <>
                    <p>
                        Welcome, <strong>{user}</strong>!
                    </p>
                </>
            ) : (
                loading && !error && <p>Loading user info...</p>
            )}
        </div>
    );
};

export default UserData;
