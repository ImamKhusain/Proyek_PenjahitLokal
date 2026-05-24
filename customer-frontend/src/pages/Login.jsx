import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

import { AuthContext } from "../context/AuthContext";
import { login } from "../services/authService";

import logoarki from "../assets/logoarki.png";

const Login = () => {

  const navigate = useNavigate();

  const { login: loginContext } =
    useContext(AuthContext);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // =====================================================
  // HANDLE LOGIN
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response =
        await login(formData);

      console.log(
        "=== ISI RESPONS LOGIN DARI BACKEND ==="
      );

      console.log(response);

      loginContext(
        response.token,
        response.role,
        response.id,
        response.name,
        response.email
      );

      if (
        response.role === "customer"
      ) {

        toast.success(
          "Login berhasil! Selamat datang kembali."
        );

        navigate("/home");

      } else {

        toast.error(
          "Akses ditolak! Bukan akun customer."
        );

      }

    } catch (error) {

      toast.dismiss();

      toast.error(

        error.response?.data?.message ||

        "Login gagal, silakan periksa kembali email dan password Anda."

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <>

      <div className="login-page">

        {/* ORNAMEN */}
        <div className="bg-circle-one"></div>
        <div className="bg-circle-two"></div>

        <div className="login-card">

          {/* BRAND */}

          <div className="login-brand">

            <img
              src={logoarki}
              alt="ARKI Tailor"
              className="login-logo"
            />

            <p className="login-subtitle">
              SIGN IN
            </p>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="login-form"
          >

            {/* EMAIL */}

            <div className="input-group">

              <label>
                Email address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

            {/* PASSWORD */}

            <div className="input-group">

              <label>
                Password
              </label>

              <div className="password-wrapper">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }

                  name="password"

                  placeholder="Enter your password"

                  value={formData.password}

                  onChange={handleChange}

                  required
                />

                <button
                  type="button"
                  className="toggle-password"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >

                  {showPassword ? (
                    <FaEye />
                  ) : (
                    <FaEyeSlash />
                  )}

                </button>

              </div>

            </div>

            {/* OPTIONS */}

            <div className="login-options">

              <label className="remember-me">

                <input type="checkbox" />

                <span>
                  Remember me
                </span>

              </label>

              <Link
                to="/register"
                className="signup-text"
              >

                or sign up for an account

              </Link>

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >

              {loading
                ? "Loading..."
                : "Login"}

            </button>

          </form>

        </div>

      </div>

      {/* =====================================================
          CSS LANGSUNG DI JSX
      ===================================================== */}

      <style>{`

        *{
          box-sizing:border-box;
        }

        body{
          margin:0;
          padding:0;
          font-family:sans-serif;
        }

        .login-page{

          min-height:100vh;

          display:flex;
          align-items:center;
          justify-content:center;

          position:relative;

          overflow:hidden;

          padding:40px 20px;

          background:
            linear-gradient(
              135deg,
              #f6f0cf 0%,
              #f8f7f3 40%,
              #ece8d8 100%
            );

        }

        /* =========================================
           BACKGROUND ORNAMEN
        ========================================= */

        .bg-circle-one{

          position:absolute;

          top:-180px;
          right:-180px;

          width:450px;
          height:450px;

          border-radius:50%;

          background:
            radial-gradient(
              circle,
              rgba(165,28,28,0.18) 0%,
              rgba(165,28,28,0.05) 60%,
              transparent 100%
            );

        }

        .bg-circle-two{

          position:absolute;

          bottom:-220px;
          left:-180px;

          width:520px;
          height:520px;

          border-radius:50%;

          background:
            radial-gradient(
              circle,
              rgba(22,52,95,0.15) 0%,
              rgba(22,52,95,0.04) 60%,
              transparent 100%
            );

        }

        /* =========================================
           CARD
        ========================================= */

        .login-card{

          width:100%;
          max-width:430px;

          position:relative;
          z-index:2;

          background:
            rgba(255,255,255,0.82);

          backdrop-filter:blur(18px);

          border:
            1px solid rgba(255,255,255,0.4);

          border-radius:30px;

          padding:42px 34px;

          box-shadow:
            0 10px 40px rgba(0,0,0,0.08),
            0 2px 10px rgba(0,0,0,0.04);

        }

        /* =========================================
           BRAND
        ========================================= */

        .login-brand{

          display:flex;
          flex-direction:column;
          align-items:center;

          margin-bottom:30px;

        }

        .login-logo{

          width:90px;

          object-fit:contain;

          margin-bottom:14px;

        }

        .login-subtitle{

          margin:0;

          font-size:13px;

          font-weight:700;

          letter-spacing:6px;

          color:#6b7280;

        }

        /* =========================================
           FORM
        ========================================= */

        .login-form{

          display:flex;
          flex-direction:column;

          gap:18px;

        }

        .input-group{

          display:flex;
          flex-direction:column;

          gap:8px;

        }

        .input-group label{

          font-size:14px;

          font-weight:600;

          color:#1f2937;

        }

        .input-group input{

          width:100%;

          height:52px;

          border-radius:14px;

          border:1px solid #e5e7eb;

          background:
            rgba(255,255,255,0.95);

          padding:0 16px;

          font-size:14px;

          outline:none;

          transition:0.25s ease;

        }

        .input-group input:focus{

          border-color:#a51c1c;

          box-shadow:
            0 0 0 4px rgba(165,28,28,0.08);

        }

        /* =========================================
           PASSWORD
        ========================================= */

        .password-wrapper{

          position:relative;

        }

        .toggle-password{

          position:absolute;

          top:50%;
          right:16px;

          transform:translateY(-50%);

          border:none;

          background:transparent;

          cursor:pointer;

          color:#6b7280;

          font-size:16px;

        }

        /* =========================================
           OPTIONS
        ========================================= */

        .login-options{

          display:flex;

          justify-content:space-between;

          align-items:center;

          gap:12px;

          flex-wrap:wrap;

        }

        .remember-me{

          display:flex;

          align-items:center;

          gap:8px;

          font-size:13px;

          color:#6b7280;

        }

        .signup-text{

          font-size:13px;

          color:#16345f;

          text-decoration:none;

          font-weight:600;

          transition:0.2s ease;

        }

        .signup-text:hover{

          color:#a51c1c;

        }

        /* =========================================
           BUTTON
        ========================================= */

        .login-btn{

          width:100%;

          height:52px;

          border:none;

          border-radius:14px;

          margin-top:10px;

          background:
            linear-gradient(
              135deg,
              #16345f 0%,
              #1f4b87 100%
            );

          color:white;

          font-size:15px;
          font-weight:700;

          cursor:pointer;

          transition:all 0.25s ease;

        }

        .login-btn:hover{

          transform:translateY(-2px);

          box-shadow:
            0 10px 20px rgba(22,52,95,0.25);

        }

        .login-btn:disabled{

          opacity:0.7;

          cursor:not-allowed;

        }

        /* =========================================
           RESPONSIVE
        ========================================= */

        @media screen and (max-width:480px){

          .login-card{

            padding:32px 22px;

            border-radius:22px;

          }

          .login-options{

            flex-direction:column;

            align-items:flex-start;

          }

        }

      `}</style>

    </>

  );

};

export default Login;