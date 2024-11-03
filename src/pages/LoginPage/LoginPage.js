// src/LoginPage.js
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import styles from './LoginPage.module.css'; // Import CSS Module
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

// Define validation schema using Yup
const schema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginPage = () => {
  const { login } = useContext(AuthContext);
   const navigate =  useNavigate();
  // Initialize react-hook-form with validation schema
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://13.200.170.240:5000/api/store/login', data);
      console.log('Login successful:', response.data);
      login({ token: response.data.token, userId: "66b46884bb5e0ebbdbfea71d"});
      // localStorage.setItem('authToken', JSON.stringify(response.data));
      // localStorage.setItem('userId', "66b46884bb5e0ebbdbfea71d");
      navigate(-1);
      // Handle successful login (e.g., redirect to dashboard)
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Login</h1>
      <button className={styles.signUpButton} onClick={() => navigate('/Register')}>Sign Up</button>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <button type="submit">Login</button>
      </form>
     
     
    </div>
  );
};

export default LoginPage;
