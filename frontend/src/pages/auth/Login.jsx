import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { login as loginService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Login() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            const response = await loginService(data);

            login(
                response.data.token,
                response.data.user
            );

            toast.success("Login berhasil");

            if (response.data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/customer");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Login gagal"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">

                <h1 className="text-3xl font-bold text-center mb-6">
                    Login
                </h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >

                    <div>
                        <label>Email</label>

                        <input
                            type="email"
                            className="w-full border rounded-lg p-2 mt-1"
                            {...register("email", {
                                required: "Email wajib diisi"
                            })}
                        />

                        <small className="text-red-500">
                            {errors.email?.message}
                        </small>
                    </div>

                    <div>
                        <label>Password</label>

                        <input
                            type="password"
                            className="w-full border rounded-lg p-2 mt-1"
                            {...register("password", {
                                required: "Password wajib diisi"
                            })}
                        />

                        <small className="text-red-500">
                            {errors.password?.message}
                        </small>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        {
                            loading
                                ? "Loading..."
                                : "Login"
                        }
                    </button>

                </form>

                <p className="text-center mt-6">

                    Belum punya akun?

                    <Link
                        to="/register"
                        className="text-blue-600 ml-2"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;