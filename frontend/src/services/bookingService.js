import api from "./api";

export const getMyBookings = async () => {

    const response = await api.get(
        "/bookings/my-bookings"
    );

    return response.data;
};

export const createBooking = async (data) => {

    const response = await api.post(
        "/bookings",
        data
    );

    return response.data;
};

export const cancelBooking = async (id) => {

    const response = await api.put(
        `/bookings/${id}/cancel`
    );

    return response.data;

};

export const deleteBooking = async (id) => {

    const response = await api.delete(
        `/bookings/${id}`
    );

    return response.data;
};

export const getAllBookings = async () => {
    const response = await api.get("/bookings"); // Sesuaikan jika backend Anda menggunakan endpoint lain seperti /admin/bookings
    return response.data;
};

/**
 * Mengubah status booking secara spesifik (contoh: dari pending menjadi 'sukses' atau 'dibatalkan')
 */
export const updateBookingStatus = async (id, status) => {
    // Mengirim object { status_booking: 'sukses'/'dibatalkan' } sesuai dengan nama kolom di database Anda
    const response = await api.put(`/bookings/${id}/status`, { 
        status_booking: status 
    });
    return response.data;
};