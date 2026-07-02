function BookingTable({ bookings, onDelete }) {
    const getStatusBadge = (status) => {
        switch (status) {
            case "pending":
                return (
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                        Pending
                    </span>
                );

            case "sukses":
                return (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Sukses
                    </span>
                );

            case "dibatalkan":
                return (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                        Dibatalkan
                    </span>
                );

            default:
                return status;
        }
    };

    return (
        <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full">

                <thead className="bg-slate-800 text-white">

                    <tr>
                        <th className="p-3 text-left">ID</th>
                        <th className="p-3 text-left">Movie</th>
                        <th className="p-3 text-center">Jumlah</th>
                        <th className="p-3 text-center">Total</th>
                        <th className="p-3 text-center">Status</th>
                        <th className="p-3 text-center">Aksi</th>
                    </tr>

                </thead>

                <tbody>

                    {bookings.map((booking) => (

                        <tr
                            key={booking.id_booking}
                            className="border-b"
                        >

                            <td className="p-3">
                                {booking.id_booking}
                            </td>

                            <td className="p-3">
                                {booking.judul}
                            </td>

                            <td className="text-center">
                                {booking.jumlah_tiket}
                            </td>

                            <td className="text-center">
                                Rp{" "}
                                {Number(
                                    booking.total_harga
                                ).toLocaleString("id-ID")}
                            </td>

                            <td className="text-center">
                                {getStatusBadge(
                                    booking.status_booking
                                )}
                            </td>

                            <td className="text-center">

                                {
                                    booking.status_booking ===
                                        "pending" && (

                                        <button
                                            onClick={() => onDelete(booking)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                        >
                                            Batalkan
                                        </button>

                                    )
                                }

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default BookingTable;