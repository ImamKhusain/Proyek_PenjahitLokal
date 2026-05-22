import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

// LOGIN (Digunakan bersama oleh Admin & Customer)
export const login = async (formData) => {
  const response = await axios.post(`${API_URL}/login`, formData);
  return response.data;
};

// REGISTER CUSTOMER (Menembak fungsi registerCustomer di backend)
export const register = async (formData) => {
  const response = await axios.post(`${API_URL}/register-customer`, formData); 
  // 💡 Catatan: Jika di file routes backend kamu menggunakan path berbeda (misal: '/register'), 
  // silakan ganti '/register-customer' di atas mengikuti isi file router backend kelompokmu.
  return response.data;
};