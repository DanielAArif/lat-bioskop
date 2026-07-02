function AdminBookingTable({ bookings, onManage, onDelete }) {
    
    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(number);
    };

    const formatTanggal = (dateString) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
        });
    };

    return (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-left">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID Booking</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User ID</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Movie ID</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tiket</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Harga</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tanggal</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {bookings.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="px-6 py-8 text-center text-gray-500">Tidak ada riwayat booking masuk.</td>
                        </tr>
                    ) : (
                        bookings.map((b) => (
                            <tr key={b.id_booking} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-sm font-mono font-bold text-gray-900">{b.id_booking}</td>
                                <td className="px-6 py-4 text-sm text-gray-600 font-mono">{b.id_user}</td>
                                <td className="px-6 py-4 text-sm text-gray-600 font-mono">{b.id_movie}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{b.jumlah_tiket} Pcs</td>
                                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{formatRupiah(b.total_harga)}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{formatTanggal(b.tanggal_booking)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        b.status_booking === "sukses" ? "bg-green-100 text-green-800" :
                                        b.status_booking === "dibatalkan" ? "bg-gray-100 text-gray-800" : "bg-yellow-100 text-yellow-800"
                                    }`}>
                                        {b.status_booking}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium">
                                    <div className="flex justify-center gap-4">
                                        <button
                                            onClick={() => onManage(b)}
                                            className="text-indigo-600 hover:text-indigo-900 font-medium"
                                        >
                                            Kelola
                                        </button>

                                        <button
                                            onClick={() => onDelete(b)}
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

export default AdminBookingTable;