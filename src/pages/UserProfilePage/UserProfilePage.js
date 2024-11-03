import React, { useState, useEffect } from 'react';
import styles from './UserProfilePage.module.css'; 
import axios from 'axios';

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your API endpoint
    axios.get('http://13.200.170.240:5000/api/user/profile')
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching user profile:', err);
        setError('Failed to fetch user profile');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      {user && (
        <>
          <div className={styles.profileHeader}>
            <img src={user.profilePicture} alt="Profile" className={styles.profilePicture} />
            <h1 className={styles.userName}>{user.name}</h1>
          </div>
          <div className={styles.userInfo}>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Address:</strong> {user.address}</p>
          </div>
          <button className={styles.editButton}>Edit Profile</button>
        </>
      )}
    </div>
  );
}

export default UserProfilePage;
