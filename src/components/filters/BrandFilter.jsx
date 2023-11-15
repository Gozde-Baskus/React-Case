import React, { useMemo, useState } from "react";
import FilterBox from "../FilterBox";
import useSearchFilter from "../../hooks/searchFilter";
import { useList } from "../../providers/ListProvider";

const BrandFilter = () => {
  const { brandList } = useList();
  const { filteredItems, searchTerm, handleSearchChange } =
    useSearchFilter(brandList);

  return (
    <FilterBox filterType="Brand">
      <div>
        <input
          type="text"
          placeholder="Search"
          className="brand-search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="search-items">
        {filteredItems.map((item, index) => (
          <label className="d-block search-item" key={`${index}_${item}`}>
            <input type="checkbox" name="brand" />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </FilterBox>
  );
};

export default BrandFilter;
