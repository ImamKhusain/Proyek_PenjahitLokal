import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";
import TailorDetail from "../pages/TailorDetail"; 

// ==========================================
// PERBAIKAN IMPORT: Menggunakan ejaan 'PortofolioCard' (sesuai nama file aslimu)
// ==========================================
import PortfolioCard from "../components/PortfolioCard";

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

        {/* Halaman Detail Penjahit Berdasarkan ID */}
        <Route
          path="/detail/:id"
          element={<TailorDetail />}
        />

        {/* ==========================================
            TAMBAHAN ROUTE: Halaman Katalog Portfolio Penjahit 
            Mencocokkan fungsi navigate(`/portfolio-katalog/${tailor.id}`) 
            dari TailorDetail.jsx
           ========================================== */}
        <Route
          path="/portfolio-katalog/:id"
          element={<PortfolioCard />}
        />

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;