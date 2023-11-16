import React, { useMemo } from "react";
import { Pagination } from "react-bootstrap";
import { useList } from "../providers/ListProvider";

const ListPagination = () => {
  const { filteredProducts, itemsPerPage, setCurrentPage, currentPage } = useList();

  const totalPages = useMemo(
    () => Math.ceil(filteredProducts.length / itemsPerPage),
    [filteredProducts]
  );

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination className="flex justify-center items-center mt-4 mx-auto">
      {pageNumbers.map((number) => (
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default ListPagination;
