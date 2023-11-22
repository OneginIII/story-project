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
  const request = axios
    .post(`${serverUrl}/login`, user)
    .catch((reason) => reason);
  return request.then((response) => response);
};

const register = (username: string, password: string) => {
  const user: IUser = {
    username: username,
    password: password,
  };
  const request = axios
    .post(`${serverUrl}/register`, user)
    .catch((reason) => reason);
  return request.then((response) => response);
};

const verify = (token: string) => {
  const request = axios
    .post(`${serverUrl}/verify`, { token: token })
    .catch((reason) => reason);
  return request.then((response) => response);
};

export default {
  login,
  register,
  verify,
};
