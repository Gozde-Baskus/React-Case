import React from "react";
import { Button } from "react-bootstrap";
import { useBasket } from "../providers/BasketProvider";

const Basket = () => {
  const { basket, handleIncrement, handleDecrement } = useBasket();
  return (
    <div className="filter">
      <p>Card</p>
      <div className="filter-card">
        {basket.length === 0 ? (
          <div className="empty-basket">
            <p>No items in the basket</p>
          </div>
        ) : (
          <div className="basket-items-wrapper">
            {basket.map((item) => (
              <div key={item.id} className="basket-item">
                <div className="item-info">
                  <div className="basket-name">{item.name}</div>
                  <div className="basket-price">{item.price}₺</div>
                </div>
                <div className="item-counter">
                  <Button
                    className="count-button"
                    size="m"
                    onClick={() => handleDecrement(item.id)}
                  >
                    -
                  </Button>
                  <Button size="m" variant="primary">
                    {item.count}
                  </Button>
                  <Button
                    className="count-button"
                    size="m"
                    onClick={() => handleIncrement(item.id)}
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Basket;
