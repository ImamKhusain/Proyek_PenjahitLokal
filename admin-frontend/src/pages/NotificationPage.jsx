import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import {
  FiBell,
} from "react-icons/fi";

import db from "../services/firebaseService";

import {
  AuthContext,
} from "../context/AuthContext";

const NotificationPage = () => {

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

    // BELUM LOGIN
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

  return (

    <div
      style={{
        minHeight:
          "100vh",

        background:
          "#f3f4f6",

        padding:
          "30px",
      }}
    >

      <h1
        style={{
          fontSize:
            "36px",

          fontWeight:
            "700",

          marginBottom:
            "24px",
        }}
      >
        Notifikasi Admin
      </h1>

      <div
        style={{
          display:
            "flex",

          flexDirection:
            "column",

          gap:
            "18px",
        }}
      >

        {/* EMPTY */}

        {notifications.length === 0 && (

          <div
            style={{
              background:
                "#fff",

              padding:
                "24px",

              borderRadius:
                "16px",

              fontSize:
                "16px",
            }}
          >
            Belum ada notifikasi
          </div>

        )}

        {/* LIST */}

        {notifications.map((notif) => (

          <div
            key={notif.id}

            style={{
              background:
                "#fff",

              borderRadius:
                "18px",

              padding:
                "22px",

              display:
                "flex",

              alignItems:
                "center",

              justifyContent:
                "space-between",

              boxShadow:
                "0 2px 10px rgba(0,0,0,0.05)",
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
                    "54px",

                  height:
                    "54px",

                  borderRadius:
                    "50%",

                  background:
                    "#2563eb",

                  display:
                    "flex",

                  justifyContent:
                    "center",

                  alignItems:
                    "center",

                  color:
                    "#fff",
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
                      "18px",

                    marginBottom:
                      "5px",
                  }}
                >
                  {notif.title}
                </div>

                <div
                  style={{
                    color:
                      "#6b7280",

                    fontSize:
                      "15px",
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
                  "#dbeafe",

                color:
                  "#2563eb",

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
              Baru
            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default NotificationPage;