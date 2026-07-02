import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/layout/AdminNavbar";
import Footer from "../components/layout/Footer";

function AdminLayout() {
    return (
        // Layout satu kolom penuh tanpa sidebar
        <div className="flex flex-col min-h-screen bg-white">
            
            {/* Navigasi Atas Admin */}
            <AdminNavbar />

            {/* Area Konten Utama: Menggunakan bg-gray-50/50 agar ada kontras sangat tipis dengan tabel putih */}
            <main className="flex-1 px-8 py-10 bg-gray-50/40">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>

            {/* Footer bawah */}
            <Footer />
            
        </div>
    );
}

export default AdminLayout;