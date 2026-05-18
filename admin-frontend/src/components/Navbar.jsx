import "./Navbar.css";

import {
  FiLogOut,
} from "react-icons/fi";

const Navbar = ({
  isSidebarOpen,
  logout,
  navigate,
}) => {
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
              navigate("/dashboard")
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
              navigate("/bookings")
            }
          >
            {isSidebarOpen
              ? "Daftar Pesanan"
              : "PS"}
          </button>

          {/* PORTFOLIO */}
          <button
            className="menu-btn"
            onClick={() =>
              navigate("/portfolio")
            }
          >
            {isSidebarOpen
              ? "Portofolio Penjahit"
              : "PF"}
          </button>

          {/* CHAT */}
          <button
            className="menu-btn"
          >
            {isSidebarOpen
              ? "Chat"
              : "CH"}
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