import "./Navbar.css";

import {
  FiBell,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";

const Navbar = ({
  isSidebarOpen,
  setIsSidebarOpen,
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
          <button className="menu-btn">
            {isSidebarOpen
              ? "Daftar Penjahit"
              : "DP"}
          </button>

          <button className="menu-btn">
            {isSidebarOpen
              ? "Daftar Pesanan"
              : "PS"}
          </button>

          <button className="menu-btn">
            {isSidebarOpen
              ? "Portofolio Penjahit"
              : "PF"}
          </button>

          <button className="menu-btn">
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
        {isSidebarOpen && "Logout"}

        <FiLogOut size={15} />
      </button>
    </aside>
  );
};

export default Navbar;