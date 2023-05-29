import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = () => {
    setLoggedUser({
      id: 1,
      username: "styxnanda",
      profilePic:
        "https://pbs.twimg.com/profile_images/1183382725979336706/WQZuu7oA_400x400.jpg",
    });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(loggedUser));
  }, [loggedUser]);

  return (
    <AuthContext.Provider value={{ loggedUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
