import {
  useState,
  useContext,
} from "react";

import { useNavigate }
from "react-router-dom";

import { loginAdmin }
from "../services/authService";

import {
  AuthContext
} from "../context/AuthContext";

import "../App.css";

const Login = () => {

  const navigate =
    useNavigate();

  const { login } =
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
          await loginAdmin(
            formData
          );

        // SIMPAN KE AUTH CONTEXT
        login(
          response.token,
          response.role
        );

        // CEK ROLE ADMIN
        if (
          response.role === "admin"
        ) {

          alert(
            "Login Admin Berhasil"
          );

          navigate(
            "/dashboard"
          );

        } else {

          alert(
            "Akun ini bukan admin"
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

        <h2>
          Login Admin
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

export default Login;