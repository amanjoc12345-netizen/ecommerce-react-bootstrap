import React, { createContext, useState, useEffect, useCallback, useRef } from "react";

const AuthContext = createContext({
  token: null,
  email: null,
  isLoggedIn: false,
  login: (_token, _email) => {},
  logout: () => {},
});

const SESSION_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export const AuthProvider = ({ children }) => {
  const logoutTimerRef = useRef(null);

  // Load stored token and email from localStorage to maintain session across refreshes
  const getInitialSession = () => {
    const storedToken = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("email");
    const expirationTime = localStorage.getItem("expirationTime");

    if (!storedToken) {
      return { token: null, email: null, isExpired: false };
    }

    if (expirationTime && Date.now() >= Number(expirationTime)) {
      // Session has expired
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("expirationTime");
      return { token: null, email: null, isExpired: true };
    }

    return { token: storedToken, email: storedEmail, isExpired: false };
  };

  const initialSession = getInitialSession();

  const [token, setToken] = useState(initialSession.token);
  const [email, setEmail] = useState(initialSession.email);
  const [sessionExpiredAlert, setSessionExpiredAlert] = useState(initialSession.isExpired);

  const isLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("expirationTime");

    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  }, []);

  const loginHandler = (token, email) => {
    setToken(token);
    setEmail(email);
    const expirationTime = Date.now() + SESSION_DURATION;
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("expirationTime", expirationTime.toString());
  };

  // Set up timer on page load/mount or when token changes
  useEffect(() => {
    if (token) {
      const expirationTime = localStorage.getItem("expirationTime");
      if (expirationTime) {
        const remainingTime = Number(expirationTime) - Date.now();
        if (remainingTime <= 0) {
          logoutHandler();
          setSessionExpiredAlert(true);
        } else {
          // Clear any active timer before setting a new one
          if (logoutTimerRef.current) {
            clearTimeout(logoutTimerRef.current);
          }
          logoutTimerRef.current = setTimeout(() => {
            logoutHandler();
            alert("Your session has expired. Please login again.");
          }, remainingTime);
        }
      }
    }

    return () => {
      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
      }
    };
  }, [token, logoutHandler]);

  // Alert the user if the session expired on page load/refresh
  useEffect(() => {
    if (sessionExpiredAlert) {
      alert("Your session has expired. Please login again.");
      setSessionExpiredAlert(false);
    }
  }, [sessionExpiredAlert]);

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

