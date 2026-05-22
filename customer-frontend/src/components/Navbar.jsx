import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Ambil data user
import { FiUser, FiLogOut } from "react-icons/fi"; // Ikon pemanis
import "./Navbar.css"; 

// IMPOR LOGO DARI ASSETS
import logoArki from "../assets/logoarki.png"; 

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Dapatkan data nama dan email dari context
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Ambil inisial huruf pertama nama user (Contoh: "Kaka" -> "K")
  const getInitialName = () => {
    if (!user?.name) return "U";
    return user.name.charAt(0).toUpperCase();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsDropdownOpen(false);
    navigate("/"); 
  };

  // Menutup dropdown secara otomatis saat klik di luar area profile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="navbar-wrapper">
      <div className="navbar-container">
        
        {/* Bagian Kiri: Logo ARKI */}
        <div className="navbar-logo">
          <Link to="/home">
            <img 
              src={logoArki} 
              alt="Logo ARKI" 
            />
          </Link>
        </div>

        {/* Bagian Kanan: Menu Navigasi & Dropdown Profile */}
        <div className="navbar-menus">
          <Link to="/home" className="nav-link">HOME</Link>
          <Link to="/about" className="nav-link">ABOUT</Link>
          <Link to="/layanan" className="nav-link">LAYANAN</Link>
          <Link to="/payments" className="nav-link">PEMBAYARAN</Link>
          <Link to="/pesanan" className="nav-link">PESANAN</Link>
          
          {/* AREA COMPONENT PROFILE DROPDOWN */}
          <div className="profile-dropdown-container" ref={dropdownRef}>
            <button 
              className="profile-avatar-btn" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              title="Menu Profil"
            >
              {getInitialName()}
            </button>

            {isDropdownOpen && (
              <div className="profile-dropdown-menu">
                {/* Informasi Ringkas Akun */}
                <div className="dropdown-user-info">
                  <p className="user-info-name">{user?.name || "Nama User"}</p>
                  <p className="user-info-email">{user?.email || "user@email.com"}</p>
                </div>
                
                <div className="dropdown-divider"></div>

                {/* Navigasi Pilihan */}
                <Link 
                  to="/profile" 
                  className="dropdown-item" 
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FiUser className="dropdown-icon" />
                  Profil Saya
                </Link>

                <div className="dropdown-divider"></div>

                {/* Tombol Logout */}
                <button className="dropdown-item logout-item" onClick={logout}>
                  <FiLogOut className="dropdown-icon" />
                  Keluar Akun
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
      
      {/* Garis Merah di Bawah Navbar */}
      <div className="navbar-bottom-line"></div>
    </div>
  );
};

export default Navbar;