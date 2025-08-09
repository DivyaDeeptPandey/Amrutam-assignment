// client/src/pages/ProductListing/ProductListing.jsx
import { useEffect, useState, useCallback } from 'react';
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
  const [loading, setLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/products');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Unified filter + sort handler
  const applyFiltersAndSort = useCallback(
    (category, sort) => {
      let updated = [...products];

      if (category) {
        updated = updated.filter(
          (product) =>
            product.category?.toLowerCase() === category.toLowerCase()
        );
      }

      if (sort) {
        updated.sort((a, b) => {
          switch (sort) {
            case 'priceLowHigh':
              return a.price - b.price;
            case 'priceHighLow':
              return b.price - a.price;
            case 'nameAZ':
              return a.title.localeCompare(b.title);
            case 'nameZA':
              return b.title.localeCompare(a.title);
            default:
              return 0;
          }
        });
      }

      setFilteredProducts(updated);
    },
    [products]
  );

  // Handle category change
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setCategoryFilter(category);
    applyFiltersAndSort(category, sortOption);
  };

  // Handle sort change
  const handleSortChange = (e) => {
    const sort = e.target.value;
    setSortOption(sort);
    applyFiltersAndSort(categoryFilter, sort);
  };

  return (
    <>
      <Navbar />
      <motion.div
        className={styles.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <SearchBar />

        <div className={styles.topBar}>
          <select
            value={categoryFilter}
            onChange={handleCategoryChange}
            className={styles.dropdown}
          >
            <option value="">All Categories</option>
            <option value="Oils">Oils</option>
            <option value="Capsules">Capsules</option>
            <option value="Syrups">Syrups</option>
          </select>

          <select
            value={sortOption}
            onChange={handleSortChange}
            className={styles.dropdown}
          >
            <option value="">Sort By</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="nameAZ">Name: A-Z</option>
            <option value="nameZA">Name: Z-A</option>
          </select>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
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
        )}
      </motion.div>
      <Footer />
    </>
  );
};

export default ProductListing;
