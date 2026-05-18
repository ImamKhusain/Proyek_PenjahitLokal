import { useNavigate } from "react-router-dom";
import "./TailorCard.css"; // 💡 Import file CSS baru kamu di sini

// URL Folder Statis Backend Port 8080
const BASE_URL_BACKEND = "http://localhost:8080/uploads/";

const TailorCard = ({ tailor }) => {
  const navigate = useNavigate();

  // 1. Validasi Keberadaan Foto dari Database
  const hasPhoto = tailor.photo && tailor.photo !== "NULL" && tailor.photo !== "";
  
  // 2. Amankan spasi nama file dengan encodeURIComponent agar dibaca sempurna oleh browser
  const safePhotoName = hasPhoto ? encodeURIComponent(tailor.photo) : "";
  
  // 3. Gabungkan URL gambar asli backend, gunakan gambar placeholder online jika data NULL
  const imageUrl = hasPhoto 
    ? `${BASE_URL_BACKEND}${safePhotoName}`
    : "https://placehold.co/300x300?text=No+Photo";

  return (
    <div className="tailor-card">
      
      {/* 1. BAGIAN FOTO PENJAHIT */}
      <img
        src={imageUrl}
        alt={tailor.name || "Penjahit"}
        className="tailor-card-img"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/300x300?text=No+Photo";
        }}
      />

      {/* 2. BAGIAN TEKS INFORMASI */}
      <div className="tailor-card-info">
        
        {/* NAMA PENJAHIT */}
        <h3 className="tailor-card-name">
          {tailor.name || "Nama Belum Diatur"}
        </h3>

        {/* RATING BINTANG EMAS */}
        <div className="tailor-card-rating-row">
          <span className="tailor-card-star">⭐</span>
          <span>{parseFloat(tailor.rating || 0).toFixed(1)}</span>
          <span className="tailor-card-review-count">
            ( {tailor.rating > 0 ? "100+" : "0"} )
          </span>
        </div>
      </div>

      {/* 3. TOMBOL DETAIL KAPSUL MERAH MAROON */}
      <button
        onClick={() => navigate(`/detail/${tailor.id}`)}
        className="tailor-card-btn"
      >
        Detail
      </button>

    </div>
  );
};

export default TailorCard;