import React from "react";

const PriceText = ({ children=0, className }) => {
  return (
    <span className={className}>
      {new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
      }).format(children)}
    </span>
  );
};

export default PriceText;
