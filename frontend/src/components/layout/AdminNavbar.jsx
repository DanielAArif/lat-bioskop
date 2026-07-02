import { Link, useLocation } from "react-router-dom";
import UserDropdown from "./UserDropdown";

function AdminNavbar() {
    const location = useLocation();

    // Gaya menu navigasi: menggunakan hitam solid saat aktif, abu-abu saat tidak aktif
    const linkStyle = (path) => 
        `text-xs font-medium uppercase tracking-wider transition-colors relative py-1 ${
            location.pathname.startsWith(path) 
                ? "text-gray-950 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gray-950" 
                : "text-gray-400 hover:text-gray-900"
        }`;

    return (
        // Header: Putih bersih, tanpa bayangan tebal, menggunakan border-gray-100 yang halus
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center sticky top-0 z-40">
            
            <div className="flex items-center gap-10">
                {/* Logo Brand: Minimalis, Hitam Tegas */}
                <Link to="/admin" className="text-sm font-bold tracking-widest text-gray-950 uppercase transition-opacity hover:opacity-80">
                    Lat Bioskop 
                    <span className="text-[10px] font-medium tracking-normal border border-gray-200 text-gray-500 px-1.5 py-0.5 rounded ml-2 uppercase">
                        AdminPanel
                    </span>
                </Link>

                {/* Link Navigasi Menu Utama Admin */}
                <nav className="hidden md:flex items-center gap-6 h-full">
                    <Link to="/admin/movies" className={linkStyle("/admin/movies")}>
                        Film
                    </Link>
                    <Link to="/admin/users" className={linkStyle("/admin/users")}>
                        Pengguna
                    </Link>
                    <Link to="/admin/bookings" className={linkStyle("/admin/bookings")}>
                        Booking
                    </Link>
                </nav>
            </div>

            {/* Bagian Kanan Navbar */}
            <div className="flex items-center gap-4">
                <UserDropdown />
            </div>
        </header>
    );
}

export default AdminNavbar;