import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:8041/auth/login", inputs, {
      withCredentials: true,
    });

    setLoggedUser(res.data.user);
  };

  const logout = async (inputs) => {
    await axios.post("http://localhost:8041/auth/logout");
    setLoggedUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(loggedUser));
  }, [loggedUser]);

  return (
    <AuthContext.Provider value={{ loggedUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
