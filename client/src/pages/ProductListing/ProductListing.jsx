// client/src/pages/ProductListing/ProductListing.jsx
import { useEffect, useState } from 'react';
import styles from './ProductListing.module.css';
import { motion } from 'framer-motion';
import ProductCard from '../../components/ProductCard/ProductCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import Navbar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOption, setSortOption] = useState('');

  // Fetch all products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Handle category filter
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setCategoryFilter(category);
    if (category === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  // Handle sort
  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);

    const sorted = [...filteredProducts].sort((a, b) => {
      switch (option) {
        case 'priceLowHigh':
          return a.price - b.price;
        case 'priceHighLow':
          return b.price - a.price;
        case 'nameAZ':
          return a.name.localeCompare(b.name);
        case 'nameZA':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    setFilteredProducts(sorted);
  };

  return (
    <motion.div
      // Mismatch Fix 1: Use 'container' instead of 'pageContainer'
      className={styles.container} 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
        <Navbar />
      <SearchBar />

      {/* Mismatch Fix 2: Use 'topBar' instead of 'controls' */}
      <div className={styles.topBar}> 
        <select value={categoryFilter} onChange={handleCategoryChange} className={styles.dropdown}>
          <option value="">All Categories</option>
          <option value="Oils">Oils</option>
          <option value="Capsules">Capsules</option>
          <option value="Syrups">Syrups</option>
          {/* Add more categories if needed */}
        </select>

        <select value={sortOption} onChange={handleSortChange} className={styles.dropdown}>
          <option value="">Sort By</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="nameAZ">Name: A-Z</option>
          <option value="nameZA">Name: Z-A</option>
        </select>
      </div>

      <div className={styles.productsGrid}>
        {filteredProducts.map((product) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
        <Footer />
    </motion.div>
  );
};

export default ProductListing;