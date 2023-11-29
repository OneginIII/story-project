import { createContext, useEffect, useState } from "react";
import loginService from "../loginService";
import { useNavigate } from "react-router-dom";
import adminService from "../adminService";

export interface IAuthContext {
  token: object | null | string;
  onLogin: (
    username: string,
    password: string
  ) => Promise<unknown[] | undefined>;
  onLogout: () => void;
  onRegister: (
    username: string,
    password: string
  ) => Promise<unknown[] | undefined>;
  onVerify: () => void;
}

export const AuthContext = createContext<null | IAuthContext>(null);

function AuthProvider(props: { children: React.ReactNode }) {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );
  const navigate = useNavigate();

  useEffect(() => {
    adminService.setToken(token ? token : "");
  }, [token]);

  const handleLogin = async (username: string, password: string) => {
    const response = await loginService.login(username, password);
    if (response.status === 200) {
      setToken(response.data);
      navigate("/admin");
      localStorage.setItem("token", response.data);
      return [true];
    } else if (response) {
      return [false, response?.response?.data];
    }
  };

  const handleRegister = async (username: string, password: string) => {
    const response = await loginService.register(username, password);
    if (response.status === 200) {
      return [true, response.data];
    } else if (response) {
      return [false, response?.response?.data];
    }
  };

  const handleLogout = async () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const handleVerify = async () => {
    const response = await loginService.verify(
      typeof token === "string" ? token : ""
    );
    if (response instanceof Error) {
      handleLogout();
      navigate("/");
    }
  };

  const value: IAuthContext = {
    token: token,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
    onVerify: handleVerify,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export default AuthProvider;
