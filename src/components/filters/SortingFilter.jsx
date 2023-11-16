import React from "react";
import FilterBox from "../FilterBox";
import { useList } from "../../providers/ListProvider";

const SortingFilter = ({ }) => {
  const items = ["New to old", "Old to new", "Price low to high", "Price high to low"];
  const {setSortType,sortType } = useList();
  const handleSortChange = (selectedSortType) => {   
    setSortType(selectedSortType); 
  };
  return (
    <FilterBox filterType="Sort By">
      <div className="search-items">
        {items.map((item, index) => (
          <label className="search-item" key={`${index}_${item}`}>
            <input type="radio" name="sorting"
            checked={sortType === item}
             onChange={() => handleSortChange(item)} 
          />
            <span>{item} </span>
          </label>
        ))}
      </div>
    </FilterBox>
  );
};

export default SortingFilter;
