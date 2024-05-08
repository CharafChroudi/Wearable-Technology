import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const StyledNavBar = styled.nav`
  background: #333; // grey color
  display: flex; //navigation links on left side
  justify-content: space-between; //cart section on opposite ends
  align-items: center;
  padding: 30px 10px;
`;

const Logo = styled.img`
  height: 50px; // image height
  margin-right: 20px; // space between logo & Home link
  margin-left: 10px;
`;

const NavigationGroup = styled.div`
  display: flex;
  align-items: center;
`;

const NavigationLink = styled(Link)`
  color: white;
  margin: 0 20px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;

  &:hover {
    color: #ffff00; /* yellow on hover */
  }
`;

const CartSection = styled.div`
  font-weight: bold;
  font-size: 1rem;
  color: white;
  margin: 0 20px;
  cursor: pointer;

  &:hover {
    color: #ffff00; /* yellow on hover */
  }
`;

const NavBar = ({ inCart, quantityTotal, setQuantityTotal }) => {
  return (
    <StyledNavBar>
      <NavigationGroup>
        <Logo src={logo} alt="W&T Logo" />
        <NavigationLink to="/">Home</NavigationLink>
        <NavigationLink to="/cart">Checkout</NavigationLink>
      </NavigationGroup>
      <CartSection>
        <NavigationLink to="/cart">Your Cart ({quantityTotal})</NavigationLink>{" "}
        {/* cart dynamic count */}
      </CartSection>
    </StyledNavBar>
  );
};

export default NavBar;
