import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi";

import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { getMyTailor } from "../services/tailorService";
import { getMyPortfolios } from "../services/portfolioService";

// import "./PortfolioPage.css";

const BASE_URL_BACKEND = "http://localhost:8080/uploads/";

const PortfolioPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [tailors, setTailors] = useState([]);
  const [selectedTailorId, setSelectedTailorId] = useState("");
  const [selectedTailor, setSelectedTailor] = useState(null);

  const [portfolios, setPortfolios] = useState([]);
  const [loadingTailors, setLoadingTailors] = useState(true);
  const [loadingPortfolios, setLoadingPortfolios] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    fetchTailors();
  }, [user, navigate]);

  useEffect(() => {
    if (!selectedTailorId) return;

    const currentTailor =
      tailors.find((t) => String(t.id) === String(selectedTailorId)) || null;

    setSelectedTailor(currentTailor);
    fetchPortfolios(selectedTailorId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTailorId, tailors]);

  const fetchTailors = async () => {
    try {
      setLoadingTailors(true);

      const responseData = await getMyTailor();
      const actualTailorData = responseData.data ? responseData.data : responseData;

      const list = Array.isArray(actualTailorData) ? actualTailorData : [];
      setTailors(list);

      if (list.length > 0 && !selectedTailorId) {
        setSelectedTailorId(String(list[0].id));
      }
    } catch (error) {
      console.log(error);
      setTailors([]);
    } finally {
      setLoadingTailors(false);
    }
  };

  const fetchPortfolios = async (tailorId) => {
    try {
      setLoadingPortfolios(true);

      const responseData = await getMyPortfolios(tailorId);

      const actualData = responseData?.data?.data
        ? responseData.data.data
        : responseData?.data
          ? responseData.data
          : responseData;

      setPortfolios(Array.isArray(actualData) ? actualData : []);
    } catch (error) {
      console.log(error);
      setPortfolios([]);
    } finally {
      setLoadingPortfolios(false);
    }
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) {
      return selectedTailor?.photo
        ? `${BASE_URL_BACKEND}${selectedTailor.photo}`
        : "https://via.placeholder.com/56";
    }

    if (imageUrl.startsWith("http")) return imageUrl;

    return `${BASE_URL_BACKEND}${imageUrl}`;
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f3f4f6",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        logout={logout}
        navigate={navigate}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            height: "60px",
            background: "#ffffff",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
          }}
        >
          <div
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{
              cursor: "pointer",
              fontSize: "20px",
              color: "#6b7280",
            }}
          >
            ☰
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <FiBell size={18} color="#111827" />
            <div
              style={{
                fontWeight: "700",
                fontSize: "13px",
              }}
            >
              ARKI
            </div>
          </div>
        </div>

        <div style={{ padding: "24px", flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "30px",
                  fontWeight: "700",
                  color: "#111827",
                }}
              >
                Portofolio Penjahit
              </h1>
              <p
                style={{
                  margin: "6px 0 0",
                  color: "#6b7280",
                  fontSize: "14px",
                }}
              >
                Daftar katalog portofolio dari database
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "18px",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                width: "230px",
                minHeight: "500px",
                background: "#ffffff",
                borderRadius: "10px",
                padding: "18px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {loadingTailors ? (
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      fontWeight: "700",
                    }}
                  >
                    Memuat penjahit...
                  </div>
                ) : tailors.length > 0 ? (
                  tailors.map((tailor) => (
                    <div
                      key={tailor.id}
                      onClick={() => setSelectedTailorId(String(tailor.id))}
                      style={{
                        cursor: "pointer",
                        fontWeight: "700",
                        fontSize: "14px",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        transition: "0.2s ease",
                        background:
                          String(selectedTailorId) === String(tailor.id)
                            ? "#eff6ff"
                            : "transparent",
                        color:
                          String(selectedTailorId) === String(tailor.id)
                            ? "#2563eb"
                            : "#111827",
                      }}
                    >
                      {tailor.name}
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      fontWeight: "700",
                    }}
                  >
                    Tidak ada data penjahit
                  </div>
                )}
              </div>
            </div>

            <div
              style={{
                flex: 1,
              }}
            >
              {loadingPortfolios ? (
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: "10px",
                    padding: "24px",
                    textAlign: "center",
                    fontWeight: "700",
                    color: "#6b7280",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                  }}
                >
                  Memuat portofolio...
                </div>
              ) : portfolios.length > 0 ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "16px",
                    alignContent: "start",
                  }}
                >
                  {portfolios.map((item) => (
<div
  key={item.id}
  onClick={() =>
    navigate(
      `/manage-portfolio/${selectedTailorId}`
    )
  }
  style={{
    background: "#ffffff",

    borderRadius: "10px",

    padding: "14px",

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    boxShadow:
      "0 4px 12px rgba(0,0,0,0.03)",

    cursor: "pointer",

    transition: "0.2s ease",
  }}
>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                        }}
                      >
                        <img
                          src={getImageUrl(item.image_url)}
                          alt={selectedTailor?.name || "portfolio"}
                          style={{
                            width: "56px",
                            height: "56px",
                            borderRadius: "8px",
                            objectFit: "cover",
                          }}
                        />

                        <div>
                          <div
                            style={{
                              fontWeight: "700",
                              fontSize: "14px",
                              marginBottom: "4px",
                              color: "#111827",
                            }}
                          >
                            {selectedTailor?.name || item.name || "Portofolio"}
                          </div>

                          <div
                            style={{
                              fontSize: "13px",
                              fontWeight: "700",
                              color: "#6b7280",
                            }}
                          >
                            Portofolio
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          fontSize: "18px",
                          color: "#9ca3af",
                          fontWeight: "700",
                        }}
                      >
                        ›
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: "10px",
                    padding: "24px",
                    textAlign: "center",
                    fontWeight: "700",
                    color: "#6b7280",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                  }}
                >
                  Belum ada portofolio
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;