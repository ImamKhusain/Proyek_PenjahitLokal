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

const BASE_URL_BACKEND =
  "http://localhost:8080/uploads/";

const TailorDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { logout } =
    useContext(AuthContext);

  // SIDEBAR
  const [isSidebarOpen,
    setIsSidebarOpen] =
    useState(true);

  // LOADING
  const [loading,
    setLoading] =
    useState(false);

  // IMAGE
  const [preview,
    setPreview] =
    useState(null);

  const [photo,
    setPhoto] =
    useState(null);

  // FORM
  const [formData,
    setFormData] =
    useState({
      name: "",
      specialization: "",
      address: "",
      phone: "",
      description: "",
    });

  // FETCH DETAIL
  useEffect(() => {
    fetchTailorDetail();
  }, []);

  const fetchTailorDetail =
    async () => {
      try {
        const response =
          await api.get(
            `/tailors/${id}`
          );

        console.log(
          "DETAIL:",
          response.data
        );

        const data =
          response.data.data
            ? response.data.data
            : response.data;

        setFormData({
          name:
            data.name || "",
          specialization:
            data.specialization ||
            "",
          address:
            data.address || "",
          phone:
            data.phone || "",
          description:
            data.description ||
            "",
        });

        // IMAGE
        if (data.photo) {
          setPreview(
            `${BASE_URL_BACKEND}${data.photo}`
          );
        }
      } catch (error) {
        console.log(
          "ERROR DETAIL:",
          error
        );
      }
    };

  // HANDLE INPUT
  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // HANDLE IMAGE
  const handleImageChange =
    (e) => {
      const file =
        e.target.files[0];

      if (file) {
        setPhoto(file);

        setPreview(
          URL.createObjectURL(
            file
          )
        );
      }
    };

  // UPDATE
  const handleSubmit =
    async (e) => {
      e.preventDefault();

      setLoading(true);

      try {
        const submitData =
          new FormData();

        submitData.append(
          "name",
          formData.name
        );

        submitData.append(
          "specialization",
          formData.specialization
        );

        submitData.append(
          "address",
          formData.address
        );

        submitData.append(
          "phone",
          formData.phone
        );

        submitData.append(
          "description",
          formData.description
        );

        // PHOTO
        if (photo) {
          submitData.append(
            "photo",
            photo
          );
        }

        // UPDATE API
        await api.put(
          `/tailors/${id}`,
          submitData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        alert(
          "Data berhasil diupdate!"
        );

        navigate(
          "/dashboard"
        );
      } catch (error) {
        console.log(error);

        alert(
          "Gagal update data!"
        );
      } finally {
        setLoading(false);
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
                Detail Penjahit
              </h1>

              <p className="page-subtitle">
                Edit data penjahit
                dari database.
              </p>
            </div>

            <button
              className="back-btn"
              onClick={() =>
                navigate(
                  "/dashboard"
                )
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
              >
                {/* NAMA */}
                <div className="form-group">
                  <label>
                    Nama Penjahit
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

                {/* SPESIALISASI */}
                <div className="form-group">
                  <label>
                    Spesialisasi
                  </label>

                  <input
                    type="text"
                    name="specialization"
                    value={
                      formData.specialization
                    }
                    onChange={
                      handleChange
                    }
                  />
                </div>

                {/* ALAMAT */}
                <div className="form-group">
                  <label>
                    Alamat
                  </label>

                  <input
                    type="text"
                    name="address"
                    value={
                      formData.address
                    }
                    onChange={
                      handleChange
                    }
                  />
                </div>

                {/* PHONE */}
                <div className="form-group">
                  <label>
                    No. HP
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={
                      formData.phone
                    }
                    onChange={
                      handleChange
                    }
                  />
                </div>

                {/* DESCRIPTION */}
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

                {/* BUTTON */}
                <button
                  type="submit"
                  className="save-btn"
                >
                  {loading
                    ? "Updating..."
                    : "Save Changes"}
                </button>
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
                    {/* IMAGE */}
                    <img
                      src={preview}
                      alt="Preview"
                      className="preview-image"
                    />

                    {/* EDIT */}
                    <div className="edit-image-btn">
                      <FiEdit2
                        size={16}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="upload-content">
                    <div className="upload-icon">
                      📷
                    </div>

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

export default TailorDetail;