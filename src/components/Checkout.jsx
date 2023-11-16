import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useBasket } from "../providers/BasketProvider";
import PriceText from "./PriceText";

const Checkout = () => {
  const { totalItems, totalPrice, totalVat } = useBasket();

  return (
    <div className="filter">
      <p>Checkout</p>
      <div className="filter-card">
        <div className="checkout-info">
          Total Price: <PriceText className="product-price price-checkout">{totalPrice}</PriceText>
        </div>
        <div className="checkout-info price-vat">
          Total VAT: <PriceText>{totalVat}</PriceText>
        </div>
        
        <Button variant="primary">Checkout</Button>
      </div>
    </div>
  );
};

export default Checkout;
