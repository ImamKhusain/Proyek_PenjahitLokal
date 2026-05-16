import { useNavigate } from "react-router-dom";

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
    <div
      className="tailor-card"
      style={{
        width: "250px",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.06)",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        fontFamily: "sans-serif",
        border: "1px solid #f0f0f0",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
    >
      {/* 1. BAGIAN FOTO PENJAHIT (DI ATAS KARTU) */}
      <img
        src={imageUrl}
        alt={tailor.name || "Penjahit"}
        style={{
          width: "100%",
          height: "220px",
          objectFit: "cover",
          borderRadius: "12px",
          marginBottom: "16px",
          backgroundColor: "#f7f7f7"
        }}
      />

      {/* 2. BAGIAN TEKS INFORMASI */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", flexGrow: 1 }}>
        
        {/* NAMA PENJAHIT (Bold & Hitam Pekat) */}
        <h3
          style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: "800",
            color: "#111111",
            textAlign: "left",
            lineHeight: "1.2",
          }}
        >
          {tailor.name || "Nama Belum Diatur"}
        </h3>

        {/* RATING BINTANG EMAS */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "14px",
            color: "#444444",
            fontWeight: "bold",
            textAlign: "left",
            marginBottom: "14px"
          }}
        >
          <span style={{ color: "#f59e0b", fontSize: "16px" }}>⭐</span>
          <span>{parseFloat(tailor.rating || 0).toFixed(1)}</span>
          <span style={{ color: "#aaaaaa", fontWeight: "normal", fontSize: "13px" }}>
            ( {tailor.rating > 0 ? "100+" : "0"} )
          </span>
        </div>
      </div>

      {/* 3. TOMBOL DETAIL KAPSUL MERAH MAROON (Kiri Bawah Sesuai Referensi Gambar) */}
      <button
        onClick={() => navigate(`/detail/${tailor.id}`)}
        style={{
          backgroundColor: "#a61c1c", // Warna merah maroon identik gambar contoh
          color: "white",
          border: "none",
          borderRadius: "24px", // Pill-shaped bulat sempurna
          padding: "6px 20px",
          fontSize: "12px",
          fontWeight: "bold",
          cursor: "pointer",
          alignSelf: "flex-start", // Merapat ke sisi kiri bawah kartu
          boxShadow: "0 2px 6px rgba(166, 28, 28, 0.2)",
          transition: "opacity 0.2s"
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
        onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
      >
        Detail
      </button>
    </div>
  );
};

export default TailorCard;