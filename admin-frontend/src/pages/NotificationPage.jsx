import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore";

import {
  FiBell,
  FiArrowLeft,
} from "react-icons/fi";

import db from "../services/firebaseService";

import {
  AuthContext,
} from "../context/AuthContext";

const NotificationPage = () => {

  const navigate =
    useNavigate();

  const {
    user,
  } = useContext(
    AuthContext
  );

  const [
    notifications,
    setNotifications,
  ] = useState([]);

  // =====================================
  // GET ADMIN NOTIFICATIONS
  // =====================================

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


  // =====================================
  // HANDLE CLICK NOTIFICATION
  // =====================================

  const handleNotificationClick =
    async (notif) => {

      try {

        // UPDATE STATUS DIBACA

        await updateDoc(

          doc(
            db,
            "admin_notifications",
            notif.id
          ),

          {
            is_read: true,
          }

        );


        // =====================================
        // REDIRECT HALAMAN
        // =====================================

        // CHAT

        if (
          notif.title ===
          "Pesan Baru"
        ) {

          navigate(
            "/admin-chat"
          );

        }

        // BOOKING

        else if (
          notif.title ===
          "Pesanan Baru"
        ) {

          navigate(
            "/bookings"
          );

        }

        // PAYMENT

        else if (
          notif.title ===
          "Pembayaran Baru"
        ) {

          navigate(
            "/payments"
          );

        }

      } catch (error) {

        console.log(
          "CLICK NOTIF ERROR:",
          error
        );

      }

    };


  return (

    <div
      style={{
        minHeight:
          "100vh",

        background:
          "#f5f7fb",

        padding:
          "32px",
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
            "28px",

        }}
      >

        {/* BACK BUTTON */}

        <button

          onClick={() =>
            navigate(-1)
          }

          style={{

            width: "44px",

            height: "44px",

            borderRadius:
              "50%",

            border: "none",

            background:
              "#ffffff",

            display:
              "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            cursor:
              "pointer",

            color:
              "#111827",

            boxShadow:
              "0 2px 10px rgba(0,0,0,0.06)",

            transition:
              "0.2s ease",

          }}

          onMouseEnter={(e) => {

            e.currentTarget.style.transform =
              "translateY(-2px)";

            e.currentTarget.style.background =
              "#2563eb";

            e.currentTarget.style.color =
              "#ffffff";

            e.currentTarget.style.boxShadow =
              "0 8px 18px rgba(37,99,235,0.20)";

          }}

          onMouseLeave={(e) => {

            e.currentTarget.style.transform =
              "translateY(0px)";

            e.currentTarget.style.background =
              "#ffffff";

            e.currentTarget.style.color =
              "#111827";

            e.currentTarget.style.boxShadow =
              "0 2px 10px rgba(0,0,0,0.06)";

          }}

        >

          <FiArrowLeft
            size={20}
          />

        </button>


        {/* TITLE */}

        <div>

          <h1
            style={{
              fontSize:
                "32px",

              fontWeight:
                "700",

              margin: 0,

              color:
                "#111827",
            }}
          >
            Notifikasi Admin
          </h1>

          <p
            style={{
              margin:
                "4px 0 0 0",

              color:
                "#6b7280",

              fontSize:
                "14px",
            }}
          >
            Semua aktivitas terbaru admin
          </p>

        </div>

      </div>


      {/* LIST */}

      <div
        style={{
          display:
            "flex",

          flexDirection:
            "column",

          gap:
            "16px",
        }}
      >

        {/* EMPTY */}

        {notifications.length === 0 && (

          <div
            style={{
              background:
                "#ffffff",

              padding:
                "24px",

              borderRadius:
                "18px",

              fontSize:
                "15px",

              color:
                "#6b7280",

              boxShadow:
                "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            Belum ada notifikasi
          </div>

        )}


        {/* NOTIFICATION LIST */}

        {notifications.map((notif) => (

          <div

            key={notif.id}

            onClick={() =>
              handleNotificationClick(
                notif
              )
            }

            style={{

              background:
                "#ffffff",

              borderRadius:
                "18px",

              padding:
                "20px",

              display:
                "flex",

              alignItems:
                "center",

              justifyContent:
                "space-between",

              boxShadow:
                "0 3px 12px rgba(0,0,0,0.05)",

              cursor:
                "pointer",

              transition:
                "0.2s ease",

            }}

            onMouseEnter={(e) => {

              e.currentTarget.style.transform =
                "translateY(-2px)";

              e.currentTarget.style.boxShadow =
                "0 8px 20px rgba(0,0,0,0.08)";

            }}

            onMouseLeave={(e) => {

              e.currentTarget.style.transform =
                "translateY(0px)";

              e.currentTarget.style.boxShadow =
                "0 3px 12px rgba(0,0,0,0.05)";

            }}

          >

            {/* LEFT */}

            <div
              style={{
                display:
                  "flex",

                gap:
                  "16px",

                alignItems:
                  "center",
              }}
            >

              {/* ICON */}

              <div
                style={{
                  width:
                    "52px",

                  height:
                    "52px",

                  borderRadius:
                    "14px",

                  background:
                    notif.is_read
                      ? "#f3f4f6"
                      : "#2563eb",

                  display:
                    "flex",

                  justifyContent:
                    "center",

                  alignItems:
                    "center",

                  color:
                    notif.is_read
                      ? "#6b7280"
                      : "#ffffff",
                }}
              >

                <FiBell
                  size={22}
                />

              </div>


              {/* CONTENT */}

              <div>

                <div
                  style={{
                    fontWeight:
                      "700",

                    fontSize:
                      "17px",

                    marginBottom:
                      "4px",

                    color:
                      "#111827",
                  }}
                >
                  {notif.title}
                </div>

                <div
                  style={{
                    color:
                      "#6b7280",

                    fontSize:
                      "14px",

                    lineHeight:
                      "1.5",
                  }}
                >
                  {notif.message}
                </div>

              </div>

            </div>


            {/* BADGE */}

            <div
              style={{

                background:
                  notif.is_read
                    ? "#f3f4f6"
                    : "#dbeafe",

                color:
                  notif.is_read
                    ? "#6b7280"
                    : "#2563eb",

                padding:
                  "8px 14px",

                borderRadius:
                  "999px",

                fontWeight:
                  "700",

                fontSize:
                  "12px",
              }}
            >

              {notif.is_read
                ? "Dibaca"
                : "Baru"}

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default NotificationPage;