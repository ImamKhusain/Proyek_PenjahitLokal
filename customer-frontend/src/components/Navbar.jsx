import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Pastikan untuk mengimpor file CSS ini

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    // Mengarahkan kembali ke halaman utama/login setelah logout
    navigate("/"); 
  };

  return (
    <div className="navbar-wrapper">
      <div className="navbar-container">
        
        {/* Bagian Kiri: Logo Kosong */}
        <div className="navbar-logo">
          {/* Nanti ganti span ini dengan tag <img> kalau foto logonya sudah siap */}
          <span style={{ fontStyle: 'italic', color: '#888' }}>[Logo ARKI]</span>
        </div>

        {/* Bagian Kanan: Menu Navigasi & Tombol Logout */}
        <div className="navbar-menus">
          {/* Sesuaikan "to" dengan routing yang sudah kamu buat di AppRoutes.jsx */}
          <Link to="/home" className="nav-link">HOME</Link>
          <Link to="/about" className="nav-link">ABOUT</Link>
          <Link to="/layanan" className="nav-link">LAYANAN</Link>
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