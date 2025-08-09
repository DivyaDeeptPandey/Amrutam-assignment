import PropTypes from 'prop-types';
import styles from './ProductCard.module.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { _id, title, description, price, imageUrl } = product;
  const navigate = useNavigate();

  const handleBuyClick = (e) => {
    e.stopPropagation();
    navigate(`/product/${_id}`);
  };

  return (
    <div className={styles.card}>
      <img
        src={imageUrl}
        alt={title || 'Product image'}
        className={styles.image}
      />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>₹{price}</span>
          <Button
            text="Buy Now"
            className={styles.button}
            onClick={handleBuyClick}
          />
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
