import React from "react";
import { Link } from "react-router-dom";
import { useBasket } from "../providers/BasketProvider";
import PriceText from "./PriceText";

const ProductItem = ({ product }) => {
  const { name, image, price, id } = product;

  const { onAddToCart } = useBasket();

  const handleAddToCartClick = () => {
    onAddToCart(name, price, id);
  };

  return (
    <div className="product-item d-flex">
      <div className="max-w-xs  overflow-hidden ">
        <Link to={`/detail/${id}`}>
          <img className="product-image" />
          <div className="">
            <PriceText className="product-price">{price}</PriceText>
            <div className="product-name">{name}</div>
          </div>
        </Link>
        <button
          className="product-add-button font-bold py-1 px-2 rounded"
          onClick={handleAddToCartClick}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
