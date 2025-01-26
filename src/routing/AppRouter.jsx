import "react";
import Navbar from "../components/Navbar.jsx";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import Footer from "../components/Footer.jsx";
import ShortenUrlPage from "../pages/ShortenUrlPage.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Toaster position="bottom-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/register"
          element={
            <PrivateRoute publicPage={true}>
              <RegisterPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PrivateRoute publicPage={true}>
              <LoginPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute publicPage={false}>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route path="/error" element={<ErrorPage />} />
        <Route
          path="*"
          element={
            <ErrorPage message="We can't seem to find the page you're looking for" />
          }
        />
      </Routes>
      <Footer />
    </>
  );
};
export default AppRouter;

export const SubDomainRouter = () => {
  return (
    <Routes>
      <Route path="/:url" element={<ShortenUrlPage />} />
    </Routes>
  );
};
