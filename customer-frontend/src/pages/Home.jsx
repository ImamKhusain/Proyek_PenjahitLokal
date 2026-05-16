import {
  useEffect,
  useState,
  useContext,
} from "react";

import { useNavigate }
from "react-router-dom";

import {
  AuthContext
} from "../context/AuthContext";

import Navbar
from "../components/Navbar";

import TailorCard
from "../components/TailorCard";

import { getAllTailors }
from "../services/tailorService";

import "../App.css";

const Home = () => {

  const navigate =
    useNavigate();

  const {
    user,
    logout
  } = useContext(AuthContext);

  const [tailors, setTailors] =
    useState([]);

  // State baru untuk menampung teks pencarian
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {

    // CEK LOGIN
    if (!user) {

      navigate("/");

      return;

    }

    fetchTailors();

  }, [user]);

  const fetchTailors =
    async () => {

      try {

        const data =
          await getAllTailors();

        setTailors(data);

      } catch (error) {

        console.log(error);

      }

  };

  // Fungsi menyaring data penjahit berdasarkan input di search bar
  const filteredTailors = tailors.filter((tailor) =>
    (tailor.name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ====================================================================
  // PERBAIKAN DI SINI: Langsung mengambil data 'name' dari AuthContext.
  // Jika data name belum sempat termuat, kita berikan fallback "USER".
  // ====================================================================
  const displayUserName = user?.name || "USER";

  return (

    <div>

      <Navbar />

      <div className="home-container">

        {/* BAGIAN ATAS: DIGANTI TOTAL SESUAI GAMBAR REFERENSI */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          fontFamily: "sans-serif"
        }}>

          {/* SISI KIRI: SAPAAN USER */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <h1 style={{
              margin: 0,
              fontSize: "20px",
              fontWeight: "bold",
              color: "#000000"
            }}>
              Hi, {displayUserName.toUpperCase()}
            </h1>
            <p style={{
              margin: 0,
              fontSize: "14px",
              color: "#aaaaaa"
            }}>
              Selamat Datang di Aplikasi Kami
            </p>
          </div>

          {/* SISI KANAN: LONCENG & SEARCH BAR */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            
            {/* Tombol Lonceng Notifikasi */}
            <button style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#ffffff",
              border: "1px solid #cccccc",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "16px"
            }}>
              🔔
            </button>

            {/* Input Pencarian */}
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "220px",
                  height: "40px",
                  padding: "0 35px 0 12px",
                  fontSize: "14px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #cccccc",
                  borderRadius: "8px",
                  outline: "none"
                }}
              />
              <span style={{
                position: "absolute",
                right: "12px",
                fontSize: "14px",
                color: "#aaaaaa",
                pointerEvents: "none"
              }}>
                🔍
              </span>
            </div>

          </div>

        </div>

        {/* GRID KARTU PENJAHIT */}
        <div className="tailor-list">

          {/* Pengecekan length > 0 sebelum map */}
          {filteredTailors.length > 0 ? (
            filteredTailors.map((tailor) => (
              <TailorCard
                key={tailor.id}
                tailor={tailor}
              />
            ))
          ) : (
            <p style={{ color: "#888", fontSize: "14px", width: "100%" }}>
              Penjahit tidak ditemukan.
            </p>
          )}

        </div>

      </div>

    </div>

  );

};

export default Home;