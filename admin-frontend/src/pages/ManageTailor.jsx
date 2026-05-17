import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import {
  FiEdit2,
  FiBell,
} from "react-icons/fi";

import { AuthContext } from "../context/AuthContext";

import Navbar from "../components/Navbar";

import TailorForm from "../components/TailorForm";

import "./ManageTailor.css";

const ManageTailor = () => {
  const navigate = useNavigate();

  const { logout } =
    useContext(AuthContext);

  const [preview, setPreview] =
    useState(null);

  const [photo, setPhoto] =
    useState(null);

  const [isSidebarOpen, setIsSidebarOpen] =
    useState(true);

  // HANDLE IMAGE
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPhoto(file);

      setPreview(
        URL.createObjectURL(file)
      );
    }
  };

  return (
    <div className="manage-page">
      {/* SIDEBAR */}
      <Navbar
        isSidebarOpen={
          isSidebarOpen
        }
        setIsSidebarOpen={
          setIsSidebarOpen
        }
        logout={logout}
        navigate={navigate}
      />

      {/* MAIN */}
      <div className="manage-main">
        {/* TOPBAR */}
        <div className="manage-topbar">
          {/* LEFT */}
          <div
            className="menu-toggle"
            onClick={() =>
              setIsSidebarOpen(
                !isSidebarOpen
              )
            }
          >
            ☰
          </div>

          {/* RIGHT */}
          <div className="topbar-right">
            <FiBell size={16} />

            <div className="profile-name">
              ARKI
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="manage-content">
          {/* HEADER */}
          <div className="manage-header">
            <div>
              <h1 className="page-title">
                Tambah Penjahit
              </h1>

              <p className="page-subtitle">
                Kelola data penjahit baru
                dari halaman admin.
              </p>
            </div>

            <button
              className="back-btn"
              onClick={() =>
                navigate("/dashboard")
              }
            >
              Kembali
            </button>
          </div>

          {/* GRID */}
          <div className="content-grid">
            {/* FORM */}
            <div className="form-card">
              <TailorForm
                photo={photo}
              />
            </div>

            {/* UPLOAD */}
            <div className="upload-card">
              <label className="upload-box">
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={
                    handleImageChange
                  }
                />

                {preview ? (
                  <div className="preview-wrapper">
                    <img
                      src={preview}
                      alt="Preview"
                      className="preview-image"
                    />

                    <div className="edit-image-btn">
                      <FiEdit2
                        size={16}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="upload-content">
                    <div className="upload-text">
                      Drag & Drop your
                      files or{" "}
                      <span>
                        Browse
                      </span>
                    </div>

                    <small>
                      Upload foto terbaru
                      penjahit
                    </small>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTailor;