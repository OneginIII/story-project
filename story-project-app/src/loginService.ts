import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./components/AuthProvider";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export interface IUser {
  username: string;
  password: string;
}

export function useAuth() {
  return useContext(AuthContext);
}

const login = (username: string, password: string) => {
  const user: IUser = {
    username: username,
    password: password,
  };
  const request = axios.post(`${serverUrl}/login`, user);
  return request.then((response) => response.data);
};

const register = (username: string, password: string) => {
  const user: IUser = {
    username: username,
    password: password,
  };
  axios.post(`${serverUrl}/register`, user);
};

export default {
  login,
  register,
};
