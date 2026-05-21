// Home.jsx

import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  FiBell,
} from "react-icons/fi";

import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

import db from "../services/firebaseService";

import {
  AuthContext,
} from "../context/AuthContext";

import TailorCard from "../components/TailorCard";

import {
  getAllTailors,
} from "../services/tailorService";

import "../App.css";
import "./Home.css";

const Home = () => {

  const navigate =
    useNavigate();

  // AUTH
  const {
    user,
    loading,
  } = useContext(
    AuthContext
  );

  const [tailors, setTailors] =
    useState([]);

  const [
    searchQuery,
    setSearchQuery,
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
  // CHECK LOGIN
  // =========================

  useEffect(() => {

    if (loading) return;

    if (!user) {

      navigate("/");
      return;

    }

    fetchTailors();

  }, [user, loading]);


  // =========================
  // FETCH TAILORS
  // =========================

  const fetchTailors =
    async () => {

      try {

        const data =
          await getAllTailors();

        setTailors(data);

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
        "notifications"
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
                "customerLastNotifTotal"
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
  // LOADING
  // =========================

  if (loading) {

    return (

      <div
        style={{
          textAlign:
            "center",

          paddingTop:
            "150px",

          fontFamily:
            "sans-serif",
        }}
      >

        <h3>
          Memuat Aplikasi...
        </h3>

      </div>

    );

  }


  // =========================
  // FILTER TAILORS
  // =========================

  const filteredTailors =
    tailors.filter((tailor) =>

      (tailor.name || "")
        .toLowerCase()
        .includes(
          searchQuery.toLowerCase()
        )

    );

  const displayUserName =
    user?.name || "USER";


  return (

    <div className="home-page-container">

      <div className="home-container">

        {/* HEADER */}

        <div className="home-header-layout">

          {/* LEFT */}

          <div className="user-welcome-section">

            <h1>
              Hi,{" "}
              {displayUserName.toUpperCase()}
            </h1>

            <p>
              Selamat Datang di Aplikasi Kami
            </p>

          </div>


          {/* RIGHT */}

          <div className="header-actions-section">

            {/* NOTIFICATION */}

            <button

              className="notification-bell-btn"

              onClick={() => {

                // HILANGKAN BADGE

                setHasNewNotif(
                  false
                );

                // SIMPAN TOTAL NOTIF TERAKHIR

                localStorage.setItem(

                  "customerLastNotifTotal",

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

                display:
                  "flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                width: "45px",

                height: "45px",

                borderRadius:
                  "50%",

                border: "none",

                background:
                  "#ffffff",

                cursor:
                  "pointer",

                boxShadow:
                  "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >

              <FiBell
                size={22}
                color="#111827"
              />

              {/* BADGE MERAH */}

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

            </button>


            {/* SEARCH */}

            <div className="search-input-wrapper">

              <input
                type="text"

                placeholder="Search"

                value={searchQuery}

                onChange={(e) =>
                  setSearchQuery(
                    e.target.value
                  )
                }

                className="search-input-field"
              />

              <span className="search-icon-inside">
                🔍
              </span>

            </div>

          </div>

        </div>


        {/* TAILOR GRID */}

        <div className="tailor-list">

          {filteredTailors.length >
          0 ? (

            filteredTailors.map(
              (tailor) => (

                <TailorCard
                  key={tailor.id}
                  tailor={tailor}
                />

              )
            )

          ) : (

            <p className="tailor-not-found-msg">
              Penjahit tidak ditemukan.
            </p>

          )}

        </div>

      </div>

    </div>

  );

};

export default Home;