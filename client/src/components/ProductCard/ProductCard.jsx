import styles from './ProductCard.module.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { _id, title, description, price, imageUrl } = product;
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>₹{price}</span>
          <Button text="Buy Now" className={styles.button}
           onClick={(e) => {
            e.stopPropagation();
             navigate(`/product/${_id}`);
            
           }} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
