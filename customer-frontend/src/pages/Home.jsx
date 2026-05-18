import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import TailorCard from "../components/TailorCard";
import { getAllTailors } from "../services/tailorService";

import "../App.css";
import "./Home.css"; 

const Home = () => {
  const navigate = useNavigate();
  
  // 💡 1. AMBIL PROPERTI 'loading' DARI CONTEXT
  const { user, loading } = useContext(AuthContext);
  const [tailors, setTailors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // 💡 2. JIKA CONTEXT MASIH LOADING, JANGAN LAKUKAN APAPAUN DULU
    if (loading) return; 

    // CEK LOGIN JIKA LOADING SUDAH SELESAI
    if (!user) {
      navigate("/");
      return;
    }
    fetchTailors();
  }, [user, loading]); // 💡 3. TAMBAHKAN loading KE DALAM DEPENDENCY ARRAY

  const fetchTailors = async () => {
    try {
      const data = await getAllTailors();
      setTailors(data);
    } catch (error) {
      console.log(error);
    }
  };

  // 💡 4. TAMPILKAN LOADING SCREEN RINGAN JIKA PROSES CEK STORAGE BELUM SELESAI
  if (loading) {
    return (
      <div style={{ textAlign: "center", paddingTop: "150px", fontFamily: "sans-serif" }}>
        <h3>Memuat Aplikasi...</h3>
      </div>
    );
  }

  const filteredTailors = tailors.filter((tailor) =>
    (tailor.name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayUserName = user?.name || "USER";

  return (
    <div className="home-page-container">
      <div className="home-container">
        
        {/* BAGIAN ATAS: SAPAAN & SEARCH BAR */}
        <div className="home-header-layout">
          <div className="user-welcome-section">
            <h1>Hi, {displayUserName.toUpperCase()}</h1>
            <p>Selamat Datang di Aplikasi Kami</p>
          </div>

          <div className="header-actions-section">
            <button className="notification-bell-btn">🔔</button>
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input-field"
              />
              <span className="search-icon-inside">🔍</span>
            </div>
          </div>
        </div>

        {/* GRID KARTU PENJAHIT */}
        <div className="tailor-list">
          {filteredTailors.length > 0 ? (
            filteredTailors.map((tailor) => (
              <TailorCard key={tailor.id} tailor={tailor} />
            ))
          ) : (
            <p className="tailor-not-found-msg">
              Penjahit tidak ditemukan.
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Home;