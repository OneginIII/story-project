import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

function useAuth() {
  return useContext(AuthContext);
}

function ProtectedRoutes() {
  const auth = useAuth();
  return auth?.token ? <Outlet /> : <Navigate to={"/"} />;
}

export default ProtectedRoutes;
