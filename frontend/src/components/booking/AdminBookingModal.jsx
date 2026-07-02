function AdminBookingModal({ isOpen, onClose, booking, onUpdateStatus }) {
    if (!isOpen || !booking) return null;

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", { 
            style: "currency", 
            currency: "IDR", 
            minimumFractionDigits: 0 
        }).format(number);
    };

    const handleAction = async (status) => {
        await onUpdateStatus(booking.id_booking, status);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/30 backdrop-blur-[2px]">
            {/* Box Utama: Berlatar putih bersih dengan border tipis dan bayangan lembut */}
            <div className="bg-white rounded-lg border border-gray-100 shadow-xl w-full max-w-md overflow-hidden transform transition-all p-6">
                
                {/* Header: Bersih tanpa garis tebal bawah */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                        Detail Transaksi
                    </h3>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-gray-600 transition-colors text-xl font-light"
                    >
                        &times;
                    </button>
                </div>

                {/* Konten Detail: Menggunakan struktur border horizontal tipis, menggantikan bg-gray-50 */}
                <div className="divide-y divide-gray-100 border-t border-b border-gray-100 py-1 my-5 text-sm">
                    <div className="flex justify-between py-3">
                        <span className="text-gray-400">ID Booking</span> 
                        <span className="font-mono font-medium text-gray-900">{booking.id_booking}</span>
                    </div>
                    <div className="flex justify-between py-3">
                        <span className="text-gray-400">ID User</span> 
                        <span className="font-mono text-gray-600">{booking.id_user}</span>
                    </div>
                    <div className="flex justify-between py-3">
                        <span className="text-gray-400">ID Movie</span> 
                        <span className="font-mono text-gray-600">{booking.id_movie}</span>
                    </div>
                    <div className="flex justify-between py-3">
                        <span className="text-gray-400">Jumlah Tiket</span> 
                        <span className="font-medium text-gray-900">{booking.jumlah_tiket} Pcs</span>
                    </div>
                    <div className="flex justify-between py-3">
                        <span className="text-gray-400">Total Harga</span> 
                        <span className="font-semibold text-gray-900">{formatRupiah(booking.total_harga)}</span>
                    </div>
                    <div className="flex justify-between py-3 items-center">
                        <span className="text-gray-400">Status Saat Ini</span> 
                        {/* Status Badge: Menggunakan warna pastel desaturasi yang sangat lembut */}
                        <span className={`px-2.5 py-0.5 text-xs font-medium rounded ${
                            booking.status_booking === "sukses" ? "bg-green-50 text-green-700 border border-green-100" :
                            booking.status_booking === "dibatalkan" ? "bg-gray-50 text-gray-600 border border-gray-100" : 
                            "bg-amber-50 text-amber-700 border border-amber-100"
                        }`}>
                            {booking.status_booking}
                        </span>
                    </div>
                </div>

                {/* Area Tombol Aksi */}
                <div className="space-y-3">
                    {booking.status_booking === "pending" ? (
                        <div className="grid grid-cols-2 gap-3">
                            {/* Tombol Utama: Hitam/Gelap bersih, kontras tinggi yang minimalis */}
                            <button
                                onClick={() => handleAction("sukses")}
                                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded text-sm font-medium transition-colors shadow-sm"
                            >
                                Setujui
                            </button>
                            {/* Tombol Sekunder: Putih dengan border tipis */}
                            <button
                                onClick={() => handleAction("dibatalkan")}
                                className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 py-2 rounded text-sm font-medium transition-colors"
                            >
                                Tolak
                            </button>
                        </div>
                    ) : (
                        <p className="text-center text-xs text-gray-400 bg-gray-50 py-2.5 rounded border border-gray-100">
                            Status transaksi ini sudah final ({booking.status_booking}).
                        </p>
                    )}
                </div>

                {/* Footer Footer */}
                <div className="flex justify-end mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminBookingModal;