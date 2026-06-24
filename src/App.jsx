import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Products from "./components/Products";
import Cart from "./components/Cart";

function App() {
  const [showCart, setShowCart] = useState(false);

  const handleClose = () => setShowCart(false);
  const handleShow = () => setShowCart(true);

  return (
    <>
      <Header handleShow={handleShow} />

      <Products />

      <Cart show={showCart} handleClose={handleClose} />
    </>
  );
}

export default App;