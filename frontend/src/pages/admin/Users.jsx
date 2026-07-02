import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getUsers,
    deleteUser
} from "../../services/userService";

import UserTable from "../../components/user/UserTable";
import UserModal from "../../components/user/UserModal";

function Users() {
    const [users, setUsers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = async () => {
        try {
            const responseData = await getUsers();
            
            // CONSOLE LOG UNTUK MELIHAT STRUKTUR DATA ASLINYA (Opsional)
            console.log("Response dari userService:", responseData);

            // JIKA BACKEND MEMBUNGKUS ARRAY-NYA DI DALAM PROPERTI .data Lagi
            if (responseData && Array.isArray(responseData.data)) {
                setUsers(responseData.data);
            } 
            // JIKA BACKEND LANGSUNG MENGEMBALIKAN ARRAY MURNI [ ... ]
            else if (Array.isArray(responseData)) {
                setUsers(responseData);
            } 
            // ANTISIPASI JIKA STRUKTUR LAIN, ATAU DATA KOSONG
            else {
                setUsers([]);
            }
        } catch (error) {
            console.error("Error mengambil data user:", error);
            toast.error(
                error.response?.data?.message ||
                "Gagal mengambil data user"
            );
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAdd = () => {
        setSelectedUser(null);
        setIsOpen(true);
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsOpen(true);
    };

    const handleDelete = async (user) => {
        if (
            !window.confirm(
                `Hapus user ${user.nama || user.username}?`
            )
        ) {
            return;
        }

        try {
            // Asumsi field ID di backend Anda adalah id_user atau user_id (sesuaikan jika berbeda)
            await deleteUser(user.id_user);

            toast.success(
                "User berhasil dihapus"
            );

            fetchUsers();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Gagal menghapus user"
            );
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    Kelola Users
                </h1>

                <button
                    onClick={handleAdd}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition font-medium"
                >
                    Tambah User
                </button>
            </div>

            <UserTable
                users={users}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <UserModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSuccess={fetchUsers}
                user={selectedUser}
            />
        </div>
    );
}

export default Users;