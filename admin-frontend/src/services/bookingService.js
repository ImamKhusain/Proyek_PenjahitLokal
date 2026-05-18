import API from "./api";

// GET ALL BOOKINGS
export const getBookings =
  async () => {

    const response =
      await API.get("/bookings");

    return response.data.data;
};

// UPDATE STATUS BOOKING
export const updateBookingStatus =
  async (id, status) => {

    const response =
      await API.put(`/bookings/${id}`, {
        status,
      });

    return response.data;
};