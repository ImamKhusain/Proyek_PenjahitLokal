// src/pages/NotificationPage.jsx

import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  useNavigate,
} from "react-router-dom";

import {
  FiBell,
} from "react-icons/fi";

import db from "../services/firebaseService";

import Navbar from "../components/Navbar";

import {
  AuthContext,
} from "../context/AuthContext";

const NotificationPage = () => {

  const navigate =
    useNavigate();

  const {
    user,
    logout,
  } = useContext(
    AuthContext
  );

  const [
    notifications,
    setNotifications,
  ] = useState([]);


  // =========================
  // FETCH NOTIFICATIONS
  // =========================

  useEffect(() => {

    if (!user) return;

    const q = query(

      collection(
        db,
        "notifications"
      ),

      where(
        "user_id",
        "==",
        Number(user.id)
      ),

      orderBy(
        "created_at",
        "desc"
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

        },
        (error) => {

          console.log(
            "NOTIF ERROR:",
            error
          );

        }
      );

    return () =>
      unsubscribe();

  }, [user]);


  // =========================
  // SAAT MASUK HALAMAN NOTIF
  // HILANGKAN BADGE MERAH
  // =========================

  useEffect(() => {

    localStorage.setItem(
      "customerNotifSeen",
      "true"
    );

  }, []);


  // =========================
  // MARK AS READ
  // =========================

  const markAsRead =
    async (
      notificationId,
      redirect_url,
      title
    ) => {

      try {

        // UPDATE STATUS
        await updateDoc(

          doc(
            db,
            "notifications",
            notificationId
          ),

          {
            is_read: true,
          }

        );


        // =========================
        // REDIRECT OTOMATIS
        // =========================

        // PEMBAYARAN

        if (

          title
            ?.toLowerCase()
            .includes(
              "pembayaran"
            )

        ) {

          navigate(
            "/payments"
          );

        }

        // PESANAN

        else if (

          title
            ?.toLowerCase()
            .includes(
              "pesanan"
            )

        ) {

          navigate(
            "/pesanan"
          );

        }

        // DEFAULT

        else if (
          redirect_url
        ) {

          navigate(
            redirect_url
          );

        }

      } catch (error) {

        console.log(error);

      }

    };


  return (

    <div
      style={{
        minHeight:
          "100vh",

        background:
          "#f3f4f6",

        display: "flex",
      }}
    >

      {/* SIDEBAR */}

      <Navbar
        logout={logout}
        navigate={navigate}
        isSidebarOpen={
          true
        }
      />


      {/* CONTENT */}

      <div
        style={{
          flex: 1,
          padding: "30px",
          marginTop: "90px",
        }}
      >

        {/* HEADER */}

        <div
          style={{
            display: "flex",
            alignItems:
              "center",

            gap: "14px",

            marginBottom:
              "30px",
          }}
        >

          <FiBell
            size={34}
            color="#111827"
          />

          <div>

            <h1
              style={{
                margin: 0,

                fontSize:
                  "36px",

                fontWeight:
                  "700",

                color:
                  "#111827",
              }}
            >
              Notifications
            </h1>

            <p
              style={{
                marginTop:
                  "6px",

                color:
                  "#6b7280",
              }}
            >
              Semua update terbaru
            </p>

          </div>

        </div>


        {/* LIST */}

        <div
          style={{
            display: "flex",

            flexDirection:
              "column",

            gap: "18px",
          }}
        >

          {notifications.length ===
          0 ? (

            <div
              style={{
                background:
                  "#ffffff",

                padding:
                  "40px",

                borderRadius:
                  "16px",

                textAlign:
                  "center",

                color:
                  "#6b7280",
              }}
            >
              Belum ada notifikasi
            </div>

          ) : (

            notifications.map(
              (notif) => (

                <div
                  key={notif.id}

                  onClick={() =>
                    markAsRead(
                      notif.id,
                      notif.redirect_url,
                      notif.title
                    )
                  }

                  style={{

                    background:
                      notif.is_read
                        ? "#ffffff"
                        : "#eff6ff",

                    border:
                      notif.is_read
                        ? "1px solid #e5e7eb"
                        : "1px solid #bfdbfe",

                    padding:
                      "22px",

                    borderRadius:
                      "18px",

                    cursor:
                      "pointer",

                    display:
                      "flex",

                    justifyContent:
                      "space-between",

                    alignItems:
                      "center",

                    boxShadow:
                      "0 4px 10px rgba(0,0,0,0.04)",

                    transition:
                      "all 0.2s ease",
                  }}
                >

                  {/* LEFT */}

                  <div
                    style={{
                      display:
                        "flex",

                      gap: "18px",

                      alignItems:
                        "center",
                    }}
                  >

                    {/* ICON */}

                    <div
                      style={{
                        width: "54px",

                        height: "54px",

                        borderRadius:
                          "50%",

                        background:
                          notif.is_read
                            ? "#f3f4f6"
                            : "#2563eb",

                        color:
                          notif.is_read
                            ? "#6b7280"
                            : "#ffffff",

                        display:
                          "flex",

                        alignItems:
                          "center",

                        justifyContent:
                          "center",
                      }}
                    >

                      <FiBell
                        size={22}
                      />

                    </div>


                    {/* TEXT */}

                    <div>

                      <div
                        style={{
                          display:
                            "flex",

                          alignItems:
                            "center",

                          gap: "10px",

                          marginBottom:
                            "6px",
                        }}
                      >

                        <h3
                          style={{
                            margin: 0,

                            fontSize:
                              "18px",

                            color:
                              "#111827",
                          }}
                        >
                          {notif.title}
                        </h3>

                        {!notif.is_read && (

                          <div
                            style={{
                              width:
                                "10px",

                              height:
                                "10px",

                              borderRadius:
                                "50%",

                              background:
                                "#2563eb",
                            }}
                          />

                        )}

                      </div>

                      <p
                        style={{
                          margin: 0,

                          color:
                            "#4b5563",

                          fontSize:
                            "15px",
                        }}
                      >
                        {notif.message}
                      </p>

                    </div>

                  </div>


                  {/* STATUS */}

                  <div>

                    {notif.is_read ? (

                      <div
                        style={{
                          background:
                            "#f3f4f6",

                          color:
                            "#6b7280",

                          padding:
                            "8px 14px",

                          borderRadius:
                            "999px",

                          fontSize:
                            "13px",

                          fontWeight:
                            "600",
                        }}
                      >
                        Dibaca
                      </div>

                    ) : (

                      <div
                        style={{
                          background:
                            "#dbeafe",

                          color:
                            "#2563eb",

                          padding:
                            "8px 14px",

                          borderRadius:
                            "999px",

                          fontSize:
                            "13px",

                          fontWeight:
                            "700",
                        }}
                      >
                        Baru
                      </div>

                    )}

                  </div>

                </div>

              )
            )

          )}

        </div>

      </div>

    </div>

  );

};

export default NotificationPage;