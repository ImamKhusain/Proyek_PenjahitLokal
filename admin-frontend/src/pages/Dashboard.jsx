import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getMyTailor } from "../services/tailorService";

// URL Statis Backend Port 8080
const BASE_URL_BACKEND = "http://localhost:8080/uploads/";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [tailors, setTailors] = useState([]);

  // State tambahan untuk mengontrol Modal Detail
  const [selectedTailor, setSelectedTailor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const responseData = await getMyTailor();
      const actualTailorData = responseData.data ? responseData.data : responseData;
      
      if (Array.isArray(actualTailorData)) {
        setTailors(actualTailorData);
      } else if (actualTailorData) {
        setTailors([actualTailorData]);
      }
    } catch (error) {
      console.log("Error mengambil data tailor:", error);
    }
  };

  // Fungsi membuka detail penjahit
  const handleOpenDetail = (tailor) => {
    setSelectedTailor(tailor);
    setIsModalOpen(true);
  };

  // Fungsi menutup detail penjahit
  const handleCloseDetail = () => {
    setSelectedTailor(null);
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: "30px", backgroundColor: "#f5f5f5", minHeight: "100vh", fontFamily: "sans-serif" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1 style={{ margin: 0, color: "#333" }}>Dashboard Tailor</h1>
        <button
          onClick={() => navigate("/manage-tailor")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          + Tambah Penjahit
        </button>
      </div>

      {/* CONTAINER LIST CARD */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "25px" }}>
        {tailors.length > 0 ? (
          tailors.map((tailorItem, index) => {
            const hasPhoto = tailorItem.photo && tailorItem.photo !== "NULL" && tailorItem.photo !== "";
            
            // PERBAIKAN UTAMA: Menggunakan encodeURIComponent untuk mengubah spasi nama file menjadi %20 agar terbaca CSS browser
            const safePhotoName = hasPhoto ? encodeURIComponent(tailorItem.photo) : "";
            
            // Penggabungan gradasi hitam transparan dan gambar latar belakang yang valid
            const cardBackground = hasPhoto 
              ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url("${BASE_URL_BACKEND}${safePhotoName}")`
              : "#ffffff";

            return (
              <div
                key={tailorItem.id || index}
                style={{
                  width: "320px",
                  height: "220px",
                  borderRadius: "12px",
                  boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
                  padding: "20px",
                  background: cardBackground,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "#ffffff", // Menjaga warna dasar tetap putih bersih jika loading/gagal
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  color: hasPhoto ? "white" : "#333",
                  border: hasPhoto ? "none" : "1px solid #e0e0e0"
                }}
              >
                {/* HANYA MENAMPILKAN NAMA DI CARD UTAMA */}
                <h2 style={{ 
                  margin: 0, 
                  fontSize: "22px", 
                  fontWeight: "bold", 
                  color: hasPhoto ? "white" : "#222",
                  textShadow: hasPhoto ? "1px 1px 4px rgba(0,0,0,0.8)" : "none" 
                }}>
                  {tailorItem.name || "Nama Belum Diatur"}
                </h2>

                {/* TOMBOL AKSI DI BAWAH CARD */}
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => handleOpenDetail(tailorItem)}
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      backgroundColor: hasPhoto ? "rgba(255, 255, 255, 0.9)" : "#f0f0f0",
                      color: "#333",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "13px",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                    }}
                  >
                    Lihat Detail
                  </button>
                  <button
                    onClick={() => navigate(`/manage-portfolio/${tailorItem.id}`)}
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "13px",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                    }}
                  >
                    Portfolio
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>Belum ada profil penjahit. Silakan klik + Tambah Penjahit.</p>
        )}
      </div>

      {/* BUTTON LOGOUT AKUN */}
      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
        style={{
          marginTop: "50px",
          padding: "10px 20px",
          backgroundColor: "#DC3545",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Logout Akun
      </button>

      {/* POP-UP MODAL UNTUK DETAIL LAINNYA */}
      {isModalOpen && selectedTailor && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            width: "450px",
            boxShadow: "0 5px 25px rgba(0,0,0,0.3)",
            position: "relative"
          }}>
            <h2 style={{ marginTop: 0, marginBottom: "20px", borderBottom: "2px solid #eee", paddingBottom: "10px", color: "#333" }}>
              Detail Penjahit
            </h2>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", color: "#555" }}>
              <p style={{ margin: 0 }}><strong>Nama:</strong> {selectedTailor.name}</p>
              <p style={{ margin: 0 }}><strong>Email Kontak:</strong> {user?.email || "Email tidak tersedia"}</p>
              <p style={{ margin: 0 }}><strong>Spesialisasi:</strong> {selectedTailor.specialization || "-"}</p>
              <p style={{ margin: 0 }}><strong>Deskripsi:</strong> {selectedTailor.description || "-"}</p>
              <p style={{ margin: 0 }}><strong>Alamat:</strong> {selectedTailor.address || "-"}</p>
              <p style={{ margin: 0 }}><strong>No HP:</strong> {selectedTailor.phone || "-"}</p>
              <p style={{ margin: 0 }}><strong>Rating Sistem:</strong> ⭐ {selectedTailor.rating || "0.0"}</p>
            </div>

            <button
              onClick={handleCloseDetail}
              style={{
                marginTop: "25px",
                width: "100%",
                padding: "10px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Tutup Detail
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;