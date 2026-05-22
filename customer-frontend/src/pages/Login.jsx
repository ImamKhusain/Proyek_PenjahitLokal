import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Memerlukan react-icons
import toast from "react-hot-toast"; // Sudah aktif digunakan
import { AuthContext } from "../context/AuthContext";
import { login } from "../services/authService"; // Logika service asli customer Anda
import logoarki from "../assets/logoarki.png"; // Menggunakan path logoarki Anda
import "../App.css";

const Login = () => {
  const navigate = useNavigate();
  const { login: loginContext } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State tambahan untuk UI profesional
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await login(formData);

// 💡 TAMBAHKAN BARIS INI UNTUK CEK RESPONS BACKEND
console.log("=== ISI RESPONS LOGIN DARI BACKEND ===");
console.log(response); 

loginContext(
  response.token,
  response.role,
  response.id,
  response.name,
  response.email 
);

      // CEK CUSTOMER (Sudah diganti dengan toast modern)
      if (response.role === "customer") {
        toast.success("Login berhasil! Selamat datang kembali."); 
        navigate("/home");
      } else {
        toast.error("Akses ditolak! Bukan akun customer."); 
      }
    } catch (error) {
      // 💡 PERBAIKAN KEDUA: Bersihkan antrean toast agar tidak menumpuk bertingkat
      toast.dismiss(); 
      toast.error(error.response?.data?.message || "Login gagal, silakan periksa kembali email dan password Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        
        {/* AREA BRANDING LOGO & SUBTITLE */}
        <div className="login-brand">
          <img src={logoarki} alt="ARKI Tailor" className="login-logo" />
          <p className="login-subtitle">SIGN IN</p>
        </div>

        {/* AREA FORM UTAMA */}
        <form onSubmit={handleSubmit} className="login-form">
          
          {/* INPUT EMAIL */}
          <div className="input-group">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* INPUT PASSWORD */}
          <div className="input-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              {/* Tombol Mata Toggle Sembunyikan/Lihat Sandi */}
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {/* BARIS PILIHAN: REMEMBER ME & REGISTER LINK */}
          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            {/* Diarahkan ke /register sesuai kebutuhan halaman pendaftaran */}
            <Link to="/register" className="signup-text">
              or sign up for an account
            </Link>
          </div>

          {/* BUTTON SUBMIT */}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default Login;