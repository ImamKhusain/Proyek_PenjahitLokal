import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Toaster } from "react-hot-toast"; // 💡 TAMBAHAN: Import Toaster untuk notifikasi modern

import Login from "../pages/Login";
import Register from "../pages/Register"; 
import Home from "../pages/Home";
import TailorDetail from "../pages/TailorDetail";
import PortfolioCard from "../components/PortfolioCard";
import Navbar from "../components/Navbar";
import About from "../pages/About";
import Layanan from "../pages/Layanan";
import ChatPage from "../pages/ChatPage";
import Booking from "../pages/Booking";
import PaymentsPage from "../pages/PaymentsPage";
import Pembayaran from "../pages/Pembayaran"; 
import NotificationPage from "../pages/NotificationPage";
import Profile from "../pages/Profile"; // 💡 TAMBAHAN: Impor halaman Profile baru kamu

// Layout yang menempelkan Navbar secara otomatis di atas halaman
const LayoutDenganNavbar = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {/* 💡 UBAH DI SINI: position diubah menjadi "top-center" agar melayang presisi di tengah atas layar */}
      <Toaster 
        position="top-center" 
        toastOptions={{
          duration: 3000, // Notifikasi otomatis hilang setelah 3 detik
          style: {
            background: "#ffffff",
            color: "#1e293b",
            fontWeight: "500",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            border: "1px solid #e2e8f0"
          },
        }}
      />

      <Routes>
        {/* ========================================================
            PUBLIC ROUTES (BISA DIAKSES SEBELUM LOGIN)
           ======================================================== */}
        {/* LOGIN */}
        <Route path="/" element={<Login />} />
        
        {/* REGISTER / SIGN UP */}
        <Route path="/register" element={<Register />} /> 

        {/* ========================================================
            KELOMPOK 1: HALAMAN YANG BUTUH LOGIN + PAKAI NAVBAR
           ======================================================== */}
        <Route
          element={user ? <LayoutDenganNavbar /> : <Login />}
        >
          {/* HOME */}
          <Route path="/home" element={<Home />} />

          {/* ABOUT */}
          <Route path="/about" element={<About />} />

          {/* LAYANAN */}
          <Route path="/layanan" element={<Layanan />} />

          {/* 💡 TAMBAHAN PROFIL SAYA: Diletakkan di sini agar otomatis memakai Navbar */}
          <Route path="/profile" element={<Profile />} />

          {/* DETAIL PENJAHIT */}
          <Route path="/detail/:id" element={<TailorDetail />} />

          {/* PORTFOLIO */}
          <Route path="/portfolio-katalog/:id" element={<PortfolioCard />} />

          {/* PESANAN SAYA */}
          <Route path="/pesanan" element={<Booking />} />
          
          <Route
            path="/payments"
            element={<PaymentsPage />}
          />
          
          <Route
            path="/notifications"
            element={<NotificationPage />}
          />
          
          {/* HALAMAN PEMBAYARAN */}
          <Route path="/pembayaran/:bookingId" element={<Pembayaran />} />
        </Route>

        {/* ========================================================
            KELOMPOK 2: HALAMAN YANG BUTUH LOGIN TAPI TANPA NAVBAR
           ======================================================== */}
        <Route 
          element={user ? <Outlet /> : <Login />}
        >
          {/* CHAT */}
          <Route path="/chat/:roomId" element={<ChatPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;