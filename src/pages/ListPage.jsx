import React, { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import Pagination from "react-bootstrap/Pagination";
import Basket from "../components/Basket";
import Checkout from "../components/Checkout";
import apiService from "../services/apiService";
import BrandFilter from "../components/filters/BrandFilter";
import ModelFilter from "../components/filters/ModelFilter";
import SortingFilter from "../components/filters/SortingFilter";
import { useList } from "../providers/ListProvider";
import ListPagination from "../components/ListPagination";
import { IoSearch, IoBagRemoveOutline, IoPersonOutline } from "react-icons/io5";

const ListPage = () => {
  const { pageProducts } = useList();

  return (
    <div className="container">
      <div className="search-bar mobile-search">
        <input type="text" placeholder="Search" className="brand-search" />
        <span className="search-icon">
          <IoSearch />
        </span>
      </div>
      <div className="d-flex page-wrapper">
        <div className="filter-wrapper flex-column">
          <SortingFilter />
          <BrandFilter />
          <ModelFilter />
        </div>

        <div className="list-wrapper d-flex column flex-column">
          <div className="flex mx-auto space-x-8">
            <div className="list-wrap d-flex flex-wrap">
              {pageProducts.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </div>
          </div>
          <ListPagination />
        </div>
        <div className="basket-wrapper flex-column">
          <Basket />
          <Checkout />
        </div>
      </div>
    </div>
  );
};

export default ListPage;
