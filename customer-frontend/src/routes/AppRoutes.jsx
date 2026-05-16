import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";
// 1. TAMBAHKAN IMPORT HALAMAN DETAIL BARU KAMU DI SINI
import TailorDetail from "../pages/TailorDetail"; 

const AppRoutes = () => {

  return (
    <BrowserRouter>

      <Routes>

        {/* Halaman Login */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* Halaman Utama Konsumen */}
        <Route
          path="/home"
          element={<Home />}
        />

        {/* 2. TAMBAHKAN ROUTE DINAMIS DETAIL PENJAHIT BERDASARKAN ID */}
        <Route
          path="/detail/:id"
          element={<TailorDetail />}
        />

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;