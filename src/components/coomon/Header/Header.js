import React, {useState} from 'react';
import styles from './Header.module.css';
import cart from '../../../assets/images/cart.png';
import search from '../../../assets/images/search.png';
import { Link } from 'react-router-dom';
import hamburger from '../../../assets/images/Union.png';

const Header = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className={styles.header}>
      <div className={styles.menuToggle} onClick={toggleMenu}>
      <img className={styles.hamburger} src={hamburger} alt="Menu" />
    </div>
    <div className={styles.logo}>
      <h1>CHEEPER SHOP</h1>
    </div>
    <div className={styles.navIconList}>
    <ul className={`${styles.navList} ${menuOpen ? styles.showMenu : ''}`}>
      <li><Link to="/">Category</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/contact">Contact</Link></li>
    </ul>
    <div className={styles.icons}>
      <ul className={styles.iconList}>
        <li><img className={styles.icon} src={search} alt="search" /></li>
        <li><Link to="/CartPage"><img className={styles.icon} src={cart} alt="cart" /> </Link></li>
      </ul>
    </div>
    </div>
  </nav>
  );
};

export default Header;
