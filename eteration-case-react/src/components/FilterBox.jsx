import React from "react";

const FilterBox = ({ filterType, children }) => {
  return (
    <div className="filter">
      <p>{filterType}</p>
      <div className="filter-card">{children}</div>
    </div>
  );
};

export default FilterBox;
