import { useEffect, useState, useContext, use } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ProductPage.module.css';
import Button from '../../components/Button/Button';
import Navbar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import { useAuth } from '../../context/AuthContext'; 
import { useCart } from '../../context/CartContext'; 

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { isAuthenticated } = useAuth(); 
  const { addToCart } = useCart(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const { title, description, price, imageUrl } = product;

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/checkout')
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      addToCart(product);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.imageSection}>
          <img src={imageUrl} alt={title} className={styles.image} />
        </div>
        <div className={styles.details}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
          <p className={styles.price}>₹{price}</p>
          <div className={styles.buttonGroup}>
            <Button text="Buy Now" onClick={handleBuyNow} />
            <Button text="Add to Cart" onClick={handleAddToCart} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
