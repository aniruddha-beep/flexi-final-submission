import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import "./App.css";

// --- PROTECTED ROUTE COMPONENT ---
function ProtectedRoute({ isLoggedIn, children }) {
  // If not logged in, redirect to sign in, with intended location remembered
  const location = useLocation();
  if (!isLoggedIn) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  return children;
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // HANDLER: Log out
  const handleLogout = () => {
    setIsLoggedIn(false);
    // In a real app: call firebase/auth signOut etc.
    console.log("User logged out successfully.");
  };

  // HANDLER: Called upon sign-in success (mock)
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // HANDLER: Called upon sign-up success (mock)
  const handleSignUp = () => {
    setIsLoggedIn(true);
  };

  return (
    <ThemeProvider>
      <Router>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          {/* Public Sign In and Sign Up routes */}
          <Route path="/signin" element={
            isLoggedIn
              ? <Navigate to="/" />
              : <SignIn onLogin={handleLogin} />
          } />
          <Route path="/signup" element={
            isLoggedIn
              ? <Navigate to="/" />
              : <SignUp onSignUp={handleSignUp} />
          } />

          {/* Protected Pages */}
          <Route path="/" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/inventory" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Inventory />
            </ProtectedRoute>
          } />
          <Route path="/about" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <About />
            </ProtectedRoute>
          } />
          <Route path="/contact" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Contact />
            </ProtectedRoute>
          } />

          {/* Catch-all: Redirect to appropriate page */}
          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/" : "/signin"} replace />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
