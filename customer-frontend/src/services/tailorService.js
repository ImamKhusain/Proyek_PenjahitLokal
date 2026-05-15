import axios from "axios";

const API_URL =
  "http://localhost:8080/api/tailors";

// GET ALL TAILORS
export const getAllTailors = async () => {

  const response = await axios.get(
    API_URL
  );

  return response.data.data;
};