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
          Products Total: <PriceText>{totalItems}</PriceText>
        </div>
        <div className="checkout-info">
          Total VAT: <PriceText>{totalVat}</PriceText>
        </div>
        <div className="checkout-info">
          Total:{" "}
          <PriceText>{totalPrice}</PriceText>
        </div>
        <Button variant="primary">Checkout</Button>
      </div>
    </div>
  );
};

export default Checkout;
