import "./Navbar.css";

import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import {
  FiLogOut,
} from "react-icons/fi";

import db from "../services/firebaseService";

const Navbar = ({

  isSidebarOpen,

  logout,

  navigate,

}) => {

  // ======================
  // CHAT NOTIFICATION
  // ======================

  const [
    hasNewChat,
    setHasNewChat,
  ] = useState(false);


  // ======================
  // REALTIME NOTIF
  // ======================

  useEffect(() => {

    const q = query(

      collection(
        db,
        "notifications"
      ),

      where(
        "type",
        "==",
        "chat"
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

          setHasNewChat(

            !snapshot.empty

          );

        },
        (error) => {

          console.log(error);

        }
      );

    return () =>
      unsubscribe();

  }, []);


  // ======================
  // OPEN CHAT
  // ======================

  const handleOpenChat =
    async () => {

      try {

        // AMBIL SEMUA NOTIF CHAT
        const q = query(

          collection(
            db,
            "notifications"
          ),

          where(
            "type",
            "==",
            "chat"
          ),

          where(
            "is_read",
            "==",
            false
          )

        );

        const snapshot =
          await getDocs(q);

        // UPDATE MENJADI READ
        snapshot.forEach(
          async (docItem) => {

            await updateDoc(

              docItem.ref,

              {

                is_read: true,

              }

            );

          }
        );

        // HILANGKAN DOT
        setHasNewChat(
          false
        );

        // PINDAH HALAMAN
        navigate(
          "/admin-chat"
        );

      } catch (error) {

        console.log(error);

      }

    };


  return (

    <aside
      className={

        isSidebarOpen

          ? "sidebar open"

          : "sidebar"

      }
    >

      {/* TOP */}

      <div>

        {/* TITLE */}

        {isSidebarOpen && (

          <h2 className="sidebar-title">
            Dashboard Tailor
          </h2>

        )}


        {/* MENU */}

        <div className="sidebar-menu">

          {/* DASHBOARD */}

          <button
            className="menu-btn"

            onClick={() =>
              navigate(
                "/dashboard"
              )
            }
          >

            {isSidebarOpen
              ? "Daftar Penjahit"
              : "DP"}

          </button>


          {/* PESANAN */}

          <button
            className="menu-btn"

            onClick={() =>
              navigate(
                "/bookings"
              )
            }
          >

            {isSidebarOpen
              ? "Daftar Pesanan"
              : "PS"}

          </button>


          {/* PEMBAYARAN */}

          <button
            className="menu-btn"

            onClick={() =>
              navigate(
                "/payments"
              )
            }
          >

            {isSidebarOpen
              ? "Data Pembayaran"
              : "BY"}

          </button>


          {/* PORTFOLIO */}

          <button
            className="menu-btn"

            onClick={() =>
              navigate(
                "/portfolio"
              )
            }
          >

            {isSidebarOpen
              ? "Portofolio Penjahit"
              : "PF"}

          </button>


          {/* CHAT */}

          <button
            className="menu-btn chat-btn"

            onClick={
              handleOpenChat
            }
          >

            {isSidebarOpen
              ? "Chat"
              : "CH"}

            {/* RED DOT */}

            {hasNewChat && (

              <span className="chat-red-dot"></span>

            )}

          </button>

        </div>

      </div>


      {/* BOTTOM */}

      <button
        className="logout-btn"

        onClick={() => {

          logout();

          navigate("/");

        }}
      >

        {isSidebarOpen &&
          "Logout"}

        <FiLogOut size={15} />

      </button>

    </aside>

  );

};

export default Navbar;