// client/src/components/CategoryCard/CategoryCard.jsx
import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.css';

const CategoryCard = ({ category }) => {
  return (
    <Link to={category.link} className={styles.card}>
      <img src={category.imageUrl} alt={category.title} className={styles.image} />
      <h3 className={styles.title}>{category.title}</h3>
    </Link>
  );
};

export default CategoryCard;
