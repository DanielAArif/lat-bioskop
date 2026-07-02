import { XCircle } from "lucide-react";

function BookingTable({ bookings, onDelete }) {
    // Fungsi pembantu lencana status dengan variasi warna teks minimalis yang lembut
    const getStatusBadge = (status) => {
        switch (status) {
            case "pending":
                return (
                    <span className="inline-flex items-center bg-amber-50 text-amber-700 px-2.5 py-1 rounded text-xs font-medium border border-amber-100/60">
                        Pending
                    </span>
                );
            case "sukses":
                return (
                    <span className="inline-flex items-center bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded text-xs font-medium border border-emerald-100/60">
                        Sukses
                    </span>
                );
            case "dibatalkan":
                return (
                    <span className="inline-flex items-center bg-gray-50 text-gray-400 px-2.5 py-1 rounded text-xs font-medium border border-gray-100">
                        Dibatalkan
                    </span>
                );
            default:
                return <span className="text-xs text-gray-500 font-medium">{status}</span>;
        }
    };

    return (
        <div className="overflow-x-auto bg-white rounded border border-gray-100 shadow-sm">
            <table className="w-full text-left border-collapse">
                {/* Header: Putih keabu-abuan bersih dengan teks kapital kecil */}
                <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Movie</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">Jumlah</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">Total</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">Status</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                    {bookings.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="px-6 py-8 text-center text-sm text-gray-400">
                                Tidak ada data riwayat booking.
                            </td>
                        </tr>
                    ) : (
                        bookings.map((booking) => (
                            <tr key={booking.id_booking} className="hover:bg-gray-50/60 transition-colors">
                                {/* ID Booking */}
                                <td className="px-6 py-4 text-sm font-mono text-gray-500 whitespace-nowrap">
                                    {booking.id_booking}
                                </td>
                                
                                {/* Judul Film */}
                                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                                    {booking.judul}
                                </td>
                                
                                {/* Jumlah Tiket */}
                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap text-center">
                                    {booking.jumlah_tiket}
                                </td>
                                
                                {/* Total Harga */}
                                <td className="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap text-center">
                                    Rp {Number(booking.total_harga).toLocaleString("id-ID")}
                                </td>
                                
                                {/* Status Badge */}
                                <td className="px-6 py-4 text-sm whitespace-nowrap text-center">
                                    {getStatusBadge(booking.status_booking)}
                                </td>
                                
                                {/* Tombol Batalkan Transaksi */}
                                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-center">
                                    {booking.status_booking === "pending" ? (
                                        <button
                                            onClick={() => onDelete(booking)}
                                            className="text-red-600 hover:text-red-900 inline-flex items-center gap-1 transition-colors group"
                                            title="Batalkan Booking"
                                        >
                                            <XCircle size={14} className="group-hover:scale-105 transition-transform" />
                                            <span>Batalkan</span>
                                        </button>
                                    ) : (
                                        <span className="text-xs text-gray-300 font-normal">-</span>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default BookingTable;