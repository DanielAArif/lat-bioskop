import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import AdminDashboard from "../pages/admin/Dashboard";

import AdminLayout from "../layouts/AdminLayout";
import CustomerLayout from "../layouts/CustomerLayout";

import Users from "../pages/admin/Users";
import Movies from "../pages/admin/Movies";
import Bookings from "../pages/admin/Bookings";

import CustomerMovies from "../pages/customer/Movies";
import MyBookings from "../pages/customer/MyBookings";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route element={<ProtectedRoute />}>

                    <Route element={<RoleRoute role="admin" />}>

                        <Route element={<AdminLayout />}>

                            <Route
                                path="/admin"
                                element={<AdminDashboard />}
                            />

                            <Route
                                path="/admin/users"
                                element={<Users />}
                            />

                            <Route
                                path="/admin/movies"
                                element={<Movies />}
                            />

                            <Route
                                path="/admin/bookings"
                                element={<Bookings />}
                            />

                        </Route>

                    </Route>

                    <Route element={<RoleRoute role="customer" />}>

                        <Route element={<CustomerLayout />}>

                            <Route
                                path="/customer/movies"
                                element={<CustomerMovies />}
                            />

                            <Route
                                path="/customer/bookings"
                                element={<MyBookings />}
                            />

                        </Route>

                    </Route>

                </Route>

                <Route
                    path="*"
                    element={<h1>404 Not Found</h1>}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;