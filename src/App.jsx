import React, { Suspense, useState, useContext } from "react";
import Header from "./components/Header";
import Products from "./components/Products";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import AuthContext from "./store/AuthContext";

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Movies = React.lazy(() => import("./pages/Movies"));
const ContactUs = React.lazy(() => import("./pages/ContactUs"));
const ProductDetails = React.lazy(() => import("./pages/ProductDetails"));
const Auth = React.lazy(() => import("./pages/Auth"));
const Profile = React.lazy(() => import("./pages/Profile"));

function App() {
  const [showCart, setShowCart] = useState(false);
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const handleShowCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);

  return (
    <>
      <Header handleShow={handleShowCart} />

      <Suspense fallback={<div className="text-center mt-5 py-5 text-muted">Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/store"
            element={isLoggedIn ? <Products /> : <Navigate to="/auth" replace />}
          />

          <Route
            path="/store/:productId"
            element={isLoggedIn ? <ProductDetails /> : <Navigate to="/auth" replace />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/contact"
            element={<ContactUs />}
          />

          <Route
            path="/movies"
            element={isLoggedIn ? <Movies /> : <Navigate to="/auth" replace />}
          />

          <Route
            path="/auth"
            element={!isLoggedIn ? <Auth /> : <Navigate to="/store" replace />}
          />

          <Route
            path="/profile"
            element={isLoggedIn ? <Profile /> : <Navigate to="/auth" replace />}
          />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </Suspense>

      <Cart show={showCart} handleClose={handleCloseCart} />

      <Footer />
    </>
  );
}

export default App;