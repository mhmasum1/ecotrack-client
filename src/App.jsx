import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Challenges from "./pages/Challenges";
import ChallengeDetails from "./pages/ChallengeDetails";
import MyActivities from "./pages/MyActivities";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/challenges/:id" element={<ChallengeDetails />} />

          {/* protected */}
          <Route
            path="/my-activities"
            element={
              <PrivateRoute>
                <MyActivities />
              </PrivateRoute>
            }
          />

          {/* auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="min-h-[70vh] flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-2">404 - Page Not Found</h1>
                <p className="mb-4 text-sm text-gray-600">
                  The page you are looking for does not exist.
                </p>
                <a href="/" className="btn btn-primary">
                  Go Home
                </a>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
