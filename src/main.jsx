import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { CartProvider } from "./store/CartContext";
import { AuthProvider } from "./store/AuthContext";

import {
  BrowserRouter,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);