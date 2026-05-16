import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ManagePortfolio from "../pages/ManagePortfolio";
import ManageTailor from "../pages/ManageTailor";

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

        {/* PERBAIKAN: Ditambahkan /:id agar mengenali parameter ID Tailor */}
        <Route
          path="/manage-portfolio/:id"
          element={<ManagePortfolio />}
        />

        <Route
          path="/manage-tailor"
          element={<ManageTailor />}
        />
        
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;