// client/src/pages/ProductPage/ProductPage.jsx

import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ProductPage.module.css';
import Button from '../../components/Button/Button';
import Navbar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError('');
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const data = await res.json();
        if (isMounted) setProduct(data);
      } catch (err) {
        if (isMounted) setError('Could not load this product. Please try again.');
        // Optional: console.error(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchProduct();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const formattedPrice = useMemo(() => {
    const value = Number(product?.price ?? 0);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  }, [product]);

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      return navigate('/login');
    }

    try {
      setAdding(true);
      await addToCart(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 1800);
    } catch (err) {
      // Optional: toast or inline message
      // console.error('Error adding to cart:', err);
    } finally {
      setAdding(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className={styles.page}>
        {/* Loading skeleton */}
        {isLoading && (
          <section
            className={styles.card}
            role="status"
            aria-busy="true"
            aria-label="Loading product"
          >
            <div className={`${styles.imageWrap} ${styles.skeleton}`} />
            <div className={styles.details}>
              <div className={`${styles.skelLine} ${styles.s1}`} />
              <div className={`${styles.skelLine} ${styles.s2}`} />
              <div className={`${styles.skelLine} ${styles.s3}`} />
              <div className={styles.buttonGroup}>
                <div className={`${styles.skelBtn}`} />
                <div className={`${styles.skelBtn}`} />
              </div>
            </div>
          </section>
        )}

        {/* Error state */}
        {!isLoading && error && (
          <section className={styles.errorBox} role="alert">
            {error}
            <Button text="Retry" onClick={() => window.location.reload()} />
          </section>
        )}

        {/* Product content */}
        {!isLoading && !error && product && (
          <section className={styles.card}>
            <div className={styles.imageWrap}>
              <img
                src={product.imageUrl}
                alt={product.title}
                className={styles.image}
                loading="lazy"
              />
            </div>

            <div className={styles.details}>
              <h1 className={styles.title}>{product.title}</h1>

              <p className={styles.price}>{formattedPrice}</p>

              <p className={styles.description}>{product.description}</p>

              <div className={styles.buttonGroup}>
                <Button text="Buy Now" onClick={handleBuyNow} />
                <Button
                  text={adding ? 'Adding…' : added ? 'Added!' : 'Add to Cart'}
                  onClick={handleAddToCart}
                  disabled={adding}
                  aria-busy={adding ? 'true' : 'false'}
                />
                <span className={styles.visuallyHidden} aria-live="polite">
                  {added ? 'Item added to cart' : ''}
                </span>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
};

export default ProductPage;