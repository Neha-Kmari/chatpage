import React, { useCallback, useContext, useEffect, useState } from 'react';
import styles from './CartPage.module.css'; // Import the CSS module
import { AuthContext } from '../../context/AuthProvider';
import axios from 'axios';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

const CartPage = () => {

  const { userId } = useContext(AuthContext); // Get userId from AuthContext
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize fetchCartData
  const fetchCartData = useCallback(async () => {
    try {
      const response = await axios.get(`http://13.200.170.240:5000/api/store/cart/${userId}`);
      setCartItems(response.data.items);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart data:', error);
      setError('Failed to fetch cart data');
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchCartData();
    }
  }, [userId, fetchCartData]);

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      const response = await axios.put(
        'http://13.200.170.240:5000/api/store/cart/edit', // Ensure this endpoint supports PUT requests
        {
          userId,
          productId,
          quantity: newQuantity
        },
        {
          headers: {
            'Content-Type': 'application/json', // Update headers if needed
            // 'Authorization': 'Bearer yourTokenHere' // Include this if authentication is required
          }
        }
      );
  
      // Update local state with the response data
      fetchCartData();
      console.log('Quantity updated successfully:', response.data);
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Error response:', error.response.data);
        console.error('Status code:', error.response.status);
      } else if (error.request) {
        // No response was received
        console.error('Error request:', error.request);
      } else {
        // Error setting up the request
        console.error('Error message:', error.message);
      }
    }
  };

  const handleIncrement = (productId, currentQuantity) => {
    handleQuantityChange(productId, currentQuantity + 1);
  };

  const handleDecrement = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      handleQuantityChange(productId, currentQuantity - 1);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete('http://13.200.170.240:5000/api/store/cart', {
        data: {
          userId,
          productId
        },
        headers: {
          'Content-Type': 'application/json'
          // Include 'Authorization': 'Bearer yourTokenHere' if needed
        }
      });
  
      // Update local state to remove the item
      fetchCartData();
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Error response:', error.response.data);
        console.error('Status code:', error.response.status);
      } else if (error.request) {
        // No response was received
        console.error('Error request:', error.request);
      } else {
        // Error setting up the request
        console.error('Error message:', error.message);
      }
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
  };

  const handleCheckout = () => {
    // Redirect to checkout page or perform checkout action
    console.log('Proceeding to checkout');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
 
  return (
    <div className={styles.container}>
      <h1>Cart Page</h1>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove Items</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(cartItems) && cartItems.length > 0 ? (
              cartItems.map(item => (
                <tr key={item?.productId}>
                  <td>
                    <img src={item?.imageUrl} alt={item?.title} className={styles.productImage} />
                  </td>
                  <td>{item?.title}</td>
                  <td>
                    <div className={styles.quantityContainer}>
                      <FaMinus
                        className={styles.icon}
                        onClick={() => handleDecrement(item.productId._id, item.quantity)}
                      />
                      <input
                        type="text"
                        value={item.quantity}
                        readOnly
                        className={styles.quantityInput}
                      />
                      <FaPlus
                        className={styles.icon}
                        onClick={() => handleIncrement(item.productId._id, item.quantity)}
                      />
                    </div>
                  </td>
                  <td>${(item?.quantity * item.price).toFixed(2)}</td>
                  <td>
                    <FaTrash
                      className={styles.icon}
                      onClick={() => handleRemove(item.productId._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No items in cart</td> {/* Adjust colspan to match number of columns */}
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className={styles.summaryContainer}>
        <div className={styles.total}>
          <span>Total:</span>
          <span>${calculateTotal()}</span>
        </div>
        <button className={styles.checkoutButton} onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
}

export default CartPage;
