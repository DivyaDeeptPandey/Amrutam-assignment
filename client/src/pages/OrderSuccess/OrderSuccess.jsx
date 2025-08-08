import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './OrderSuccess.module.css';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className={styles.empty}>
        <h2>No order found.</h2>
        <button onClick={() => navigate('/')}>Go to Homepage</button>
      </div>
    );
  }

  return (
    <motion.div
      className={styles.successWrapper}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className={styles.title}>Thank you for your order!</h2>
      <p className={styles.subtitle}>Your order has been placed successfully.</p>

      <div className={styles.orderDetails}>
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Total Amount:</strong> ₹{order.total}</p>
        <p><strong>Items:</strong></p>
        <ul>
          {order.products.map((item, index) => (
            <li key={index}>
              {item.productId.name || 'Product'} × {item.quantity}
            </li>
          ))}
        </ul>
      </div>

      <motion.button
        className={styles.button}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/')}
      >
        Continue Shopping
      </motion.button>
    </motion.div>
  );
};

export default OrderSuccess;
