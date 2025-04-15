import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, accessToken }) => {
    if (!accessToken) return <Navigate to="/" replace />;
    return children;
};

export default ProtectedRoute;
