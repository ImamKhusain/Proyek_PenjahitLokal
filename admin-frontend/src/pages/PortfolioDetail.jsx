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

import toast from "react-hot-toast";

import Navbar from "../components/Navbar";

import {
  AuthContext,
} from "../context/AuthContext";

import api from "../services/api";

import "./ManageTailor.css";

const PortfolioDetail = () => {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const {
    logout,
  } = useContext(
    AuthContext
  );

  const [
    isSidebarOpen,
    setIsSidebarOpen,
  ] = useState(true);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    preview,
    setPreview,
  ] = useState(null);

  const [
    photo,
    setPhoto,
  ] = useState(null);

  const [
    showDeleteModal,
    setShowDeleteModal,
  ] = useState(false);

  const [
    formData,
    setFormData,
  ] = useState({

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

        if (
          data.image_url
        ) {

          setPreview(
            data.image_url
          );

        } else if (
          data.image
        ) {

          setPreview(
            `http://localhost:8080/uploads/${data.image}`
          );

        }

      } catch (error) {

        console.log(error);

        toast.error(
          "Gagal mengambil detail portfolio"
        );

      } finally {

        setLoading(false);

      }

    };

  const handleChange = (
    e
  ) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleImageChange = (
    e
  ) => {

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

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const token =
          localStorage.getItem(
            "token"
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

              Authorization:
                token,

            },

          }

        );

        toast.success(
          "Portfolio berhasil diupdate!"
        );

        navigate(-1);

      } catch (error) {

        console.log(error);

        toast.error(

          error.response
            ?.data?.message ||

          "Gagal update portfolio!"

        );

      }

    };

  const handleDelete =
    () => {

      setShowDeleteModal(
        true
      );

    };

  const confirmDelete =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await api.delete(

          `/portfolios/${id}`,

          {

            headers: {

              Authorization:
                token,

            },

          }

        );

        toast.success(
          "Portfolio berhasil dihapus!"
        );

        navigate(-1);

      } catch (error) {

        console.log(error);

        toast.error(
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

      <div className="manage-main">

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

        <div className="manage-content">

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

          <div className="content-grid">

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

      {showDeleteModal && (

        <div
          style={{

            position: "fixed",

            top: 0,

            left: 0,

            width: "100vw",

            height: "100vh",

            background:
              "rgba(0,0,0,0.45)",

            display: "flex",

            justifyContent:
              "center",

            alignItems:
              "center",

            zIndex: 999999999,

          }}
        >

          <div
            style={{

              width: "100%",

              maxWidth: "420px",

              background: "#fff",

              borderRadius:
                "24px",

              padding:
                "32px 28px",

              boxShadow:
                "0 20px 60px rgba(0,0,0,0.2)",

              textAlign:
                "center",

            }}
          >

            <h2
              style={{

                margin: 0,

                fontSize:
                  "32px",

                fontWeight:
                  "700",

                color:
                  "#111827",

                marginBottom:
                  "12px",

              }}
            >
              Hapus Portfolio
            </h2>

            <p
              style={{

                margin: 0,

                fontSize:
                  "16px",

                lineHeight:
                  "1.6",

                color:
                  "#6b7280",

                marginBottom:
                  "28px",

              }}
            >
              Yakin ingin menghapus
              portfolio ini?
            </p>

            <div
              style={{

                display: "flex",

                justifyContent:
                  "center",

                gap: "14px",

              }}
            >

              <button

                onClick={() =>
                  setShowDeleteModal(
                    false
                  )
                }

                style={{

                  border:
                    "none",

                  background:
                    "#e5e7eb",

                  color:
                    "#111827",

                  padding:
                    "13px 24px",

                  borderRadius:
                    "14px",

                  fontWeight:
                    "600",

                  cursor:
                    "pointer",

                  minWidth:
                    "120px",

                }}
              >
                Cancel
              </button>

              <button

                onClick={
                  confirmDelete
                }

                style={{

                  border:
                    "none",

                  background:
                    "#dc2626",

                  color:
                    "#fff",

                  padding:
                    "13px 24px",

                  borderRadius:
                    "14px",

                  fontWeight:
                    "600",

                  cursor:
                    "pointer",

                  minWidth:
                    "120px",

                }}
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};

export default PortfolioDetail;