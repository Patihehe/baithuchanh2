// context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshUserList, setRefreshUserList] = useState(0);

  const triggerUserListRefresh = () => {
    setRefreshUserList((prev) => prev + 1);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get("https://hhq8qw-8081.csb.app/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  const login = async (login_name, password) => {
    // Thêm password param
    try {
      const res = await axios.post(
        "https://hhq8qw-8081.csb.app/api/user/admin/login",
        { login_name, password }
      );
      localStorage.setItem("token", res.data.token);
      setUser(res.data);
      return res.data;
    } catch (err) {
      throw err.response?.data?.message || "Login failed";
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refreshUserList,
        triggerUserListRefresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
