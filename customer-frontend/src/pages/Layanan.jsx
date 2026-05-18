import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Layanan.css";

// 💡 IMPOR SEMUA GAMBAR LAYANAN DARI FOLDER ASSETS
import imgJas from "../assets/layanan/jas.png";
import imgBlazer from "../assets/layanan/blazer.png";
import imgSeragam from "../assets/layanan/seragam.png";
import imgCelana from "../assets/layanan/celana.png";
import imgBatik from "../assets/layanan/batik.png";
import imgDress from "../assets/layanan/dress.png";

const Layanan = () => {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  // Proteksi halaman agar wajib login
  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/");
      return;
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", paddingTop: "150px", fontFamily: "sans-serif" }}>
        <h3>Memuat Layanan...</h3>
      </div>
    );
  }

  // Data Layanan Sesuai Gambar Figma
  const listLayanan = [
    {
      id: 1,
      title: "Jahit Jas",
      description: "Melayani produksi jas formal, semi jas, jas dokter, jas wedding, jasket, jas almamater & jas lab.",
      icon: imgJas // 🚀 Menggunakan gambar jas.png
    },
    {
      id: 2,
      title: "Jahit Blazer, Beskap, Surjan",
      description: "Melayani produksi blazer, beskap, surjan dengan berbagai model dan ukuran.",
      icon: imgBlazer // 🚀 Menggunakan gambar blazer.png
    },
    {
      id: 3,
      title: "Jahit Seragam",
      description: "Melayani produksi PDH, PDL, PDU, seragam satpam, seragam cleaning service.",
      icon: imgSeragam // 🚀 Menggunakan gambar seragam.png
    },
    {
      id: 4,
      title: "Jahit Celana, Kemeja dll",
      description: "Melayani produksi celana, kemeja dan lainnya dengan berbagai model dan ukuran sesuai keinginan anda.",
      icon: imgCelana // 🚀 Menggunakan gambar celana.png
    },
    {
      id: 5,
      title: "Jahit Kemeja Batik",
      description: "Melayani produksi kemeja batik dengan berbagai model dan ukuran sesuai keinginan anda.",
      icon: imgBatik // 🚀 Menggunakan gambar batik.png
    },
    {
      id: 6,
      title: "Jahit Dress & Rok",
      description: "Melayani produksi dress dan rok dengan berbagai model dan ukuran.",
      icon: imgDress // 🚀 Menggunakan gambar dress.png
    }
  ];

  return (
    <div className="layanan-page-container">
      <div>
        {/* BAGIAN JUDUL */}
        <div className="layanan-header">
          <h1>Layanan Kami</h1>
          <p>Berikut Beberapa Layanan Yang Kami Berikan</p>
        </div>

        {/* CONTAINER GRID LAYANAN */}
        <div className="layanan-grid">
          {listLayanan.map((layanan) => (
            <div key={layanan.id} className="layanan-card">
              
              {/* WADAH IKON GAMBAR */}
              <div className="layanan-icon-wrapper">
                {/* 💡 Menggunakan tag <img> untuk menampilkan file .png asli */}
                <img 
                  src={layanan.icon} 
                  alt={layanan.title} 
                />
              </div>

              {/* WADAH INFORMASI TEKS */}
              <div className="layanan-info">
                <h3>{layanan.title}</h3>
                <p>{layanan.description}</p>
              </div>

            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default Layanan;