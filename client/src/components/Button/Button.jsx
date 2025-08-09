import { motion } from 'framer-motion';
import styles from './Button.module.css';

const Button = ({
  children,
  text,
  onClick,
  type = 'button',
  variant = 'primary', // primary, secondary, outline, ghost
  size = 'md',         // sm, md, lg
  disabled = false,
  ariaLabel,
}) => {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : undefined}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      type={type}
      onClick={!disabled ? onClick : undefined}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${
        disabled ? styles.disabled : ''
      }`}
      disabled={disabled}
      aria-label={ariaLabel || text}
    >
      {text || children}
    </motion.button>
  );
};

export default Button;
