import React, { Suspense, useState } from "react";
import Header from "./components/Header";
import Products from "./components/Products";
import Footer from "./components/Footer";
import Cart from "./components/Cart";

import {
  Routes,
  Route,
} from "react-router-dom";

const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Movies = React.lazy(() => import("./pages/Movies"));
const ContactUs = React.lazy(() => import("./pages/ContactUs"));
const ProductDetails = React.lazy(() => import("./pages/ProductDetails"));

function App() {
  const [showCart, setShowCart] = useState(false);

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
            element={<Products />}
          />

          <Route
            path="/store/:productId"
            element={<ProductDetails />}
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
            element={<Movies />}
          />
        </Routes>
      </Suspense>

      <Cart show={showCart} handleClose={handleCloseCart} />

      <Footer />
    </>
  );
}

export default App;