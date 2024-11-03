// src/RegisterPage.js
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import styles from './RegisterPage.module.css'; // Import CSS Module
import { useNavigate } from 'react-router-dom';

// Define validation schema using Yup
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  address: yup.string().required('Address is required'),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  // Initialize react-hook-form with validation schema
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://13.200.170.240:5000/api/store/register', data);
      console.log('Registration successful:', response.data);
      navigate('/')
      // Handle successful registration (e.g., redirect to login page)
    } catch (error) {
      console.error('Registration error:', error);
      // Handle registration error
    }
  };

  return (
    <div className={styles.registrationContainer}>
      <h1 className={styles.registerHeading}>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" {...register('name')} />
          {errors.name && <p className={styles.errorMessage}>{errors.name.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register('email')} />
          {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register('password')} />
          {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="address">Address</label>
          <input id="address" type="text" {...register('address')} />
          {errors.address && <p className={styles.errorMessage}>{errors.address.message}</p>}
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
