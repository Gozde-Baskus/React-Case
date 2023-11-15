// DetailPage.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiService from "../services/apiService";
import Basket from '../components/Basket';
import Checkout from '../components/Checkout';
import { useBasket } from '../providers/BasketProvider';


const DetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { onAddToCart } = useBasket();

  const handleAddToCartClick = () => {
    onAddToCart(product.name, product.price, id);
  };

  useEffect(() => {
    apiService.get(`products/${id}`)
      .then(response => setProduct(response.data))
      .catch(err => console.log('hata'))
  }, [id]);



  return (
    <div className='container'>
    <div className='d-flex '>
    
      <div className='detail-card d-flex '>
   <div className='detail-img'> </div>
   <div className='detail-info'> 
   <div className='name'>{product?.name}</div>
   <div className='price'>{product?.price}₺</div>
   <div>

   <button className="product-add-button font-bold py-1 px-2 rounded"  onClick={handleAddToCartClick}> Add to Cart</button>

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
