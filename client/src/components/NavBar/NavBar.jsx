import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaShoppingCart,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import styles from './Navbar.module.css';

const navItems = [
  { name: 'Home', to: '/' },
  { name: 'Shop', to: '/products' },
  { name: 'Offers', to: '/offers' },
  { name: 'Blog', to: '/blog' },
  { name: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { cart, refreshCart } = useCart();
  const navigate = useNavigate();

  // Close mobile menu on route change
  const handleNavClick = (to) => {
    setMenuOpen(false);
    navigate(to);
  };

  return (
    <header className={styles.header}>
      <div className={styles.navbar}>

        {/* Logo */}
        <Link to="/" className={styles.logoLink} aria-label="Amrutam Home">
          Amrutam
        </Link>

        {/* Desktop Nav */}
        <nav
          className={styles.desktopNav}
          aria-label="Primary Navigation"
        >
          <ul className={styles.navList}>
            {navItems.map(({ name, to }) => (
              <li key={name} className={styles.navItem}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navLink} ${styles.active}`
                      : styles.navLink
                  }
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          {isAuthenticated && user ? (
            <>
              <Link
                to="/profile"
                className={styles.userName}
                aria-label={`Go to ${user.name}’s profile`}
              >
                Hello, {user.name}
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className={styles.logoutBtn}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className={styles.loginBtn}
            >
              Login
            </button>
          )}

          <button
            className={styles.cartBtn}
            aria-label="View cart"
            onClick={async () => {
              await refreshCart();
              navigate('/cart');
            }}
          >
            <FaShoppingCart />
            {cart?.items?.length > 0 && (
              <span className={styles.cartBadge}>
                {cart.items.length}
              </span>
            )}
          </button>

          <button
            className={styles.menuToggle}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu + Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* backdrop overlay */}
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.nav
              className={styles.mobileMenu}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              aria-label="Mobile Navigation"
            >
              <ul className={styles.mobileNavList}>
                {navItems.map(({ name, to }) => (
                  <li key={name} className={styles.mobileNavItem}>
                    <button
                      className={styles.mobileNavLink}
                      onClick={() => handleNavClick(to)}
                    >
                      {name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}