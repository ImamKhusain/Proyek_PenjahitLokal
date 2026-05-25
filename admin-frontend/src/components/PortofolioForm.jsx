import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { AuthContext } from "../context/AuthContext";

const PortofolioForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { user } =
    useContext(AuthContext);

  // STATE FORM

  const [name, setName] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [price, setPrice] =
    useState("");

  const [size, setSize] =
    useState("");

  // IMAGE

  const [
    imageFile,
    setImageFile,
  ] = useState(null);

  const [
    previewUrl,
    setPreviewUrl,
  ] = useState("");

  // UI STATE

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    message,
    setMessage,
  ] = useState("");

  // LOGIN CHECK

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  // HANDLE IMAGE

  const handleImageChange = (
    e
  ) => {
    const file =
      e.target.files[0];

    if (file) {
      setImageFile(file);

      setPreviewUrl(
        URL.createObjectURL(file)
      );
    }
  };

  // SUBMIT FORM

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    setLoading(true);

    setMessage("");

    if (
      !name ||
      !price ||
      !imageFile
    ) {
      toast.error(
        "Nama, Harga, dan Foto wajib diisi!",
        {
          style: {
            borderRadius:
              "12px",
            background:
              "#ffffff",
            color: "#111827",
            fontWeight: "600",
            padding: "14px",
          },
        }
      );

      setLoading(false);

      return;
    }

    try {
      const formData =
        new FormData();

      formData.append(
        "tailor_id",
        id
      );

      formData.append(
        "name",
        name
      );

      formData.append(
        "description",
        description
      );

      formData.append(
        "price",
        parseInt(price, 10)
      );

      formData.append(
        "size",
        size
      );

      formData.append(
        "image",
        imageFile
      );

      const token =
        localStorage.getItem(
          "token"
        ) || user?.token;

      const response =
        await axios.post(
          "http://localhost:8080/api/portfolios",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",

              Authorization: `Bearer ${token}`,
            },
          }
        );

      if (
        response.status ===
          201 ||
        response.status === 200
      ) {
        toast.success(
          "Portofolio berhasil ditambahkan ✨",
          {
            duration: 3000,

            style: {
              borderRadius:
                "14px",

              background:
                "#ffffff",

              color:
                "#111827",

              padding:
                "16px",

              fontWeight:
                "600",

              boxShadow:
                "0 10px 25px rgba(0,0,0,0.12)",
            },

            iconTheme: {
              primary:
                "#2563eb",

              secondary:
                "#ffffff",
            },
          }
        );

        setTimeout(() => {
          navigate("/portfolio");
        }, 1200);
      }
    } catch (error) {
      console.error(error);

      const backendMessage =
        error.response?.data
          ?.message ||
        error.response?.data
          ?.error;

      toast.error(
        backendMessage ||
          "Gagal menyimpan data!",
        {
          style: {
            borderRadius:
              "12px",

            background:
              "#ffffff",

            color:
              "#111827",

            fontWeight:
              "600",
          },
        }
      );

      setMessage(
        backendMessage ||
          "Gagal menyimpan data."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.layout}>
      {/* SIDEBAR */}

      <div style={styles.sidebar}>
        <div>
          {/* LOGO */}

          <div
            style={
              styles.sidebarHeader
            }
          >
            <div
              style={
                styles.logoText
              }
            >
              Dashboard
              <br />
              Tailor
            </div>

            <span
              style={
                styles.arrow
              }
            >
              ‹
            </span>
          </div>

          {/* MENU */}

          <div style={styles.menu}>
            <p
              style={
                styles.menuItem
              }
            >
              Daftar Penjahit
            </p>

            <p
              style={
                styles.menuItem
              }
            >
              Daftar Pesanan
            </p>

            <p
              style={
                styles.menuItem
              }
            >
              Portofolio Penjahit
            </p>

            <p
              style={
                styles.menuItem
              }
            >
              Chat
            </p>
          </div>
        </div>

        {/* LOGOUT */}

        <div
          style={
            styles.logoutWrapper
          }
        >
          <p
            style={
              styles.logoutText
            }
          >
            Logout
          </p>

          <span
            style={
              styles.logoutIcon
            }
          >
            ↪
          </span>
        </div>
      </div>

      {/* MAIN */}

      <div style={styles.main}>
        {/* TOPBAR */}

        <div style={styles.topbar}>
          <span
            style={
              styles.topbarMenu
            }
          >
            ☰
          </span>

          <div
            style={
              styles.topbarRight
            }
          >
            <span>ARKI</span>
          </div>
        </div>

        {/* CONTENT */}

        <div style={styles.content}>
          {/* HEADER */}

          <div style={styles.header}>
            <div>
              <h1
                style={
                  styles.title
                }
              >
                Tambah Portofolio
                Baru
              </h1>

              <p
                style={
                  styles.subtitle
                }
              >
                Kelola data
                portofolio baru
                dari halaman admin.
              </p>
            </div>

            <button
              onClick={() =>
                navigate(
                  "/portfolio"
                )
              }
              style={
                styles.backButton
              }
            >
              Kembali
            </button>
          </div>

          {/* FORM */}

          <form
            onSubmit={
              handleSubmit
            }
            style={
              styles.formWrapper
            }
          >
            {/* LEFT */}

            <div
              style={
                styles.formCard
              }
            >
              {/* NAMA */}

              <div
                style={
                  styles.inputGroup
                }
              >
                <label
                  style={
                    styles.label
                  }
                >
                  Nama Pakaian
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  style={
                    styles.input
                  }
                />
              </div>

              {/* HARGA */}

              <div
                style={
                  styles.inputGroup
                }
              >
                <label
                  style={
                    styles.label
                  }
                >
                  Harga Pembuatan
                  (Rp)
                </label>

                <input
                  type="number"
                  value={price}
                  onChange={(e) =>
                    setPrice(
                      e.target.value
                    )
                  }
                  style={
                    styles.input
                  }
                />
              </div>

              {/* SIZE */}

              <div
                style={
                  styles.inputGroup
                }
              >
                <label
                  style={
                    styles.label
                  }
                >
                  Ukuran (Size)
                </label>

                <input
                  type="text"
                  value={size}
                  onChange={(e) =>
                    setSize(
                      e.target.value
                    )
                  }
                  placeholder="Contoh: S, M, L, XL atau Custom"
                  style={
                    styles.input
                  }
                />
              </div>

              {/* DESCRIPTION */}

              <div
                style={
                  styles.inputGroup
                }
              >
                <label
                  style={
                    styles.label
                  }
                >
                  Description
                </label>

                <textarea
                  value={
                    description
                  }
                  onChange={(e) =>
                    setDescription(
                      e.target
                        .value
                    )
                  }
                  style={
                    styles.textarea
                  }
                />
              </div>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={loading}
                style={{
                  ...styles.saveButton,

                  opacity:
                    loading
                      ? 0.7
                      : 1,

                  cursor:
                    loading
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {loading
                  ? "Menyimpan..."
                  : "Save changes"}
              </button>
            </div>

            {/* RIGHT */}

            <div
              style={
                styles.uploadCard
              }
            >
              <label
                style={
                  styles.uploadTitle
                }
              >
                Foto Hasil
                Jahitan
              </label>

              <label
                style={
                  styles.uploadBox
                }
              >
                {previewUrl ? (
                  <img
                    src={
                      previewUrl
                    }
                    alt="Preview"
                    style={
                      styles.previewImage
                    }
                  />
                ) : (
                  <div
                    style={
                      styles.uploadPlaceholder
                    }
                  >
                    Drag & Drop
                    your files or{" "}
                    <b>
                      Browse
                    </b>
                  </div>
                )}

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={
                    handleImageChange
                  }
                />
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    background: "#f3f4f6",
    fontFamily:
      "Arial, sans-serif",
  },

  sidebar: {
    width: "220px",
    background: "#ffffff",
    borderRight:
      "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    justifyContent:
      "space-between",
    padding: "24px 18px",
  },

  sidebarHeader: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "flex-start",
    marginBottom: "50px",
  },

  logoText: {
    fontSize: "24px",
    fontWeight: "700",
    lineHeight: "1.2",
    color: "#111827",
  },

  arrow: {
    fontSize: "28px",
    color: "#111827",
    cursor: "pointer",
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "34px",
  },

  menuItem: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#111827",
    cursor: "pointer",
  },

  logoutWrapper: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  logoutText: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#ef4444",
    cursor: "pointer",
  },

  logoutIcon: {
    color: "#ef4444",
    fontSize: "18px",
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  topbar: {
    height: "64px",
    background: "#ffffff",
    borderBottom:
      "1px solid #e5e7eb",
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    padding: "0 24px",
  },

  topbarMenu: {
    fontSize: "24px",
    color: "#6b7280",
    cursor: "pointer",
  },

  topbarRight: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    fontWeight: "600",
    color: "#111827",
  },

  content: {
    padding: "24px",
  },

  header: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "flex-start",
    marginBottom: "20px",
  },

  title: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    marginTop: "6px",
    color: "#6b7280",
    fontSize: "14px",
  },

  backButton: {
    background: "#183153",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "10px 20px",
    fontWeight: "600",
    fontSize: "13px",
    cursor: "pointer",
  },

  formWrapper: {
    display: "flex",
    gap: "20px",
    alignItems: "flex-start",
  },

  formCard: {
    flex: 1,
    background: "#ffffff",
    borderRadius: "16px",
    border:
      "2px solid #2196f3",
    padding: "40px",
    minHeight: "650px",
  },

  inputGroup: {
    marginBottom: "22px",
  },

  label: {
    display: "block",
    marginBottom: "10px",
    fontSize: "14px",
    fontWeight: "700",
    color: "#111827",
  },

  input: {
    width: "100%",
    height: "46px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    padding: "0 14px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    background: "#ffffff",
  },

  textarea: {
    width: "100%",
    minHeight: "120px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    padding: "12px 14px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    resize: "none",
  },

  saveButton: {
    marginTop: "10px",
    background: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "12px 20px",
    fontWeight: "700",
    fontSize: "14px",
    transition:
      "all 0.2s ease",
    boxShadow:
      "0 4px 12px rgba(37,99,235,0.2)",
  },

  uploadCard: {
    width: "360px",
    background: "#ffffff",
    borderRadius: "16px",
    padding: "20px",
    height: "320px",
  },

  uploadTitle: {
    display: "block",
    marginBottom: "12px",
    fontSize: "14px",
    fontWeight: "700",
    color: "#111827",
  },

  uploadBox: {
    width: "100%",
    height: "250px",
    border:
      "2px dashed #cbd5e1",
    borderRadius: "14px",
    display: "flex",
    justifyContent:
      "center",
    alignItems: "center",
    overflow: "hidden",
    cursor: "pointer",
    background: "#f9fafb",
  },

  uploadPlaceholder: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: "14px",
    lineHeight: "1.6",
  },

  previewImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};

export default PortofolioForm;