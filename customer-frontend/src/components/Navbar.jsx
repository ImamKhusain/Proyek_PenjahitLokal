import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; 

// 💡 IMPOR LOGO DARI ASSETS
// (Sesuaikan jumlah titik "../" jika folder assets kamu berada di tempat lain)
import logoArki from "../assets/logoarki.png"; 

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/"); 
  };

  return (
    <div className="navbar-wrapper">
      <div className="navbar-container">
        
        {/* Bagian Kiri: Logo ARKI */}
        <div className="navbar-logo">
          {/* 💡 MENGGUNAKAN IMAGE LOGO ASLI */}
          <Link to="/home">
            <img 
              src={logoArki} 
              alt="Logo ARKI" 
              style={{ 
                height: "45px",       /* Mengatur tinggi logo agar pas di navbar */
                width: "auto",        /* Menjaga proporsi gambar tetap ideal */
                display: "block",
                cursor: "pointer"
              }} 
            />
          </Link>
        </div>

        {/* Bagian Kanan: Menu Navigasi & Tombol Logout */}
        <div className="navbar-menus">
          <Link to="/home" className="nav-link">HOME</Link>
          <Link to="/about" className="nav-link">ABOUT</Link>
          <Link to="/layanan" className="nav-link">LAYANAN</Link>
          <Link to="/payments" className="nav-link">PEMBAYARAN</Link>
          <Link to="/pesanan" className="nav-link">PESANAN</Link>
          
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>

      </div>
      
      {/* Garis Merah di Bawah Navbar */}
      <div className="navbar-bottom-line"></div>
    </div>
  );
};

export default Navbar;