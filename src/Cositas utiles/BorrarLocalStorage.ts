// Codigo para borrar el LocalStorage cada cierto tiempo
// Fuente: ChatGPT

import { useEffect } from "react";

const EXPIRATION_TIME = 1000 * 60 * 60; // 1 hora

export const App = () => {
  useEffect(() => {
    const lastReset = localStorage.getItem("lastReset");
    const now = Date.now();

    if (!lastReset || now - Number(lastReset) > EXPIRATION_TIME) {
      localStorage.clear();
      localStorage.setItem("lastReset", now.toString());
      console.log("LocalStorage reiniciado");
    }
  }, []);

    return <div>Test</div>;
};
}
