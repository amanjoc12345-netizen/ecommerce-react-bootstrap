import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Products from "./components/Products";
import Cart from "./components/Cart";

const initialCartElements = [
  {
    title: "Colors",
    price: 100,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
    quantity: 2,
  },
  {
    title: "Black and white Colors",
    price: 50,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
    quantity: 3,
  },
  {
    title: "Yellow and Black Colors",
    price: 70,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
    quantity: 1,
  },
];

function App() {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState(initialCartElements);

  const handleClose = () => setShowCart(false);
  const handleShow = () => setShowCart(true);

  const handleRemoveItem = (title) => {
    setCartItems((prev) => prev.filter((item) => item.title !== title));
  };

  const handleUpdateQuantity = (title, quantity) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.title === title) {
          return { ...item, quantity: Math.max(1, quantity) };
        }
        return item;
      })
    );
  };

  const handlePurchase = () => {
    alert("Thanks for the purchase");
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <Header handleShow={handleShow} cartCount={cartCount} />

      <Products />

      <Cart
        show={showCart}
        handleClose={handleClose}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        onPurchase={handlePurchase}
      />
    </>
  );
}

export default App;