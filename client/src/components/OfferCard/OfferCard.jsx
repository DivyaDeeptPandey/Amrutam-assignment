// src/components/TrendingOffers/OfferCard.jsx
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './OfferCard.module.css';

const OfferCard = ({ offer }) => {
  return (
    <motion.div
      className={styles.card}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={offer.link} className={styles.link} aria-label={offer.title}>
        <img
          src={`/images/${offer.image}`}
          alt={offer.title}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.content}>
          <h3 className={styles.title}>{offer.title}</h3>
          <p className={styles.description}>{offer.description}</p>
        </div>
      </Link>
    </motion.div>
  );
};

OfferCard.propTypes = {
  offer: PropTypes.shape({
    link: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
};

export default OfferCard;
