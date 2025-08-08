// client/src/context/CartContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ products: [] });
  const [loading, setLoading] = useState(false);

  // Fetch existing cart when user logs in or changes
  const fetchCart = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/api/cart/${user._id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!res.ok) throw new Error('Failed to fetch cart');
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error('Error fetching cart', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  // Add or increment an item in cart
  const addToCart = async (product) => {
    console.log('addToCart called with:', product);
    console.log('current user is:', user);
    if (!user) {
      console.warn('🏃 early exit: no user, skipping network call');
      return;
    }


    const existingIndex = cart.products.findIndex(
      (p) => p.productId._id === product._id
    );

    let newProducts;
    if (existingIndex !== -1) {
      newProducts = cart.products.map((p, i) =>
        i === existingIndex
          ? { ...p, quantity: p.quantity + 1 }
          : p
      );
    } else {
      newProducts = [
        ...cart.products,
        { productId: product._id, quantity: 1 }
      ];
    }

    // Optimistic UI update
    setCart({ products: newProducts });

    // Persist to server
    try {
      const res = await fetch(`http://localhost:5000/api/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ products: newProducts })
      });
      if (!res.ok) throw new Error('Failed to update cart on server');
    } catch (err) {
      console.error('Failed to update cart on server', err);
      fetchCart(); // Reconcile state
    }
  };

  // Decrement quantity or remove item
  const removeFromCart = async (productId) => {
    if (!user) return;

    const newProducts = cart.products
      .map((p) =>
        p.productId._id === productId
          ? { ...p, quantity: p.quantity - 1 }
          : p
      )
      .filter((p) => p.quantity > 0);

    setCart({ products: newProducts });

    try {
      const res = await fetch(`http://localhost:5000/api/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ products: newProducts })
      });
      if (!res.ok) throw new Error('Failed to update cart on server');
      await fetchCart(); 
    } catch (err) {
      console.error('Failed to update cart on server', err);
      fetchCart();
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    if (!user) return;

    setCart({ products: [] });

    try {
      const res = await fetch(
        `http://localhost:5000/api/cart/${user._id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (!res.ok) throw new Error('Failed to clear cart on server');
    } catch (err) {
      console.error('Failed to clear cart on server', err);
      fetchCart();
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        clearCart,
        fetchCart,
        refreshCart: fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};