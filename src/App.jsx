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
            path="/about"
            element={<About />}
          />
        </Routes>
      </Suspense>

      <Cart show={showCart} handleClose={handleCloseCart} />

      <Footer />
    </>
  );
}

export default App;