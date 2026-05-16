import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// URL Folder Statis Backend Port 8080
const BASE_URL_BACKEND = "http://localhost:8080/uploads/";

const TailorDetail = () => {
  const { id } = useParams(); // Mengambil ID Penjahit dari rute URL
  const navigate = useNavigate();
  const [tailor, setTailor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTailorDetail();
  }, [id]);

  const fetchTailorDetail = async () => {
    try {
      // Sesuaikan URL endpoint ini dengan backend untuk mengambil data 1 penjahit berdasarkan ID
      const response = await axios.get(`http://localhost:8080/api/tailors/${id}`);
      const actualData = response.data.data ? response.data.data : response.data;
      setTailor(actualData);
      setLoading(false);
    } catch (error) {
      console.log("Error mengambil detail penjahit:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ padding: "50px", textAlign: "center", fontFamily: "sans-serif" }}>Memuat detail penjahit...</div>;
  }

  if (!tailor) {
    return <div style={{ padding: "50px", textAlign: "center", fontFamily: "sans-serif" }}>Data penjahit tidak ditemukan.</div>;
  }

  // Pemrosesan gambar riil database
  const hasPhoto = tailor.photo && tailor.photo !== "NULL" && tailor.photo !== "";
  const safePhotoName = hasPhoto ? encodeURIComponent(tailor.photo) : "";
  const imageUrl = hasPhoto 
    ? `${BASE_URL_BACKEND}${safePhotoName}`
    : "https://placehold.co/500x500?text=No+Photo";

  return (
    <div style={{ padding: "40px", backgroundColor: "#ffffff", minHeight: "100vh", fontFamily: "sans-serif" }}>
      
      {/* TOMBOL KEMBALI */}
      <button 
        onClick={() => navigate("/home")} 
        style={{
          marginBottom: "30px",
          padding: "8px 16px",
          backgroundColor: "#f0f0f0",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
          color: "#555"
        }}
      >
        ← Kembali ke Daftar
      </button>

      {/* STRUKTUR UTAMA: GRID 2 KOLOM (KIRI: GAMBAR, KANAN: DETAIL) */}
      <div style={{ display: "flex", gap: "50px", alignItems: "flex-start", flexWrap: "wrap" }}>
        
        {/* KOLOM KIRI: FOTO UTAMA PENJAHIT */}
        <div style={{ flex: "1", minWidth: "300px", maxWidth: "450px" }}>
          <img
            src={imageUrl}
            alt={tailor.name}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "450px",
              objectFit: "cover",
              borderRadius: "16px",
              boxShadow: "0px 8px 24px rgba(0,0,0,0.05)"
            }}
          />
        </div>

        {/* KOLOM KANAN: INFORMASI & AKSI */}
        <div style={{ flex: "1.5", minWidth: "350px", display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* NAMA VENDOR */}
          <h1 style={{ margin: 0, fontSize: "32px", fontWeight: "800", color: "#111" }}>
            {tailor.name}
          </h1>

          {/* BARIS RATING & VIEWS */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "16px", fontWeight: "bold", color: "#444" }}>
            <span style={{ color: "#f59e0b", fontSize: "20px" }}>⭐</span>
            <span>{parseFloat(tailor.rating || 0).toFixed(1)}</span>
            <span style={{ color: "#888", fontWeight: "normal", fontSize: "14px", marginLeft: "5px" }}>
              • 100+ Pemesanan
            </span>
          </div>

          {/* BARIS UTAMA TOMBOL AKSI (FAVORIT, CHAT, KATALOG) */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "10px" }}>
            
            {/* Tombol Simpan / Favorit (Ikon Bintang Abu-abu) */}
            <button style={{
              padding: "10px 14px",
              backgroundColor: "#e2e8f0",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "18px"
            }}>
              ⭐
            </button>

            {/* Tombol Chat Kontak */}
            <button 
              onClick={() => window.open(`https://wa.me/${tailor.phone}`, "_blank")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 24px",
                backgroundColor: "#ffffff",
                color: "#333",
                border: "1px solid #ccc",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "14px"
              }}
            >
              💬 Chat
            </button>

            {/* TOMBOL KATALOG (PENGGANTI CHECKOUT SESUAI PERMINTAAN) */}
            <button 
              onClick={() => navigate(`/portfolio-katalog/${tailor.id}`)} // Nanti arahkan ke rute katalog backend kamu
              style={{
                padding: "11px 32px",
                backgroundColor: "#a61c1c", // Merah maroon pas sesuai contoh gambar
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "14px",
                boxShadow: "0 4px 12px rgba(166, 28, 28, 0.2)"
              }}
            >
              Katalog
            </button>
          </div>

          {/* GARIS PEMBATAS ESTETIK */}
          <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "10px 0" }} />

          {/* BAGIAN DESKRIPSI PRODUK / PROFIL */}
          <div>
            <h3 style={{ margin: "0 0 10px 0", fontSize: "18px", fontWeight: "bold", color: "#222" }}>
              Produk Detail & Profil
            </h3>
            <p style={{ margin: 0, color: "#555", lineHeight: "1.6", fontSize: "15px" }}>
              {tailor.description || "Belum ada deskripsi profil dari penjahit ini."}
            </p>
          </div>

          {/* INFORMASI SPESIFIK TAMBAHAN DATABASE */}
          <div style={{ 
            backgroundColor: "#f9f9f9", 
            padding: "20px", 
            borderRadius: "12px", 
            display: "flex", 
            flexDirection: "column", 
            gap: "10px",
            fontSize: "14px",
            color: "#444"
          }}>
            <p style={{ margin: 0 }}><strong>✨ Spesialisasi Jahit:</strong> {tailor.specialization || "-"}</p>
            <p style={{ margin: 0 }}><strong>📍 Alamat Workshop:</strong> {tailor.address || "-"}</p>
            <p style={{ margin: 0 }}><strong>📞 No. HP / WhatsApp:</strong> {tailor.phone || "-"}</p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default TailorDetail;