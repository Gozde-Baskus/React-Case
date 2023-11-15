import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useBasket } from "../providers/BasketProvider";
import PriceText from "./PriceText";
const Header = () => {
  const { totalPrice } = useBasket();

  return (
    <div className="header">
      <div className="header-container">
        <div className="logo">
          {" "}
          <Link to={`/`}>Eteration</Link>
        </div>
        <div className="nav">
          <PriceText className="nav-item">{totalPrice}</PriceText>
          <div className="nav-item">Gözde</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
