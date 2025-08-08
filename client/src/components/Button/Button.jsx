// client/src/components/Button/Button.jsx
import styles from './Button.module.css';
import { motion } from 'framer-motion';

const Button = ({
  children,
  text,
  onClick,
  type = 'button',
  variant = 'primary'
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type={type}
      onClick={onClick}
      className={styles.button}
    >
      {text || children}
    </motion.button>
    
  );
};

export default Button;
