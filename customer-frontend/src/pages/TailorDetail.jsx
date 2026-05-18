import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// 💡 IMPORT FILE CSS BARU
import "./TailorDetail.css"; 

// URL Folder Statis Backend Port 8080
const BASE_URL_BACKEND = "http://localhost:8080/uploads/";

const TailorDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [tailor, setTailor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTailorDetail();
  }, [id]);

  const fetchTailorDetail = async () => {
    try {
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
    return <div className="tailor-detail-state">Memuat detail penjahit...</div>;
  }

  if (!tailor) {
    return <div className="tailor-detail-state">Data penjahit tidak ditemukan.</div>;
  }

  // Pemrosesan gambar riil database
  const hasPhoto = tailor.photo && tailor.photo !== "NULL" && tailor.photo !== "";
  const safePhotoName = hasPhoto ? encodeURIComponent(tailor.photo) : "";
  const imageUrl = hasPhoto 
    ? `${BASE_URL_BACKEND}${safePhotoName}`
    : "https://placehold.co/500x500?text=No+Photo";

  return (
    <div className="tailor-detail-page">
      
      {/* TOMBOL KEMBALI */}
      <button onClick={() => navigate("/home")} className="back-to-list-btn">
        ← Kembali ke Daftar
      </button>

      {/* STRUKTUR UTAMA: GRID 2 KOLOM */}
      <div className="detail-layout-grid">
        
        {/* KOLOM KIRI: FOTO UTAMA PENJAHIT */}
        <div className="detail-photo-column">
          <img
            src={imageUrl}
            alt={tailor.name}
            className="detail-main-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/500x500?text=No+Photo";
            }}
          />
        </div>

        {/* KOLOM KANAN: INFORMASI & AKSI */}
        <div className="detail-info-column">
          
          {/* NAMA VENDOR */}
          <h1 className="detail-vendor-name">
            {tailor.name}
          </h1>

          {/* BARIS RATING & VIEWS */}
          <div className="detail-rating-row">
            <span className="detail-star-icon">⭐</span>
            <span>{parseFloat(tailor.rating || 0).toFixed(1)}</span>
            <span className="detail-order-count">
              • 100+ Pemesanan
            </span>
          </div>

          {/* BARIS UTAMA TOMBOL AKSI */}
          <div className="detail-actions-row">
            
            {/* Tombol Simpan / Favorit */}
            <button className="action-fav-btn">⭐</button>

            {/* Tombol Chat Kontak */}
            <button 
              onClick={() => window.open(`https://wa.me/${tailor.phone}`, "_blank")}
              className="action-chat-btn"
            >
              💬 Chat
            </button>

            {/* TOMBOL KATALOG */}
            <button 
              onClick={() => navigate(`/portfolio-katalog/${tailor.id}`)} 
              className="action-catalog-btn"
            >
              Katalog
            </button>
          </div>

          {/* GARIS PEMBATAS ESTETIK */}
          <hr className="detail-divider-line" />

          {/* BAGIAN DESKRIPSI PRODUK / PROFIL */}
          <div>
            <h3 className="detail-section-title">
              Produk Detail & Profil
            </h3>
            <p className="detail-description-text">
              {tailor.description || "Belum ada deskripsi profil dari penjahit ini."}
            </p>
          </div>

          {/* INFORMASI SPESIFIK TAMBAHAN DATABASE */}
          <div className="detail-database-box">
            <p><strong>✨ Spesialisasi Jahit:</strong> {tailor.specialization || "-"}</p>
            <p><strong>📍 Alamat Workshop:</strong> {tailor.address || "-"}</p>
            <p><strong>📞 No. HP / WhatsApp:</strong> {tailor.phone || "-"}</p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default TailorDetail;