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
  getDocs,
} from "firebase/firestore";

import db from "../services/firebaseService";

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

        // =====================================
        // AMBIL RATING FIRESTORE
        // =====================================

        const ratingSnapshot =
          await getDocs(

            collection(
              db,
              "ratings"
            )

          );

        const ratings =
          ratingSnapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        // =====================================
        // GABUNGKAN RATING
        // =====================================

        const tailorWithRatings =

          actualTailorData.map(
            (tailor) => {

              const tailorRatings =

                ratings.filter(
                  (item) =>

                    Number(
                      item.tailor_id
                    ) ===

                    Number(
                      tailor.id
                    )
                );

              const totalReviews =
                tailorRatings.length;

              const averageRating =

                totalReviews > 0

                  ? (

                      tailorRatings.reduce(

                        (acc, item) =>

                          acc +
                          Number(
                            item.rating
                          ),

                        0

                      ) / totalReviews

                    ).toFixed(1)

                  : 0;

              return {

                ...tailor,

                rating:
                  averageRating,

                total_reviews:
                  totalReviews,

              };

            }
          );

        setTailors(
          tailorWithRatings
        );

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

          {/* RIGHT */}

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

            {/* TEXT ARKI */}

            <div
              style={{

                fontSize:
                  "14px",

                fontWeight:
                  "700",

                color:
                  "#111827",

              }}
            >
              ARKI
            </div>

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
                    tailor.photo &&
                    tailor.photo !== "NULL" &&
                    tailor.photo !== ""
                      ? tailor.photo
                      : "https://via.placeholder.com/50";
                  return (
                    <div
                      key={index}
                      style={{
                        background: "#ffffff",
                        borderRadius: "10px",
                        padding: "14px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
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
                          src={imageUrl}
                          alt="tailor"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/50";

                          }}

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
                              fontWeight:
                                "700",
                              fontSize:
                                "15px",
                              marginBottom:
                                "6px",
                              color:
                                "#111827",
                            }}
                          >

                            {tailor.name}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              marginBottom: "10px",
                              fontSize: "13px",
                              color: "#6b7280",
                              fontWeight: "600",
                            }}
                          >

                            <span
                              style={{
                                color:
                                  "#f59e0b",
                              }}
                            >
                              ⭐
                            </span>

                            <span>

                              {parseFloat(
                                tailor.rating || 0
                              ).toFixed(1)}

                            </span>

                            <span
                              style={{
                                color:
                                  "#9ca3af",
                              }}
                            >
                              (
                              {" "}
                              {tailor.total_reviews || 0}
                              {" "}
                              Review
                              )
                            </span>
                          </div>
                          {/* BUTTON */}

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
                                "2px",
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