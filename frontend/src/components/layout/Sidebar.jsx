import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    Film,
    Ticket
} from "lucide-react";

function Sidebar() {

    const location = useLocation();

    const menus = [
        {
            title: "Dashboard",
            path: "/admin",
            icon: <LayoutDashboard size={20} />
        },
        {
            title: "Users",
            path: "/admin/users",
            icon: <Users size={20} />
        },
        {
            title: "Movies",
            path: "/admin/movies",
            icon: <Film size={20} />
        },
        {
            title: "Bookings",
            path: "/admin/bookings",
            icon: <Ticket size={20} />
        }
    ];

    return (
        <aside className="w-64 bg-slate-800 text-white min-h-screen">

            <div className="p-6 text-2xl font-bold border-b border-slate-700">
                Admin
            </div>

            <nav className="mt-5">

                {
                    menus.map((menu) => (

                        <Link
                            key={menu.path}
                            to={menu.path}
                            className={`flex items-center gap-3 px-6 py-3 transition

                                ${
                                    location.pathname === menu.path
                                        ? "bg-blue-600"
                                        : "hover:bg-slate-700"
                                }`}
                        >

                            {menu.icon}

                            {menu.title}

                        </Link>

                    ))
                }

            </nav>

        </aside>
    );
}

export default Sidebar;