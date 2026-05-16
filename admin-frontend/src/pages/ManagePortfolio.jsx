import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom"; // TAMBAHKAN useParams
import { AuthContext } from "../context/AuthContext";
import { getMyPortfolios } from "../services/portfolioService";

const ManagePortfolio = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 1. TANGKAP ID TAILOR LANGSUNG DARI URL BROWSER
  const { user } = useContext(AuthContext);
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    // CEK LOGIN
    if (!user) {
      navigate("/");
      return;
    }
    fetchPortfolio();
  }, [user, id]);

  const fetchPortfolio = async () => {
    try {
      // 2. KITA TIDAK PERLU getMyTailor() LAGI, LANGSUNG PAKAI ID DARI URL
      console.log("Mengambil portfolio untuk Tailor ID:", id);

      const responseData = await getMyPortfolios(id);
      console.log("Data Portfolio dari Backend:", responseData);

      // Antisipasi kalau data terbungkus di .data lagi
      const actualData = responseData?.data ? responseData.data : responseData;

      if (Array.isArray(actualData)) {
        setPortfolios(actualData);
      } else if (actualData) {
        setPortfolios([actualData]);
      } else {
        setPortfolios([]);
      }
    } catch (error) {
      console.log("Error mengambil portfolio:", error);
    }
  };

  return (
    <div style={{ padding: "30px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1>Manage Portfolio</h1>
        
        <div style={{ display: "flex", gap: "10px" }}>
          {/* TOMBOL MENUJU KE FILE PortofolioForm.jsx SESUAI DENGAN APPROUTES */}
          <button
            onClick={() => navigate(`/manage-portfolio/${id}/add`)}
            style={{
              padding: "10px 15px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            + Tambah Portfolio Baru
          </button>

          <button 
            onClick={() => navigate("/dashboard")} 
            style={{ padding: "10px 15px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {portfolios.length > 0 ? (
          portfolios.map((item) => (
            <div
              key={item.id}
              style={{
                width: "300px",
                backgroundColor: "white",
                padding: "15px",
                borderRadius: "10px",
                boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <div>
                <img
                  src={item.image_url}
                  alt={item.name || "portfolio"}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                />
                
                {/* Menampilkan Nama Pakaian */}
                <h3 style={{ marginTop: "12px", marginBottom: "6px", fontSize: "18px", color: "#212529" }}>
                  {item.name || "Nama Pakaian Tidak Ada"}
                </h3>

                {/* Menampilkan Ukuran (Size Badge) */}
                <div style={{ marginBottom: "10px" }}>
                  <span style={{
                    backgroundColor: item.size ? "#e2e3e5" : "#f8d7da",
                    color: item.size ? "#383d41" : "#721c24",
                    padding: "3px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}>
                    Size: {item.size || "NULL"}
                  </span>
                </div>
                
                {/* Menampilkan Deskripsi */}
                <p style={{ fontSize: "14px", color: "#6c757d", margin: "5px 0 15px 0", lineHeight: "1.4" }}>
                  {item.description || "Tidak ada deskripsi."}
                </p>
              </div>

              {/* Menampilkan Harga di Bagian Paling Bawah Kartu */}
              <div style={{ 
                borderTop: "1px solid #dee2e6", 
                paddingTop: "10px", 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center" 
              }}>
                <span style={{ fontSize: "13px", color: "#6c757d" }}>Harga:</span>
                <span style={{ fontSize: "16px", fontWeight: "bold", color: "#28a745" }}>
                  {item.price ? `Rp ${item.price.toLocaleString("id-ID")}` : "Rp 0"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div style={{ width: "100%", textAlign: "center", marginTop: "30px" }}>
            <p style={{ color: "#6c757d", marginBottom: "15px" }}>Belum ada foto portfolio untuk penjahit ini.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePortfolio;