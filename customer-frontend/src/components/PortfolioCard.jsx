import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PortfolioCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/portfolios/tailor/${id}`);
        const actualData = response.data.data ? response.data.data : response.data;
        setPortfolios(Array.isArray(actualData) ? actualData : []);
        setLoading(false);
      } catch (error) {
        console.error("Gagal mengambil data portfolio penjahit:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchPortfolios();
    }
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: "50px", textAlign: "center", fontFamily: "sans-serif", color: "#666" }}>
        Memuat katalog baju...
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", backgroundColor: "#fcfcfc", minHeight: "100vh", fontFamily: "sans-serif" }}>
      
      {/* Tombol Kembali */}
      <button 
        onClick={() => navigate(`/detail/${id}`)} 
        style={{
          marginBottom: "25px",
          padding: "8px 16px",
          backgroundColor: "#f0f0f0",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
          color: "#555"
        }}
      >
        ← Kembali ke Profil Tailor
      </button>

      <h1 style={{ margin: "0 0 5px 0", fontSize: "28px", fontWeight: "800", color: "#111" }}>Katalog Pakaian</h1>
      <p style={{ margin: "0 0 30px 0", color: "#666", fontSize: "14px" }}>Daftar karya dan hasil jahitan terbaik dari penjahit pilihanmu</p>

      {portfolios.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px", color: "#888", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
          Belum ada produk pakaian atau hasil jahitan yang diunggah oleh penjahit ini.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "25px" }}>
          {portfolios.map((item) => {
            
            // ========================================================
            // FIX TOTAL JALUR GAMBAR: Menembak folder 'uploads/catalog/' (Pakai C)
            // ========================================================
            const hasImage = item.image_url && item.image_url !== "NULL" && item.image_url !== "";
            let imageSrc = "https://placehold.co/400x300?text=No+Image";

            if (hasImage) {
              let fileName = item.image_url;
              
              if (fileName.includes("/")) {
                const parts = fileName.split("/");
                fileName = parts[parts.length - 1];
              }

              imageSrc = `http://localhost:8080/uploads/catalog/${fileName}`;
            }

            return (
              <div 
                key={item.id} 
                style={{ 
                  backgroundColor: "#fff", 
                  borderRadius: "12px", 
                  overflow: "hidden", 
                  boxShadow: "0 4px 15px rgba(0,0,0,0.03)", 
                  border: "1px solid #f0f0f0", 
                  display: "flex", 
                  flexDirection: "column" 
                }}
              >
                {/* Frame Gambar */}
                <div style={{ width: "100%", height: "240px", overflow: "hidden", backgroundColor: "#fcfcfc" }}>
                  <img 
                    src={imageSrc} 
                    alt={item.name} 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/400x300?text=Gambar+Tidak+Ditemukan";
                    }}
                  />
                </div>
                
                {/* Detail Informasi */}
                <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px", flexGrow: 1 }}>
                  <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "bold", color: "#222" }}>{item.name}</h3>
                  
                  {item.size && (
                    <span style={{ alignSelf: "flex-start", backgroundColor: "#fee2e2", color: "#991b1b", fontSize: "11px", padding: "2px 8px", borderRadius: "4px", fontWeight: "bold" }}>
                      Size: {item.size}
                    </span>
                  )}
                  
                  <p style={{ margin: 0, fontSize: "13px", color: "#666", lineHeight: "1.4", minHeight: "38px" }}>
                    {item.description || "Tidak ada deskripsi detail pengerjaan."}
                  </p>
                  
                  <p style={{ margin: "auto 0 0 0", fontSize: "16px", fontWeight: "800", color: "#22c55e" }}>
                    Rp {parseInt(item.price || 0, 10).toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PortfolioCard;