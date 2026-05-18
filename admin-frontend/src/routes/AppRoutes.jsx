import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ManagePortfolio from "../pages/ManagePortfolio";
import ManageTailor from "../pages/ManageTailor";
import TailorDetail from "../pages/TailorDetail";
import PortfolioPage from "../pages/PortfolioPage";
import PortfolioDetail from "../pages/PortfolioDetail";
import PortofolioForm from "../components/PortofolioForm";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* PORTFOLIO PAGE */}
        <Route
          path="/portfolio"
          element={<PortfolioPage />}
        />

        {/* DETAIL PENJAHIT */}
        <Route
          path="/tailor-detail/:id"
          element={<TailorDetail />}
        />

        {/* MANAGE PORTFOLIO */}
        <Route
          path="/manage-portfolio/:id"
          element={<ManagePortfolio />}
        />

        {/* DETAIL PORTFOLIO */}
        <Route
          path="/portfolio-detail/:id"
          element={<PortfolioDetail />}
        />

        {/* ADD PORTFOLIO */}
        <Route
          path="/manage-portfolio/:id/add"
          element={<PortofolioForm />}
        />

        {/* TAMBAH PENJAHIT */}
        <Route
          path="/manage-tailor"
          element={<ManageTailor />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;