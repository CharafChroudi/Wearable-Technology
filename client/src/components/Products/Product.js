import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const Product = ({ inCart, setInCart, setQuantityTotal }) => {
  const [searchedProduct, setSearchedProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [updatedPrice, setUpdatedPrice] = useState(null);
  const [notification, setNotification] = useState(false);
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const { _id } = useParams();
  useEffect(() => {
    fetch(`/getProduct/${_id}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchedProduct(data.data);
        setUpdatedPrice(data.data.price);
        setIsOutOfStock(data.data.numInStock < 1);
      })
      .catch((error) => {
        console.error("No product found!:", error);
      });
  }, []);

  const handleQuantityChange = (e) => {
    setSelectedQuantity(parseInt(e.target.value));
    const priceNumber = (
      parseFloat(searchedProduct.price.replace("$", "")) * e.target.value
    ).toFixed(2);
    setUpdatedPrice(`$${priceNumber}`);
  };

  const handleAddToCart = (e) => {
    const requiredProduct = {
      _id: searchedProduct._id,
      name: searchedProduct.name,
      price: updatedPrice,
      imageSrc: searchedProduct.imageSrc,
      quantity: selectedQuantity,
    };
    fetch("/addToCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requiredProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 201) {
          setInCart([...inCart, requiredProduct]);
          setNotification({
            message: "Item has been added to the cart",
            type: "success",
          });
          setQuantityTotal(
            (quantityTotal) => (quantityTotal += selectedQuantity)
          );
        } else {
          setNotification({
            message: "This item is already in the cart",
            type: "error",
          });
        }
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      {searchedProduct && updatedPrice && (
        <StyledProduct>
          <StyledProductInfo>
            <h2>{searchedProduct.name}</h2>
            <span>Category : {searchedProduct.category}</span>
            <span>Body part : {searchedProduct.body_location}</span>
          </StyledProductInfo>
          <StyledProductUtility>
            <img
              src={searchedProduct.imageSrc}
              alt=""
              style={{ width: "400px", height: "100%" }}
            />
            <StyledSelect
              value={selectedQuantity}
              onChange={handleQuantityChange}
            >
              {searchedProduct.numInStock < 1 ? (
                <option value={searchedProduct.numInStock}>
                  Out of Stock
                </option>
              ) : (
                [...Array(searchedProduct.numInStock).keys()].map(
                  (quantity) => (
                    <option key={quantity} value={quantity + 1}>
                      {`Quantity: ${quantity + 1}`}
                    </option>
                  )
                )
              )}
            </StyledSelect>
            <span>Price : {updatedPrice}</span>
            <button onClick={handleAddToCart} disabled={isOutOfStock}>
              Add to cart
            </button>
          </StyledProductUtility>
        </StyledProduct>
      )}
      {notification && (
        <StyledNotification type={notification.type}>
          {notification.message}
        </StyledNotification>
      )}
    </div>
  );
};

const StyledProduct = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 300px;
  font-size: 32px;
  margin-top: 100px;
`;

const StyledProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 400px;
  margin-top: -300px;
  gap: 40px;
`;

const StyledProductUtility = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const StyledOption = styled.option`
  /* border: 2px;
  border-radius: 60px; */
`;

const StyledSelect = styled.select`
  height: 50px;
  font-size: 24px;
  text-align: center;
  border-radius: 10px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;
const StyledNotification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: ${({ type }) =>
    type === "success" ? "#4caf50" : "#f44336"};
  color: white;
  padding: 15px 20px;
  border-radius: 5px;
  font-size: 18px;
  animation: ${fadeIn} 0.5s, ${fadeOut} 0.01s 4s forwards;
`;
export default Product;
