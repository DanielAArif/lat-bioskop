import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";

function AdminLayout() {

    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1 flex flex-col min-h-screen">

                <Navbar />

                <main className="flex-1 p-6 bg-gray-100">

                    <Outlet />

                </main>

                <Footer />

            </div>

        </div>

    );
}

export default AdminLayout;