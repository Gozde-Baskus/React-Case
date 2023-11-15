import React, { useMemo } from "react";
import { useContext, useEffect, useState } from "react";

const Context = React.createContext();

export const useList = () => {
  return useContext(Context);
};

export const BasketProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});


  return (
    <Context.Provider
      value={{
        products,
        filters,
       
      }}
    >
      {children}
    </Context.Provider>
  );
};
