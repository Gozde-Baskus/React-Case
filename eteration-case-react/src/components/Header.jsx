
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
  const initialPrice = JSON.parse(localStorage.getItem('totalPrice')) || '0' ;

  const [price, setPrice] = useState(initialPrice);
  return (
    <div className="header">
  <div className="header-container">
    <div className="logo">  <Link  to={`/`}>Eteration</Link></div>
    <div className="nav">
      <div className="nav-item">{price} ₺</div>
      <div className="nav-item">Gözde</div>
    </div>
  </div>
</div>

  );
};

export default Header;