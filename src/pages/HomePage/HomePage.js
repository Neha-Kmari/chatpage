import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import homeScreen1 from '../../assets/images/Image_header.png';
import { AuthContext } from '../../context/AuthProvider';


const HomePage = () => {
  const {isAuthenticated} = useContext(AuthContext);
  const { userId } = useContext(AuthContext);
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
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios.get('http://localhost:5000/api/products')
  //     .then((response) => {
  //       console.log(response);
  //       setData(response.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

   useEffect(() => {
    axios.get('http://13.200.170.240:5000/api/store/products')
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);


 
  return (
    <div className={styles.homePage}>
        <div>
          <img src={homeScreen1} alt='homepage' className={styles.sliderImage} />
        </div>
      <div className={styles.cardGrid}>
        {data.map((card, index) => (
          <div key={index} className={styles.card}>
            <img src={card.thumbnail} alt={card.title} className={styles.cardImage} />
           
            <div className={styles.cardContent}>
            <Link to={`/product/${card._id}`}>
              <span className={styles.cardTitle}>{card.title}</span>
              <p className={styles.cardDescription}>{`price ${card.price}`}</p>
              </Link>
              <button className={styles.button} onClick={()=>handleAddToCart(card)} >Add to Cart</button>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;


