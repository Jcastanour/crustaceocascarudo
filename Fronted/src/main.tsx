import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { App } from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

/*Pa quitar comentarios. Poner development */
if (import.meta.env.MODE === "production") {
  console.log = () => {};
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
);
console.log("Modo actual:", import.meta.env.MODE);