import API from "./api";

// GET MY TAILOR
export const getMyTailor = async () => {
  try {
    const response = await API.get("/tailors/me");
    
    console.log("1. Hasil asli dari backend (response):", response);
    
    // Langsung return response.data agar format array dari backend terjaga
    return response.data; 
    
  } catch (error) {
    console.error("Gagal mengambil data tailor di service:", error);
    throw error;
  }
};