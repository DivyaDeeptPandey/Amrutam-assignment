import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.css';

const CategoryCard = ({ category }) => {
  return (
    <Link to={category.link} className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={category.imageUrl} alt={category.title} className={styles.image} />
      </div>
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>{category.title}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;