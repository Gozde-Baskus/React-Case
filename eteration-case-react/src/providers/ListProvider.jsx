import React, { useMemo } from "react";
import { useContext, useEffect, useState } from "react";
import apiService from "../services/apiService";

const Context = React.createContext();

export const useList = () => {
  return useContext(Context);
};

export const ListProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const loadProducts = async () => {
    const response = await apiService.get("/products");
    setProducts(response.data);
  };

  const brandList = useMemo(
    () => Array.from(new Set(products.map((product) => product.brand))),
    [products]
  );

  const modelList = useMemo(
    () => Array.from(new Set(products.map((product) => product.model))),
    [products]
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const pageProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Context.Provider
      value={{
        products,
        pageProducts,
        filters,
        brandList,
        modelList,
        setFilters,
        currentPage,
        itemsPerPage,
        setCurrentPage,
      }}
    >
      {children}
    </Context.Provider>
  );
};
