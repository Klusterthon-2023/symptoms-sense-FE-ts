// src/routes/index.tsx
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/landingPage";
import Signup from "../pages/signup";
import Login from "../pages/login";
import { Box } from "@chakra-ui/react";
const Dashboard = React.lazy(() => import("../pages/Dashboard"));

const Router: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<Box display="flex" justifyContent="center" alignItems="center">Loading...</Box>}>
              <Dashboard />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};

export default Router;
