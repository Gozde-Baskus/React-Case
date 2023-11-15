import React, { useMemo, useState } from "react";
import FilterBox from "../FilterBox";
import useSearchFilter from "../../hooks/searchFilter";

const SortingFilter = ({ }) => {
  const items = ["New to Old", "Old to New", "Low to High", "High to Low"];

  return (
    <FilterBox filterType="Sort By">
      <div className="search-items">
        {items.map((item, index) => (
          <label className="search-item" key={`${index}_${item}`}>
            <input type="radio" name="sorting" />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </FilterBox>
  );
};

export default SortingFilter;
