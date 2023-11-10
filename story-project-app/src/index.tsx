import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

export const AdminContext = createContext(false);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
        <Route
          path="/admin"
          element={
            <AdminContext.Provider value={true}>
              <App />
            </AdminContext.Provider>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
