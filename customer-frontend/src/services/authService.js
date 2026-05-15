import axios from "axios";

const API_URL =
  "http://localhost:8080/api/auth";

// LOGIN
export const login = async (formData) => {

  const response = await axios.post(
    `${API_URL}/login`,
    formData
  );

  return response.data;
};