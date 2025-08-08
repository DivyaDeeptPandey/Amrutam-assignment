// client/pages/CartPage.jsx
import React from 'react';
import styles from './CartPage.module.css';
import { useCart } from '../../context/CartContext.jsx';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotal,
    clearCart,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <motion.div
        className={styles.emptyCart}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2>Your Cart is Empty 🛒</h2>
        <Link to="/">Go Shopping</Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={styles.cartPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1>Your Cart</h1>

      <div className={styles.cartItems}>
        {cartItems.map((item) => (
          <motion.div
            key={item._id}
            className={styles.cartItem}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <img src={item.image} alt={item.name} />
            <div className={styles.details}>
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
              <div className={styles.quantity}>
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
              </div>
              <button
                className={styles.removeBtn}
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className={styles.summary}>
        <h2>Total: ₹{getTotal()}</h2>
        <button className={styles.clearBtn} onClick={clearCart}>Clear Cart</button>
        <button className={styles.checkoutBtn}>Proceed to Checkout</button>
      </div>
    </motion.div>
  );
};

export default CartPage;
