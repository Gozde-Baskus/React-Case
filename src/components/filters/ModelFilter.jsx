import React from "react";
import FilterBox from "../FilterBox";
import useSearchFilter from "../../hooks/searchFilter";
import { useList } from "../../providers/ListProvider";
import { IoSearch } from 'react-icons/io5';
const ModelFilter = () => {
  const {modelList,selectedFilter, updateSelectedFilter} = useList();

  const { filteredItems, searchTerm, handleSearchChange } =
    useSearchFilter(modelList);
    const handleBrandCheckboxChange = (selectedBrand) => {
      const updatedSelectedBrands = [selectedBrand];
      updateSelectedFilter("model", updatedSelectedBrands);
    };
  return (
    <FilterBox filterType="Model">
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
            <input type="checkbox" name="model" 
              onChange={() => handleBrandCheckboxChange(item)}
              checked={(selectedFilter.model || []).includes(item)}
              />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </FilterBox>
  );
};

export default ModelFilter;
