import API from "./api";

// GET MY TAILOR
export const getMyTailor =
  async () => {

    const response =
      await API.get("/tailors/me");

    return response.data.data;
};