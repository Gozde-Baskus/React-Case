import React, { useMemo } from "react";
import { useContext, useEffect, useState } from "react";

const Context = React.createContext();

export const useBasket = () => {
  return useContext(Context);
};

export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    const currentBasket = JSON.parse(localStorage.getItem("basketItems")) || [];
    setBasket(currentBasket);
  }, []);

  useEffect(() => {
    localStorage.setItem("basketItems", JSON.stringify(basket));
  }, [basket]);

  const onAddToCart = (name, price, id) => {
    const itemToAdd = {
      name,
      price,
      count: 1,
      id,
    };

    const existingItemIndex = basket.findIndex((item) => item.id === id);

    if (existingItemIndex === -1) {
      setBasket([...basket, itemToAdd]);
    } else {
      const updatedBasket = [...basket];
      updatedBasket[existingItemIndex].count++;
      setBasket(updatedBasket);
    }
  };

  const handleIncrement = (id) => {
    const updatedBasket = basket.map((item) =>
      item.id === id ? { ...item, count: item.count + 1 } : item
    );
    setBasket([...updatedBasket]);
  };

  const handleDecrement = (id) => {
    const updatedBasket = basket
      .map((item) =>
        item.id === id && item.count > 0
          ? { ...item, count: item.count - 1 }
          : item
      )
      .filter((item) => item.count > 0);

    setBasket([...updatedBasket]);
  };

  const { totalItems, totalVat, totalPrice } = useMemo(() => {
    const totalItems = basket.reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );
    const totalVat = totalItems * 0.2;
    const totalPrice = totalItems + totalVat;
    return { totalItems, totalVat, totalPrice };
  }, [basket]);

  return (
    <Context.Provider
      value={{
        onAddToCart,
        basket,
        handleIncrement,
        handleDecrement,
        totalItems,
        totalPrice,
        totalVat,
      }}
    >
      {children}
    </Context.Provider>
  );
};
