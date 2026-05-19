import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {
  useContext,
} from "react";

import {
  AuthContext,
} from "../context/AuthContext";

import Login from "../pages/Login";

import Dashboard from "../pages/Dashboard";

import AdminChat from "../pages/AdminChat";

import AdminChatRoom from "../pages/AdminChatRoom";

import ManagePortfolio from "../pages/ManagePortfolio";

import ManageTailor from "../pages/ManageTailor";

import TailorDetail from "../pages/TailorDetail";

import PortfolioPage from "../pages/PortfolioPage";

import PortfolioDetail from "../pages/PortfolioDetail";

import PortofolioForm from "../components/PortofolioForm";

import BookingPage from "../pages/BookingPage";

// ✅ TAMBAHAN
import AdminPayments from "../pages/AdminPayments";

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

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard />
            ) : (
              <Login />
            )
          }
        />

        {/* BOOKING PAGE */}
        <Route
          path="/bookings"
          element={
            user ? (
              <BookingPage />
            ) : (
              <Login />
            )
          }
        />

        {/* ✅ PAYMENT PAGE */}
        <Route
          path="/payments"
          element={
            user ? (
              <AdminPayments />
            ) : (
              <Login />
            )
          }
        />

        {/* PORTFOLIO PAGE */}
        <Route
          path="/portfolio"
          element={
            user ? (
              <PortfolioPage />
            ) : (
              <Login />
            )
          }
        />

        {/* DETAIL PENJAHIT */}
        <Route
          path="/tailor-detail/:id"
          element={
            user ? (
              <TailorDetail />
            ) : (
              <Login />
            )
          }
        />

        {/* ADMIN CHAT */}
        <Route
          path="/admin-chat"
          element={
            user ? (
              <AdminChat />
            ) : (
              <Login />
            )
          }
        />

        {/* ADMIN CHAT ROOM */}
        <Route
          path="/admin-chat/:roomId"
          element={
            user ? (
              <AdminChatRoom />
            ) : (
              <Login />
            )
          }
        />

        {/* MANAGE PORTFOLIO */}
        <Route
          path="/manage-portfolio/:id"
          element={
            user &&
            user.role === "admin" ? (
              <ManagePortfolio />
            ) : (
              <Login />
            )
          }
        />

        {/* DETAIL PORTFOLIO */}
        <Route
          path="/portfolio-detail/:id"
          element={
            user &&
            user.role === "admin" ? (
              <PortfolioDetail />
            ) : (
              <Login />
            )
          }
        />

        {/* ADD PORTFOLIO */}
        <Route
          path="/manage-portfolio/:id/add"
          element={
            user &&
            user.role === "admin" ? (
              <PortofolioForm />
            ) : (
              <Login />
            )
          }
        />

        {/* TAMBAH PENJAHIT */}
        <Route
          path="/manage-tailor"
          element={
            user &&
            user.role === "admin" ? (
              <ManageTailor />
            ) : (
              <Login />
            )
          }
        />

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;