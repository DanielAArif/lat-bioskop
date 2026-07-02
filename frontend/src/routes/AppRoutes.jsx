import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import AdminDashboard from "../pages/admin/Dashboard";
import CustomerDashboard from "../pages/customer/Dashboard";

import AdminLayout from "../layouts/AdminLayout";
import CustomerLayout from "../layouts/CustomerLayout";

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

                        </Route>

                    </Route>

                    <Route element={<RoleRoute role="customer" />}>

                        <Route element={<CustomerLayout />}>

                            <Route
                                path="/customer"
                                element={<CustomerDashboard />}
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