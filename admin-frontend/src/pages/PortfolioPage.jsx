import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  AuthContext,
} from "../context/AuthContext";

import {
  getMyTailor,
} from "../services/tailorService";

import {
  getMyPortfolios,
} from "../services/portfolioService";

const BASE_URL_BACKEND =
  "https://proyek-penjahitlokal-764024000152.us-central1.run.app/uploads/";

const PortfolioPage = () => {

  const navigate =
    useNavigate();

  const {
    user,
    logout,
  } = useContext(
    AuthContext
  );

  const [
    isSidebarOpen,
    setIsSidebarOpen,
  ] = useState(true);

  const [
    tailors,
    setTailors,
  ] = useState([]);

  const [
    selectedTailorId,
    setSelectedTailorId,
  ] = useState("");

  const [
    selectedTailor,
    setSelectedTailor,
  ] = useState(null);

  const [
    portfolios,
    setPortfolios,
  ] = useState([]);

  const [
    loadingTailors,
    setLoadingTailors,
  ] = useState(true);

  const [
    loadingPortfolios,
    setLoadingPortfolios,
  ] = useState(false);

  useEffect(() => {

    if (!user) {

      navigate("/");
      return;

    }

    fetchTailors();

  }, [user, navigate]);


  useEffect(() => {

    if (!selectedTailorId)
      return;

    const currentTailor =
      tailors.find(
        (t) =>
          String(t.id) ===
          String(
            selectedTailorId
          )
      ) || null;

    setSelectedTailor(
      currentTailor
    );

    fetchPortfolios(
      selectedTailorId
    );

  }, [
    selectedTailorId,
    tailors,
  ]);


  // =========================
  // FETCH TAILORS
  // =========================

  const fetchTailors =
    async () => {

      try {

        setLoadingTailors(
          true
        );

        const responseData =
          await getMyTailor();

        const actualTailorData =
          responseData.data
            ? responseData.data
            : responseData;

        const list =
          Array.isArray(
            actualTailorData
          )
            ? actualTailorData
            : [];

        setTailors(list);

        if (
          list.length > 0 &&
          !selectedTailorId
        ) {

          setSelectedTailorId(
            String(list[0].id)
          );

        }

      } catch (error) {

        console.log(error);

        setTailors([]);

      } finally {

        setLoadingTailors(
          false
        );

      }

    };


  // =========================
  // FETCH PORTFOLIOS
  // =========================

  const fetchPortfolios =
    async (tailorId) => {

      try {

        setLoadingPortfolios(
          true
        );

        const responseData =
          await getMyPortfolios(
            tailorId
          );

        const actualData =
          responseData?.data
            ?.data
            ? responseData.data
                .data
            : responseData?.data
              ? responseData.data
              : responseData;

        setPortfolios(

          Array.isArray(
            actualData
          )

            ? actualData

            : []

        );

      } catch (error) {

        console.log(error);

        setPortfolios([]);

      } finally {

        setLoadingPortfolios(
          false
        );

      }

    };


  // =========================
  // IMAGE URL
  // =========================

  const getImageUrl = (
    imageUrl
  ) => {

    if (!imageUrl) {

      return selectedTailor?.photo

        ? `${BASE_URL_BACKEND}${selectedTailor.photo}`

        : "https://via.placeholder.com/56";

    }

    if (
      imageUrl.startsWith(
        "http"
      )
    ) {

      return imageUrl;

    }

    return `${BASE_URL_BACKEND}${imageUrl}`;

  };


  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background:
          "#f3f4f6",
        fontFamily:
          "Arial, sans-serif",
      }}
    >

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

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection:
            "column",
        }}
      >

        {/* TOPBAR */}

        <div
          style={{
            height: "60px",
            background:
              "#ffffff",
            borderBottom:
              "1px solid #e5e7eb",
            display: "flex",
            alignItems:
              "center",
            justifyContent:
              "space-between",
            padding:
              "0 24px",
          }}
        >

          {/* MENU */}

          <div
            onClick={() =>
              setIsSidebarOpen(
                !isSidebarOpen
              )
            }

            style={{
              cursor: "pointer",
              fontSize: "20px",
              color: "#6b7280",
            }}
          >
            ☰
          </div>


          {/* RIGHT */}

          <div
            style={{
              fontWeight:
                "700",

              fontSize:
                "13px",

              color:
                "#111827",
            }}
          >
            ARKI
          </div>

        </div>


        {/* CONTENT */}

        <div
          style={{
            padding: "24px",
            flex: 1,
          }}
        >

          {/* HEADER */}

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems:
                "center",
              marginBottom:
                "20px",
            }}
          >

            <div>

              <h1
                style={{
                  margin: 0,
                  fontSize: "30px",
                  fontWeight:
                    "700",
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


            {/* BUTTON */}

            <button
              onClick={() =>
                navigate(
                  `/manage-portfolio/${selectedTailorId}/add`
                )
              }

              style={{
                border: "none",
                background:
                  "#2563eb",
                color: "white",
                padding:
                  "10px 16px",
                borderRadius:
                  "8px",
                cursor:
                  "pointer",
                fontWeight:
                  "700",
                fontSize:
                  "12px",
                boxShadow:
                  "0 4px 10px rgba(37,99,235,0.2)",
              }}
            >
              + Tambah Portofolio
            </button>

          </div>


          {/* BODY */}

          <div
            style={{
              display: "flex",
              gap: "18px",
              alignItems:
                "flex-start",
            }}
          >

            {/* LEFT */}

            <div
              style={{
                width: "230px",
                minHeight:
                  "500px",
                background:
                  "#ffffff",
                borderRadius:
                  "10px",
                padding:
                  "18px",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.03)",
              }}
            >

              <div
                style={{
                  display:
                    "flex",
                  flexDirection:
                    "column",
                  gap: "12px",
                }}
              >

                {loadingTailors ? (

                  <div
                    style={{
                      fontSize:
                        "14px",
                      color:
                        "#6b7280",
                      fontWeight:
                        "700",
                    }}
                  >
                    Memuat penjahit...
                  </div>

                ) : tailors.length >
                  0 ? (

                  tailors.map(
                    (tailor) => (

                      <div
                        key={tailor.id}

                        onClick={() =>
                          setSelectedTailorId(
                            String(
                              tailor.id
                            )
                          )
                        }

                        style={{
                          cursor:
                            "pointer",
                          fontWeight:
                            "700",
                          fontSize:
                            "14px",
                          padding:
                            "10px 12px",
                          borderRadius:
                            "8px",
                          transition:
                            "0.2s ease",
                          background:
                            String(
                              selectedTailorId
                            ) ===
                            String(
                              tailor.id
                            )
                              ? "#eff6ff"
                              : "transparent",
                          color:
                            String(
                              selectedTailorId
                            ) ===
                            String(
                              tailor.id
                            )
                              ? "#2563eb"
                              : "#111827",
                        }}
                      >
                        {tailor.name}
                      </div>

                    )
                  )

                ) : (

                  <div
                    style={{
                      fontSize:
                        "14px",
                      color:
                        "#6b7280",
                      fontWeight:
                        "700",
                    }}
                  >
                    Tidak ada data penjahit
                  </div>

                )}

              </div>

            </div>


            {/* RIGHT */}

            <div style={{ flex: 1 }}>

              {loadingPortfolios ? (

                <div
                  style={{
                    background:
                      "#ffffff",
                    borderRadius:
                      "10px",
                    padding:
                      "24px",
                    textAlign:
                      "center",
                    fontWeight:
                      "700",
                    color:
                      "#6b7280",
                    boxShadow:
                      "0 4px 12px rgba(0,0,0,0.03)",
                  }}
                >
                  Memuat portofolio...
                </div>

              ) : portfolios.length >
                0 ? (

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(320px, 1fr))",
                    gap: "20px",
                  }}
                >

                  {portfolios.map(
                    (item) => (

                      <div
                        key={item.id}

                        style={{
                          background:
                            "#ffffff",
                          borderRadius:
                            "12px",
                          padding:
                            "16px",
                          boxShadow:
                            "0 4px 12px rgba(0,0,0,0.06)",
                          transition:
                            "0.2s ease",
                        }}
                      >

                        <img
                          src={getImageUrl(
                            item.image_url
                          )}

                          alt={item.name}

                          style={{
                            width: "100%",
                            height: "220px",
                            objectFit:
                              "cover",
                            borderRadius:
                              "10px",
                            marginBottom:
                              "14px",
                          }}
                        />

                        <h3
                          style={{
                            margin:
                              "0 0 10px",
                            fontSize:
                              "20px",
                            fontWeight:
                              "700",
                            color:
                              "#111827",
                          }}
                        >
                          {item.name}
                        </h3>

                        <div
                          style={{
                            display:
                              "inline-block",
                            background:
                              "#e5e7eb",
                            padding:
                              "4px 10px",
                            borderRadius:
                              "6px",
                            fontSize:
                              "13px",
                            fontWeight:
                              "600",
                            marginBottom:
                              "12px",
                          }}
                        >
                          Size:{" "}
                          {item.size}
                        </div>

                        <p
                          style={{
                            color:
                              "#6b7280",
                            fontSize:
                              "14px",
                            marginBottom:
                              "16px",
                            minHeight:
                              "40px",
                          }}
                        >
                          {
                            item.description
                          }
                        </p>

                        <div
                          style={{
                            display:
                              "flex",
                            justifyContent:
                              "space-between",
                            alignItems:
                              "center",
                            marginBottom:
                              "16px",
                            borderTop:
                              "1px solid #e5e7eb",
                            paddingTop:
                              "14px",
                          }}
                        >

                          <span
                            style={{
                              color:
                                "#374151",
                              fontSize:
                                "14px",
                            }}
                          >
                            Harga:
                          </span>

                          <span
                            style={{
                              color:
                                "#16a34a",
                              fontWeight:
                                "700",
                              fontSize:
                                "18px",
                            }}
                          >
                            Rp{" "}

                            {Number(
                              item.price
                            ).toLocaleString(
                              "id-ID"
                            )}

                          </span>

                        </div>

                        <button
                          onClick={() =>
                            navigate(
                              `/portfolio-detail/${item.id}`
                            )
                          }

                          style={{
                            width: "100%",
                            border: "none",
                            background:
                              "#2563eb",
                            color: "white",
                            padding:
                              "12px",
                            borderRadius:
                              "8px",
                            cursor:
                              "pointer",
                            fontWeight:
                              "700",
                            fontSize:
                              "14px",
                          }}
                        >
                          Edit
                        </button>

                      </div>

                    )
                  )}

                </div>

              ) : (

                <div
                  style={{
                    background:
                      "#ffffff",
                    borderRadius:
                      "10px",
                    padding:
                      "24px",
                    textAlign:
                      "center",
                    fontWeight:
                      "700",
                    color:
                      "#6b7280",
                    boxShadow:
                      "0 4px 12px rgba(0,0,0,0.03)",
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