import { Link, useLocation } from "react-router-dom";
import UserDropdown from "./UserDropdown";

function Navbar() {
    const location = useLocation();

    // Menentukan posisi halaman saat ini
    const isAtMoviesPage = location.pathname === "/customer/movies";
    const isAtBookingPage = location.pathname === "/customer/bookings" || location.pathname.includes("booking");

    return (
        // Header: Putih bersih, tanpa shadow, menggunakan border-gray-100 yang tipis
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center sticky top-0 z-40">
            
            {/* Bagian Kiri: Logo & Navigasi Dinamis */}
            <div className="flex items-center gap-10">
                {/* Logo Brand: Hitam minimalis & tegas dengan spasi huruf renggang */}
                <Link to="/customer/movies" className="text-sm font-bold tracking-widest text-gray-950 uppercase transition-opacity hover:opacity-80">
                    Lat Bioskop
                </Link>

                {/* Navigasi Dinamis Tanpa Emoji dengan Text Style Modern */}
                <nav className="flex items-center gap-6">
                    {/* Jika SEDANG di halaman booking, tampilkan link ke Daftar Film */}
                    {isAtBookingPage && (
                        <Link 
                            to="/customer/movies" 
                            className="text-xs font-medium uppercase tracking-wider text-gray-400 hover:text-gray-900 transition-colors py-1"
                        >
                            Daftar Film
                        </Link>
                    )}

                    {/* Jika SEDANG di halaman movies, tampilkan link ke Booking Saya */}
                    {isAtMoviesPage && (
                        <Link 
                            to="/customer/bookings" 
                            className="text-xs font-medium uppercase tracking-wider text-gray-400 hover:text-gray-900 transition-colors py-1"
                        >
                            Booking Saya
                        </Link>
                    )}
                </nav>
            </div>

            {/* Bagian Kanan: Dropdown User */}
            <div className="flex items-center gap-4">
                <UserDropdown />
            </div>

        </header>
    );
}

export default Navbar;