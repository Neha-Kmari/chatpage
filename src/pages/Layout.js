import React from 'react';
import Header from '../components/coomon/Header/Header';
import Footer from '../components/coomon/Footer/Footer';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
