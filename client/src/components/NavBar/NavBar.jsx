// src/components/Navbar/Navbar.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const navLinks = ['Home', 'Shop', 'Offers', 'Blog', 'Contact'];

  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        <div className={styles.logo}>Amrutam</div>

        <nav className={styles.links}>
          {navLinks.map((link) => (
            <a href={`#${link.toLowerCase()}`} key={link} className={styles.navLink}>
              {link}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <button className={styles.loginBtn}>Login</button>
          <FaShoppingCart className={styles.cartIcon}   onClick={() => navigate('/cart')}/>
          <button className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <a
                href={`#${link.toLowerCase()}`}
                key={link}
                className={styles.mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
