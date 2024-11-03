import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './pages/Layout';
import ProductPage from './pages/ProductPage/ProductPage';
import HomePage from './pages/HomePage/HomePage';
import CartPage from './pages/CartPage/CartPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { AuthContext } from './context/AuthProvider';
import { useContext } from 'react';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import './styles/global.css';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';


const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/login" />}
    />
  );
};

function App() {
  
  
  return (
    <>
    <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/product/:_id" element={<ProductPage/>} />
        <Route path="/cart" element={<PrivateRoute element={<CartPage />} />} />
        <Route path="/CartPage" element={<CartPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/Register" element={<RegisterPage/>} />
      </Routes>
    </Layout>
  </Router>
  <UserProfilePage/>

  
  </>
   );
}

export default App;
