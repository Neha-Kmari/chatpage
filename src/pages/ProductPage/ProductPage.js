import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {AuthContext} from '../../context/AuthProvider';
import axios from 'axios';
import styles from './ProductPage.module.css';

const ProductPage = () => {
  const {isAuthenticated} = useContext(AuthContext);
  const {userId} = useContext(AuthContext);
  const { _id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();



  const handleAddToCart = async (product) => {
       if (!isAuthenticated) {
      navigate('/login');
   }else{
     const payload = {
       userId: userId,          // Assuming userId is available from AuthContext
       productId: product._id,
       quantity: 1,             // Set the quantity as needed
     };
 
     try {
       const response = await axios.post('http://13.200.170.240:5000/api/store/cart/add', payload);
       console.log('Item added to cart:', response.data);
       navigate('/CartPage')
     } catch (error) {
       console.error('Error adding item to cart:', error);
     }
   }


    // Logic to add the item to the cart
    console.log(`Adding ${product.name} to the cart.`);
  };


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://13.200.170.240:5000/api/store/products/${_id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [_id]);

  if (!product) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.imageContainer}>
          <img
            className={styles.thumbnail}
            src={product.thumbnail}
            alt={product.title}
          />
          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={()=>handleAddToCart(product)} >Add to Cart</button>
            <button className={styles.button}>Buy Now</button>
          </div>
        </div>
        <div className={styles.details}>
          <h4>{product.title}</h4>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
