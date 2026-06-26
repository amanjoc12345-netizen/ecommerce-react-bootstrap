import React, { createContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  email: "",
  isLoggedIn: false,
  login: (token, email) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const initialToken = localStorage.getItem("token") || "";
  const initialEmail = localStorage.getItem("email") || "";

  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(initialEmail);

  const isLoggedIn = !!token;

  const loginHandler = (token, email) => {
    setToken(token);
    setEmail(email);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  };

  const logoutHandler = () => {
    setToken("");
    setEmail("");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  const contextValue = {
    token: token,
    email: email,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
