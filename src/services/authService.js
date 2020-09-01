import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

http.setJwt(getJwt());

export async function login(user) {
  const { data: jwt } = await http.post(apiUrl + "/auth", {
    email: user.username,
    password: user.password
  });
  localStorage.setItem("token", jwt);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}
export function logout() {
  localStorage.removeItem(tokenKey);
}
export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {}
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};
