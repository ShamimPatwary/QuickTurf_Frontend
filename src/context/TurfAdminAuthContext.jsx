import React, { createContext, useContext, useState } from "react";
import { turfAdminLogin } from "../api/turfAdminApi";

const TurfAdminAuthContext = createContext(null);

export function TurfAdminAuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("qt_turf_token"));

  const login = async (email, password) => {
    const res = await turfAdminLogin(email, password);
    localStorage.setItem("qt_turf_token", res.data.access_token);
    setToken(res.data.access_token);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("qt_turf_token");
    setToken(null);
  };

  return (
    <TurfAdminAuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
      {children}
    </TurfAdminAuthContext.Provider>
  );
}

export const useTurfAdminAuth = () => useContext(TurfAdminAuthContext);
