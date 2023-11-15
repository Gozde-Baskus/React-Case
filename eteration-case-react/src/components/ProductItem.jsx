import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  const { name, image, price, id } = product;
  const onAddToCart = () => {
    const itemToAdd = {
      name: name,
      price: price,
      count: 1,
    };

    const currentBasket = JSON.parse(localStorage.getItem("basketItems")) || [];
    const updatedBasket = [...currentBasket, itemToAdd];
    localStorage.setItem("basketItems", JSON.stringify(updatedBasket));
  };

  return (
    <div className="product-item d-flex">
      <div className="max-w-xs  overflow-hidden ">
        <Link to={`/detail/${id}`}>
          <img className="product-image" />
          <div className="">
            <div className="product-price"> {price} ₺</div>
            <div className="product-name">{name}</div>
          </div>
        </Link>
        <button
          className="product-add-button font-bold py-1 px-2 rounded"
          onClick={onAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
