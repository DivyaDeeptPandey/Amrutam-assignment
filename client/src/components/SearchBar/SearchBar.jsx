// client/src/components/SearchBar/SearchBar.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim() === '') {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/api/products/search?query=${query}`);
        const data = await res.json();
        setSuggestions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelect = (id) => {
    console.log("hello");
    setQuery('');
    setSuggestions([]);
    navigate(`/product/${id}`);
  };

  return (
    <motion.div
      className={styles.searchContainer}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.inputWrapper}>
        <FaSearch className={styles.icon} />
        <input
          type="text"
          placeholder="Search for Ayurvedic remedies, oils, products..."
          className={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />

        {isFocused && suggestions.length > 0 && (
          <ul className={styles.dropdown}>
            {suggestions.map((product) => (
              <li
                key={product._id}
                className={styles.dropdownItem}
                onMouseDown={() => handleSelect(product._id)}
              >
                {product.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

export default SearchBar;
