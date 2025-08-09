import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const navigate = useNavigate();
  const controllerRef = useRef(null);

  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }

    // Cancel previous request
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/products/search?query=${encodeURIComponent(query)}`,
          { signal: controllerRef.current.signal }
        );
        const data = await res.json();
        setSuggestions(Array.isArray(data) ? data : []);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching suggestions:', error);
        }
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelect = (id) => {
    setQuery('');
    setSuggestions([]);
    navigate(`/product/${id}`);
  };

  const handleKeyDown = (e) => {
    if (!suggestions.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[highlightedIndex]._id);
    }
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
          onKeyDown={handleKeyDown}
        />

        {isFocused && suggestions.length > 0 && (
          <ul className={styles.dropdown}>
            {suggestions.map((product, index) => (
              <li
                key={product._id}
                className={`${styles.dropdownItem} ${
                  index === highlightedIndex ? styles.activeItem : ''
                }`}
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
