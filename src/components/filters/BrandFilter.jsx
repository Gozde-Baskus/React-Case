import React, { useMemo, useState } from "react";
import FilterBox from "../FilterBox";
import useSearchFilter from "../../hooks/searchFilter";
import { useList } from "../../providers/ListProvider";
import { IoSearch } from "react-icons/io5";
const BrandFilter = () => {
  const { brandList,selectedFilter, updateSelectedFilter } = useList();
  const { filteredItems, searchTerm, handleSearchChange } =
    useSearchFilter(brandList);

  const handleBrandCheckboxChange = (selectedBrand) => {
    const updatedSelectedBrands = [selectedBrand];
    updateSelectedFilter("brand", updatedSelectedBrands);
  };
  return (
    <FilterBox filterType="Brand">
      <div className="search-bar-filter">
        <input
          type="text"
          placeholder="Search"
          className="brand-search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <span className="search-icon">
          <IoSearch />
        </span>
      </div>
      <div className="search-items">
        {filteredItems.map((item, index) => (
          <label className="d-block search-item" key={`${index}_${item}`}>
            <input
              type="checkbox"
              name="brand"
              onChange={() => handleBrandCheckboxChange(item)}
              checked={(selectedFilter.brand || []).includes(item)}
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </FilterBox>
  );
};

export default BrandFilter;
