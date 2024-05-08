import React, { useState, useEffect } from "react";

// Banner at the top of  homepage
import Banner from "./Banner";
// FilterSection bottom left corner of homepage
import FilterSection from "./FilterSection"; 
// ProductList bottom center and right of homepage
import ProductList from "./ProductList";

const Home = ({ products, onFilterChange }) => { // products & onFilterchange as prop
  const contentContainerStyle = {
    display: 'flex', // children side by side
    justifyContent: 'space-between', // space between filter & product list
    width: '100%', //Adjust based on parent container's widhd
   // marginTop: '0px', // Pull the content up to overlay on the bottom of the banner
  };

  return (
    <div>
      <Banner />
      <div style={contentContainerStyle}>
      <FilterSection onFilterChange={onFilterChange} />
      <ProductList products={products} />
      </div>
      </div>
  );
};


export default Home;
