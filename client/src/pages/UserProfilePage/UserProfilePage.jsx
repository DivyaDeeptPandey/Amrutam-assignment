import React from 'react';
import styles from './UserProfilePage.module.css';
import Navbar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1>Your Profile</h1>
        <div className={styles.card}>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>

          <div className={styles.actions}>
            <Button text="Edit Profile" onClick={() => navigate('/edit-profile')} />
            <Button text="Logout" onClick={logout} />
          </div>
        </div>

        {/* Optional: Order History */}
        {/* <div className={styles.orders}>
          <h2>Order History</h2>
          <ul>
            {user.orders.map((order) => (
              <li key={order._id}>
                Order #{order._id} - ₹{order.total} - {new Date(order.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div> */}
      </div>
      <Footer />
    </>
  );
};

export default UserProfilePage;