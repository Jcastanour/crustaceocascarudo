import "./App.css";
import { Navbar } from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./views/Home";
import { Menu } from "./views/Menu";
import { Cart } from "./views/Cart";
import { Login } from "./views/Login";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Menu" element={<Menu />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
