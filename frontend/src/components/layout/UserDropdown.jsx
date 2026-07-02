import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function UserDropdown() {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const handleLogout = () => {

        logout();

        navigate("/login");
    };

    return (

        <div className="flex items-center gap-4">

            <span className="font-medium">
                {user?.nama}
            </span>

            <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
                Logout
            </button>

        </div>

    );
}

export default UserDropdown;