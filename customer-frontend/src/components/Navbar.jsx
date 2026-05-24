import { useState, useEffect, useRef, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import {
  FiUser,
  FiLogOut,
} from "react-icons/fi";

import toast from "react-hot-toast";

import "./Navbar.css";

/* =========================================
   LOGO
========================================= */

import logoArki from "../assets/logoarki.png";

/* =========================================
   COMPONENT
========================================= */

const Navbar = () => {

  const navigate =
    useNavigate();

  const { user } =
    useContext(AuthContext);

  /* =========================================
     STATE
  ========================================= */

  const [
    isDropdownOpen,
    setIsDropdownOpen,
  ] = useState(false);

  const dropdownRef =
    useRef(null);

  /* =========================================
     GET INITIAL NAME
  ========================================= */

  const getInitialName = () => {

    if (!user?.name)
      return "U";

    return user.name
      .charAt(0)
      .toUpperCase();

  };

  /* =========================================
     LOGOUT
  ========================================= */

  const logout = () => {

    // HAPUS SESSION LOGIN

    localStorage.clear();

    sessionStorage.clear();

    // TUTUP DROPDOWN

    setIsDropdownOpen(false);

    // TOAST

    toast.success(
      "Berhasil keluar dari akun"
    );

    // REDIRECT + RESET AUTHCONTEXT

    setTimeout(() => {

      window.location.href = "/";

    }, 1200);

  };

  /* =========================================
     CLOSE DROPDOWN OUTSIDE
  ========================================= */

  useEffect(() => {

    const handleClickOutside =
      (event) => {

        if (

          dropdownRef.current &&

          !dropdownRef.current.contains(
            event.target
          )

        ) {

          setIsDropdownOpen(false);

        }

      };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  /* =========================================
     RENDER
  ========================================= */

  return (

    <div className="navbar-wrapper">

      <div className="navbar-container">

        {/* =========================================
            LOGO
        ========================================= */}

        <div className="navbar-logo">

          <Link to="/home">

            <img
              src={logoArki}
              alt="Logo ARKI"
            />

          </Link>

        </div>

        {/* =========================================
            MENU
        ========================================= */}

        <div className="navbar-menus">

          <Link
            to="/home"
            className="nav-link"
          >

            HOME

          </Link>

          <Link
            to="/about"
            className="nav-link"
          >

            ABOUT

          </Link>

          <Link
            to="/layanan"
            className="nav-link"
          >

            LAYANAN

          </Link>

          <Link
            to="/payments"
            className="nav-link"
          >

            PEMBAYARAN

          </Link>

          <Link
            to="/pesanan"
            className="nav-link"
          >

            PESANAN

          </Link>

          {/* =========================================
              PROFILE DROPDOWN
          ========================================= */}

          <div
            className="profile-dropdown-container"
            ref={dropdownRef}
          >

            {/* AVATAR BUTTON */}

            <button
              className="profile-avatar-btn"

              onClick={() =>

                setIsDropdownOpen(
                  !isDropdownOpen
                )

              }

              title="Menu Profil"
            >

              {getInitialName()}

            </button>

            {/* =========================================
                DROPDOWN MENU
            ========================================= */}

            {isDropdownOpen && (

              <div className="profile-dropdown-menu">

                {/* USER INFO */}

                <div className="dropdown-user-info">

                  <p className="user-info-name">

                    {user?.name ||
                      "Nama User"}

                  </p>

                  <p className="user-info-email">

                    {user?.email ||
                      "user@email.com"}

                  </p>

                </div>

                <div className="dropdown-divider"></div>

                {/* PROFILE */}

                <Link
                  to="/profile"

                  className="dropdown-item"

                  onClick={() =>
                    setIsDropdownOpen(false)
                  }
                >

                  <FiUser className="dropdown-icon" />

                  Profil Saya

                </Link>

                <div className="dropdown-divider"></div>

                {/* LOGOUT */}

                <button
                  className="dropdown-item logout-item"

                  onClick={logout}
                >

                  <FiLogOut className="dropdown-icon" />

                  Keluar Akun

                </button>

              </div>

            )}

          </div>

        </div>

      </div>

      {/* =========================================
          BOTTOM LINE
      ========================================= */}

      <div className="navbar-bottom-line"></div>

    </div>

  );

};

export default Navbar;