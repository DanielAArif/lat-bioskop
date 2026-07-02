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