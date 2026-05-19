import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  collection,
  onSnapshot,
  query,
  orderBy,
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

const AdminChat = () => {

  const navigate =
    useNavigate();

  const {
    user,
    logout,
  } = useContext(
    AuthContext
  );

  const [rooms, setRooms] =
    useState([]);

  const [
    isSidebarOpen,
    setIsSidebarOpen,
  ] = useState(true);

  // =========================
  // FETCH CHAT ROOMS
  // =========================

  useEffect(() => {

    if (!user) {

      navigate("/");
      return;

    }

    const q = query(

      collection(
        db,
        "chats"
      ),

      orderBy(
        "updated_at",
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

          setRooms(data);

        }
      );

    return () =>
      unsubscribe();

  }, [user]);

  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f3f4f6",
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
              display: "flex",
              alignItems:
                "center",
              gap: "14px",
            }}
          >

            <FiBell
              size={18}
              color="#111827"
            />

            <div
              style={{
                fontWeight:
                  "700",
                fontSize:
                  "13px",
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
              marginBottom:
                "24px",
            }}
          >

            <h1
              style={{
                margin: 0,
                fontSize: "42px",
                fontWeight:
                  "700",
                color: "#111827",
                marginBottom:
                  "8px",
              }}
            >
              Chat Customer
            </h1>

            <p
              style={{
                color: "#6b7280",
                fontSize: "16px",
              }}
            >
              Daftar chat customer
            </p>

          </div>

          {/* CHAT LIST */}
          <div
            style={{
              display: "flex",
              flexDirection:
                "column",
              gap: "16px",
            }}
          >

            {rooms.map((room) => {

              // =========================
              // STATUS CHAT
              // false = BELUM DIBACA
              // true = SUDAH DIBACA
              // =========================

              const isUnread =
                room.is_read === false;

              return (

                <div
                  key={room.id}

                  onClick={() =>
                    navigate(
                      `/admin-chat/${room.id}`
                    )
                  }

                  style={{

                    background:
                      isUnread
                        ? "#eff6ff"
                        : "#ffffff",

                    borderRadius:
                      "16px",

                    padding:
                      "20px",

                    cursor:
                      "pointer",

                    display:
                      "flex",

                    justifyContent:
                      "space-between",

                    alignItems:
                      "center",

                    border:
                      isUnread
                        ? "1px solid #bfdbfe"
                        : "1px solid transparent",

                    boxShadow:
                      isUnread
                        ? "0 6px 18px rgba(37,99,235,0.10)"
                        : "0 4px 10px rgba(0,0,0,0.04)",

                    transition:
                      "all 0.2s ease",
                  }}

                  onMouseEnter={(e) => {

                    e.currentTarget.style.transform =
                      "translateY(-2px)";

                  }}

                  onMouseLeave={(e) => {

                    e.currentTarget.style.transform =
                      "translateY(0px)";

                  }}
                >

                  {/* LEFT */}
                  <div
                    style={{
                      display:
                        "flex",
                      alignItems:
                        "center",
                      gap: "16px",
                    }}
                  >

                    {/* AVATAR */}
                    <div
                      style={{
                        width: "58px",
                        height: "58px",
                        borderRadius:
                          "50%",

                        background:
                          isUnread
                            ? "#2563eb"
                            : "#9ca3af",

                        color:
                          "#ffffff",

                        display:
                          "flex",

                        alignItems:
                          "center",

                        justifyContent:
                          "center",

                        fontWeight:
                          "700",

                        fontSize:
                          "22px",

                        flexShrink: 0,
                      }}
                    >
                      {(
                        room.customer_name ||
                        "C"
                      )
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    {/* TEXT */}
                    <div>

                      {/* NAME */}
                      <div
                        style={{
                          display:
                            "flex",

                          alignItems:
                            "center",

                          gap: "10px",

                          marginBottom:
                            "5px",
                        }}
                      >

                        <div
                          style={{
                            fontWeight:
                              isUnread
                                ? "700"
                                : "600",

                            fontSize:
                              "20px",

                            color:
                              "#111827",
                          }}
                        >
                          {
                            room.customer_name ||
                            `Customer #${room.customer_id}`
                          }
                        </div>

                        {/* RED DOT */}
                        {isUnread && (

                          <div
                            style={{
                              width: "10px",
                              height: "10px",
                              borderRadius:
                                "50%",
                              background:
                                "#ef4444",

                              animation:
                                "pulse 1.5s infinite",
                            }}
                          />

                        )}

                      </div>

                      {/* MESSAGE */}
                      <div
                        style={{
                          color:
                            isUnread
                              ? "#111827"
                              : "#6b7280",

                          fontSize:
                            "15px",

                          fontWeight:
                            isUnread
                              ? "600"
                              : "400",
                        }}
                      >
                        {
                          room.last_message ||
                          "Belum ada pesan"
                        }
                      </div>

                    </div>

                  </div>

                  {/* RIGHT */}
                  <div>

                    {isUnread ? (

                      <div
                        style={{
                          background:
                            "#dbeafe",

                          color:
                            "#2563eb",

                          padding:
                            "10px 16px",

                          borderRadius:
                            "999px",

                          fontSize:
                            "12px",

                          fontWeight:
                            "700",
                        }}
                      >
                        🔴 Pesan Baru
                      </div>

                    ) : (

                      <div
                        style={{
                          background:
                            "#f3f4f6",

                          color:
                            "#6b7280",

                          padding:
                            "10px 16px",

                          borderRadius:
                            "999px",

                          fontSize:
                            "12px",

                          fontWeight:
                            "600",
                        }}
                      >
                        ✅ Sudah Dibaca
                      </div>

                    )}

                  </div>

                </div>

              );

            })}

          </div>

        </div>

      </div>

      {/* ANIMATION */}
      <style>
        {`

          @keyframes pulse {

            0% {
              transform: scale(1);
              opacity: 1;
            }

            50% {
              transform: scale(1.4);
              opacity: 0.5;
            }

            100% {
              transform: scale(1);
              opacity: 1;
            }

          }

        `}
      </style>

    </div>

  );

};

export default AdminChat;