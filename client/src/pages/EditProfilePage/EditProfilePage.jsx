import React, { useState, useEffect } from 'react';
import styles from './EditProfilePage.module.css';
import Navbar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const EditProfilePage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user, isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Saving...');

    try {
      const res = await fetch(`http://localhost:5000/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name, email, password })
      });

      if (!res.ok) throw new Error('Failed to update profile');
      setStatus('✅ Profile updated successfully!');
      setTimeout(() => navigate('/profile'), 1500);
    } catch (err) {
      console.error(err);
      setStatus('❌ Failed to update profile');
    }
  };

  return (
    <>
      <Navbar />
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1>Edit Profile</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>New Password (optional)</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button text="Save Changes" type="submit" />
          {status && (
            <p
              className={`${styles.status} ${
                status.includes('❌') ? styles.error : styles.success
              }`}
            >
              {status}
            </p>
          )}
        </form>
      </motion.div>
      <Footer />
    </>
  );
};

export default EditProfilePage;