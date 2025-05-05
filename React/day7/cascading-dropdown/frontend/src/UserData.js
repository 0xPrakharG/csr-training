import { useLocation } from "react-router-dom";
import ProfileView from "./components/ProfileView";

const UserData = () => {
    let location = useLocation();

    return (
        <div className="user-data-container">
            <h1 style={{ textTransform: "capitalize" }}>
                {location.pathname.split("/")[1] === ""
                    ? "Home"
                    : location.pathname.split("/")[1]}{" "}
                Page
            </h1>

            <ProfileView />
        </div>
    );
};

export default UserData;
