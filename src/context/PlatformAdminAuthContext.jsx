import React, { createContext, useContext, useState } from "react";
import { platformAdminLogin } from "../api/platformAdminApi";

const PlatformAdminAuthContext = createContext(null);

export function PlatformAdminAuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("qt_platform_token"));

  const login = async (email, password) => {
    const res = await platformAdminLogin(email, password);
    localStorage.setItem("qt_platform_token", res.data.access_token);
    setToken(res.data.access_token);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("qt_platform_token");
    setToken(null);
  };

  return (
    <PlatformAdminAuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
      {children}
    </PlatformAdminAuthContext.Provider>
  );
}

export const usePlatformAdminAuth = () => useContext(PlatformAdminAuthContext);
