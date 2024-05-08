import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif; // Montserrat font 
    background: #EBFFFF; //  white background
  }

  // styles for buttons
  button {
    font-family: 'Montserrat', sans-serif;
    padding: 10px 20px; // Add padding
    border: none; // Remove border
    border-radius: 5px; // Rounded corners
    background-color: #ffff00; // Yellow 
    color: #000000; // Black text color
    font-size: 0.9rem; // Relative font size
    cursor: pointer; // Cursor
    transition: background-color 0.3s; // background transition on hover
    font-weight: bold;
    &:hover {
      background-color: #333; // Darker color on hover
      color: #ffffff; // white text color
    }
  }
  /* Style for disabled button */
button[disabled] {
  background-color: #cccccc; /* Gray */
  cursor: not-allowed;
}

  // typography hierarchies

  h1, h2, h3, h4, p {
    color: #000000; // Black text color
    margin: 0 0 15px;
    padding: 0;
    line-height: 1.4; // Spacing between lines
  }


  h1 {
    font-size: 2rem;  
    font-weight: bold; // Bold

  }

  h2 {
    font-size: 1.5rem; 
    font-weight: 600; // Semi-bold 
  }

  h3 {
    font-size: 1.17rem; // Medium 
    margin-left: 20px;
  }

  h4 {
    font-size: 1rem; // Normal font size for h4
  }

  p {
    font-size: 0.875rem; // Slightly smaller font size for paragraph
  }

`;

export default GlobalStyles;
