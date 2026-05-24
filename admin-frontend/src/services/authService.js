import axios from "axios";

const API_URL =
  "https://proyek-penjahitlokal-764024000152.us-central1.run.app/api/auth";

// LOGIN ADMIN
export const loginAdmin =
  async (formData) => {

    const response =
      await axios.post(
        `${API_URL}/login`,
        formData
      );

    return response.data;
};