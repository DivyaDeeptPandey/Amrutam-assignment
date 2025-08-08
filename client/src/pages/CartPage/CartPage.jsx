import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CartPage.module.css';
import Navbar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const CartPage = () => {
  const { isAuthenticated } = useAuth();
  const { cart, loading, addToCart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (loading) {
    return <div className={styles.loading}>Loading cart...</div>;
  }

  const products = cart.products?.filter(
  (item) => item.productId && typeof item.productId === 'object'
);
  const total = products.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1>Your Cart</h1>

        {products.length === 0 ? (
          <div className={styles.empty}>Your cart is empty.</div>
        ) : (
          <>
            <ul className={styles.list}>
              {products.map(({ productId, quantity }, index) => (
                <li key={productId?._id || index} className={styles.item}>
                  <img
                    src={productId.imageUrl}
                    alt={productId.title}
                    className={styles.thumb}
                  />
                  <div className={styles.info}>
                    <h2>{productId.title}</h2>
                    <p>₹{productId.price}</p>
                    <div className={styles.qtyControls}>
                      <Button
                        text="−"
                        onClick={() => removeFromCart(productId._id)}
                      />
                      <span>{quantity}</span>
                      <Button
                        text="+"
                        onClick={() => addToCart(productId)}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.summary}>
              <p>
                Total: <strong>₹{total.toFixed(2)}</strong>
              </p>
              <div className={styles.actions}>
                <Button text="Clear Cart" onClick={clearCart} />
                <Button
                  text="Proceed to Checkout"
                  onClick={() => navigate('/checkout')}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;