import API from "./api";

// GET ALL BOOKINGS
export const getBookings =
  async () => {

    const response =
      await API.get("/bookings");

    return response.data.data;
};