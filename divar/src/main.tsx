import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./styles/index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
}
ReactDOM.createRoot(rootElement as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
