import React, { useMemo } from "react";
import { useContext, useEffect, useState } from "react";
import apiService from "../services/apiService";

const Context = React.createContext();

export const useList = () => {
  return useContext(Context);
};

export const ListProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState({
    brand: [],
    model: [],
  });
  const [filters, setFilters] = useState({});
  const [sortType, setSortType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchGeneral, setSearchGeneral] = useState("");
  const itemsPerPage = 12;

  // products isteği
  const loadProducts = async () => {
    const response = await apiService.get("/products");
    setProducts(response.data);
  };

  // header search
  const handleSearchGeneralChange = (event) => {
    const searchTerm = event.target.value.trim();
    setSearchGeneral(searchTerm);
  };

  // filter brand and model
  const updateSelectedFilter = (filterType, selectedValues) => {
    setSelectedFilter((prevSelectedFilter) => {
      let updatedSelectedFilter;

      if (Array.isArray(prevSelectedFilter[filterType])) {
        const existingValues = prevSelectedFilter[filterType];
        const uniqueValues = Array.from(
          new Set([...existingValues, ...selectedValues])
        );

        if (existingValues.length === uniqueValues.length) {
          updatedSelectedFilter = {
            ...prevSelectedFilter,
            [filterType]: existingValues.filter(
              (value) => !selectedValues.includes(value)
            ),
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
      return updatedSelectedFilter;
    });
  };

  const filteredProducts = [...products]
    .filter((item) => {
      if (
        selectedFilter.brand.length > 0 &&
        !selectedFilter.brand.includes(item.brand)
      )
        return false;
      if (
        selectedFilter.model.length > 0 &&
        !selectedFilter.model.includes(item.model)
      )
        return false;

      if (!searchGeneral) return true;
      if (item.name.toLowerCase().includes(searchGeneral)) return true;
      if (item.price.toString().includes(searchGeneral)) return true;
      if (item.brand.toLowerCase().includes(searchGeneral)) return true;
      if (item.model.toLowerCase().includes(searchGeneral)) return true;
      return false;
    })
    .sort((a, b) => {
      switch (sortType) {
        case "Price low to high":
          return a.price - b.price;
        case "Price high to low":
          return b.price - a.price;
        case "New to old":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "Old to new":
          return new Date(a.createdAt) - new Date(b.createdAt);
        default:
          return 0;
      }
    });

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

  const pageProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    const storedSortType = localStorage.getItem("sortType");
    if (storedSortType) {
      setSortType(storedSortType);
    }

    const storedSelectedFilter = localStorage.getItem("selectedFilter");
    if (storedSelectedFilter) {
      setSelectedFilter(JSON.parse(storedSelectedFilter));
    }

    loadProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedFilter", JSON.stringify(selectedFilter));
    localStorage.setItem("sortType", sortType);
  }, [selectedFilter, sortType]);

  return (
    <Context.Provider
      value={{
        products,
        filteredProducts,
        pageProducts,
        filters,
        brandList,
        modelList,
        setFilters,
        currentPage,
        itemsPerPage,
        setCurrentPage,
        sortType,
        setSortType,
        selectedFilter,
        updateSelectedFilter,
        handleSearchGeneralChange,
        searchGeneral,
      }}
    >
      {children}
    </Context.Provider>
  );
};
