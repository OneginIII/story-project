import { createContext, useEffect, useState } from "react";
import loginService from "../loginService";
import { useNavigate } from "react-router-dom";
import adminService from "../adminService";

export interface IAuthContext {
  token: object | null | string;
  onLogin: (username: string, password: string) => boolean | Promise<boolean>;
  onLogout: () => void;
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
    const newToken = await loginService.login(username, password);
    if (typeof newToken === "string" && newToken.length > 0) {
      setToken(newToken);
      navigate("/admin");
      localStorage.setItem("token", newToken);
      return true;
    } else {
      return false;
    }
  };

  const handleLogout = async () => {
    setToken(null);
    localStorage.setItem("token", "");
  };

  const value: IAuthContext = {
    token: token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export default AuthProvider;
