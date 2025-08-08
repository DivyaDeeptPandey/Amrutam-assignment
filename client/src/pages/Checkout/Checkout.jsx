import React from 'react';
import styles from './Checkout.module.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/NavBar/NavBar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import Button from '../../components/Button/Button.jsx';

const calculateTotal = (cart) => {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const Checkout = () => {
  const navigate = useNavigate();

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const userCart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalAmount = calculateTotal(userCart);

      const orderPayload = {
        products: userCart.map(item => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        total: totalAmount,
      };

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      const data = await response.json();
      localStorage.removeItem('cart');
      navigate('/order-success', { state: { order: data } });

    } catch (err) {
      console.error('Order placement failed:', err);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <>
      <Navbar />

      <div className={styles.pageWrapper}>
        <motion.div
          className={styles.checkoutCard}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className={styles.title}>Checkout</h2>

          <form className={styles.form} onSubmit={handlePlaceOrder}>
            <div className={styles.inputGroup}>
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" placeholder="John Doe" required />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="address">Shipping Address</label>
              <textarea
                id="address"
                rows="3"
                placeholder="123 Main Street, City, ZIP"
                required
              ></textarea>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" placeholder="+91 XXXXXXXXXX" required />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="payment">Payment Method</label>
              <select id="payment" required>
                <option value="">Select Method</option>
                <option value="cod">Cash on Delivery</option>
                <option value="card">Credit/Debit Card</option>
                <option value="upi">UPI</option>
              </select>
            </div>

            <Button type="submit" label="Place Order" text="Check Out"/>
          </form>
        </motion.div>
      </div>

      <Footer />
    </>
  );
};

export default Checkout;