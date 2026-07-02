function UserTable({ users, onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-left">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">No</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama Lengkap</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Nomor Telepon</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                                Tidak ada data user ditemukan.
                            </td>
                        </tr>
                    ) : (
                        users.map((user, index) => (
                            <tr key={user.id_user || index} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{index + 1}</td>
                                <td className="px-6 py-4 text-sm font-mono text-gray-600 whitespace-nowrap">{user?.id_user || "-"}</td>
                                <td className="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">{user?.nama || "-"}</td>
                                <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{user?.email || "-"}</td>
                                <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{user?.nomor_telepon || "-"}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        user?.role === "admin" 
                                            ? "bg-red-100 text-red-800" 
                                            : "bg-blue-100 text-blue-800"
                                    }`}>
                                        {user?.role || "customer"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium">
                                    <div className="flex justify-center gap-4">
                                        <button
                                            onClick={() => onEdit(user)}
                                            className="text-indigo-600 hover:text-indigo-900 font-medium"
                                        >
                                            Kelola
                                        </button>

                                        <button
                                            onClick={() => onDelete(user)}
                                            className="text-red-600 hover:text-red-900 font-medium"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;