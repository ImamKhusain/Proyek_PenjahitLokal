import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiBell, FiEdit2, FiTrash2 } from "react-icons/fi";

import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

import "./ManageTailor.css";

const BASE_URL_BACKEND = "http://localhost:8080/uploads/";

const TailorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [preview, setPreview] = useState(null);
  const [photo, setPhoto] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    address: "",
    phone: "",
    description: "",
  });

  useEffect(() => {
    if (id) {
      fetchTailorDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchTailorDetail = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/tailors/${id}`);
      const data = response.data.data ? response.data.data : response.data;

      setFormData({
        name: data.name || "",
        specialization: data.specialization || "",
        address: data.address || "",
        phone: data.phone || "",
        description: data.description || "",
      });

      if (data.photo) {
        setPreview(`${BASE_URL_BACKEND}${data.photo}`);
      } else {
        setPreview(null);
      }
    } catch (err) {
      console.log("ERROR DETAIL:", err);
      setError("Data detail gagal dimuat.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("specialization", formData.specialization);
      submitData.append("address", formData.address);
      submitData.append("phone", formData.phone);
      submitData.append("description", formData.description);

      if (photo) {
        submitData.append("photo", photo);
      }

      await api.put(`/tailors/${id}`, submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Data berhasil diupdate!");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Gagal update data!");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus data penjahit ini?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/tailors/${id}`);
      alert("Data berhasil dihapus!");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Gagal menghapus data!");
    }
  };

  if (loading) {
    return (
      <div className="manage-page">
        <div className="loading-state">Memuat data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="manage-page">
        <div className="error-state">{error}</div>
      </div>
    );
  }

  return (
    <div className="manage-page">
      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        logout={logout}
        navigate={navigate}
      />

      <div className="manage-main">
        <div className="manage-topbar">
          <div
            className="menu-toggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </div>

          <div className="topbar-right">
            <FiBell size={18} />
            <div className="profile-name">ARKI</div>
          </div>
        </div>

        <div className="manage-content">
          <div className="manage-header">
            <div>
              <h1 className="page-title">Edit Penjahit</h1>
              <p className="page-subtitle">Edit data penjahit dari database.</p>
            </div>

            <button
              className="back-btn"
              onClick={() => navigate("/dashboard")}
            >
              Kembali
            </button>
          </div>

          <div className="content-grid tailor-detail-grid">
            <div className="form-card tailor-form-card">
              <form onSubmit={handleSubmit} className="tailor-form">
                <div className="form-group">
                  <label>Nama Penjahit</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama penjahit"
                  />
                </div>

                <div className="form-group">
                  <label>
                    Spesialisasi Jahitan
                  </label>
                  <select
                    name="specialization"
                    value={
                      formData.specialization
                    }
                    onChange={
                      handleChange
                    }
                    className="custom-select"
                  >
                    <option value="">
                      Pilih Spesialisasi
                    </option>
                    <option value="Kebaya">
                      Jahit Kebaya
                    </option>

                    <option value="Jas">
                      Jahit Jas
                    </option>

                    <option value="Seragam">
                      Jahit Seragam
                    </option>

                    <option value="Batik">
                      Jahit Kemeja Batik
                    </option>

                    <option value="Blazer">
                      Jahit Blazer,
                      Beskap, Surjan
                    </option>

                    <option value="Celana">
                      Jahit Celana
                    </option>

                    <option value="Dress">
                      Jahit Dress & Rok
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Alamat</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Masukkan alamat"
                  />
                </div>

                <div className="form-group">
                  <label>No. HP</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Masukkan nomor HP"
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Masukkan deskripsi"
                  />
                </div>

                <div className="action-row">
                  <button type="submit" className="save-btn">
                    Save changes
                  </button>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </form>
            </div>

            <div className="upload-card tailor-upload-card">
              <label className="upload-box tailor-upload-box">
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />

                {preview ? (
                  <div className="preview-wrapper tailor-preview-wrapper">
                    <img
                      src={preview}
                      alt="Preview"
                      className="preview-image tailor-preview-image"
                    />
                    <div className="edit-image-btn">
                      <FiEdit2 size={16} />
                    </div>
                  </div>
                ) : (
                  <div className="upload-content">
                    <div className="upload-text">
                      Drag & Drop your files or <span>Browse</span>
                    </div>
                    <small>Upload foto terbaru penjahit</small>
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

export default TailorDetail;