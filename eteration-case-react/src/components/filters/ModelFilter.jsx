import React from "react";
import FilterBox from "../FilterBox";
import useSearchFilter from "../../hooks/searchFilter";
import { useList } from "../../providers/ListProvider";

const ModelFilter = () => {
  const {modelList} = useList();
  const { filteredItems, searchTerm, handleSearchChange } =
    useSearchFilter(modelList);

  return (
    <FilterBox filterType="Model">
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
            <input type="checkbox" name="model" />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </FilterBox>
  );
};

export default ModelFilter;
