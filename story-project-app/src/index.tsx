import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import AuthProvider from "./components/AuthProvider.tsx";
import ThemeProvider from "./components/ThemeProvider.tsx";

export const AdminContext = createContext(false);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <Routes>
            <Route path="*" element={<App />} />
            <Route
              path="/admin/*"
              element={
                <AdminContext.Provider value={true}>
                  <App />
                </AdminContext.Provider>
              }
            />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
