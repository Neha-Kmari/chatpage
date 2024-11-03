import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerSection}>
        <h5 className={styles.footerHeading}>Get to Know Us</h5>
        <ul className={styles.footerList}>
          <li>Careers</li>
          <li>Blog</li>
          <li>About Amazon</li>
          <li>Investor Relations</li>
          <li>Amazon Devices</li>
          <li>Amazon Science</li>
        </ul>
      </div>
      <div className={styles.footerSection}>
        <h5 className={styles.footerHeading}>Customer Service</h5>
        <ul className={styles.footerList}>
          <li>Help</li>
          <li>Returns</li>
          <li>Track Orders</li>
          <li>Shipping Rates</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div className={styles.footerSection}>
        <h5 className={styles.footerHeading}>Connect with Us</h5>
        <ul className={styles.footerList}>
          <li>Facebook</li>
          <li>Twitter</li>
          <li>Instagram</li>
          <li>YouTube</li>
          <li>LinkedIn</li>
        </ul>
      </div>
      <div className={styles.footerSection}>
        <h5 className={styles.footerHeading}>Make Money with Us</h5>
        <ul className={styles.footerList}>
          <li>Sell on Amazon</li>
          <li>Sell Your Services on Amazon</li>
          <li>Become an Affiliate</li>
          <li>Advertise Your Products</li>
          <li>Self-Publish with Us</li>
        </ul>
      </div>
      <div className={styles.footerSection}>
        <h5 className={styles.footerHeading}>Amazon Payment Products</h5>
        <ul className={styles.footerList}>
          <li>Amazon Rewards Visa Signature Cards</li>
          <li>Amazon.com Store Card</li>
          <li>Amazon Business Card</li>
          <li>Amazon Business Line of Credit</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
