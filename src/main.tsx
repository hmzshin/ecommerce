import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={true}
        newestOnTop={true}
        rtl={false}
        theme="colored"
      />
    </BrowserRouter>
  </React.StrictMode>
);
