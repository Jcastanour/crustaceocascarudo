import "./App.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import { Home } from "./views/Home";
import { Menu } from "./views/Menu";
import { Cart } from "./views/Cart";
import { Login } from "./views/Login";
import { Tyc } from "./views/Tyc";
import { AuthProvider } from "./context/AuthContext";
import { Register } from "./views/Register";
import { PlanktonCaptcha } from "./components/PlanktonCaptcha";
import { ProtectedRoute } from "./services/ProtectedRoute";
import { AdminDashboard } from "./views/AdminDashboard";
import { ChefDashboard } from "./views/ChefDashboard";

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="app-container">
        <Navbar />
        <div className="body_container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/PlanktonCaptcha" element={<PlanktonCaptcha />} />
            <Route path="/Menu" element={<Menu />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Tyc" element={<Tyc />} />
            
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chef"
              element={
                <ProtectedRoute role="chef">
                  <ChefDashboard />
                </ProtectedRoute>
              }
            />

          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
};
