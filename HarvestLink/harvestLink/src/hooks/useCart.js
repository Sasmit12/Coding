import { useState, useEffect } from "react";

export function useCart() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("harvestlink_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem("harvestlink_cart", JSON.stringify(cart));

    // Calculate total
    const newTotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    setTotal(newTotal);
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...currentCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId),
    );
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getItemCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  return {
    cart,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemCount,
  };
}
