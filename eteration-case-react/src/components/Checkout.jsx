import React, { useState } from 'react';
import { Button } from 'react-bootstrap';


const Checkout = () => {

  const initialPrice = JSON.parse(localStorage.getItem('totalPrice')) || '0' ;
  const [price, setPrice] = useState(initialPrice); 
  return (
    <div className='filter'>
      <p>Checkout</p>
      <div className='filter-card'>
<div className='checkout-info'>Total Price: <span className='checkout-price'>{price} ₺</span> </div>
              <Button  variant="primary">Checkout</Button>
        
      </div>
    </div>
  );
};

export default Checkout;
