// src/components/TrendingOffers/OfferCard.jsx
import { motion } from 'framer-motion';
import styles from './OfferCard.module.css';
import { Link } from 'react-router-dom';

const OfferCard = ({ offer }) => {
  return (
    <motion.div
      className={styles.card}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={offer.link} className={styles.link}>
        <img
          src={`/images/${offer.image}`}
          alt={offer.title}
          className={styles.image}
        />
        <div className={styles.content}>
          <h3 className={styles.title}>{offer.title}</h3>
          <p className={styles.description}>{offer.description}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default OfferCard;
