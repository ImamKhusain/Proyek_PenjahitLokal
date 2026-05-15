import API from "./api";

// GET USERS
export const getUsers =
  async () => {

    const response =
      await API.get("/users");

    return response.data.data;
};

// GET PAYMENTS
export const getPayments =
  async () => {

    const response =
      await API.get("/payments");

    return response.data.data;
};