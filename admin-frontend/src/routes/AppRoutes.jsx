import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login
from "../pages/Login";

import Dashboard
from "../pages/Dashboard";

import ManagePortfolio
from "../pages/ManagePortfolio";

const AppRoutes = () => {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/manage-portfolio"
          element={
            <ManagePortfolio />
          }
        />

      </Routes>

    </BrowserRouter>

  );

};

export default AppRoutes;