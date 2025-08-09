import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './CategoryCard.module.css';

const CategoryCard = ({ category }) => {
  if (!category) return null;

  const { link, imageUrl, title } = category;

  return (
    <Link
      to={link}
      className={styles.card}
      aria-label={`View category: ${title}`}
    >
      <div className={styles.imageContainer}>
        <img
          src={imageUrl}
          alt={title || 'Category image'}
          className={styles.image}
          loading="lazy"
        />
      </div>
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>{title}</h3>
      </div>
    </Link>
  );
};

CategoryCard.propTypes = {
  category: PropTypes.shape({
    link: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryCard;
