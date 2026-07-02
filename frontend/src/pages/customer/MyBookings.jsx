import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getMyBookings,
    deleteBooking
} from "../../services/bookingService";

import BookingTable from "../../components/booking/BookingTable";

function MyBookings() {

    const [bookings, setBookings] = useState([]);

    const fetchBookings = async () => {

        try {

            const response =
                await getMyBookings();

            setBookings(response.data);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Gagal mengambil data booking"
            );

        }

    };

    useEffect(() => {

        fetchBookings();

    }, []);

    const handleDelete = async (booking) => {

        const confirmDelete = window.confirm(
            `Batalkan booking ${booking.id_booking}?`
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await cancelBooking(
                booking.id_booking
            );

            toast.success(
                "Booking berhasil dibatalkan"
            );

            fetchBookings();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Gagal membatalkan booking"
            );

        }

    };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-8">

                Booking Saya

            </h1>

            <BookingTable
                bookings={bookings}
                onDelete={handleDelete}
            />

        </div>

    );

}

export default MyBookings;