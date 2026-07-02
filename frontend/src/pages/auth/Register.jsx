import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { register as registerService } from "../../services/authService";

function Register() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const password = watch("password");

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            delete data.confirmPassword;

            const response = await registerService(data);

            toast.success(
                response.message || "Registrasi berhasil"
            );

            navigate("/login");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Registrasi gagal"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">

                <h1 className="text-3xl font-bold text-center mb-6">
                    Register
                </h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >

                    <div>
                        <label>Nama</label>

                        <input
                            type="text"
                            className="w-full border rounded-lg p-2 mt-1"
                            {...register("nama", {
                                required: "Nama wajib diisi"
                            })}
                        />

                        <small className="text-red-500">
                            {errors.nama?.message}
                        </small>
                    </div>

                    <div>
                        <label>Nomor Telepon</label>

                        <input
                            type="text"
                            className="w-full border rounded-lg p-2 mt-1"
                            placeholder="08xxxxxxxxxx"
                            {...register("nomor_telepon", {
                                required: "Nomor telepon wajib diisi",
                                pattern: {
                                    value: /^08[0-9]{8,11}$/,
                                    message: "Nomor telepon tidak valid"
                                }
                            })}
                        />

                        <small className="text-red-500">
                            {errors.nomor_telepon?.message}
                        </small>
                    </div>

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
                                required: "Password wajib diisi",
                                minLength: {
                                    value: 6,
                                    message: "Minimal 6 karakter"
                                }
                            })}
                        />

                        <small className="text-red-500">
                            {errors.password?.message}
                        </small>
                    </div>

                    <div>
                        <label>Konfirmasi Password</label>

                        <input
                            type="password"
                            className="w-full border rounded-lg p-2 mt-1"
                            {...register("confirmPassword", {
                                required: "Konfirmasi password wajib diisi",
                                validate: value =>
                                    value === password ||
                                    "Password tidak sama"
                            })}
                        />

                        <small className="text-red-500">
                            {errors.confirmPassword?.message}
                        </small>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
                    >
                        {loading ? "Loading..." : "Register"}
                    </button>

                </form>

                <p className="text-center mt-6">
                    Sudah punya akun?

                    <Link
                        to="/login"
                        className="text-blue-600 ml-2"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Register;