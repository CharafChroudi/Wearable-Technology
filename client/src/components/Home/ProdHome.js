import React from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const ProdHomeCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between; // Ensure content is spaced out evenly
  border: 0px solid #ddd;
  padding: 16px;
  margin: 16px;
  text-align: center;
  height: 60%; // Make the card take full height of the grid area
`;


const ProdHomeImageContainer = styled.div`
  width: 100%; // full width of the card
  height: 0; //div to zero height
  padding-top: 100%; // aspect ratio of 1:1
  position: relative; // Positioning for the absolute img
`;

const ProdHomeImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%; // full width the img container
  height: auto; // auto height for no deformation
  object-fit: cover; // image covers the area
`;

const ProdHome = ({ _id, name, price, imageSrc }) => {
  let navigate = useNavigate();

  const goToProductPage = () => {
    navigate(`/product/${_id}`); // Navigate to the product page with the product's ID
  };
  
  return (
    <ProdHomeCard>
      <ProdHomeImageContainer>
      <ProdHomeImage src={imageSrc} alt={name} />
      </ProdHomeImageContainer>
      <h4>{name}</h4>
      <p>{price}</p>
      <button onClick={goToProductPage}>VIEW PRODUCT</button> {/* goes to product page */}
      {/* more product here maybe */}
    </ProdHomeCard>
  );
};

export default ProdHome ;