// DetailPage.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiService from "../services/apiService";
import Basket from '../components/Basket';
import Checkout from '../components/Checkout';


const DetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    apiService.get(`products/${id}`)
      .then(response => setProduct(response.data))
      .catch(err => console.log('hata'))
  }, [id]);

  const handleAddToBasket = () => {
    const currentBasket = JSON.parse(localStorage.getItem('basketItems')) || [];
    const existingItemIndex = currentBasket.findIndex(
      (item) => item.name === product.name
    );

    if (existingItemIndex !== -1) {
     
      const updatedBasket = [...currentBasket];
      updatedBasket[existingItemIndex].count += 1;
      localStorage.setItem('basketItems', JSON.stringify(updatedBasket));
    } else {

      const itemToAdd = {
        name: product.name,
        price: product.price,
        count: 1,
      };
      const updatedBasket = [...currentBasket, itemToAdd];
      localStorage.setItem('basketItems', JSON.stringify(updatedBasket));
    }
  };

  return (
    <div className='container'>
    <div className='d-flex '>
    
      <div className='detail-card d-flex '>
   <div className='detail-img'> </div>
   <div className='detail-info'> 
   <div className='name'>{product?.name}</div>
   <div className='price'>{product?.price}₺</div>
   <div>

   <button className="product-add-button font-bold py-1 px-2 rounded" onClick={handleAddToBasket}> Add to Cart</button>

   </div>
   <div  className='description'>{product?.description}</div>
   </div>
    
       
      </div>
      <div className='d-flex flex-column'>
      <Basket  />
        <Checkout  />

      </div>
    </div>
  </div>
  );
};

export default DetailPage;
