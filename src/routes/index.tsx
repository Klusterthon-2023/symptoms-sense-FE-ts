// src/routes/index.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import LandingPage from "../pages/landingPage";
import Signup from "../pages/signup";
import Login from "../pages/login"
// import DashboardInstance from "../pages/Dashboard/components/home"

const Router: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/dashboard/home" element={<DashboardInstance />} /> */}
      </Routes>
    </>
  );
};

export default Router;
