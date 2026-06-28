import React, { createContext, useState, useEffect, useCallback, useContext } from "react";
import AuthContext from "./AuthContext";

const CartContext = createContext();

const API_BASE = "https://crudcrud.com/api/2413a3bd33304cd6980db370b8b8dd44";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const authCtx = useContext(AuthContext);
  const email = authCtx.email;

  // Sanitize email: remove '@' and '.'
  const cleanEmail = email ? email.replace(/[@.]/g, "") : "";
  const cartUrl = `${API_BASE}/cart${cleanEmail}`;

  const fetchCartItems = useCallback(async () => {
    if (!cleanEmail) return;
    try {
      const response = await fetch(cartUrl);
      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
      }
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  }, [cleanEmail, cartUrl]);

  // Sync cart items when login status / email changes
  useEffect(() => {
    if (!email) {
      setCartItems([]);
    } else {
      fetchCartItems();
    }
  }, [email, fetchCartItems]);

  const addItem = async (product) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.title === product.title
    );

    if (existingItemIndex > -1) {
      const existingItem = cartItems[existingItemIndex];
      const updatedQuantity = existingItem.quantity + 1;

      // Update local state first for instant UI response
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.title === product.title
            ? { ...item, quantity: updatedQuantity }
            : item
        )
      );

      if (cleanEmail && existingItem._id) {
        try {
          const { _id, ...itemWithoutId } = existingItem;
          const updatedItemPayload = { ...itemWithoutId, quantity: updatedQuantity };
          await fetch(`${cartUrl}/${_id}`, {
            method: "PUT",
            body: JSON.stringify(updatedItemPayload),
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (error) {
          console.error("Failed to update item quantity in backend:", error);
        }
      }
    } else {
      const newItem = { ...product, quantity: 1 };

      // Update local state first
      setCartItems((prevItems) => [...prevItems, newItem]);

      if (cleanEmail) {
        try {
          const response = await fetch(cartUrl, {
            method: "POST",
            body: JSON.stringify(newItem),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            const data = await response.json();
            // Update the item in local state to include the backend-generated _id
            setCartItems((prevItems) =>
              prevItems.map((item) =>
                item.title === product.title ? data : item
              )
            );
          }
        } catch (error) {
          console.error("Failed to add new item to backend:", error);
        }
      }
    }
  };

  const removeItem = async (title) => {
    const existingItem = cartItems.find((item) => item.title === title);

    setCartItems((prevItems) =>
      prevItems.filter((item) => item.title !== title)
    );

    if (cleanEmail && existingItem && existingItem._id) {
      try {
        await fetch(`${cartUrl}/${existingItem._id}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.error("Failed to remove item from backend:", error);
      }
    }
  };

  const updateQuantity = async (title, quantity) => {
    const newQuantity = Math.max(1, quantity);
    const existingItem = cartItems.find((item) => item.title === title);

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.title === title ? { ...item, quantity: newQuantity } : item
      )
    );

    if (cleanEmail && existingItem && existingItem._id) {
      try {
        const { _id, ...itemWithoutId } = existingItem;
        const updatedItemPayload = { ...itemWithoutId, quantity: newQuantity };
        await fetch(`${cartUrl}/${_id}`, {
          method: "PUT",
          body: JSON.stringify(updatedItemPayload),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.error("Failed to update quantity in backend:", error);
      }
    }
  };

  const clearCart = async () => {
    const itemsToDelete = [...cartItems];
    setCartItems([]);

    if (cleanEmail && itemsToDelete.length > 0) {
      try {
        await Promise.all(
          itemsToDelete
            .filter((item) => item._id)
            .map((item) =>
              fetch(`${cartUrl}/${item._id}`, {
                method: "DELETE",
              })
            )
        );
      } catch (error) {
        console.error("Failed to clear backend cart:", error);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        fetchCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
