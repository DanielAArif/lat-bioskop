import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createUser, updateUser } from "../../services/userService";

function UserModal({ isOpen, onClose, onSuccess, user }) {
    const initialState = {
        id_user: "", // Ditambahkan jika perlu input manual ID string char(4)
        nama: "",
        email: "",
        password: "",
        nomor_telepon: "",
        role: "customer"
    };

    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                id_user: user.id_user || "",
                nama: user.nama || "",
                email: user.email || "",
                password: "", // Dikosongkan saat edit demi keamanan
                nomor_telepon: user.nomor_telepon || "",
                role: user.role || "customer"
            });
        } else {
            setFormData(initialState);
        }
    }, [user, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(false);

        try {
            if (user) {
                await updateUser(user.id_user, formData);
                toast.success("Data user berhasil diperbarui");
            } else {
                if (!formData.password) {
                    toast.error("Password wajib diisi untuk user baru");
                    return;
                }
                await createUser(formData);
                toast.success("User baru berhasil ditambahkan");
            }
            onSuccess();
            onClose();
        } catch (error) {
            toast.error(
                error.response?.data?.message || 
                "Terjadi kesalahan saat menyimpan data"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden transform transition-all p-6 max-h-[90vh] overflow-y-auto">
                
                <div className="flex justify-between items-center mb-4 pb-2 border-b">
                    <h3 className="text-xl font-bold text-gray-800">
                        {user ? "Edit User" : "Tambah User Baru"}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-lg">×</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Input ID User hanya muncul/bisa diisi saat Tambah Baru */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">ID User (4 Karakter)</label>
                        <input
                            type="text"
                            name="id_user"
                            value={formData.id_user}
                            onChange={handleChange}
                            maxLength={4}
                            placeholder="U001"
                            disabled={!!user} // Di-disable jika sedang mode EDIT
                            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Lengkap</label>
                        <input
                            type="text"
                            name="nama"
                            value={formData.nama}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Nomor Telepon</label>
                        <input
                            type="text"
                            name="nomor_telepon"
                            value={formData.nomor_telepon}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Password {user && <span className="text-xs font-normal text-gray-400">(Kosongkan jika tidak diganti)</span>}
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder={user ? "••••••••" : "Masukkan password"}
                            required={!user}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Role Akses</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition disabled:bg-gray-400"
                        >
                            {loading ? "Menyimpan..." : "Simpan"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserModal;