import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllBookings, updateBookingStatus, deleteBooking } from "../../services/bookingService";
import AdminBookingTable from "../../components/booking/AdminBookingTable";
import AdminBookingModal from "../../components/booking/AdminBookingModal"; // <-- Import Modal Baru

function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    const fetchBookings = async () => {
        try {
            const responseData = await getAllBookings();
            if (responseData && Array.isArray(responseData.data)) {
                setBookings(responseData.data);
            } else if (Array.isArray(responseData)) {
                setBookings(responseData);
            } else {
                setBookings([]);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Gagal mengambil data booking");
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleManage = (booking) => {
        setSelectedBooking(booking);
        setIsOpen(true);
    };

    const handleUpdateStatus = async (id_booking, statusBaru) => {
        try {
            await updateBookingStatus(id_booking, statusBaru);
            toast.success(`Status booking #${id_booking} diubah menjadi ${statusBaru}`);
            fetchBookings();
        } catch (error) {
            toast.error(error.response?.data?.message || "Gagal memperbarui status");
        }
    };

    const handleDelete = async (booking) => {
        if (!window.confirm(`Hapus permanen data booking ${booking.id_booking}?`)) return;
        try {
            await deleteBooking(booking.id_booking);
            toast.success("Data booking berhasil dihapus");
            fetchBookings();
        } catch (error) {
            toast.error(error.response?.data?.message || "Gagal menghapus booking");
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Kelola Semua Booking</h1>
            
            <AdminBookingTable 
                bookings={bookings} 
                onManage={handleManage} 
                onDelete={handleDelete} 
            />

            <AdminBookingModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                booking={selectedBooking}
                onUpdateStatus={handleUpdateStatus}
            />
        </div>
    );
}

export default Bookings;