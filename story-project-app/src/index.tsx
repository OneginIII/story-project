import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import AuthProvider from "./components/AuthProvider.tsx";

export const AdminContext = createContext(false);

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
        <Route
          path="/admin/*"
          element={
            <AdminContext.Provider value={true}>
              <AuthProvider>
                <App />
              </AuthProvider>
            </AdminContext.Provider>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
