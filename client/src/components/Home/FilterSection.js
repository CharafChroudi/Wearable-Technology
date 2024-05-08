import React from "react";
import { useState } from "react";
import styled from "styled-components";

// for the filter inputs
const FilterInput = styled.input`
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  box-sizing: border-box;
  border: 1px solid #000;
  border-radius: 5px;
`;

// labels
const FilterLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const FilterContainer = styled.div`
  background-color: rgba(
    255,
    255,
    0,
    0.5
  ); // Semi-transparent yellow background
  padding: 20px;
  width: 50%; // Adjust based on parent container's widhd
  border-radius: 10px; // rounded corners
  margin: 10px; // Adjust based on othe children withd
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // shadow for depth
`;

const FilterSection = ({ onFilterChange }) => {
  const [filterName, setFilterName] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [filterCompanyId, setFilterCompanyId] = useState("");
  const [filterInStock, setFilterInStock] = useState("");

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setFilterName(value);
        break;
      case "price":
        setFilterPrice(value);
        break;
      case "companyId":
        setFilterCompanyId(value);
        break;
      case "inStock":
        setFilterInStock(value);
        break;
      default:
        break;
    }

    // new filter values
    const handleFilterChange = (e) => {
      //   ({
      //   name: filterName,
      //   price: filterPrice,
      //   companyId: filterCompanyId,
      //   inStock: filterInStock,
      // });
    };
  };

  return (
    <FilterContainer>
      <h2>Search by filter </h2>
      <FilterLabel>Model</FilterLabel>
      <FilterInput
        type="text"
        name="name"
        value={filterName}
        onChange={handleFilterChange}
        placeholder="Filter by model"
      />
      <FilterLabel>Company</FilterLabel>
      <FilterInput
        type="text"
        name="companyId"
        value={filterCompanyId}
        onChange={handleFilterChange}
        placeholder="Filter by company"
      />
      <FilterLabel>Price</FilterLabel>
      <FilterInput
        type="text"
        name="price"
        value={filterPrice}
        onChange={handleFilterChange}
        placeholder="Filter by price"
      />
      <FilterLabel>Availability</FilterLabel>
      <FilterInput
        type="text"
        name="inStock"
        value={filterInStock}
        onChange={handleFilterChange}
        placeholder="Filter by availability"
      />
    </FilterContainer>
  );
};

export default FilterSection;
