import {
  useState,
  useContext,
} from "react";

import { useNavigate }
from "react-router-dom";

import {
  AuthContext
} from "../context/AuthContext";

import { login }
from "../services/authService";

import "../App.css";

const Login = () => {

  const navigate =
    useNavigate();

  const { login: loginContext } =
    useContext(AuthContext);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await login(formData);

        // Mengirimkan token, role, dan name dari response API backend
        loginContext(
          response.token,
          response.role,
          response.id,
          response.name
        );

        // CEK CUSTOMER
        if (
          response.role ===
          "customer"
        ) {

          alert(
            "Login berhasil"
          );

          navigate("/home");

        } else {

          alert(
            "Bukan akun customer"
          );

        }

      } catch (error) {

        alert(
          error.response?.data
            ?.message ||
          "Login gagal"
        );

      }

  };

  return (

    <div className="login-container">

      <div className="login-card">

        <h2 className="login-title">

          Login Customer

        </h2>

        <form
          onSubmit={
            handleSubmit
          }
        >

          <div className="input-group">

            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              onChange={
                handleChange
              }
              required
            />

          </div>

          <div className="input-group">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              onChange={
                handleChange
              }
              required
            />

          </div>

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

        </form>

      </div>

    </div>

  );

};

// BARIS INI WAJIB ADA AGAR APPROUTES TIDAK ERROR MERAH
export default Login;