import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import AuthProvider from "./components/AuthProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <AuthProvider>
              <App />
            </AuthProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
