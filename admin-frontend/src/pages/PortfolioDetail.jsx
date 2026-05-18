import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  FiBell,
  FiEdit2,
} from "react-icons/fi";

import Navbar from "../components/Navbar";

import { AuthContext } from "../context/AuthContext";

import api from "../services/api";

import "./ManageTailor.css";

const PortfolioDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { logout } =
    useContext(AuthContext);

  const [isSidebarOpen, setIsSidebarOpen] =
    useState(true);

  const [loading, setLoading] =
    useState(true);

  const [preview, setPreview] =
    useState(null);

  const [photo, setPhoto] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      size: "",
      description: "",
      price: "",
    });

  useEffect(() => {
    fetchPortfolioDetail();
  }, [id]);

  const fetchPortfolioDetail =
    async () => {
      try {
        setLoading(true);

        const response =
          await api.get(
            `/portfolios/${id}`
          );

        const data =
          response.data.data
            ? response.data.data
            : response.data;

        setFormData({
          name:
            data.name || "",

          size:
            data.size || "",

          description:
            data.description || "",

          price:
            data.price || "",
        });

        if (data.image_url) {
          setPreview(
            data.image_url
          );
        } else if (data.image) {
          setPreview(
            `http://localhost:8080/uploads/${data.image}`
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // HANDLE IMAGE
  const handleImageChange = (e) => {
    const file =
      e.target.files[0];

    if (file) {
      setPhoto(file);

      setPreview(
        URL.createObjectURL(file)
      );
    }
  };

  // UPDATE
  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem(
          "token"
        );

      console.log(
        "TOKEN:",
        token
      );

      const submitData =
        new FormData();

      submitData.append(
        "name",
        formData.name
      );

      submitData.append(
        "size",
        formData.size
      );

      submitData.append(
        "description",
        formData.description
      );

      submitData.append(
        "price",
        formData.price
      );

      if (photo) {
        submitData.append(
          "image",
          photo
        );
      }

      await api.put(
        `/portfolios/${id}`,
        submitData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",

            // FIX TOKEN
            Authorization:
              token,
          },
        }
      );

      alert(
        "Portfolio berhasil diupdate!"
      );

      navigate(-1);

    } catch (error) {

      console.log(error);

      console.log(
        error.response?.data
      );

      alert(
        error.response?.data
          ?.message ||
          "Gagal update portfolio!"
      );
    }
  };

  // DELETE
  const handleDelete =
    async () => {

      const confirmDelete =
        window.confirm(
          "Yakin ingin menghapus portfolio ini?"
        );

      if (!confirmDelete)
        return;

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await api.delete(
          `/portfolios/${id}`,
          {
            headers: {

              // FIX TOKEN
              Authorization:
                token,
            },
          }
        );

        alert(
          "Portfolio berhasil dihapus!"
        );

        navigate(-1);

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data
            ?.message ||
            "Gagal menghapus portfolio!"
        );
      }
    };

  if (loading) {
    return (
      <div className="manage-page">
        Loading...
      </div>
    );
  }

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

          <div className="topbar-right">
            <FiBell size={18} />

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
                Edit Portfolio
              </h1>

              <p className="page-subtitle">
                Edit data portfolio
              </p>
            </div>

            <button
              className="back-btn"
              onClick={() =>
                navigate(-1)
              }
            >
              Kembali
            </button>
          </div>

          {/* GRID */}
          <div className="content-grid">

            {/* FORM */}
            <div className="form-card">

              <form
                onSubmit={
                  handleSubmit
                }
                className="tailor-form"
              >

                <div className="form-group">
                  <label>
                    Nama Pakaian
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={
                      formData.name
                    }
                    onChange={
                      handleChange
                    }
                  />
                </div>

                <div className="form-group">
                  <label>
                    Size
                  </label>

                  <input
                    type="text"
                    name="size"
                    value={
                      formData.size
                    }
                    onChange={
                      handleChange
                    }
                  />
                </div>

                <div className="form-group">
                  <label>
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={
                      formData.description
                    }
                    onChange={
                      handleChange
                    }
                  />
                </div>

                <div className="form-group">
                  <label>
                    Harga
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={
                      formData.price
                    }
                    onChange={
                      handleChange
                    }
                  />
                </div>

                <div
                  style={{
                    display:
                      "flex",

                    gap: "12px",

                    marginTop:
                      "20px",
                  }}
                >

                  <button
                    type="submit"
                    className="save-btn"
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={
                      handleDelete
                    }
                  >
                    Delete
                  </button>

                </div>
              </form>
            </div>

            {/* IMAGE */}
            <div className="upload-card">

              <label className="upload-box">

                <input
                  type="file"
                  hidden
                  accept="image/*"
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
                      Upload foto
                      portfolio
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

export default PortfolioDetail;