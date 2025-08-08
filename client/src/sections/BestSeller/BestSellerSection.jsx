import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './BestSellerSection.module.css';
import ProductCard from '../../components/ProductCard/ProductCard';

const BestsellersSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products/bestsellers');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <motion.section
      className={styles.bestsellersSection}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h2 className={styles.heading}>Our Bestsellers</h2>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </motion.section>
  );
};

export default BestsellersSection;
