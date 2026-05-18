import {
  BrowserRouter,
  Routes,
  Route,
  Outlet
} from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";
import TailorDetail from "../pages/TailorDetail"; 
import PortfolioCard from "../components/PortfolioCard";
import Navbar from "../components/Navbar"; 
import About from "../pages/About";
import Layanan from "../pages/Layanan"; // 💡 1. IMPOR HALAMAN LAYANAN YANG BARU

const LayoutDenganNavbar = () => {
  return (
    <>
      <Navbar /> 
      <Outlet /> 
    </>
  );
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* ❌ HALAMAN TANPA NAVBAR */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* ✨ HALAMAN DENGAN NAVBAR (Semua halaman di bawah ini otomatis punya Navbar) */}
        <Route element={<LayoutDenganNavbar />}>
          
          {/* Halaman Home */}
          <Route
            path="/home"
            element={<Home />}
          />

          {/* Halaman About */}
          <Route
            path="/about"
            element={<About />}
          />

          {/* 💡 2. TAMBAHKAN ROUTE LAYANAN DI SINI */}
          <Route
            path="/layanan"
            element={<Layanan />}
          />

          {/* Halaman Detail Penjahit */}
          <Route
            path="/detail/:id"
            element={<TailorDetail />}
          />

          {/* Halaman Katalog Portfolio */}
          <Route
            path="/portfolio-katalog/:id"
            element={<PortfolioCard />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;