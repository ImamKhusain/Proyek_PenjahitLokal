import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import { Toaster } from "react-hot-toast";

/* ========================================================
   PAGES
======================================================== */

import Landingpage from "../pages/Landingpage"; // ✅ SESUAI NAMA FILE KAMU
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import TailorDetail from "../pages/TailorDetail";
import About from "../pages/About";
import Layanan from "../pages/Layanan";
import ChatPage from "../pages/ChatPage";
import Booking from "../pages/Booking";
import PaymentsPage from "../pages/PaymentsPage";
import Pembayaran from "../pages/Pembayaran";
import NotificationPage from "../pages/NotificationPage";
import Profile from "../pages/Profile";

/* ========================================================
   COMPONENTS
======================================================== */

import PortfolioCard from "../components/PortfolioCard";
import Navbar from "../components/Navbar";

/* ========================================================
   LAYOUT DENGAN NAVBAR
======================================================== */

const LayoutDenganNavbar = () => {

  return (

    <>

      <Navbar />

      <Outlet />

    </>

  );

};

/* ========================================================
   APP ROUTES
======================================================== */

const AppRoutes = () => {

  const { user } =
    useContext(AuthContext);

  return (

    <BrowserRouter>

      {/* ========================================================
          TOASTER
      ======================================================== */}

      <Toaster
        position="top-center"

        toastOptions={{

          duration: 3000,

          style: {

            background: "#ffffff",

            color: "#1e293b",

            fontWeight: "500",

            borderRadius: "12px",

            boxShadow:
              "0 4px 12px rgba(0, 0, 0, 0.08)",

            border:
              "1px solid #e2e8f0",

          },

        }}
      />

      {/* ========================================================
          ROUTES
      ======================================================== */}

      <Routes>

        {/* ========================================================
            PUBLIC ROUTES
        ======================================================== */}

        {/* ✅ LANDING PAGE JADI HALAMAN PERTAMA */}
        <Route
          path="/"
          element={<Landingpage />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            user
              ? <Navigate to="/home" />
              : <Login />
          }
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={
            user
              ? <Navigate to="/home" />
              : <Register />
          }
        />

        {/* ========================================================
            PRIVATE ROUTES + NAVBAR
        ======================================================== */}

        <Route
          element={
            user
              ? <LayoutDenganNavbar />
              : <Navigate to="/login" />
          }
        >

          {/* HOME */}
          <Route
            path="/home"
            element={<Home />}
          />

          {/* ABOUT */}
          <Route
            path="/about"
            element={<About />}
          />

          {/* LAYANAN */}
          <Route
            path="/layanan"
            element={<Layanan />}
          />

          {/* PROFILE */}
          <Route
            path="/profile"
            element={<Profile />}
          />

          {/* DETAIL PENJAHIT */}
          <Route
            path="/detail/:id"
            element={<TailorDetail />}
          />

          {/* PORTFOLIO */}
          <Route
            path="/portfolio-katalog/:id"
            element={<PortfolioCard />}
          />

          {/* PESANAN */}
          <Route
            path="/pesanan"
            element={<Booking />}
          />

          {/* PAYMENTS */}
          <Route
            path="/payments"
            element={<PaymentsPage />}
          />

          {/* NOTIFICATIONS */}
          <Route
            path="/notifications"
            element={<NotificationPage />}
          />

          {/* PEMBAYARAN */}
          <Route
            path="/pembayaran/:bookingId"
            element={<Pembayaran />}
          />

        </Route>

        {/* ========================================================
            PRIVATE ROUTES TANPA NAVBAR
        ======================================================== */}

        <Route
          element={
            user
              ? <Outlet />
              : <Navigate to="/login" />
          }
        >

          {/* CHAT */}
          <Route
            path="/chat/:roomId"
            element={<ChatPage />}
          />

        </Route>

      </Routes>

    </BrowserRouter>

  );

};

export default AppRoutes;