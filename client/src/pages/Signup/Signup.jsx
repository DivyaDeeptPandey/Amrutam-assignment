import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Signup.module.css';
import Button from '../../components/Button/Button';
import { motion } from 'framer-motion';

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Signup failed');

      login(data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className={styles.card}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className={styles.title}>Create Account</h2>
        <p className={styles.subtitle}>Already have an account? <span onClick={() => navigate('/login')}>Login</span></p>

        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Name</label>
          <input name="name" placeholder="Your name" onChange={handleChange} required />

          <label>Email</label>
          <input type="email" name="email" placeholder="Email address" onChange={handleChange} required />

          <label>Password</label>
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

          <Button type="submit" variant="primary">Sign Up</Button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Signup;
