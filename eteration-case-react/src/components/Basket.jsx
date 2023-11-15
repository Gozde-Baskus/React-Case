import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const Basket = ({ onAddToBasket }) => {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('basketItems')) || []);

  useEffect(() => {
    localStorage.setItem('basketItems', JSON.stringify(items));
  }, [items]);

  const handleIncrement = (index) => {
    const updatedItems = [...items];
    updatedItems[index].count += 1;
    setItems(updatedItems);
  };

  const handleDecrement = (index) => {
    const updatedItems = [...items];
    if (updatedItems[index].count > 0) {
      updatedItems[index].count -= 1;

      if (updatedItems[index].count === 0) {
        updatedItems.splice(index, 1);
      }

      setItems(updatedItems);
    }
  };

  return (
    <div className='filter'>
      <p>Card</p>
      <div className='filter-card'>
        {items.map((item, index) => (
          <div key={index} className='basket-item'>
            <div className='item-info'>
              <div className='basket-name'>{item.name}</div>
              <div className='basket-price'>{item.price}₺</div>
            </div>
            <div className='item-counter'>
              <Button className='count-button' size='m' onClick={() => handleDecrement(index)}>
                -
              </Button>
              <Button size='m' variant='primary'>
                {item.count}
              </Button>
              <Button className='count-button' size='m' onClick={() => handleIncrement(index)}>
                +
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Basket;