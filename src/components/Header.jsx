import React from "react";
import { Link } from "react-router-dom";
import { useBasket } from "../providers/BasketProvider";
import { useList } from "../providers/ListProvider";
import PriceText from "./PriceText";
import { IoSearch ,IoBagRemoveOutline,IoPersonOutline } from 'react-icons/io5';

const Header = () => {
  const { totalPrice } = useBasket();

  return (
    <div className="header">
      <div className="header-container">
        <div className="logo-search-wrap d-flex">
        <div className="logo">
          {" "}
          <Link to={`/`}>Eteration</Link>
        </div>

        <div  className="search-bar">
        <input
          type="text"
          placeholder="Search"
          className="brand-search"
       
        />
         <span className="search-icon">
        <IoSearch />
      </span>
         
        </div>

        </div>
       

        <div className="nav">
        <div className="nav-item"><IoBagRemoveOutline /> <PriceText > {totalPrice} </PriceText></div>
   
          <div className="nav-item">  <IoPersonOutline /> Gözde</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
