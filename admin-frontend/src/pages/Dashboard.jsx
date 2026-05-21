import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  AuthContext,
} from "../context/AuthContext";

import {
  getMyTailor,
} from "../services/tailorService";

import {
  FiBell,
} from "react-icons/fi";

import Navbar from "../components/Navbar";

import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

import db from "../services/firebaseService";

const BASE_URL_BACKEND =
  "http://localhost:8080/uploads/";

const Dashboard = () => {

  const navigate =
    useNavigate();

  const {
    user,
    logout,
  } = useContext(
    AuthContext
  );

  const [
    tailors,
    setTailors,
  ] = useState([]);

  const [
    isSidebarOpen,
    setIsSidebarOpen,
  ] = useState(true);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("");

  // BADGE NOTIF
  const [
    hasNewNotif,
    setHasNewNotif,
  ] = useState(false);

  // TOTAL NOTIF
  const [
    notifications,
    setNotifications,
  ] = useState([]);


  // =========================
  // FETCH DATA
  // =========================

  useEffect(() => {

    if (!user) {

      navigate("/");
      return;

    }

    fetchData();

  }, [user]);


  const fetchData =
    async () => {

      try {

        const responseData =
          await getMyTailor();

        const actualTailorData =
          responseData.data
            ? responseData.data
            : responseData;

        if (
          Array.isArray(
            actualTailorData
          )
        ) {

          setTailors(
            actualTailorData
          );

        }

      } catch (error) {

        console.log(error);

      }

    };


  // =========================
  // REALTIME NOTIFICATION
  // =========================

  useEffect(() => {

    if (!user?.id) return;

    const q = query(

      collection(
        db,
        "admin_notifications"
      ),

      where(
        "user_id",
        "==",
        Number(user.id)
      ),

      where(
        "is_read",
        "==",
        false
      )

    );

    const unsubscribe =
      onSnapshot(
        q,
        (snapshot) => {

          const data =
            snapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          setNotifications(
            data
          );

          const totalNotif =
            data.length;

          const lastTotal =
            Number(

              localStorage.getItem(
                "lastNotifTotal"
              ) || 0

            );

          // ADA NOTIF BARU

          if (
            totalNotif >
            lastTotal
          ) {

            setHasNewNotif(
              true
            );

          }

        }
      );

    return () =>
      unsubscribe();

  }, [user]);


  // =========================
  // CATEGORY
  // =========================

  const categories = [

    ...new Set(

      tailors

        .map(
          (tailor) =>
            tailor.specialization
        )

        .filter(Boolean)

    ),

  ];


  // =========================
  // FILTER
  // =========================

  const filteredTailors =
    selectedCategory

      ? tailors.filter(
          (tailor) =>

            tailor.specialization
              ?.toLowerCase()
              .trim() ===

            selectedCategory
              .toLowerCase()
              .trim()

        )

      : tailors;


  return (

    <div
      style={{

        display: "flex",

        minHeight:
          "100vh",

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

          {/* LEFT */}

          <div
            onClick={() =>

              setIsSidebarOpen(
                !isSidebarOpen
              )

            }

            style={{

              cursor:
                "pointer",

              fontSize:
                "20px",

              color:
                "#6b7280",

            }}
          >
            ☰
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

            {/* TITLE */}

            <h1
              style={{

                margin: 0,

                fontSize:
                  "30px",

                fontWeight:
                  "700",

                color:
                  "#111827",

              }}
            >
              Daftar Penjahit
            </h1>


            {/* RIGHT ACTION */}

            <div
              style={{

                display: "flex",

                alignItems:
                  "center",

                gap: "14px",

              }}
            >

              {/* NOTIFICATION */}

              <div

                onClick={() => {

                  setHasNewNotif(
                    false
                  );

                  localStorage.setItem(

                    "lastNotifTotal",

                    String(
                      notifications.length
                    )

                  );

                  navigate(
                    "/notifications"
                  );

                }}

                style={{

                  position:
                    "relative",

                  cursor:
                    "pointer",

                  width: "42px",

                  height: "42px",

                  borderRadius:
                    "50%",

                  background:
                    "#ffffff",

                  display:
                    "flex",

                  alignItems:
                    "center",

                  justifyContent:
                    "center",

                  boxShadow:
                    "0 2px 8px rgba(0,0,0,0.08)",

                }}
              >

                <FiBell
                  size={18}
                  color="#111827"
                />

                {/* BADGE */}

                {hasNewNotif && (

                  <div
                    style={{

                      position:
                        "absolute",

                      top: "8px",

                      right: "8px",

                      width: "10px",

                      height:
                        "10px",

                      borderRadius:
                        "50%",

                      background:
                        "#ef4444",

                      border:
                        "2px solid white",

                    }}
                  />

                )}

              </div>


              {/* BUTTON */}

              <button

                onClick={() =>

                  navigate(
                    "/manage-tailor"
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
                + Tambah Penjahit
              </button>

            </div>

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

            {/* CATEGORY */}

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

                  display: "flex",

                  flexDirection:
                    "column",

                  gap: "28px",

                }}
              >

                {categories.map(
                  (
                    category,
                    index
                  ) => (

                    <div
                      key={index}

                      onClick={() =>

                        setSelectedCategory(
                          category
                        )

                      }

                      style={{

                        cursor:
                          "pointer",

                        fontWeight:
                          "700",

                        fontSize:
                          "14px",

                        transition:
                          "0.2s ease",

                        color:

                          selectedCategory ===
                          category

                            ? "#2563eb"

                            : "#111827",

                      }}
                    >

                      {category}

                    </div>

                  )
                )}

              </div>

            </div>


            {/* CARD LIST */}

            <div
              style={{

                flex: 1,

                display: "grid",

                gridTemplateColumns:
                  "repeat(2, 1fr)",

                gap: "16px",

                alignContent:
                  "start",

              }}
            >

              {filteredTailors.map(
                (
                  tailor,
                  index
                ) => {

                  const imageUrl =
                    tailor.photo

                      ? `${BASE_URL_BACKEND}${tailor.photo}`

                      : "https://via.placeholder.com/50";

                  return (

                    <div
                      key={index}

                      style={{

                        background:
                          "#ffffff",

                        borderRadius:
                          "10px",

                        padding:
                          "14px",

                        display:
                          "flex",

                        justifyContent:
                          "space-between",

                        alignItems:
                          "center",

                        boxShadow:
                          "0 4px 12px rgba(0,0,0,0.03)",

                      }}
                    >

                      <div
                        style={{

                          display:
                            "flex",

                          alignItems:
                            "center",

                          gap: "14px",

                        }}
                      >

                        <img
                          src={imageUrl}

                          alt="tailor"

                          style={{

                            width: "56px",

                            height:
                              "56px",

                            borderRadius:
                              "8px",

                            objectFit:
                              "cover",

                          }}
                        />

                        <div>

                          <div
                            style={{

                              fontWeight:
                                "700",

                              fontSize:
                                "14px",

                              marginBottom:
                                "4px",

                              color:
                                "#111827",

                            }}
                          >

                            {tailor.name}

                          </div>


                          <div

                            onClick={() =>

                              navigate(
                                `/tailor-detail/${tailor.id}`
                              )

                            }

                            style={{

                              display:
                                "inline-flex",

                              alignItems:
                                "center",

                              gap: "6px",

                              marginTop:
                                "6px",

                              padding:
                                "6px 12px",

                              borderRadius:
                                "999px",

                              background:
                                "#eff6ff",

                              color:
                                "#2563eb",

                              fontSize:
                                "12px",

                              fontWeight:
                                "700",

                              cursor:
                                "pointer",

                              transition:
                                "0.2s ease",

                            }}

                            onMouseEnter={(e) => {

                              e.currentTarget.style.background =
                                "#2563eb";

                              e.currentTarget.style.color =
                                "#ffffff";

                            }}

                            onMouseLeave={(e) => {

                              e.currentTarget.style.background =
                                "#eff6ff";

                              e.currentTarget.style.color =
                                "#2563eb";

                            }}

                          >
                            Lihat Detail
                          </div>

                        </div>

                      </div>

                    </div>

                  );

                }
              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Dashboard;