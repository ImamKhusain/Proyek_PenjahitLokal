import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import {
  useContext,
} from "react";

import {
  AuthContext,
} from "../context/AuthContext";

import Login from "../pages/Login";
import Home from "../pages/Home";
import TailorDetail from "../pages/TailorDetail";
import PortfolioCard from "../components/PortfolioCard";
import Navbar from "../components/Navbar";
import About from "../pages/About";
import Layanan from "../pages/Layanan";
import ChatPage from "../pages/ChatPage";
import Booking from "../pages/Booking"; // 💡 1. IMPORT HALAMAN BOOKING DI SINI

const LayoutDenganNavbar = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const AppRoutes = () => {

  const { user } =
    useContext(AuthContext);

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* HALAMAN YANG BUTUH LOGIN */}
        <Route
          element = {
            user ? (
              <LayoutDenganNavbar />
            ) : (
              <Login />
            )
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

          {/* CHAT */}
          <Route
            path="/chat/:roomId"
            element={<ChatPage />}
          />

          {/* PESANAN SAYA */}
          {/* 💡 2. TAMBAHKAN ROUTE PESANAN DI SINI */}
          <Route
            path="/pesanan"
            element={<Booking />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;