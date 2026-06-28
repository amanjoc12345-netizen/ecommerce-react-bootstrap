import React, { createContext, useState } from "react";

const AuthContext = createContext({
  token: null,
  email: null,
  isLoggedIn: false,
  login: (token, email) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  // Load stored token and email from localStorage to maintain session across refreshes
  const initialToken = localStorage.getItem("token") || null;
  const initialEmail = localStorage.getItem("email") || null;

  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(initialEmail);

  const isLoggedIn = !!token;

  const loginHandler = (token, email) => {
    setToken(token);
    setEmail(email);
    // Persist token and email in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  };

  const logoutHandler = () => {
    setToken(null);
    setEmail(null);
    // Clean up stored session in localStorage upon logout
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
