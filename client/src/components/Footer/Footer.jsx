// src/components/Footer/Footer.jsx
import styles from './Footer.module.css';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      className={styles.footer}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.container}>
        <div className={styles.column}>
          <h3 className={styles.logo}>Amrutam</h3>
        </div>
        <div className={styles.column}>
          <h4>Shop</h4>
          <ul>
            <li>Products</li>
            <li>Offers</li>
            <li>Bestsellers</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>About Us</h4>
          <ul>
            <li>Our Story</li>
            <li>Blog</li>
            <li>Careers</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Follow Us</h4>
          <div className={styles.socials}>
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
            <a href="#"><i className="fa-brands fa-facebook"></i></a>
            <a href="#"><i className="fa-brands fa-x-twitter"></i></a>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        © 2025 Amrutam. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
