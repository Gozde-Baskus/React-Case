import { useMemo, useState } from "react";

const useSearchFilter = (items, searchTermDefault="") => {
  const [searchTerm, setSearchTerm] = useState(searchTermDefault);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = useMemo(() => {
    const fitereds =
      items?.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [];

    return fitereds;
  }, [searchTerm, items]);

  return {
    searchTerm,
    handleSearchChange,
    filteredItems,
  };
};

export default useSearchFilter;
