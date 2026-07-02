import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RoleRoute({ role }) {

    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== role) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default RoleRoute;