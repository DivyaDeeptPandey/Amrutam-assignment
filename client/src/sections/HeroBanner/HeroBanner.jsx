// client/src/components/HeroBanner/HeroBanner.jsx
import { motion } from 'framer-motion';
import styles from './HeroBanner.module.css';
import Button from '../../components/Button/Button.jsx';
import heroImage from '../../assets/hero.png';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <motion.div
          className={styles.text}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Experience the Power of Ayurveda</h1>
          <p>Discover ancient remedies and natural wellness with Amrutam’s trusted formulations.</p>
          <Link to="/products">
            <Button text="Shop Now" />
          </Link>
        </motion.div>

        <motion.div
          className={styles.imageWrapper}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img src={heroImage} alt="Amrutam Hero Product" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;
