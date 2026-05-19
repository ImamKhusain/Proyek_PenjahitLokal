import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import Login from "../pages/Login";
import Home from "../pages/Home";
import TailorDetail from "../pages/TailorDetail";
import PortfolioCard from "../components/PortfolioCard";
import Navbar from "../components/Navbar";
import About from "../pages/About";
import Layanan from "../pages/Layanan";
import ChatPage from "../pages/ChatPage";
import Booking from "../pages/Booking";
import Pembayaran from "../pages/Pembayaran"; // 💡 Tetap aman, mengimport halaman Pembayaran barumu

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
      <Routes>
        {/* LOGIN */}
        <Route path="/" element={<Login />} />

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

          {/* DETAIL PENJAHIT */}
          <Route path="/detail/:id" element={<TailorDetail />} />

          {/* PORTFOLIO */}
          <Route path="/portfolio-katalog/:id" element={<PortfolioCard />} />

          {/* PESANAN SAYA */}
          <Route path="/pesanan" element={<Booking />} />

          {/* HALAMAN PEMBAYARAN 
              Diletakkan di sini agar senada menggunakan Navbar ARKI & membawa params :bookingId */}
          <Route path="/pembayaran/:bookingId" element={<Pembayaran />} />
        </Route>

        {/* ========================================================
            KELOMPOK 2: HALAMAN YANG BUTUH LOGIN TAPI TANPA NAVBAR
            (Dikeluarkan dari LayoutDenganNavbar agar bersih total)
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