import React from "react";
import ProdHome from "./ProdHome";

const ProductList = ({ products }) => {
  // CSS for grid layout
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // 3 equal columns
    gap: "10px", // space between grid items
  };
  return (
    <div style={gridStyle}>
      {products.slice(0, 30).map(
        (
          product // Only take the first 6 items
        ) => (
          <ProdHome key={product._id} {...product} />
        )
      )}
    </div>
  );
};

export default ProductList;
