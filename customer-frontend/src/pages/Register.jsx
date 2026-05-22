import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast"; // 💡 Sudah aktif digunakan menggantikan alert
import { register } from "../services/authService";
import logoarki from "../assets/logoarki.png";
import "../App.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

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

      // 1. Kirim data ke backend
      const response = await register(formData);

      // 💡 Bersihkan sisa-sisa toast error lama jika ada
      toast.dismiss();

      // 2. Beri tahu customer kalau register sukses dengan toast modern
      toast.success(response.message || "Registrasi berhasil! Silakan login.");
      
      // 3. KUNCI UTAMA: Beri jeda 1.2 detik agar animasi sukses terlihat, baru pindah ke Login ("/")
      setTimeout(() => {
        navigate("/"); 
      }, 1200);

    } catch (error) {
      // 💡 Bersihkan tumpukan toast agar tidak menumpuk berjejer ke bawah
      toast.dismiss();

      const backendMessage = error.response?.data?.message;

      // Menerjemahkan pesan error umum dari backend agar serasi
      if (backendMessage === "Email already exists" || backendMessage === "Email sudah terdaftar") {
        toast.error("Email ini sudah terdaftar! Gunakan email lain.");
      } else {
        toast.error(backendMessage || "Registrasi gagal, silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        
        {/* BRANDING */}
        <div className="login-brand">
          <img src={logoarki} alt="ARKI Tailor" className="login-logo" />
          <p className="login-subtitle">SIGN UP</p>
        </div>

        {/* FORM REGISTER */}
        <form onSubmit={handleSubmit} className="login-form">
          
          {/* INPUT NAMA */}
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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
                placeholder="Create your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

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

          {/* LINK MANUAL KE LOGIN */}
          <div className="login-options" style={{ justifyContent: "flex-end" }}>
            <Link to="/" className="signup-text">
              Already have an account? Sign In
            </Link>
          </div>

          {/* BUTTON SUBMIT */}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default Register;