import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/InstructionsModal.module.scss";
import "./assets/MainScreen.scss";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
