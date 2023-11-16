import React, { useMemo } from "react";
import { useContext, useEffect, useState } from "react";
import apiService from "../services/apiService";

const Context = React.createContext();

export const useList = () => {
  return useContext(Context);
};



export const ListProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState({ brand: [], model: [] });
  const [filters, setFilters] = useState({});
  const [sortType, setSortType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const loadProducts = async () => {
    const response = await apiService.get("/products");
    setProducts(response.data);
  };

  const brandList = useMemo(() => Array.from(new Set(products.map((product) => product.brand))), [products]);
  const modelList = useMemo(() => Array.from(new Set(products.map((product) => product.model))), [products]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const pageProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const sortProducts = (sortBy) => {
    const sortedProducts = [...products];

    if (sortBy === "Price low to high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price high to low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "New to old") {
      sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "Old to new") {
      sortedProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    setProducts(sortedProducts);
    setSortType(sortBy);
  };

  const updateSelectedFilter = (filterType, selectedValues) => {
    setSelectedFilter((prevSelectedFilter) => {
      let updatedSelectedFilter;

      if (Array.isArray(prevSelectedFilter[filterType])) {
        const existingValues = prevSelectedFilter[filterType];
        const uniqueValues = Array.from(new Set([...existingValues, ...selectedValues]));

        if (existingValues.length === uniqueValues.length) {
          updatedSelectedFilter = {
            ...prevSelectedFilter,
            [filterType]: existingValues.filter(value => !selectedValues.includes(value)),
          };
        } else {
          updatedSelectedFilter = {
            ...prevSelectedFilter,
            [filterType]: uniqueValues,
          };
        }
      } else {
        updatedSelectedFilter = {
          ...prevSelectedFilter,
          [filterType]: selectedValues,
        };
      }

      localStorage.setItem("selectedFilter", JSON.stringify(updatedSelectedFilter));

      return updatedSelectedFilter;
    });
  };

  const filterProducts = () => {
    let filteredProducts = [...products];

    if (selectedFilter.brand.length > 0) {
      filteredProducts = filteredProducts.filter(product => selectedFilter.brand.includes(product.brand));
    }

    if (selectedFilter.model.length > 0) {
      filteredProducts = filteredProducts.filter(product => selectedFilter.model.includes(product.model));
    }

    return filteredProducts;
  };

  useEffect(() => {
    const storedSortType = localStorage.getItem("sortType");
    if (storedSortType) {
      setSortType(storedSortType);
      sortProducts(storedSortType);
    }

    const storedSelectedFilter = localStorage.getItem("selectedFilter");
    if (storedSelectedFilter) {
      setSelectedFilter(JSON.parse(storedSelectedFilter));
    }

    loadProducts();
  }, []);

  useEffect(() => {
    const filteredProducts = filterProducts();
    setProducts(filteredProducts);
  }, [selectedFilter]);

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
        sortType,
        sortProducts,
        selectedFilter,
        updateSelectedFilter,
      }}
    >
      {children}
    </Context.Provider>
  );
};
